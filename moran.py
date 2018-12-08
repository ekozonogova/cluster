#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec  8 21:11:19 2018

@author: dan
"""

def calc_w_distance(IN = {}):
    n = int(len(IN.keys()) / 2)
    rez = np.zeros([n,n])
    regions = sorted([ r.split('<->')[0] for r in IN.keys() ])
    for i in range(n):
        for j in range(n):
            try:
                rez[i,j] = 1/IN["%s<->%s" % (regions[i], regions[j])]
            except KeyError:
                pass
    return rez
        
def calc_w_neighbors(IN = {}, DIST = {}):
    regions = sorted(IN.keys())
    n = len(IN.keys())
    NB = {}
    WS = {}
    for i in range(n):
        reg = IN[regions[i]]
        try:
            assert reg['yandexname'] == regions[i], 'Ошибка в сортировке регионов!'
        except:
            print('>%s<>%s' % (reg['yandexname'],regions[i]))
        try:
            neighbors = reg['neighbors']
            data_nb = []
            data_ds = []
            for neighbor in neighbors:
                data_nb += [regions.index(neighbor)]
                data_ds += [1]
            NB.update({i:data_nb})
            WS.update({i:data_ds})
        except KeyError as e:
#            print(IN[regions[i]])
            print(e)
    return {'neighbors':NB, 'weights':WS}

def calc_moran_neib_data(lq, neighbors, weights):
    w = W(neighbors, weights, id_order = sorted(neighbors.keys()))
    for cluster in lq[list(lq.keys())[0]].keys():
        out = open("%s.csv" % cluster, 'w')
        out.write("year, mi.I, mi.EI, mi.seI_norm, mi.z_norm, mi.p_norm\n")
        for year in [ str(_) for _ in range(2009, 2017) ]:
            data = []
            for region in lq.keys():
                try:
                    data += [lq[region][cluster][year]]
                except KeyError as e:
                    print(e)
                    data += [-1]
            data = np.array(data)
            mi = Moran(data, w)
            out.write("%s,%s,%s,%s,%s,%s\n" % (year, mi.I, mi.EI, mi.seI_norm, mi.z_norm, mi.p_norm))
        out.close()

def calc_moran_dist_data(lq, distances):
    from pysal import W, Moran
    regnames = sorted(set([ s.split('<->')[0] for s in distances.keys() ]))
    neighbors = {}
    weights   = {}
    f = open('/tmp/dist.csv','w')
    f.write("%s\n" % regnames)
    for i in range(len(regnames)):
        n_data, w_data = [], []
        for j in range(len(regnames)):
            if i != j:
                n_data += [j]
                try:
                    w = 1 / distances["%s<->%s" % (regnames[i], regnames[j])]
                except ZeroDivisionError:
                    w = 0
                w_data += [w]
                f.write("%s, " % w)
            else:
                f.write("%s, " % 0)
        f.write("\n")
        neighbors.update({str(i):n_data})
        weights.update({str(i):w_data})
    f.close()
    w = W(neighbors, weights, id_order = sorted(neighbors.keys()))
    for cluster in lq[list(lq.keys())[0]].keys():
        out = open("%s.dist.csv" % cluster, 'w')
        out.write("year, mi.I, mi.EI, mi.seI_norm, mi.z_norm, mi.p_norm\n")
        for year in [ str(_) for _ in range(2009, 2017) ]:
            data = []
            for region in lq.keys():
                try:
                    data += [lq[region][cluster][year]]
                except KeyError as e:
                    print(e)
                    data += [-1]
            data = np.array(data)
            mi = Moran(data, w)
            out.write("%s,%s,%s,%s,%s,%s\n" % (year, mi.I, mi.EI, mi.seI_norm, mi.z_norm, mi.p_norm))
        out.close()

def calc_local_moran_neib_data(lq, neighbors, weights):
    from pysal import W, Moran
    w = W(neighbors, weights, id_order = sorted(neighbors.keys()))
    for cluster in lq[list(lq.keys())[0]].keys():
        out = open("%s.csv" % cluster, 'w')
        out.write("year, mi.I, mi.EI, mi.seI_norm, mi.z_norm, mi.p_norm\n")
        for year in [ str(_) for _ in range(2009, 2017) ]:
            data = []
            for region in lq.keys():
                try:
                    data += [lq[region][cluster][year]]
                except KeyError as e:
                    print(e)
                    data += [-1]
            data = np.array(data)
            mi = Moran_Local(data, w)
            out.write("%s,%s,%s,%s,%s,%s\n" % (year, mi.I, mi.EI, mi.seI_norm, mi.z_norm, mi.p_norm))
        out.close()

def calc_local_moran_dist_data(lq, distances):
    from pysal import W, Moran
    regnames = sorted(set([ s.split('<->')[0] for s in distances.keys() ]))
    neighbors = {}
    weights   = {}
    for i in range(len(regnames)):
        n_data, w_data = [], []
        for j in range(len(regnames)):
            if i != j:
                n_data += [j]
                try:
                    w = 1 / distances["%s<->%s" % (regnames[i], regnames[j])]
                except ZeroDivisionError:
                    w = 0
                w_data += [w]
        neighbors.update({str(i):n_data})
        weights.update({str(i):w_data})
    w = W(neighbors, weights, id_order = sorted(neighbors.keys()))
    for cluster in lq[list(lq.keys())[0]].keys():
        out = open("%s.local.dist.csv" % cluster, 'w')
        out.write("region, Q\n")
        for year in [ str(_) for _ in [2016] ]:
            data = []
            for region in lq.keys():
                try:
                    data += [lq[region][cluster][year]]
                except KeyError as e:
                    print(e)
                    data += [-1]
            data = np.array(data)
            mi = Moran_Local(data, w, permutations = 0, geoda_quads=1)
            Q = mi.q
            for i in range(len(regnames)):
                if Q[i] in [1,4]:
                    LQ = lq[regnames[i]][cluster]['2016']
                    out.write("%s,%s, %s\n" % (regnames[i], Q[i], LQ))
        out.close()
