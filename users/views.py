from rest_framework.renderers import AdminRenderer
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
   # renderer_classes = [AdminRenderer ]

   queryset = User.objects.all()
   serializer_class = UserModelSerializer
