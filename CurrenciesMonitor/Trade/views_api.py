from rest_framework import mixins, viewsets
from rest_framework.response import Response

from django.db.models import Prefetch
from .models import Rate, Currency
from .serializers import CurrencySerializer, CurrencyPricesSerializer


class CurrencyViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    # TODO: need add pagination setting
    queryset = Currency.objects.prefetch_related(
        Prefetch('rate_set', queryset=Rate.objects.order_by('-created'))
    )
    serializer_class = CurrencySerializer
    serializer_retrieve = CurrencyPricesSerializer
    lookup_field = 'name'

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            serializer_class = self.serializer_retrieve
        else:
            serializer_class = self.serializer_class

        return serializer_class
