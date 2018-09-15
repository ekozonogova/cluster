import numpy as np
from json import dumps

def form_matrix(dict_data):
	for k in dict_data.keys():
		for i in range(0,len(dict_data[k])):
			pass
	print(dumps(dict_data, ensure_ascii = 0, indent = 2))