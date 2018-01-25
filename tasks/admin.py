from django.contrib import admin
from django.contrib.flatpages.models import FlatPage
from django.contrib.flatpages.admin import FlatPageAdmin
from django import forms
from django.db import models

from ckeditor.widgets import CKEditorWidget

from .models import Post, Category, Author


class CategoryAdmin(admin.ModelAdmin):
    search_fields = ('title', 'slug')


class PostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = Post
        fields = "__all__"


class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm


class FlatPageCustom(FlatPageAdmin):
    formfield_overrides = {
        models.TextField: {'widget': CKEditorWidget}
    }


admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Author)
admin.site.unregister(FlatPage)
admin.site.register(FlatPage, FlatPageCustom)
