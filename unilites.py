from json import load as l
from json import dump as d

def load(filename):
    return l(open(filename))
    
def dump(object, filename):
    return d(object, open(filename, 'w'), ensure_ascii = 0, indent = 2)

if __name__ == '__main__':
    x = {1:2,2:3}
    dump(x, 'x')
    print(load('x'))