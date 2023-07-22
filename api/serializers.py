from rest_framework import serializers
from .models import Room
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'code', 'host', 'guest_can_pause', 'guest_can_add_music', 'votes_to_skip', 'created_at', 'users')
        model = Room

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('guest_can_pause', 'guest_can_add_music', 'votes_to_skip', 'users')
        model = Room

class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    class Meta:
        fields = ('guest_can_pause', 'guest_can_add_music', 'votes_to_skip', 'users', 'code')
        model = Room