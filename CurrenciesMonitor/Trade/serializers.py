from rest_framework import serializers
from .models import Currency, Rate


class RateSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Rate
        fields = ('created', 'value')


class CurrencySerializer(serializers.ModelSerializer):
    last_price = RateSerializer(source="get_last_price", many=False)

    class Meta(object):
        queryset = Rate.objects.order_by('reated')
        model = Currency
        fields = ('name', 'last_price')


class CurrencyPricesSerializer(serializers.ModelSerializer):
    rates = RateSerializer(source="rate_set", many=True)

    class Meta(object):
        model = Currency
        fields = ('name', 'rates')
