from celery.decorators import periodic_task

from datetime import timedelta
from .uploader import upload_prices


@periodic_task(run_every=(timedelta(seconds=30)), name="run_upload_currencies")
def periodic_upload_currencies():
    upload_prices()
