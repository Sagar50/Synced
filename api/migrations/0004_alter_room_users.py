# Generated by Django 4.2.3 on 2023-07-21 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_room_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='users',
            field=models.JSONField(default=list, verbose_name={'items': {'properties': {'name': {'type': 'string'}}, 'type': 'object'}, 'type': 'array'}),
        ),
    ]
