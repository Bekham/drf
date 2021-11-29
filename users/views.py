from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin
from rest_framework.renderers import AdminRenderer, JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer


# class UserModelViewSet(ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
class UserModelViewSet(ModelViewSet):
   # renderer_classes = [AdminRenderer ]

   queryset = User.objects.all()
   serializer_class = UserModelSerializer
