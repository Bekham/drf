from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser('admin', '1@mail.ru', '1')
        test_users = [
            {
                "username": "test1",
                "first_name": "test1",
                "last_name": "test_test1",
                "email": "test1@mail.ru",
                "password": "1",
            },
            {
                "username": "test2",
                "first_name": "test2",
                "last_name": "test_test2",
                "email": "test2@mail.ru",
                "password": "2",
            }
        ]

        for user in test_users:
            new_user = User.objects.create_user(**user)
            new_user.save()


