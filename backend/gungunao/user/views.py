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
    def get(self, request):
        return Response({'Message':"Success"})
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'Error': 'Validation Error', 'Message':f'{e}'}, status=status.HTTP_409_CONFLICT)
        
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
    permission_classes=(IsAuthenticated,)
    def post(self, request):
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        dead_tokens = expired_tokens(request)
        response = {"Logout":"Successful Logout", "Dead Tokens":dead_tokens}
        return Response(response,status=status.HTTP_205_RESET_CONTENT)