import numpy as np

example3x3 = [
    [32, 	21, 	 8 ],
    [29, 	38, 	 1 ],
    [ 2, 	13, 	19 ],
]


# (
#  (B7-B10)*(C7-C10)+
#  (B8-B10)*(C8-C10)+
#  (B9-B10)*(C9-C10)
# )/SQRT(
#   SUMSQ((B7-B10);(B8-B10);(B9-B10))*
#   SUMSQ((C7-C10);(C8-C10);(C9-C10))
# )

def get_XY(nmpy_data):
    rezX = np.zeros(np.shape(nmpy_data))
    rezY = np.zeros(np.shape(nmpy_data))
    for i in range(len(nmpy_data)):
        for j in range(len(nmpy_data[i])):
            for k in range(len(nmpy_data)):
                rezX[i][j] += nmpy_data[k][j]
                rezY[i][j] += nmpy_data[i][k]
            rezX[i][j] = nmpy_data[i][j] / rezX[i][j]
            rezY[i][j] = nmpy_data[i][j] / rezY[i][j]
    return rezX, rezY
    
def get_r(matr):
    matr90 = np.rot90(matr, k = 3)
    rez = np.zeros(np.shape(matr))
    for i in range(len(rez)):
        for j in range(len(rez)):
            a, b, c = 0, 0, 0
            for k in range(len(matr)):
                a += (matr[k,j] - np.average(matr90[j]))*(matr[k,i] - np.average(matr90[i]))
                b += (matr[k,j] - np.average(matr90[j]))**2
                c += (matr[k,i] - np.average(matr90[i]))**2
            rez[i,j] = a / (b * c) ** 0.5
    return(rez)
        
def get_xy(matrX, matrY):
    matrX90 = np.rot90(matrX, k = 3)
    matrY90 = np.rot90(matrY, k = 3)
    rez = np.zeros(np.shape(matrX))
    for i in range(len(rez)):
        for j in range(len(rez)):
            a, b, c = 0, 0, 0
            for k in range(len(matrX)):
                a += (matrX[k,j] - np.average(matrX90[j]))*(matrY[k,i] - np.average(matrY90[i]))
                b += (matrX[k,j] - np.average(matrX90[j]))**2
                c += (matrY[k,i] - np.average(matrY90[i]))**2
            rez[j,i] = a / (b * c) ** 0.5
    return(rez)

def get_lv(*M):
    rez = np.zeros(np.shape(M[0]))
    for i in range(len(rez)):
        for j in range(len(rez)):
            rez[i,j] = max([0] + [ x[i,j] for x in M])
    return rez
        
if __name__ == '__main__':
    X, Y = get_XY(example3x3)
    XX = get_r(X)
    YY = get_r(Y)
    XY = get_xy(X, Y)
    YX = get_xy(Y, X)
    LV = get_lv(XX, YY, YX, XY)
    print(X,'\n',Y, '\n', XX,  '\n', YY,  '\n', XY,  '\n', YX, '\n', LV)