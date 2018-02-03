from django.core.management.base import BaseCommand
from customer.models import Menu
import json


class Command(BaseCommand):
    help = 'Clears and repopulates the Menu table with a sample menu.'

    with open("samplemenu.json") as menu_file:
        sample_menu = json.load(menu_file)

    def handle(self, *args, **options):
        print("Deleting all entries in Menu table...")
        Menu.objects.all().delete()
        print("Deleted.")
        for item in self.sample_menu:
            print("Adding %s (%s)..." % (item[0], item[3]))
            Menu(
                name=item[0],
                price=item[1],
                description=item[2],
                course=item[3],
                category=item[4],
            ).save()
        print("Sample menu added.")