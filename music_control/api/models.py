from django.db import models
import random
import string

GENRE_CHOICES = (
    ('rock','rock'),
    ('pop', 'pop'),
    ('jazz','jazz'),
    ('classic','classic'),
    ('folk','folk'),
)


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_letters, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

  
# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default = generate_unique_code, unique = True)
    host = models.CharField(max_length=50, default = '', unique = True)
    genre = models.CharField(max_length=50, choices=GENRE_CHOICES, null=True, default = '') 
    description = models.CharField(max_length=250, default = '')
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    