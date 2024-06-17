from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Songs
from .serializers import SongSerialzier
from .utility import file_iterator
from django.http import StreamingHttpResponse

# Create your views here.
class SongsView(APIView):
    def get(self, request):
        ''' This will give all songs '''
        songs = Songs.objects.all()
        serializer = SongSerialzier(songs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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