from rest_framework.routers import DefaultRouter
from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet, MyTokenObtainPairView, FreelancerViewSet, RecruiterViewSet, JobViewSet, ApplicantViewSet, AllJobsViewSet

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
router.register("freelancer", FreelancerViewSet, basename="freelancer")
router.register("recruiter", RecruiterViewSet, basename="recruiter")
router.register("job", JobViewSet, basename="job")
router.register("applicant", ApplicantViewSet, basename="applicant")

urlpatterns = [
    path(r'',include(router.urls)), 
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('alljobs/', AllJobsViewSet.as_view(), name='alljobs'),
]