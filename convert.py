#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Nov 27 19:38:22 2018

@author: dan
"""
from json import dump, load
res = []
x = load(open('specs.json', 'r'))

for key1 in x:
    subres = []
    for key2 in x[key1]:
        subres += [{"name": key2, "values": x[key1][key2]}]
    res += [{"name": key1, "values": subres}]
  
dump(obj=res, fp=open('specs2.json', 'w'), indent=4, ensure_ascii=False)