from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, TODOSerializer
from .models import Project, TODO


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TODOViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
