from rest_framework import serializers
from .models import Translation



class TarnslationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Translation
        fields = '__all__'

    def create(self, validated_data):
        return Translation.objects.create(**validated_data)
