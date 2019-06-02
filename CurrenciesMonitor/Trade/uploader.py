import logging
import requests
from requests import exceptions as r_exceptions
from django.conf import settings
from django.utils import timezone

from Trade.models import Currency, Rate

logger = logging.getLogger('celery')


def request_api(url: str, **kwargs) -> list:
    """GET request wrapper to fetch data the API response.

    kwargs are passed to `session.request()`.
    """

    resp = requests.get(url=url, **kwargs)
    resp.raise_for_status()
    logger.info("Got response [%s] for URL: %s", resp.status_code, url)
    data = resp.json()
    return data


def get_actual_rates(url: str, **kwargs) -> dict:
    """Getting history from API with possible processing."""
    resp = set()
    try:
        resp = request_api(url, **kwargs)
    except r_exceptions.RequestException as e:
        logger.error(
            "aiohttp exception for %s [%s]: %s",
            url,
            getattr(e, "status", None),
            getattr(e, "message", None),
        )
        return resp
    except Exception as e:
        logger.exception("Non-aiohttp exception occured:  %s", getattr(e, "__dict__", {}))
        return resp
    else:
        # Possible post processing  and return response data

        dict_rates = dict((rate['symbol'], rate['price']) for rate in resp)
        return dict_rates


def upload_prices() -> None:
    """Upload with saving rates for currency units."""

    url = settings.BINANCE_PRICE_URL
    res = get_actual_rates(url)
    if not res:
        return None

    saving_response_rates(res)


def saving_response_rates(rates: dict) -> None:
    """Saving response data to DB."""

    bulk_rates = list()
    exclude_currencies = Currency.objects.filter(monitored=False)

    for currency in exclude_currencies:
        if currency.name in rates.keys():
            rates.pop(currency.name)

    datetime_now = timezone.now().replace(microsecond=0)
    for key, value in rates.items():
        value_ = float(value)
        currency, created = Currency.objects.get_or_create(name=key)

        rate = Rate.objects.filter(currency=currency).order_by('-created')
        if not rate.exists() or float(rate.first().value) != value_:
            new_rate = Rate(currency=currency, value=value_, created=datetime_now)
            bulk_rates.append(new_rate)
    Rate.objects.bulk_create(bulk_rates)
