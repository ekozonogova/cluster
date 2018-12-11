#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Nov 27 19:38:22 2018

@author: dan
"""
from utilites import dump, load
res = []
x = load('specs.json')

for key1 in x:
	subres = []
	colors = {}
	n = 0
	for c in load('region_colors.json'):
		if c["name"] == key1:
			color = 'c%s' % n
			break
		n += 1

	for key2 in x[key1]:
		subres += [{"name": key2, "values": x[key1][key2]}]

	res += [{"name": key1, "values": subres, "color": color}]
  
dump(object=res, filename='specs3.json')