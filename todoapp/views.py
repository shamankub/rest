from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import TODO, Project
from .serializers import ProjectSerializer, TODOSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TODOViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
