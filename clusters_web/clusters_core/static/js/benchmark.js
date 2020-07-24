/**
 * Created by sanya on 17.03.16.
 */
;

$settings = new Settings();

colors = {
    "c0": {}
};

region_links = {
"Пермский край":    "https://www.permkrai.ru/government/activity/strategiya-razvitiya-kraya/",
"Белгородская область": "https://belregion.ru/region/priorities/",
"Брянская область": "http://www.bryanskobl.ru/economy-strategy-2025",
"Владимирская область": "https://econom.avo.ru/strategia",
"Воронежская область":  "https://econom.govvrn.ru/its/strategiya-sotsialno-ekonomicheskogo-razvitiya",
"Ивановская область":   "http://derit.ivanovoobl.ru/deyatelnost/strategicheskoe-planirovanie/strategiya-sotsialno-ekonomicheskogo-razvitiya/",
"Калужская область":    "http://admoblkaluga.ru/sub/econom/strategy/",
"Костромская область":  "https://adm44.ru/news/2017/12/0889de4c-b271-4d54-818f-577aa8f56e2e.aspx",
"Курская область":  "http://adm.rkursk.ru/index.php?id=1747",
"Липецкая область": "https://admlip.ru/activities/docs/dokumenty-strategicheskogo-planirovaniya-lipetskoy-oblasti/",
"Московская область":   "https://mosreg.ru/dokumenty/normotvorchestvo/prinyato-pravitelstvom/postanovleniya-pmo/23-01-2019-11-11-05-postanovlenie-pravitelstva-moskovskoy-oblasti-ot",
"Орловская область":    "https://orel-region.ru/index.php?head=6&part=73&unit=291&op=8&in=119&dop=156",
"Рязанская область":    "https://www.ryazangov.ru/ryazan/socio_economic/dev_strategy/",
"Смоленская область":   "https://admin-smolensk.ru/",
"Тамбовская область":   "https://www.tambov.gov.ru/strategiya-socialno-ekonomicheskogo-razvitiya-tambovskoj-oblasti-do-2035-goda.html",
"Тверская область": "https://www.region.tver.ru/",
"Тульская область": "https://econom.tularegion.ru/documents/?SECTION=2349",
"Ярославская область":  "https://www.yarregion.ru/depts/usp/tmpPages/docs.aspx",
"г. Москва":    "https://www.mos.ru/",
"Республика Карелия":   "http://old.gov.karelia.ru/Leader/Document/Strategy2020/8.html",
"Республика Коми":  "https://rkomi.ru/page/5948/",
"Архангельская область":    "https://dvinaland.ru/gov/iogv/asr/soc_econ/index.php",
"Ненецкий автономный округ":    "https://www.yanao.ru/documents/all/57256/",
"Вологодская область":  "https://vologda-oblast.ru/strategiya2030/strategiya/",
"Калининградская область":  "https://gov39.ru/ekonomy/strategiya.php",
"Ленинградская область":    "https://econ.lenobl.ru/ru/budget/planning/concept2030/",
"Мурманская область":   "https://minec.gov-murman.ru/activities/strat_plan/sub02/",
"Новгородская область": "https://www.novreg.ru/economy/strategy2030/strategy2030.php",
"Псковская область":    "http://economics.pskov.ru/strategicheskoe-planirovanie",
"г. Санкт-Петербург":   "https://www.gov.spb.ru/gov/otrasl/c_econom/strategiya-ser-2035/plan-meropriyatij-po-realizacii-strategii-2035/",
"Республика Адыгея":    "http://www.adygheya.ru/ministers/departments/ministerstvo-ekonomicheskogo-razvitiya-i-torgovli/strategiche/razrabot/",
"Республика Калмыкия":  "http://www.kalmregion.ru/dokumenty/",
"Краснодарский край":   "https://economy.krasnodar.ru/strategic-planning/the-strategy-of-development-of-krasnodar-region/",
"Астраханская область": "https://minec.astrobl.ru/ru/page/strategia-socialno-ekonomiceskogo-razvitia-do-2020-goda",
"Волгоградская область":    "http://www.volgograd.ru/",
"Ростовская область":   "https://www.donland.ru/activity/2158/",
"Республика Дагестан":  "http://minec-rd.ru/dagestan-2025",
"Республика Ингушетия": "http://ekonomri.ru/93/%D0%B4%D0%B5%D1%8F%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C/o%D1%82%D0%B4%D0%B5%D0%BB-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE-%D1%8D%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B3%D0%BE-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0-%D0%B8-%D0%BF%D1%80%D0%BE%D0%B3%D0%BD%D0%BE%D0%B7%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F/1542013824",
"Кабардино-Балкарская Республика":  "https://economy.kbr.ru/%d1%81%d1%82%d1%80%d0%b0%d1%82%d0%b5%d0%b3%d0%b8%d1%87%d0%b5%d1%81%d0%ba%d0%be%d0%b5-%d0%bf%d0%bb%d0%b0%d0%bd%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5/",
"Карачаево-Черкесская Республика":  "http://economykchr.ru/strategicheskoe-planirovanie-analiz-i-prognozirovanie/%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/370-strategiya-sotsialno-ekonomicheskogo-razvitiya-v-kchr-do-2035-goda",
"Республика Северная Осетия-Алания":    "http://economy.alania.gov.ru/activity/strategicplanning/strategy",
"Чеченская Республика": "http://economy-chr.ru/?p=100",
"Ставропольский край":  "http://www.stavinvest.ru/work/sub21/sub98",
"Республика Башкортостан":  "https://economy.bashkortostan.ru/dejatelnost/strategicheskoe-planirovanie/strategiya-razvitiya-respubliki-bashkortostan/strategiya-respubliki-bashkortostan-2030/",
"Республика Марий Эл":  "http://mari-el.gov.ru/strategy/Pages/development.aspx",
"Республика Мордовия":  "http://mineco.e-mordovia.ru/the-development-of-competition/the-strategic-and-program-documents-of-the-republic-of-mordovia/index.php",
"Республика Татарстан": "https://mert.tatarstan.ru/strategiya-sotsialno-ekonomicheskogo-razvitiya.htm",
"Удмуртская Республика":    "http://www.udmurt.ru/region/economic/plan_prognoz/strateg2025.php",
"Чувашская Республика": "http://minec.cap.ru/action/activity/soc-econom-razvitie/strategiya-socialjno-ekonomicheskogo-razvitiya-chu",
"Кировская область":    "https://www.kirovreg.ru/strategy/",
"Нижегородская область ":   "http://admgor.nnov.ru/Gorod/Napravleniya-raboty/Programmnoe-planirovanie",
"Оренбургская область": "http://www.orenburg-gov.ru/strateg/2030/",
"Пензенская область":   "http://pnzreg.ru/project-office/projects/strategiya-razvitiya-penzenskoy-oblasti-do-2035-goda-1/57883/",
"Самарская область":    "https://economy.samregion.ru/programmy/strategy_programm/proekt_strateg/",
"Саратовская область":  "http://saratov.gov.ru/gov/docs/ob-utverzhdenii-strategii-sotsialno-ekonomicheskogo-razvitiya-saratovskoy-oblasti-do-2030-goda/",
"Ульяновская область":  "https://ulgov.ru/page/index/permlink/id/15290/",
"Курганская область":   "https://kurganobl.ru/content/strategiya-2030-opredeleny-osnovnye-napravleniya-socialno-ekonomicheskogo-razvitiya",
"Свердловская область ":    "http://economy.midural.ru/content/strategiya-2030",
"Тюменская область":    "https://admtyumen.ru/ogv_ru/finance/economics/prognosis/more.htm?id=11316523@cmsArticle",
"Ханты-Мансийский автономный округ-Югра":   "https://depeconom.admhmao.ru/deyatelnost/sotsialno-ekonomicheskoe-razvitie/strategiya-sotsialno-ekonomicheskogo-razvitiya-okruga/strategiya-2030/",
"Ямало-Ненецкий автономный округ":  "https://www.yanao.ru/activity/2234/",
"Челябинская область":  "http://udg74.ru/strategiya-socialno-ekonomicheskogo-razvitiya-chelyabinskoy-oblasti-do-2020-goda",
"Республика Алтай": "https://www.altai-republic.ru/economy_finances/strategy-of-social-economic/",
"Республика Бурятия":   "https://egov-buryatia.ru/minec/activities/directions/strategicheskoe-upravlenie/strategicheskoe-planirovanie/strategiya-ser-rb/",
"Республика Тыва":  "http://gov.tuva.ru/content/2031/",
"Республика Хакасия":   "https://r-19.ru/authorities/ministry-of-economy-of-the-republic-of-khakassia/useful/strategii/strategiya-sotsialno-ekonomicheskogo-razvitiya-respubliki-khakasiya-do-2020-goda.html",
"Алтайский край":   "https://www.altairegion22.ru/territory/investic/strategiya-razvitiya-altayskogo-kraya-do-2025-goda/",
"Забайкальский край":   "http://xn--80aealotwbjpid2k.xn--80aaaac8algcbgbck3fl0q.xn--p1ai/action/programs/strategiya-socialno-ekonomicheskogo-razvitiya-zabaykalskogo-kraya/",
"Красноярский край":    "http://www.krskstate.ru/2030/plan",
"Иркутская область":    "https://irkobl.ru/region/economy/strategy/",
"Кемеровская область":  "https://ako.ru/deyatelnost/strategicheskoe-planirovanie-kemerovskoy-oblasti-.php",
"Новосибирская область ":   "https://www.nso.ru/page/2412",
"Омская область":   "http://www.xn----7sbbd6bjcpe0ahm4k8a.xn--p1ai/ru/government/strategy2025.html",
"Томская область":  "https://tomsk.gov.ru/ctrategija-sotsialno-ekonomicheskogo-razvitija",
"Республика Саха (Якутия)": "https://mineconomic.sakha.gov.ru/news/front/view/id/2975912",
"Камчатский край":  "https://www.kamgov.ru/strategiceskoe-planirovanie",
"Приморский край":  "https://primorsky.ru/authorities/executive-agencies/departments/economics/development/strategy/pk-25.php",
"Хабаровский край ":    "https://www.khabkrai.ru/officially/Gosudarstvennye-programmy/Dokumenty-strategicheskogo-planirovaniya",
"Амурская область": "https://www.amurobl.ru/pages/ekonomika/ecnomoka-strategicheskoe-planirovanie-i-prognozirovanie-sotsialno-ekonomicheskogo-razvitiya-oblasti/plan-meropriyatiy-po-realizatsii-strategii-sotsialno-ekonomicheskogo-razvitiya-amurskoy-oblasti-na-p/",
"Магаданская область":  "https://economy.49gov.ru/activities/progress/planning/",
"Сахалинская область":  "https://sakhalin.gov.ru/index.php?id=139",
"Еврейская автономная область": "http://www.eao.ru/o-eao/sotsialno-ekonomicheskoe-razvitie-eao-/strategiya-sotsialno-ekonomicheskogo-razvitiya-eao-do-2020-goda--2/",
"Чукотский автономный округ":   "https://invest-chukotka.ru/investpolitika/investiczionnaya-strategiya",
"Республика Крым":  "https://rk.gov.ru/document/show/2018_05_30_16_32_zakon_respubliki_krym_ot_30_maia_2018_goda_502_zrk_2018_o_vnesenii_izmenenii_v_zakon_respubliki_krym_o_strategii_sotsialno_ekonomiche",
"г. Севастополь":   "https://sevzakon.ru/view/laws/strategiya_ser/"
}

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
    self.showRegionLegend = ko.observable(false);
    self.selectedRegionImgSrc = ko.observable('');
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
        && e.length !== 0 && self.identicalRegionsVal() > 0 && self.identicalRegionsVal() < 85;
    });

    self.selectedRegion.subscribe(function (newVal) {
        if (newVal) {
            var img = '/static/images/region_values/'+ newVal.name +'.png';
            console.log(img);
            self.selectedRegionImgSrc(img);
            self.showRegionLegend(true);
        };
    });

    self.selectedRegionLink = ko.computed(function () {
        // console.log(region_links);
        // console.log(self.selectedRegion());
        if (self.selectedRegion()) {
            return region_links[self.selectedRegion().name];
        }
    });

    self.collapseRegionLegend = function () {
        self.showRegionLegend(false);
    };

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
                colors["c0"][region.neighbors[i][0]] = "#00ff00" + c;
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
            // regions[reg].events.add('click', function (event) {
            //     var region = event.get('target');
            //     region.options.set({fillOpacity: 1});
            // });
            result.features.push(regions[reg]);
            console.log(regions[reg]);
        };
        // myMap.events.add('click', function (e) {        

        // });
        console.log(result);
        objectManager.add(result);
        myMap.geoObjects.add(objectManager);
        // objectManager.events.add('click', function(e) {
            // console.log(e.get('target'));
        // });
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