from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    uuid = models.UUIDField(primary_key=True, default=uuid4, verbose_name="UUID")
    username = models.CharField(unique=True, max_length=64, null=False, verbose_name="имя пользователя")
    first_name = models.CharField(max_length=64, verbose_name="имя")
    last_name = models.CharField(max_length=64, verbose_name="фамилия")
    email = models.EmailField(unique=True, max_length=254, null=False, verbose_name="электронная почта")
