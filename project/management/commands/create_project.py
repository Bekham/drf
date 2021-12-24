from django.core.management.base import BaseCommand

from users.models import User
from project.models import Project


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            
            User.objects.create_superuser(username='admin', email='admin@amail.ru', password='1')
            User.objects.create_user(username='new_user', email='new@mail.ru', password='sdfQ1234567')
            
            
        except:
            pass
        for i in range(5):
            name = f'test{i}'
            url = f'https://github.com/Bekham/{i}'
            Project.objects.create(project_name=name,url=url)
