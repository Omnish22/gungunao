from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .tokens import get_tokens_for_user, expired_tokens
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError

# Create your views here.
class RegisterView(APIView):
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if not user:
            return Response({'Login':'Failed'}, status=status.HTTP_401_UNAUTHORIZED)
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_202_ACCEPTED)
    
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)  # Uncomment this if you want to re-enable the permission

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"detail": "Refresh token is missing."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            # Assuming you have a function 'expired_tokens' to handle expired tokens
            dead_tokens = expired_tokens(request)
            response = {"Logout": "Successful Logout", "Dead Tokens": dead_tokens}
            return Response(response, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)