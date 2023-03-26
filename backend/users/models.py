from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager
# Create your models here.

GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('NotSay', 'NotSay'),
    ('Other', 'Other'),
)

COURSE_CHOICES = (
    ('B.Tech', 'B.Tech'),
    ('M.Tech', 'M.Tech'),
    ('MBA', 'MBA'),
    ('PHD','PHD'),
    ('Other', 'Other'),
)

YEAR_CHOICES = (
    ('1', '1st Year'),
    ('2', '2nd Year'),
    ('3', '3rd Year'),
    ('4', '4th Year'),
    ('5', '5th Year'),
    ('6', 'Graduated'),
    ('7', 'Faculty/Staff'),
    ('8', 'NA'),
)

class User(AbstractUser):
    username = models.CharField(max_length=250,unique=True, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    USERNAME_FIELD = 'email'
    first_name = models.CharField(max_length=250,null=True, blank=True)
    last_name = models.CharField(max_length=250,null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, verbose_name='Gender', default='Male')
    contact = models.CharField(max_length=10, verbose_name='Contact')
    roll_no = models.CharField(max_length=250,null=True, blank=True)
    course_enrolled = models.CharField(max_length=250, choices=COURSE_CHOICES, default='Other')
    current_year = models.CharField(max_length=250, choices=YEAR_CHOICES, default='8')
    profile_photo = models.ImageField(upload_to='profile_photos', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    instagram = models.URLField(max_length=250, null=True, blank=True)
    facebook = models.URLField(max_length=250, null=True, blank=True)
    linkedin = models.URLField(max_length=250, null=True, blank=True)
    github = models.URLField(max_length=250, null=True, blank=True)
    twitter = models.URLField(max_length=250, null=True, blank=True)
    youtube = models.URLField(max_length=250, null=True, blank=True)
    other_links = models.URLField(max_length=250, null=True, blank=True)
    portfolio_link = models.URLField(max_length=250, null=True, blank=True)
    isFreelancer = models.BooleanField(default=False)
    isRecruiter = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.email
    

SKILL_CHOICES = (
    ('Web_Development', 'Web Development'),
    ('App_Development', 'App Development'),
    ('Machine_Learning', 'Machine Learning'),
    ('Poster_Design', 'Poster Design'),
    ('Video_Editing', 'Video Editing'),
    ('Graphic_Design', 'Graphic Design'),
    ('Photography', 'Photography'),
    ('Other', 'Other'),
)

class Freelancer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    skill1 = models.CharField(max_length=250, choices=SKILL_CHOICES , null=True, blank=True)
    skill2 = models.CharField(max_length=250, choices=SKILL_CHOICES , null=True, blank=True)
    skill3 = models.CharField(max_length=250, choices=SKILL_CHOICES , null=True, blank=True)
    is_verified = models.BooleanField(default=False)


class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    about_me = models.TextField(max_length=500, null=True, blank=True)
    is_approved = models.BooleanField(default=False)