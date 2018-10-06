import numpy as np

sample5x5 = np.array([
[ 0,	45,	 40,	  2,	133],
[12,	 0,	  3,	 19,	  1],
[71,	74,	  0,	 46,	  0],
[98,	20,	202,	  0,	123],
[80,	12,	 74,	102,	  0],
])

def get_ZeroDiag(X):
    Z = np.ones(np.shape(X))
    for i in range(len(Z)):
        Z[i,i] = 0
    return X * Z
    
def get_AftLinks(X):
    rez = np.zeros(np.shape(X))
    for i in range(len(rez)):
        for j in range(len(rez)):
            m = max(X[i])
            s = sum(X[i])
            rez[i,j] = 1 if (X[i,j] == m) and (m > 0.15 * s) else 0
            
    return rez
    
def get_PreLinks(X):
    X90 = np.rot90(X, k = 3)
    rez = np.zeros(np.shape(X))
    for i in range(len(rez)):
        for j in range(len(rez)):
            m = max(X90[j])
            s = sum(X90[j])
            rez[i,j] = 1 if (X[i,j] == m) and (m > 0.15 * s) else 0
            
    return rez
        
def get_ImpLinks(A, B):
    return A + B

if __name__ == '__main__':
    A = get_AftLinks(sample5x5)
    B = get_PreLinks(sample5x5)
    X = get_ImpLinks(A, B)
    print(A)
    print(B)
    print(X)
    