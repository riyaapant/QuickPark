# Generated by Django 5.0.6 on 2024-06-16 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0002_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='reservation',
            field=models.BooleanField(default=False),
        ),
    ]