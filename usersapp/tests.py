import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APIRequestFactory, APISimpleTestCase, APITestCase, force_authenticate

User = get_user_model()


class TestUserViewSet(TestCase):
    def test_get_user(self):
        admin = User.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        client = APIClient()
        client.login(username="admin", password="admin123456")
        response = client.get(f"/api/users/{admin.uuid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
