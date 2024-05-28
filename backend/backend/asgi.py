"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""


import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from rest_framework_jwt.authentication import JSONWebTokenAuthentication




os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    'http':asgi_application,
    'websocket':AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            JSONWebTokenAuthentication(),
            URLRouter(parking.routing.ws_urlspatterns),
        )
    )
})
