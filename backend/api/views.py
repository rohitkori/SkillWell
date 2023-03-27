from django.shortcuts import render
from rest_framework.decorators import action # Import this for the action decorator
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response # Import this for Response
from rest_framework import status # Import this for Status

from users.models import User, Freelancer, Recruiter
from .serializers import UserSerializer

# Create your views here.

class UserViewSet(GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.all()
    
    @action(methods=['get'], detail=False)
    def me(self, request):
      serializer = self.get_serializer_class()
      data = serializer(request.user).data
      return Response(data, status=status.HTTP_200_OK)