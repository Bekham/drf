from django.shortcuts import render

# Create your views here.
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from project.filters import ProjectFilter
from project.models import Project, TODO
from project.serializers import ProjectModelSerializer, TODOModelSerializer

class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10

class TODOLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20

class ProjectModelViewSet(ModelViewSet):

   queryset = Project.objects.all()
   serializer_class = ProjectModelSerializer
   # pagination_class = ProjectLimitOffsetPagination
   filterset_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
   queryset = TODO.objects.all()
   serializer_class = TODOModelSerializer
   # pagination_class = TODOLimitOffsetPagination
   filterset_fields = ['project_name__project_name']

   def perform_destroy(self, instance):
      if instance.pk:
         if instance.is_active:
            # instance.update(is_active=False)
            instance.is_active = False
            instance.save()
