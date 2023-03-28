from rest_framework.routers import DefaultRouter
from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet, MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path(r'',include(router.urls)), 
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]