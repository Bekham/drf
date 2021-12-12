from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here.
from users.models import User

# def make_published(modeladmin, request, queryset):
#     queryset.update(status='p')
# make_published.short_description = "Mark selected stories as published"

class ArticleAdmin(UserAdmin):
    list_display = ['username', 'last_name', 'first_name', 'email', 'is_staff', 'is_active']
    ordering = ['username']
    # actions = [make_published]
# admin.site.register(User)
admin.site.register(User, ArticleAdmin)