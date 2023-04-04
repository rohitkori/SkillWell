from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from .models import User, Freelancer, Recruiter, Job, Applicant

# Register your models here.

@admin.register(User)
class UserAdmin(ImportExportModelAdmin, DjangoUserAdmin):
    fieldsets = (
        (None, {'fields': ('username','email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name' ,'gender', 'contact')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Profile'), {'fields': ('course_enrolled', 'current_year','roll_no','profile_photo','isFreelancer','isRecruiter' )}),
        (_('Social Media'), {'fields': ('instagram', 'facebook','linkedin','twitter','github','portfolio_link','other_link','youtube' )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username','email', 'password1', 'password2'),
        }),
    )

    list_display = ('username','email','first_name', 'last_name', 'course_enrolled', 'current_year')
    list_filter = ('isFreelancer', 'isRecruiter','course_enrolled','current_year')
    search_fields = ['username', 'email', 'first_name', 'last_name',]
    ordering = ('email',)

    class Meta:
        model = User
        fields = '__all__'

@admin.register(Freelancer)
class FreelancerAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('user', 'skill1','is_verified',)
    list_filter = ('is_verified','user','skill1','skill2','skill3',)
    search_fields = ['user',]
    ordering = ('user',)

    class Meta:
        model = Freelancer
        fields = '__all__'

@admin.register(Recruiter)
class RecruiterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('user', 'is_approved')
    list_filter = ('user', 'is_approved')
    search_fields = ['user',]
    ordering = ('user',)

    class Meta:
        model = Recruiter
        fields = '__all__'

@admin.register(Job)
class JobAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('category', 'recruiter','title')
    list_filter = ('recruiter', 'category')
    search_fields = ['title',]
    ordering = ('title',)

    class Meta:
        model = Job
        fields = '__all__'

@admin.register(Applicant)
class ApplicantAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('job', 'freelancer','is_selected')
    list_filter = ('job', 'freelancer','is_selected')
    search_fields = ['job','freelancer',]
    ordering = ('job',)

    class Meta:
        model = Applicant
        fields = '__all__'
