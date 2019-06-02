from django.db import models
from django.utils import timezone


class Currency(models.Model):
    name = models.CharField(max_length=32)
    monitored = models.BooleanField(default=True)

    def get_last_price(self):
        return self.rate_set.order_by('-created').first()

    def __str__(self):
        return self.name


class Rate(models.Model):
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    value = models.DecimalField(max_digits=19, decimal_places=8)
