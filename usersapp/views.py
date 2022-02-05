from rest_framework import mixins, viewsets
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer

from .models import User
from .serializers import UserSerializer, UserSerializerWithFlags


class UserCustomViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        print(self.request.version)
        if self.request.version == "2":
            return UserSerializerWithFlags
        return UserSerializer
