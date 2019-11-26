/**
 * Created by sanya on 17.03.16.
 */
;

$settings = new Settings();

colors = {
    "c0": {}
};

default_colors = {
    "RU-TUL": "#ffffff",
    "RU-KRS": "#ffffff",
    "RU-BEL": "#ffffff",
    "RU-PNZ": "#ffffff",
    "RU-ORL": "#ffffff",
    "RU-LEN": "#ffffff",
    "RU-BRY": "#ffffff",
    "RU-LIP": "#ffffff",
    "RU-MO": "#ffffff",
    "RU-SMO": "#ffffff",
    "RU-TAM": "#ffffff",
    "RU-ORE": "#ffffff",
    "RU-SAR": "#ffffff",
    "RU-ME": "#ffffff",
    "RU-ULY": "#ffffff",
    "RU-RYA": "#ffffff",
    "RU-UD": "#ffffff",
    "RU-KGN": "#ffffff",
    "RU-ALT": "#ffffff",
    "RU-AST": "#ffffff",
    "RU-KIR": "#ffffff",
    "RU-KOS": "#ffffff",
    "RU-KLU": "#ffffff",
    "RU-TVE": "#ffffff",
    "RU-VOR": "#ffffff",
    "RU-STA": "#ffffff",
    "RU-VLA": "#ffffff",
    "RU-KEM": "#ffffff",
    "RU-NGR": "#ffffff",
    "RU-OMS": "#ffffff",
    "RU-KO": "#ffffff",
    "RU-VGG": "#ffffff",
    "RU-KK": "#ffffff",
    "RU-SE": "#ffffff",
    "RU-KB": "#ffffff",
    "RU-IRK": "#ffffff",
    "RU-MUR": "#ffffff",
    "RU-BU": "#ffffff",
    "RU-PSK": "#ffffff",
    "RU-IVA": "#ffffff",
    "RU-PER": "#ffffff",
    "RU-ROS": "#ffffff",
    "RU-YAR": "#ffffff",
    "RU-AMU": "#ffffff",
    "RU-VLG": "#ffffff",
    "RU-ARK": "#ffffff",
    "RU-BA": "#ffffff",
    "RU-NIZ": "#ffffff",
    "RU-AD": "#ffffff",
    "RU-PRI": "#ffffff",
    "RU-TOM": "#ffffff",
    "RU-CHE": "#ffffff",
    "RU-KR": "#ffffff",
    "RU-TYU": "#ffffff",
    "RU-ZAB": "#ffffff",
    "RU-KYA": "#ffffff",
    "RU-SA": "#ffffff",
    "RU-KHM": "#ffffff",
    "RU-DA": "#ffffff",
    "RU-KC": "#ffffff",
    "RU-CU": "#ffffff",
    "RU-KDA": "#ffffff",
    "RU-KGD": "#ffffff",
    "RU-SAM": "#ffffff",
    "RU-KL": "#ffffff",
    "RU-KAM": "#ffffff",
    "RU-YEV": "#ffffff",
    "RU-AL": "#ffffff",
    "RU-KHA": "#ffffff",
    "RU-SAK": "#ffffff",
    "RU-SVE": "#ffffff",
    "RU-TA": "#ffffff",
    "RU-TY": "#ffffff",
    "RU-NVS": "#ffffff",
    "RU-KRY": "#ffffff",
    "RU-MAG": "#ffffff",
    "RU-IN": "#ffffff",
    "RU-SEV": "#ffffff",
    "RU-CE": "#ffffff",
    "RU-YAN": "#ffffff",
    "RU-MOS": "#ffffff",
    "RU-CHU": "#ffffff",
    "RU-NEN": "#ffffff",
    "RU-SPE": "#ffffff",
    "RU-MOW": "#ffffff"
};

function Region(code, name){
    this.code = code;
    this.name = name;
}

function compare(a, b) {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}

function BenchViewModel() {

    var self = this;
    self.waiter = new Waiter();
    self.settings = ko.observable({});
    self.availableRegions = ko.observableArray();
    self.selectedRegion = ko.observable();
    self.identicalRegionsVal = ko.observable(5);
    self.identicalRegions = ko.observableArray();
    self.getRegions = function() {
        self.waiter.show();
        $.get($settings.urls.availableRegionsList).then(function (resp) {
            resp = JSON.parse(resp);
            for (key in resp) {
                self.availableRegions.push(new Region(resp[key],key));
            }
            console.log(self.availableRegions());
        }).done(function () {
            self.availableRegions.sort(compare);
        }).always(function() {
            $settings.isConfigured(true);
            self.settings($settings);
            self.waiter.hide();
        });
    };
    self.getRegions();

    self.selectedRegion.isValid = ko.computed(function() {
        var e = self.selectedRegion();
        return !!e && typeof e !== "undefined"
        && e.length !== 0 && self.identicalRegionsVal() > 0 && self.identicalRegionsVal() < 51;
    });

    self.initPainting = function() {
        // var color = newVal["color"];
        // console.log(color);
        console.log(colors["c0"]);
        loadBordersAndPaint(colors["c0"]);
    };

    self.getIdenticalRegions = function() {
        self.waiter.show();
        $.get($settings.urls.identicalRegionsList + self.selectedRegion().name).then(function (resp) {
            region = JSON.parse(resp);
            var chosen_length = self.identicalRegionsVal();
            colors["c0"] = {}
            colors["c0"][self.selectedRegion().code] = "#ff0000";
            for (var i = 0; i < chosen_length; i++) {
                var c = parseInt(255 - (i+1) * 200/chosen_length).toString(16);
                if (c.length < 2) {
                    c = "0" + c;
                }
                colors["c0"][region.neighbors[i][0]] = "#ff0000" + c;
            }
        }).done(function() {
            self.initPainting();
        }).always(function() {
            $settings.isConfigured(true);
            self.settings($settings);
        });
    };
}

BVM = new BenchViewModel();
ko.applyBindings(BVM);

ymaps.ready(init);
var myMap, placemark;

// allCompanies = [];

// function companyExists(companyName) {
//     for (var i = 0; i < allCompanies.length; i++) {
//         if(allCompanies[i].name == companyName) {
//             return true;
//         }
//     }
//     return false;
// }

// var coord1 = [57.999544, 56.301705];
// var coord2 = [58.068200, 56.344613];

// function getPointData(i) {
// 	return {
// 	    balloonContentHeader: '<h7>' + allCompanies[i].name + '</h7>',
// 	    balloonContentBody: '<p>Информация о компании: </p><p>' + allCompanies[i].name + '</p><p>' + allCompanies[i].address + '</p><p>' + allCompanies[i].phone + '</p><p>' + allCompanies[i].url + '</p>',
// 	    clusterCaption: ' <strong>' + allCompanies[i].name + '</strong>'
// 	}
// };

// function updateCompaniesOnMap() {
// 	clusterer.removeAll();

// 	geoObjects = [];

// 	for (var i = 0; i < allCompanies.length; i++) {
// 		geoObjects[i] = new ymaps.Placemark([allCompanies[i].lat, allCompanies[i].lon], getPointData(i)
// 		// { 
// 			// hintContent: allCompanies[i].name,
// 			// balloonContent: allCompanies[i].name + ' ' + allCompanies[i].address + ' ' + allCompanies[i].phone + ' ' + allCompanies[i].url,
// 		// }
// 		, {
//             preset: 'islands#violetIcon'
//         });
//     };

// 	clusterer.add(geoObjects);
// 	myMap.geoObjects.add(clusterer);
// }

function init() { 

	objectManager = new ymaps.ObjectManager();

    myMap = new ymaps.Map("gmap", {
        center: [57.999544, 56.301705],
        zoom: 3
    });


 //    clusterer = new ymaps.Clusterer({
 //    	preset: 'islands#invertedVioletClusterIcons',
 //    	groupByCoordinates: false,
 //    	clusterDisableClickZoom: true,
 //    	// clusterOpenBalloonOnClick: false,
 //    	clusterHideIconOnBalloonOpen: false,
 //    	geoObjectHideIconOnBalloonOpen: false
	// });

 //    updateCompaniesOnMap();
	/**
	 * Спозиционируем карту так, чтобы на ней были видны все объекты.
	 */

	// myMap.setBounds(clusterer.getBounds(), {
	//     checkZoomRange: true
	// });

    // addCompaniesToMap(allCompanies);
    // loadBordersAndPaint(colors[]);
}

function loadBordersAndPaint(colors) {
	/* Colors is an array with region:colorToPaint */
    // Загрузим регионы.
    ymaps.borders.load('RU', {
        lang: 'ru',
        quality: 2
    }).then(function (result) {
        // Создадим объект regions, где ключи это ISO код региона.
        var regions = result.features.reduce(function (acc, feature) {
            // Добавим ISO код региона в качестве feature.id для objectManager.
            var iso = feature.properties.iso3166;
            feature.id = iso;
            // Добавим опции региона по умолчанию.
            feature.options = {
                fillOpacity: 1,
                strokeColor: '#000',
                strokeOpacity: 0.5
            };
            acc[iso] = feature;
            return acc;
        }, {});

        // Функция, которая раскрашивает регион.
        function paint(iso) {
            var region = regions[iso];
            region.options.fillColor = colors[iso];
        };

        function setDefaultColors() {
            var count = 0;
            for (var iso in regions) {
	        	regions[iso].options.fillColor = "#ffffff";
                count += 1;
	        }
            console.log(count);
	        result.features = [];

	        for (var reg in regions) {
	            result.features.push(regions[reg]);
	        }
	        console.log("Setting default colors");
	        objectManager.removeAll();
	        objectManager.add(result);
	        myMap.geoObjects.add(objectManager);
        }
        setDefaultColors();

        // for (var i = 0; i < result.features.length; i++) {
        //     paint(result.features[i].properties.iso3166, 1);
        // }

    	for (var iso in colors) {
        	for (var i = 0; i < result.features.length; i++) {
        		if (result.features[i].properties.iso3166 == iso) {
        			// console.log(result.features[i]);
        			paint(iso);
        		}
        	}
        }
        // Добавим регионы на карту.
        result.features = [];

        for (var reg in regions) {
        	// console.log(reg);
            result.features.push(regions[reg]);
        }
        console.log(result);
        objectManager.add(result);
        myMap.geoObjects.add(objectManager);
        BVM.waiter.hide();
    });
};

// function addCompaniesToMap(allCompanies) {
// 	if (Array.isArray(allCompanies) == false) {
// 		return;
// 	}
// 	for (var i = 0; i < allCompanies.length; i++) {
// 		placemark = new ymaps.Placemark([allCompanies[i].lat, allCompanies[i].lon], { hintContent: allCompanies[i].name, balloonContent: allCompanies[i].address + '' + allCompanies[i].phone });
//     	myMap.geoObjects.add(placemark);
//     	// $('html, body').animate({
// 	    //     scrollTop: $("#gmap").offset().top - 300
// 	    // }, 500);
// 	}
// }

function Company(name, address, lat, lon, phone, url) {
	this.name = name;
	this.address = address;
	this.lat = lat;
	this.lon = lon;
	this.phone = phone;
	this.url = url;
}

// function switchPlacemarks(placemark_coords) {
// 	var zoom = 18;
// 	myMap.setCenter(placemark_coords);
// 	myMap.setZoom(zoom);
// 	placemark = new ymaps.Placemark(placemark_coords, { hintContent: 'Автозапчасти', balloonContent: 'Ускоритель' });
//     myMap.geoObjects.add(placemark);
//     $('html, body').animate({
//         scrollTop: $("#gmap").offset().top - 300
//     }, 500);
// }
//саша молодец как соленый огурец!


function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + encodeURIComponent(value) + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function all(a) {
	if (Array.isArray(a) == false) return false;
	if (a.length < 1) return false;
	for (var i = 0; i < a.length; i++) {
		if (typeof a[i] == "undefined") { // | a[i] == 0
			return false;
		}
	}
	return true;
}

function scroll(url)
{
	var url = window.location.hash; // вычисляем текущий якорь
	if (url) {
		var position_block = $(url).offset().top - 100; // получаем значение на сколько он далеко от вверха страницы
		$('body,html').animate({scrollTop: position_block}, 800); // опускаемся до нущного блока со скоростью 800
	}
	return false;
}	
// UVM.waiter.show();

Date.prototype.toUserString = function () {
	var strDate = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
	return strDate;
};

// TODO: jQuery extending example
jQuery.expr.filters.onscreen = function(el) { // only by height !
  var rect = el.getBoundingClientRect();
  return (rect.bottom > 100) && (rect.top > -rect.height && rect.top < window.innerHeight);
};

$(document).ready(function() {
	// $('#select-profile').attr('size', '1');
    // UVM.waiter.hide();

	String.prototype.includes = function(symbol) {
        var includes = false;
        for (var i = 0; i < this.length; i++) {
            if (this[i] == symbol) {
                includes = true;
            } 
        }
        return includes;
    };

    // $('#select-spec').on('change', function(val) {
    // 	clusterer.removeAll();
    // 	// loadBordersAndPaint(val["color"]);
    // });

  //   String.prototype.includesString = function(string) {
		// var includes = false;
  //       for (var i = 0; i < this.length; i++) {
  //       	for (var j = 0; j < string.length; j++) {
  //       		if (this[i] == ) {
	 //                includes = true;
	 //            } 
  //       	}
  //       }
  //       return includes;
  //   };

    String.prototype.startsWith = function(substr) {
    	var startsWith = false;
    	for (var i = 0; i < substr.length; i++) {
    		if(this[i] === substr[i]) {
    			startsWith = true;
    		} else {
    			startsWith = false;
    			break;
    		}
    	}
    	return startsWith;
    };

	if (window.location.href.includes('?query=')) {

	}

	$(document).on("scroll", function() {

	});

	$(window).resize(function() {

	});

	$(".fit-width").on("click", function(elem, event) {

	});
});