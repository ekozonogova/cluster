from utilites import load 
from numpy import savetxt
def make_clusters(A,B,LV,index):
    print(A, B)
    rez = []
    return rez
    
    
if __name__ == '__main__':
    A   = load('A.dat')
    B   = load('B.dat')
    LV  = load('LV.dat')
    idx = load('index.json')
    make_clusters(A, B, LV, idx)
    