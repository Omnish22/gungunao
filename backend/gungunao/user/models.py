# Create your models here.
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('A user email is needed.')
        if not password:
            raise ValueError('A user password is needed.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('A user email is needed.')
        if not password:
            raise ValueError('A user password is needed.')
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

# CREATING CUSTOM USER BECAUSE WE WANT TO USE EMAIL AS USERNAME
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    # IS_STAFF & IS_SUPERUSER ARE USE TO WHILE CREATING SUPERUSER
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    # EMAIL WILL BE USED AS USERNAME
    username = None
    # SETTING UP USERNAME AS EMAIL
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    def __str__(self):
        return self.email