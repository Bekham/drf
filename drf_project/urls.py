"""drf_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from project.views import ProjectModelViewSet, TODOModelViewSet
from users.views import UserModelViewSet
from rest_framework.authtoken import views

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', TODOModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="TODO",
        default_version='v2',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@mail.ru"),
        license=openapi.License(name="Some License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    # path('api/<str:version>/users/', UserModelViewSet.as_view()),
    # path('api/users/v1', include('users.urls', namespace='v1')),
    # path('api/users/v2', include('users.urls', namespace='v2')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
