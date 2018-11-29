from django.db import models

# Create your models here.
class Word(models.Model):
    user = models.CharField(max_length=20)
    word = models.CharField(max_length=100)
    time = models.DateTimeField( auto_now_add=True)
