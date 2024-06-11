from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta, datetime, timezone

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def expired_tokens(request):
    # Get the user associated with the request
    user = request.user
    # Generate a new refresh token
    refresh = RefreshToken.for_user(user)
    # Get the current datetime
    current_time = datetime.now(tz=timezone.utc)
    refresh.set_exp(from_time=current_time, lifetime=timedelta(seconds=1))
    # Access the access token associated with the refresh token
    access_token = refresh.access_token
    access_token.set_exp(from_time=current_time, lifetime=timedelta(seconds=1))
    return {
        'refresh': str(refresh),
        'access': str(access_token),
    }