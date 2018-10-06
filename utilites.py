from json import load as l
from json import dump as d
from sys import stderr
from nltk.tokenize import WordPunctTokenizer

def load(filename):
    ext = filename.split('.')[1]
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

def graph(LM, WM, idx, filename):
    
    wpt = WordPunctTokenizer()
    f = open(filename, 'w')
    f.write('digraph a {\n')
    for i in range(len(LM)):
        for j in range(len(LM[i])):
            if i != j and LM[i,j] != 0:
                a = wrap(wpt, idx[i])
                b = wrap(wpt, idx[j])
                c = int(WM[i,j] * 100)
                d = int(c / 10)
                out = '\t"%s" -> "%s" [weight="%s", penwidth="%s"];\n' % (a, b, c, d)
                f.write(out)
    f.write('}\n')
    f.close()
                
def join(tokens = ['очень', 'длинная', 'строка', ',', 'с', 'пробелами', ',', 'и', 'знаками', 'препинания']):
    PUNKT = list(".,:;-")
    rez = []
    for i in range(len(tokens)):
        token = tokens[i]
        if token in PUNKT:
            rez[-1] += token
        else:
            rez += [token]
    return rez

def wrap(wpt, _str = "очень длинная строка,с пробелами, и знаками препинания"):
    _len = 0
    rez = ""
    for token in join(wpt.tokenize(_str)):
        _len += len(token)
        rez += " " + token
        if _len > 20:
            rez += "\n"
            _len = 0
    return rez.strip()

if __name__ == '__main__':
    print(wrap())
    try:
        print(load('x'))
    except:
        x = {1:2,2:3}
        dump(x, 'x')
        print(load('x'))
        