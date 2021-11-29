from rest_framework.relations import PrimaryKeyRelatedField, HyperlinkedRelatedField, SlugRelatedField, \
    StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from project.models import Project, TODO
from users.models import User
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = HyperlinkedRelatedField(many=True,
    #                                 read_only=False,
    #                                 queryset=User.objects.all(),
    #                                 view_name='user-detail')

    users = SlugRelatedField(many=True, read_only=False, queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = Project
        fields = ('id', 'project_name', 'url', 'users')


class ProjectNameSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_name']


class TODOModelSerializer(HyperlinkedModelSerializer):
    # user = HyperlinkedRelatedField(many=False,
    #                                 read_only=False,
    #                                 queryset=User.objects.all(),
    #                                 view_name='user-detail'
    #                               )
    project_name = ProjectNameSerializer(many=False, read_only=True)
    user = SlugRelatedField(many=False, read_only=False, queryset=User.objects.all(), slug_field='username')
    # project_name = HyperlinkedRelatedField(many=False,
    #                                 read_only=False,
    #                                 queryset=Project.objects.all(),
    #                                 view_name='project-detail'
    #                                       )

    class Meta:
        model = TODO
        fields = ('id', 'project_name', 'text', 'user', 'is_active')