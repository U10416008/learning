from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render , redirect
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from . import worddb
def word(request):

    context          = {}

    context['hello'] = 'hello'
    context['items'] = worddb.worddb_get(request.user)

    return render(request, 'myWord.html', context)
def home(request):
    context          = {}
    return render(request, 'home.html', context)
def mlearning(request):
    return render(request, 'mlearning.html')
def allpass(request):
    return render(request, 'pass.html')
def algorithm(request):
    return render(request, 'algorithm.html')
def login(request):

    context          = {}
    if request.method == 'POST':

        if request.user.is_authenticated:
            print('al')
            context['warning'] = 'Already Login'
            return render(request,'login.html',context)

        username = request.POST.get('username','')
        password = request.POST.get('password','')
        if User.objects.filter(username=username).exists() == False:
            register(request)


        user = auth.authenticate(username=username, password=password)

        if user is not None and user.is_active:
            auth.login(request, user)
            return HttpResponseRedirect('/')
        else:

            context['warning'] = 'Wrong PassWord or User Exists'
            return render(request,'login.html',context)
    return render(request,'login.html',context)
def register(request):
    User.objects.create_user(username=request.POST.get('username',''), password=request.POST.get('password',''))



def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/accounts/login/')
def add_word(request):
    context = {}

    if request.POST:
        word = request.POST['q']
        if word != '':
            print(request.user)
            worddb.worddb_add(request.user,word)
        context['hello'] = 'No Empty'
        #print(request.POST['q'])
    return HttpResponseRedirect('/word/')
