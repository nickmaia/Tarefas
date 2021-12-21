# Front-end

## Criar o react app:

    npx create-react-app nome
    cd nome
    yarn start

## Instalar axios:
        
    yarn add axios

## Instalar o Chakra ui:

    npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
    yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4

## Por no App js:
    import { ChakraProvider } from '@chakra-ui/react';
    function App() {
        return (
            <ChakraProvider>
                <seção do site />
            </ChakraProvider>
            );
            }

    export default App;

## Achando um template para fazermos nosso bloco de tarefas:
(https://chakra-templates.dev/page-sections/features)
    
### 1- Escolhendo um template e logo a seguir abra o codigo que fica ao lado de preview.
Tema escolhido: `Grid list with heading`
    
### 2- Se der problema [Module not found: Can't resolve '@chakra-ui/icons' in 'C:\Users\SeuNome \Desktop\Tarefas\tarefas\src\Components']

## Vamos utilizar o `react icons`: (https://react-icons.github.io/react-icons/)
```` bash
        Instalando: yarn add install react-icons
        Troca os Icons no seu codigo fonte utilizado do template.
````

# Backend

## Criar o ambiente virtual e ativar:
```` bash
    python -m venv env
    . env/scripts/activate

    desativar: deactivate
````    
## Ignorar env no .gitignore

## Instalar o Django:
```` bash
    pip install django
    pip install --upgrade pip           `Atualizar pip`
    pip install djangorestframework
    pip install pillow                  `Para imagem`
````
## Criar projeto:
```` bash
django-admin startproject backend .
````

## Testar:
```` bash
python manage.py runserver
````
## Criar app:
```` bash
python manage.py startapp tasks
````
## Incluir na pasta backend no arquivo `settings.py` em `INSTALLED_APPS` 'rest_framework' e 'tasks'
`tasks porque é o nome do nosso app criado no amb virtual.`

## Criar modelo dentro da pasta `tasks` em `models.py` e digitar um codigo, neste caso utilizei o seguinte:
```` bash
from django.db import models
# Create your models here.
class Task(models.Model):
    title = models.CharField('título', max_length=100, unique=True)
    description = models.TextField('descrição', null=True, blank=True)
    done = models.BooleanField()
    #photo = models.ImageField(upload_to='static/img', null=True, blank=True)
    class Meta:
        ordering = ('title', )
        verbose_name = "Tarefa"
        verbose_name_plural = "Tarefas"
    def __str__(self):
        return self.title
````

## Criar o `admin` no arquivo `admin.py` em `tasks`:
```` bash
from django.contrib import admin
from .models import Task
# Register your models here.
admin.site.register(Task)
````

## Fazer as migrations e executar as mesmas, em seguida criar o superuser. Para isso, no terminal:
```` bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
````
## Cria um arquivo chamado `serializers.py` em `tasks` e copia o codigo:
```` bash
from rest_framework.serializers import ModelSerializer
from .models import Task
class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'done')
````
## Em `views.py` na pasta `tasks`, colocar o codigo:
```` bash
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.serializers import TaskSerializer
from .models import Task
# Create your views here.
@api_view(['GET'])
def get_tasks(request):
    tasks_queryset = Task.objects.all()
    tasks_serializer = TaskSerializer(tasks_queryset, many=True)
    return Response(tasks_serializer.data)
````
## Criar arquivo `urls.py` em `tasks` e digitar o seguinte codigo:
```` bash
    from django.urls import path
    from .views import (get_tasks)
    urlpatterns = [
        path('', get_tasks, name="get_tasks"),
    ]
````
### Adicionar o codigo *** path('api/tasks/', include('tasks.urls')), *** em `urls.py` na pasta `backend` dentro de `urlpatterns`

# Conectando o Frontend e o Backend:

## Instalar:
```` bash
        pip install django-cors-headers                     *Instalar dentro do amb virtual*
````
## Incluir na pasta `backend` no arquivo `settings.py` em `INSTALLED_APPS` *** "corsheaders", ***

## Incluir na pasta `backend` no arquivo `settings.py`
```` bash
        CORS_ALLOWED_ORIGINS=["http://localhost:3000"]
````
## Incluir na pasta `backend` no arquivo `settings.py` em `MIDDLEWARE`
```` bash
        "corsheaders.middleware.CorsMiddleware",
````

## Incluir em `package.json`
```` bash
        "proxy": "http://127.0.0.1:8000",  ***
````
### No Frontend na pasta `Gridlistwithheading.js` em baixo de `export default function GridListWithHeading() {` colocar o seguinte codigo:
```` bash    
    import { useEffect, useState } from 'react';
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        async function loadTasks() {
            const response = await axios.get('api/tasks/');
            setTasks(response.data)
        }
        loadTasks()
    }, [])
````
### e no lugar de `features` colocar `tasks` e `feature` colocar `task`.
