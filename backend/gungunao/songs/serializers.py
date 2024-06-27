from .models import Songs
from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework import serializers
import base64
from mutagen.mp3 import MP3

class SongSerialzier(ModelSerializer):
    thumbnail_base64 = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()
    class Meta:
        model = Songs 
        fields = ['id', 'name', 'song_file', 'likes', 
                  'metadata', 'playlist', 'thumbnail', 'thumbnail_base64',
                  'created_on', 'last_updated_on', 'duration']
        read_only_fields = ['id', 'created_on', 'last_updated_on', 'duration'] 

    def validate_metadata(self, value):
        if not isinstance(value, dict):
            raise ValidationError('Metadata must be json')
        return value 
    
    def create(self, validated_data):
        return Songs.objects.create(**validated_data)

    def get_thumbnail_base64(self, obj):
        thumbnail_path = obj.thumbnail.path
        with open(thumbnail_path, 'rb') as file_image:
            encoded_image = base64.b64encode(file_image.read())
        return encoded_image
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request', None)
        if request and request.method == 'GET':
            representation['thumbnail_base64'] = self.get_thumbnail_base64(instance)
        return representation

    def get_duration(self, song):
        if not isinstance(song, Songs):
            raise ValidationError('song is Not isntance of Songs Class')
        audio = MP3(song.song_file.path)
        return audio.info.length
    