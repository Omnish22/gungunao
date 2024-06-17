from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import SongsView, PlayView


urlpatterns = [
    path('', SongsView.as_view(), name='allsongs'),
    path('play/<uuid:song_id>/', PlayView.as_view(), name='play'),
]

# using below code, no need of ngnix to serve the file during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)