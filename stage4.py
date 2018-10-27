from numpy import savetxt, poly1d
from scipy import polyfit, linspace
from json import dumps
import matplotlib.pyplot as plt
from sympy import diff, symbols

from utilites import load 
from constants import MIN_WEIGHT

def make_clusters(A,B,LV,index):
    CL = {}
    for i in range(len(LV)):
        y = []
        for j in range(len(LV)):
            w = LV[i,j]
            if w > MIN_WEIGHT and i != j:
                y += [(i,j,w)]
        y = sorted(y, key = lambda x: x[2])
        y.reverse()

        x = linspace(0, len(y), len(y))
        y = [ _[2] for _ in y ]
        f = poly1d(polyfit(x,y,5))
        x1 = symbols('x')
        f1 = [ eval(str(diff(f(x1), x1, 1))) for x in x ]
        f2 = [ eval(str(diff(f(x1), x1, 2))) for x in x ]
        n = 0
        print(f1, f2)
#        for _ in [ eval(str(f1)) for x in x ]:
#            if abs(_) < 0.0002:
#                break
#            n += 1
        if y[0] > 0.7:
            CL.update({i:x[0:n]})
#            CL.update({i:x})
    print(dumps(CL, indent=2, ensure_ascii = 1))
    rez = {}
    clustered = []
    for i in CL.keys():
        i_name = index[str(i)]
        cnt = []
        for j in range(len(CL[i])):
            try:
                j_name = index[str(CL[i][j][1])]
            except IndexError:
                print(CL, i, j)
            if j_name not in clustered:
                cnt += [j_name]
                clustered += [j_name]
        rez.update({i_name:cnt})
            
    return rez
    
    
if __name__ == '__main__':
    A   = load('A.dat')
    B   = load('B.dat')
    LV  = load('LV.dat')
    idx = load('index.json')
    print(make_clusters(A, B, LV, idx))
    