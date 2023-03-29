from django.shortcuts import render
from rest_framework.decorators import action # Import this for the action decorator
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response # Import this for Response
from rest_framework import status # Import this for Status
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import User, Freelancer, Recruiter
from .serializers import MyTokenObtainPairSerializer ,UserSerializer, UserDetailSerializer

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        return User.objects.all()
    
    viewset_serializers = {
    'GET' : UserDetailSerializer,
    'POST' : UserSerializer,
    'PATCH' : UserDetailSerializer,
    }

    def get_serializer_class(self):
        return self.viewset_serializers.get(self.request.method)

    def get(self,request):
        serializer = self.get_serializer_class()
        users = User.objects.all()
        data = serializer(users, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def create(self,request):
        serializer = self.get_serializer_class()
        user = User.objects.create(username=request.data['username'],
                                   email=request.data['email'],
                                   password=request.data['password'],
                                     contact=request.data['contact'])
        user.set_password(user.password)
        user.save()
        return Response({
            'message': "User Profile Created Successfully"
        },
            status=status.HTTP_200_OK,
        )
    
    @action(methods=['get','patch'], detail=False)
    def me(self, request):
        serializer = self.get_serializer_class()
        data = serializer(request.user).data
        if request.method=='PATCH':
            user = User.objects.filter(email=request.user).first()
            data = serializer(user, data=request.data, partial=True)
            data.is_valid(raise_exception=True)
            data.save()
            return Response({
                'message': "User Profile Updated Successfully"
            },
            status=status.HTTP_200_OK
            )
        else :     
            return Response(data, status=status.HTTP_200_OK)
    