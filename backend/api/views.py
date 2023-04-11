from django.shortcuts import render
from rest_framework.decorators import action # Import this for the action decorator
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.response import Response # Import this for Response
from rest_framework import status, viewsets # Import this for Status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.models import User, Freelancer, Recruiter, Job, Applicant
from .serializers import MyTokenObtainPairSerializer ,UserSerializer, UserDetailSerializer, FreelancerSerializer, RecruiterSerializer, JobSerializer, ApplicantSerializer
from rest_framework.decorators import api_view, permission_classes, action  

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

class FreelancerViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = FreelancerSerializer
    
    def get_queryset(self):
        return Freelancer.objects.all()
    
    def get(self,request):
        serializer = self.get_serializer_class()
        freelancers = Freelancer.objects.all()
        data = serializer(freelancers, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def create(self,request):
        serializer = self.get_serializer_class()
        freelancer = Freelancer.objects.create(user=request.user,
                                                is_verified = False,)
        freelancer.save()
        return Response({
            'message': "Freelancer Profile Created Successfully"
        },
            status=status.HTTP_200_OK,
        )
    
    @action(methods=['get','patch'], detail=False)
    def me(self, request):
        serializer = self.get_serializer_class()
        data = serializer(request.user).data
        if request.method=='PATCH':
            freelancer = Freelancer.objects.filter(user=request.user).first()
            data = serializer(freelancer, data=request.data, partial=True)
            data.is_valid(raise_exception=True)
            data.save()
            return Response({
                'message': "Freelancer Profile Updated Successfully"
            },
            status=status.HTTP_200_OK
            )
        else :     
            return Response(data, status=status.HTTP_200_OK)
        
class RecruiterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = RecruiterSerializer
    
    def get_queryset(self):
        return Recruiter.objects.all()
    
    def get(self,request):
        serializer = self.get_serializer_class()
        recruiters = Recruiter.objects.all()
        data = serializer(recruiters, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def create(self,request):
        serializer = self.get_serializer_class()
        recruiter = Recruiter.objects.create(user=request.user,
                                               about_me = request.data['about_me'],
                                               is_approved = request.data['is_approved'],
                                               )
        recruiter.save()
        return Response({
            'message': "Recruiter Profile Created Successfully"
        },
            status=status.HTTP_200_OK,
        )
    
    @action(methods=['get','patch'], detail=False)
    def me(self, request):
        serializer = self.get_serializer_class()
        data = serializer(request.user).data
        if request.method=='PATCH':
            recruiter = Recruiter.objects.filter(user=request.user).first()
            data = serializer(recruiter, data=request.data, partial=True)
            data.is_valid(raise_exception=True)
            data.save()
            return Response({
                'message': "Recruiter Profile Updated Successfully"
            },
            status=status.HTTP_200_OK
            )
        else :     
            return Response(data, status=status.HTTP_200_OK)
        
class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    permission_classes = [IsAuthenticated,]

class JobRecruiterDetails(APIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        pk = request.data['id']
        job = Job.objects.get(id=pk)
        user = job.recruiter
        job.recruiter_name = user.first_name + " " + user.last_name
        job.recruiter_rollno = user.roll_no
        job.save()

        serializer = JobSerializer(job)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    

class ApplicantViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicantSerializer
    queryset = Applicant.objects.all()
    permission_classes = [IsAuthenticated,]

class AllJobsViewSet(APIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    permission_classes = [AllowAny,]

    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        id = request.data['id']
        if Job.objects.filter(id=id).exists():
            job = Job.objects.get(id=id)
            serializer = JobSerializer(job)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else :
            return Response({'message': 'Job does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
class CheckApplicationView(APIView):
    serializer_class = ApplicantSerializer
    queryset = Applicant.objects.all()
    permission_classes = [IsAuthenticated,]

    def post(self, request):
        job = request.data['job']
        freelancer = request.data['freelancer']
        if Applicant.objects.filter(job=job, freelancer=freelancer).exists():
            return Response({'message': 'Application already exists'}, status=status.HTTP_200_OK)
        else :
            return Response({'message': 'Application does not exist'}, status=status.HTTP_404_NOT_FOUND)