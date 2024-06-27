from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Songs
from .serializers import SongSerialzier
from .utility import file_iterator
from django.http import StreamingHttpResponse
import base64
import time
from rest_framework.pagination import PageNumberPagination

class SongsView(APIView, PageNumberPagination):
    def get(self, request):
        ''' This will give all songs with pagination '''
        songs = Songs.objects.all()
        # print(request.)
        paginated_songs = self.paginate_queryset(songs, request)
        serializer = SongSerialzier(paginated_songs, many=True)
        return self.get_paginated_response(serializer.data)
    
    
class PlayView(APIView):
    def get(self, request, song_id):
        song = Songs.objects.filter(id=song_id).first()
        try:
            response = StreamingHttpResponse(file_iterator(song.song_file.path))
            response['Content-Disposition'] = f'attachment; filename="{song.name}.mp3"'
            response['Content-Type'] = 'audio/mpeg'
            return response
        except Songs.DoesNotExist:
            return Response({"error": "Song not found"}, status=404)
        

