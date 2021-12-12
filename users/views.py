from rest_framework.generics import ListAPIView
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin
from rest_framework.renderers import AdminRenderer, JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV1


# class UserModelViewSet(ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
# class UserModelViewSet(ListAPIView):
class UserModelViewSet(ModelViewSet):
   # renderer_classes = [AdminRenderer ]

   queryset = User.objects.all()
   # serializer_class = UserModelSerializer

   def get_serializer_class(self):
      if self.request.version == 'v1':
         return UserModelSerializerV1
      return UserModelSerializer

