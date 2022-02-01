import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import (APIClient, APIRequestFactory,
                                 APISimpleTestCase, APITestCase,
                                 force_authenticate)

from .models import TODO, Project
from .views import ProjectViewSet, TODOViewSet

User = get_user_model()


class TestProjectViewSet(TestCase):
    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/projects/")
        view = ProjectViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_TODO_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/todos/")
        view = TODOViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project(self):
        factory = APIRequestFactory()
        request = factory.post(
            "/api/projects/", {"name": "New project", "repository": "http://somelink.ru", "users": []}, format="json")
        view = ProjectViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        admin = User.objects.create_superuser(
            "admin", "admin@admin.com", "admin123456")
        request = factory.post(
            "/api/projects/", {"name": "New project", "repository": "http://somelink.ru", "users": [admin.uuid]}, format="json")
        force_authenticate(request, admin)
        view = ProjectViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestTODOViewSet(APITestCase):
    def test_get_TODO_list(self):
        response = self.client.get("/api/todos/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        admin = User.objects.create_superuser(
            "admin", "admin@admin.com", "admin123456")
        project = Project.objects.create(
            name="New project", repository="http://somelink.ru")
        todo = TODO.objects.create(
            project=project, creator=admin, text="some text")
        self.client.login(username="admin", password="admin123456")
        response = self.client.put(
            f"/api/todos/{todo.id}/", {"project": project.id, "creator": admin.uuid, "text": "some text"},)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.text, "some text")
        self.client.logout

    def test_edit_TODO_mixer(self):
        todo = mixer.blend(TODO)
        admin = User.objects.create_superuser(
            "admin", "admin@admin.com", "admin123456")
        self.client.login(username="admin", password="admin123456")
        response = self.client.put(f"/api/todos/{todo.id}/", {
                                   "project": todo.project.id, "creator": todo.creator.uuid, "text": "some text", })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.text, "some text")
        self.client.logout
