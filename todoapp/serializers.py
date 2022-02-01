from rest_framework.serializers import ModelSerializer

from .models import TODO, Project


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class TODOSerializer(ModelSerializer):
    class Meta:
        model = TODO
        exclude = ("is_active",)


class TODOSerializerBase(ModelSerializer):
    class Meta:
        model = TODO
        exclude = ("is_active",)
