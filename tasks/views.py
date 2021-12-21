from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.serializers import TaskSerializer
from .models import Task
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser


@csrf_exempt
def task_list(request):
    """
    List all transformers, or create a new transformer
    """
    if request.method == 'GET':
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)
        return JsonResponse(serializer.data, safe=False)


"""
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
"""