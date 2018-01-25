from jwt import encode, decode, DecodeError, InvalidTokenError, ExpiredSignature
from json import dumps

from rest_framework import views, status, exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from rest_framework.response import Response

from django.http import HttpResponse
from django.shortcuts import render

from models import Users


class Login(views.APIView):
    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        
        username = request.data['username']
        password = request.data['password']

        try:
            user = Users.objects.get(username=username, password=password)
        except Users.DoesNotExist:
            return Response({'Error': "Invalid username/password"}, status="400")

        if user:
            payload = {
                'id': user.id,
                'email': user.email,
            }
            jwt_token = {'token': encode(payload, "SECRET_KEY")}

           return HttpResponse(
              dumps(jwt_token),
              status=200,
              content_type="application/json"
            )
        else:
            return Response(
              dumps({'Error': "Invalid credentials"}),
              status=400,
              content_type="application/json"
            )


class TokenAuthentication(BaseAuthentication):
    model = None

    def get_model(self):
        return User

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if not auth or auth[0].lower() != b'token':
            return None

        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header'
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1]
            if token=="null":
                msg = 'Null token not allowed'
                raise exceptions.AuthenticationFailed(msg)
        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        model = self.get_model()
        payload = decode(token, "SECRET_KEY")
        email = payload['email']
        userid = payload['id']
        msg = {'Error': "Token mismatch",'status' :"401"}

        try:
            
            user = Users.objects.get(
                email=email,
                id=userid,
                is_active=True
            )
            
            if not user.token['token'] == token:
                raise exceptions.AuthenticationFailed(msg)
               
        except ExpiredSignature or DecodeError or InvalidTokenError:
            return HttpResponse({'Error': "Token is invalid"}, status="403")
        except Users.DoesNotExist:
            return HttpResponse({'Error': "Internal server error"}, status="500")

        return (user, token)

    def authenticate_header(self, request):
        return 'Token'