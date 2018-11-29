from django.http import HttpResponse

from Words.models import Word
from datetime import datetime
import pytz
import calendar

def worddb_add(user,word):
    word1 = Word(user=user,word=word)
    word1.save()


def worddb_get(user):
    #init
    item = []
    time = []

    # select * from
    list = Word.objects.filter(user=user)

    # where
    #response2 = Word.objects.filter(id=1)

    # single
    #response3 = Word.objects.get(id=1)

    # show two item in name
    #Word.objects.order_by('name')[0:2]

    #sort by id
    #Word.objects.order_by("id")

    # sort by id in name = runoob
    #Word.objects.filter(name="runoob").order_by("id")

    # output data
    #us = pytz.timezone('Asia/Taipei')
    for var in list:
        dt = datetime.strptime(var.time.strftime("%Y-%m-%d %H:%M:%S"), '%Y-%m-%d %H:%M:%S')
        msec = calendar.timegm(dt.utctimetuple())
        myTime = datetime.fromtimestamp(msec).strftime('%Y-%m-%d %H:%M:%S')
        print(myTime)

        item.append({'word' : var.word , 'time' : myTime})


    return item
    #return HttpResponse("<p>" + response + "</p>")
# update data
def worddb_update(request):
    # update item where id = 1
    word1 = Word.objects.get(id=1)
    word1.name = 'Google'
    word1.save()

    # another way to update
    #Word.objects.filter(id=1).update(name='Google')

    # update all row data
    # Word.objects.all().update(name='Google')

    return HttpResponse("<p>update success</p>")
# delete data

def worddb_delete(request):
    # delete item where id = 1
    word1 = Word.objects.filter(name="runoob")
    word1.delete()

    # another way to delete
    # Word.objects.filter(id=1).delete()

    # delete all data
    # Word.objects.all().delete()

    return HttpResponse("<p>delete success</p>")
