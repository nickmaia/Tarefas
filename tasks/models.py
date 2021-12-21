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