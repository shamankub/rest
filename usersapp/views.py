from rest_framework import viewsets, mixins
from rest_framework.renderers import JSONRenderer

from .models import User
from .serializers import UserSerializer


class UserCustomViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]
