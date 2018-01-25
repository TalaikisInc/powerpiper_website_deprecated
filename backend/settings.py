from os.path import dirname, join, isfile
from os import environ
import logging

from psycopg2 import extensions
from dotenv import load_dotenv


BASE_DIR = dirname(dirname(__file__))
ENV = join(BASE_DIR, '.env')

if isfile(ENV):
    load_dotenv(ENV)
else:
    load_dotenv(join(BASE_DIR, '.env.sample'))

SECRET_KEY = environ.get("SECRET_KEY")
assert isinstance(SECRET_KEY, str), "Check environment variables!"

DEBUG = int(environ.get("DEV"))

ALLOWED_HOSTS = ["127.0.0.1", "localhost", "admin.powerpiper.com"]

SITE_ID = 1

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'ckeditor',
    'ckeditor_uploader',
    'django.contrib.flatpages',
    'tasks'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
        'OPTIONS': {
            'debug':  DEBUG,
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASE_USER = environ.get("DATABASE_USER")
DATABASE_PASSWORD = environ.get("DATABASE_PASSWORD")
DATABASE_NAME = environ.get("DATABASE_NAME")
DATABASE_HOST = environ.get("DATABASE_HOST")
DATABASE_PORT = int(environ.get("DATABASE_PORT"))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',

        'NAME': DATABASE_NAME,
        'USER': DATABASE_USER,
        'PASSWORD': DATABASE_PASSWORD,
        'HOST': DATABASE_HOST,
        'PORT': DATABASE_PORT,
        'ATOMIC_REQUESTS': True,
        'OPTIONS': {
            'isolation_level': extensions.ISOLATION_LEVEL_SERIALIZABLE,
            'sslmode': 'disable',
        },
    },
}

AUTH_USER_MODEL = 'tasks.Author'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = False

USE_L10N = False

USE_TZ = False

STATIC_URL = "/static/"
STATIC_ROOT = join(BASE_DIR, "static")
MEDIA_URL = "/"
MEDIA_ROOT = join(BASE_DIR, "uploads")

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'mail_admins': {
        'class': 'django.utils.log.AdminEmailHandler',
        'level': 'ERROR',
        'include_html': True,
    },
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': join(BASE_DIR, 'logs', 'django.log'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}

CKEDITOR_JQUERY_URL = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"
CKEDITOR_IMAGE_BACKEND = "pillow"
CKEDITOR_UPLOAD_SLUGIFY_FILENAME = True
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_ALLOW_NONIMAGE_FILES = False

CKEDITOR_CONFIGS = {
    'default': {
        'skin': 'moono',
        'toolbar_Custom': [
            {'name': 'basic', 'items': [
                'Styles','Format','Font','FontSize' '-', 'Bold', 'Italic', 'Underline', 'Superscript',
                'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Table',
                'Link', 'Unlink', 'SpellChecker', 'Image',
                'RemoveFormat', 'Source', 'CodeSnippet'
            ]}
        ],
        'codeSnippet_theme': 'railscasts',
         'codeSnippet_languages': {
             'python': 'Python',
             'javascript': 'JavaScript',
             'golang': 'Golang',
             'sql': 'SQL',
         },
        'toolbar': 'Custom',
        'extraPlugins': ','.join(
            [
                'codesnippet',
            ]),
    }
}
