# Generated by Django 2.0.2 on 2018-03-05 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0006_auto_20180227_2153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='image',
            field=models.BooleanField(default=False),
        ),
    ]