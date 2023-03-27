from rest_framework.routers import DefaultRouter
from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path(r'',include(router.urls)), 

]