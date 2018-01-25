from argparse import ArgumentParser

from django.contrib.auth.models import User


parser = ArgumentParser(description="Create super user")

parser.add_argument('--user')
parser.add_argument('--password')
parser.add_argument('--email')
args = parser.parse_args()

user = User.objects.filter(email='info@powerpiper.com')

if user.count() == 0:
    User.objects.create_superuser(args.user, args.email, args.password)
