"""learning URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import index,worddb


urlpatterns = [
    path('', index.home),
    path('word/', index.word),
    path('mlearning/', index.mlearning),
    path('dbadd/', worddb.worddb_add),
    path('dbget/', worddb.worddb_get),
    path('dbupdate/', worddb.worddb_update),
    path('dbdelete/', worddb.worddb_delete),
    path('add-word/',index.add_word),
    path('accounts/login/',index.login),
    path('accounts/logout/',index.logout),
    path('algorithm/',index.algorithm),
    path('pass/',index.allpass)
]
