# Generated by Django 3.2.9 on 2021-11-21 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_alter_project_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='активна'),
        ),
    ]
