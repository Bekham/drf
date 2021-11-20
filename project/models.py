from django.db import models

# Create your models here.
from users.models import User


class Project(models.Model):
    project_name = models.CharField(max_length=64)
    url = models.TextField()
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.project_name


class TODO(models.Model):
    project_name = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_timestamp = models.DateTimeField(auto_now_add=True)
    update_timestamp = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

