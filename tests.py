#!/usr/bin/env python
from os import environ
from os.path import join
import sys
from subprocess import Popen, TimeoutExpired

import django
from django.test.utils import get_runner
from django.conf import settings


def process_output(proc):
    """
    Communicates with process.
    """
    try:
        outs, errs = proc.communicate(timeout=240)
    except TimeoutExpired:
        proc.kill()
        outs, errs = proc.communicate()
    return outs, errs


if __name__ == "__main__":
    environ['DJANGO_SETTINGS_MODULE'] = "backend.settings"

    f = open(join(settings.BASE_DIR, "logs", "django.log"), "w+")
    f.close()
    django.setup()

    #proc = Popen("chown -R www-data:www-data .")
    #outs, errs = process_output(proc=proc)
    #sys.exit(bool(errs))

    TestRunner = get_runner(settings)
    test_runner = TestRunner()
    failures = test_runner.run_tests(["tests"])
    sys.exit(bool(failures))
