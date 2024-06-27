from django.core.exceptions import ValidationError
import time

def upload_to(instance, filename):
    # Custom path and filename
    return f'songs/{instance.name}.mp3'

def validate_mp3(value):
    if not value.name.endswith('.mp3'):
        ValidationError('Only MP3 files are Allowed')

def file_iterator(file_path, chunk_size=8192):
    chunk_count = 0
    with open(file_path, 'rb') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            chunk_count += 1
            # if chunk_count%100==0:
                # time.sleep(0.2)
            yield chunk
