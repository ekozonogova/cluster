import json
from utilites import compare, dump

reg = json.load(open('/Users/sanya/Work/cluster/clusters_web/clusters_core/matrix_regions_distances.json', 'r'))
r_data = json.load(open('/Users/sanya/Work/cluster/data/regions.json'))
codes = {}
for r in r_data:
	try:
		neighbors = reg[r_data[r]["emissname"]]
		key = r_data[r]["emissname"]
	except KeyError:
		try:
			neighbors = reg[r_data[r]["yandexname"]]
			key = r_data[r]["yandexname"]
		except KeyError:
			key = [x for x in reg.keys() if compare(x, r_data[r]["emissname"]) >= 0.65][0]
			neighbors = reg[key]
	codes.update({key: r_data[r]["code"]})

res = {}
# print(codes)
for r in r_data:
	# print(r)
	try:
		neighbors = reg[r_data[r]["emissname"]]
		print(neighbors)
		key = r
	except KeyError:
		try:
			neighbors = reg[r_data[r]["yandexname"]]
			key = r_data[r]["yandexname"]
		except KeyError:
			key = [x for x in reg.keys() if compare(x, r_data[r]["emissname"]) >= 0.65][0]
			neighbors = reg[key]
	code_neighbors = []
	for n in neighbors:
		code_neighbors += [(codes[n], neighbors[n])]
	res.update({
		key: {
			"neighbors": sorted(code_neighbors, key=lambda x: x[1]),
			"code": r_data[r]["code"]
		}
	})

dump(res, 'r_data.json', 1)