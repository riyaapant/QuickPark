# Generated by Django 5.0.6 on 2024-06-16 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0003_alter_parkinglocation_lat_alter_parkinglocation_lon'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='reservation',
            field=models.BooleanField(default=False),
        ),
    ]