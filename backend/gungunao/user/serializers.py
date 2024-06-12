from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')
        if not email or not password:
            raise ValidationError({'detail': 'Email and Password are required.'})
        user = User(
            email=email
        )
        user.set_password(password)
        user.save()
        return user