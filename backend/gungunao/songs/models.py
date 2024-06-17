from django.db import models
import uuid 
from .utility import validate_mp3, upload_to


# Create your models here.
class Songs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length = 100)
    song_file = models.FileField(upload_to=upload_to, validators=[validate_mp3])
    likes = models.IntegerField(default=0)
    metadata = models.JSONField()
    playlist = models.IntegerField(default=0)
    thumbnail = models.ImageField(upload_to='thumbnails/')
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"