# Generated by Django 2.0.2 on 2018-03-19 22:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('waiter', '0002_auto_20180319_2246'),
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Menu',
        ),
        migrations.DeleteModel(
            name='Seating',
        ),
    ]
