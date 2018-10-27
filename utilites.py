from sys import stderr
from json import  load as jload
from numpy import load as nload
from json import  dump as jdump
from numpy import save as ndump
from nltk.tokenize import WordPunctTokenizer

from constants import MIN_WEIGHT

def load(filename):
    filetype = filename.split('.')[-1]
    try:
        rez = None
        print('Loading %s ...' % filename, end = '', file = stderr)
        if filetype == 'json':
            rez = jload(open(filename))
        elif filetype == 'dat':
            rez = nload(open(filename, 'rb'))
        print(' done', file = stderr)
        return rez
    except Exception as e:
        print(' error! %s' % e, file = stderr)
        raise e
    
def dump(object, filename):
    filetype = filename.split('.')[-1]
    print('Saving %s ...' % filename, end = '', file = stderr)
    if filetype == 'json':
        jdump(object, open(filename, 'w'), indent = 2, ensure_ascii = 1)
    elif filetype == 'dat':
        ndump(open(filename, 'wb'), object)
    print('done', file = stderr)

"""
LM - матрица связей
WM - матрица весов
CL - список кластеров
idx - имена нод
"""
def graph(LM, WM, CL, idx, filename, subgraphs = False):
    wpt = WordPunctTokenizer()
    f = open(filename, 'w')
    f.write('digraph a {\n')
    n = 0
    if subgraphs:
        for cl in CL:
            n += 1
            f.write('\tsubgraph cluster_%s {\n' % n)
#            f.write('\t\tcolor=lightgrey; style=filled;\n')
            for x in cl:
                f.write('\t"%s";\n' % wrap(wpt, x))
            f.write('\t};\n')
    else:
        for cl in CL:
            n += 1
            for x in cl:
                f.write('\t"%s" [cluster="%s"];\n' % (wrap(wpt, x), n))
    for i in range(len(LM)):
        for j in range(len(LM[i])):
            if i != j and LM[i,j] > 0 and WM[i,j] > MIN_WEIGHT:
                a = wrap(wpt, idx[str(i)])
                b = wrap(wpt, idx[str(j)])
                c = int(WM[i,j] * 100)
                d = abs(int(WM[i,j] * 10))
                if d == 0: d = 1
                out = '\t"%s" -> "%s" [label="%s", penwidth="%s"];\n' % (a, b, c, d)
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

def wrap(a, b):
    return b

#def wrap(wpt, _str = "очень длинная строка,с пробелами, и знаками препинания"):
#    _len = 0
#    rez = ""
#    for token in join(wpt.tokenize(_str)):
#        _len += len(token)
#        rez += " " + token
#        if _len > 20:
#            rez += "\n"
#            _len = 0
#    return rez.strip()

if __name__ == '__main__':
    try:
        print(load('x.dat'))
        print(load('x.json'))
    except:
        x = {1:2,2:3}
        dump(x, 'x.json')
        from numpy import array
        x = array([1,2,3])
        dump(x, 'x.dat')
        print(load('x'))
        