from .models import Songs
from rest_framework.serializers import ModelSerializer, ValidationError

class SongSerialzier(ModelSerializer):
    class Meta:
        model = Songs 
        fields = ['id', 'name', 'song_file', 'likes', 
                  'metadata', 'playlist', 'thumbnail', 
                  'created_on', 'last_updated_on']
        read_only_fields = ['id', 'created_on', 'last_updated_on'] 

    def validate_metadata(self, value):
        if not isinstance(value, dict):
            raise ValidationError('Metadata must be json')
        return value 
    
    def create(self, validated_data):
        return Songs.objects.create(**validated_data)
