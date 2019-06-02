"""PlacePass URL Configuration

"""
from rest_framework.routers import DefaultRouter

from .views_api import CurrencyViewSet

router = DefaultRouter()
router.register('currency', CurrencyViewSet, base_name='currencies')

urlpatterns = router.urls
