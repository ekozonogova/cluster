#!/bin/bash

BG=/tmp/bg.png

n=0

ls *dot | { while read fname
do
    region=$( echo "$fname" | awk -F '.' '{print($2)}' | tr '_' ' ')
    echo $region
    [[ $region == "g" ]] && region='Российская Федерация'
    neato "$fname" -Tpng > /tmp/graph.png
    convert /tmp/graph.png -scale "1400x800" "/tmp/cropped.$n.png"
    convert -composite -gravity center $BG "/tmp/cropped.$n.png" "/tmp/page.$n.png" 
    convert -size 1600x40 xc:white -font helvetica -fill black -pointsize 20 -draw "text 20,25 '$region'" /tmp/title.png
    convert -composite -gravity NorthWest "/tmp/page.$n.png" /tmp/title.png "/tmp/page.$n.png"
    n=$((n+1))
done
convert $( seq -f "/tmp/page.%g.png" 0 $((n-1)) ) "out.pdf"
}