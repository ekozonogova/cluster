import sys
import requests

r = requests.get(f'?reg={urlencode(sys.argv[1])})
