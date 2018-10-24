from numpy import savetxt

from utilites import load 
from constants import MIN_WEIGHT

def make_clusters(A,B,LV,index):
    CL = {}
    for i in range(len(LV)):
        x = []
        for j in range(len(LV)):
            w = LV[i,j]
            if w > MIN_WEIGHT and i != j:
                x += [(i,j,w)]
        x = sorted(x, key = lambda x: x[2])
        x.reverse()
        if x[0][2] > 0.7:
            CL.update({i:x[0:2]})
    rez = {}
    clustered = []
    for i in CL.keys():
        i_name = index[str(i)]
        cnt = []
        for j in range(len(CL[i])):
            j_name = index[str(CL[i][j][1])]
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
    