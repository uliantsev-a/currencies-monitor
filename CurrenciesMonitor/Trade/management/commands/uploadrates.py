from django.core.management.base import BaseCommand
from Trade.uploader import upload_prices


class Command(BaseCommand):
    help = 'Run uploader rates from binance.com'

    def handle(self, *args, **options):
        upload_prices()
