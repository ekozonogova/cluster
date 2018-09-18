from json import load as l
from json import dump as d
from sys import stderr

def load(filename):
    try:
        print('Loading %s ...' % filename, end = '', file = stderr)
        rez = l(open(filename))
        print(' done', file = stderr)
        return rez
    except Exception as e:
        print(' error! %s' % e, file = stderr)
        raise e
    
def dump(object, filename):
    print('Saving %s ...' % filename, end = '', file = stderr)
    d(object, open(filename, 'w'), ensure_ascii = 0, indent = 2)
    print('done', file = stderr)

if __name__ == '__main__':
    try:
        print(load('x'))
    except:
        x = {1:2,2:3}
        dump(x, 'x')
        print(load('x'))
        