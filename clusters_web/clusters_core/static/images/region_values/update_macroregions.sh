#!/bin/zsh

# ACHTUNG !!! Exec from: /Users/sanya/Work/cluster/clusters_web/clusters_core/static/images/region_values
ls | cut -d '.' -f 1 | while read x
do
	curl -G -vvv "http://localhost:8000/m_region_members/" --data-urlencode "reg=\"$x\""
done