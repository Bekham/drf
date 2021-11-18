from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.utils.translation import ugettext_lazy as _



class User(AbstractUser):
    # birthday = models.DateField(verbose_name='birthday', blank=True, null=True)
    # birthday = models.DateField(_(u'birthday'), blank=True, null=True)
    AbstractUser._meta.get_field('email')._unique = True
