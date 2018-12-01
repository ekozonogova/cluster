#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Nov 27 19:38:22 2018

@author: dan
"""
import re
from utilites import dump, load
from rutermextract import TermExtractor as TE                       
te = TE()

res = {}
subres = {}
for line in [ a.strip('\n') for a in load('specs.json'):
    try:
        m = re.match(r'[А-Я]+', line)
        if m.group() == line.split()[0]:
            name = line.capitalize().strip()
            try:
                res.update({oldname:subres})
                oldname = name
            except NameError:
                oldname = name
            subres = {}
        else:
            a = [ str(a) for a in te(line) ]
#            nname = ' и '.join(a[:2]).capitalize()
            nname = line.capitalize().strip()
            subres.update({nname:a})
    except AttributeError:
        pass
  
  
dump(object=res, filename='specs.json')