from numpy import savetxt, poly1d
from scipy import polyfit, linspace
from json import dumps
import matplotlib.pyplot as plt
from sympy import diff, symbols

from utilites import load 
from constants import MIN_WEIGHT

def filter_clusters(cluster_dict):
    rez = {}
    for key in cluster_dict:
        x = [key]
        x += cluster_dict[key]
        x = tuple(sorted(x))
        rez.update({x:1})
    rex = []
    for r in rez:
        if 1 or len(r) > 1:
            rex += [r]
    return rex
        

def make_clusters(A,B,LV,index):
    from pprint import PrettyPrinter
    CL = {}
    for i in range(len(LV)):
        y = []
        for j in range(len(LV)):
            w = LV[i,j]
            if w > MIN_WEIGHT and i != j:
                y += [(i,j,w)]
        y = sorted(y, key = lambda x: x[2])
        y.reverse()
        n = 0
        for i, j, v in y:
            if v < y[0][2] / 1.5:
                break
            n += 1
        if y[0][2] > 0.7:
            CL.update({i:y[0:n]})
#            CL.update({i:x})

    CLL = []
    for i in CL:
        CLL += [CL[i]]
#    PrettyPrinter().pprint(CLL)
    CLL = sorted(CLL, key = lambda x: x[0][2] )
    CLL.reverse()
    rez = {}
    clustered = []
    n = 0
    for i in range(len(CLL)):
        i_name = index[str(CLL[i][0][0])]
        if i_name not in clustered:
            clustered += [i_name]
            cnt = []
            for j in range(len(CLL[i])):
                j_name = index[str(CLL[i][j][1])]
                if j_name not in clustered:
                    cnt += [j_name]
                    clustered += [j_name]
            rez.update({i_name:cnt})
    cnt = []
    for i in index:
        if index[i] not in clustered:
            cnt += [index[i]]
        try:
            rez.update({'empty':cnt})
        except IndexError:
            pass
            
    return rez
    
    
if __name__ == '__main__':
    A   = load('A.dat')
    B   = load('B.dat')
    LV  = load('LV.dat')
    idx = load('index.json')
    print(dumps(filter_clusters(make_clusters(A, B, LV, idx)), indent=2, ensure_ascii=0))
#    print(dumps(make_clusters(A, B, LV, idx), indent=2, ensure_ascii=0))
    