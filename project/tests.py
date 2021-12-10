from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from users.models import User
from .views import TODOModelViewSet, ProjectModelViewSet
from .models import TODO, Project

# Create your tests here.


# class ProjectTodoViewSet(TestCase):
#
#
#     def setUp(self) -> None:
#         self.username = 'admin'
#         self.password = 'admin0123456789'
#         self.admin = User.objects.create_superuser(self.username, 'admin@amail.ru', self.password)
#         self.new_user = User.objects.create_user(username='new_user', email='new@mail.ru', password='sdfQ1234567')
#         self.data = {'project_name': 'DRF',
#                 'url': 'https://github.com/Bekham/drf'}
#         self.data_put = {'project_name': 'DRF_update',
#                          'url': 'https://github.com/Bekham/drf/update'}
#         self.project_url = '/api/project/'
#         self.todo_url = '/api/todo/'
#
#
#     def test_get_project_list(self):
#         factory = APIRequestFactory()
#         request = factory.get(self.project_url)
#         view = ProjectModelViewSet.as_view({'get': 'list'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_todo_list(self):
#         factory = APIRequestFactory()
#         request = factory.get(self.todo_url)
#         view = TODOModelViewSet.as_view({'get': 'list'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_create_project(self):
#         factory = APIRequestFactory()
#         request = factory.post(self.project_url, self.data, format='json')
#         view = ProjectModelViewSet.as_view({'post': 'create'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#
#     def test_get_detail_project(self):
#         client = APIClient()
#         project_create = Project.objects.create(**self.data)
#         project_create.users.add(self.new_user)
#         response = client.get(f'{self.project_url}{project_create.id}/')
#         # print(Project.objects.filter(users__username='new_user'))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_guest_project(self):
#         client = APIClient()
#         project_create = Project.objects.create(**self.data)
#         project_create.users.add(self.new_user)
#         response = client.put(f'{self.project_url}{project_create.id}/',self.data_put)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#
#     def test_get_admin(self):
#         client = APIClient()
#         project_create = Project.objects.create(**self.data)
#         client.login(username=self.username, password=self.password)
#         response = client.put(f'{self.project_url}{project_create.id}/', self.data_put)
#         project_create.users.add(self.new_user)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         project_update = Project.objects.get(id=project_create.id)
#         self.assertEqual(project_update.project_name, self.data_put['project_name'])
#         self.assertEqual(project_update.url, self.data_put['url'])
#         # self.assertEqual(Project.objects.filter(id=project_update.id).values(),
#         #                  Project.objects.filter(users__username='new_user').values())
#         client.logout()

class TestProjectViewSet(APITestCase):

    def setUp(self) -> None:
        self.username = 'admin'
        self.password = 'admin0123456789'
        self.admin = User.objects.create_superuser(self.username, 'admin@amail.ru', self.password)
        self.new_user = User.objects.create_user(username='new_user', email='new@mail.ru', password='sdfQ1234567')
        self.data = {'project_name': 'DRF',
                     'url': 'https://github.com/Bekham/drf'}
        self.data_put = {'project_name': 'DRF_update',
                         'url': 'https://github.com/Bekham/drf/update'}
        self.project_url = '/api/project/'
        self.todo_url = '/api/todo/'

    def test_get_project_list(self):
        response = self.client.get(self.project_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_edit_admin(self):
        project_create = Project.objects.create(**self.data)
        project_create.users.add(self.new_user)
        todo = TODO.objects.create(project_name =project_create, text='text', user = self.new_user)
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(f'{self.todo_url}{todo.id}/',
                                   {'project_name' : project_create.pk,
                                    'text' : 'update_text',
                                    'user' : self.new_user.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_todo = TODO.objects.get(id=todo.id)
        self.assertEqual(update_todo.text, 'update_text')
        self.client.logout()

    def test_edit_mixer_project(self):
        project_create = Project.objects.create(**self.data)
        project_create.users.add(self.new_user)
        todo = mixer.blend(TODO, project_name =project_create, user = self.new_user)
        print(TODO.objects.filter(id=todo.id).values_list())
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(f'{self.todo_url}{todo.id}/',
                                   {'project_name' : project_create.pk, 'text': 'update_text', 'user' : self.new_user.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_todo = TODO.objects.get(id=todo.id)
        self.assertEqual(update_todo.text, 'update_text')
        self.client.logout()