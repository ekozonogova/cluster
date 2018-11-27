/**
 * Created by sanya on 17.03.16.
 */

;


var data = [
"Обработка металлов",
"Трубы и элементы трубопроводные соединительные",
"Услуги по ковке, прессованию, штамповке и профилированию листового металла; услуги по производству изделий методом порошковой металлургии",
"Инструмент, ножевые изделия и универсальные скобяные изделия; металлоизделия готовые прочие",
"Конструкции строительные металлические (металлоконструкции)",
"Продукция первичной обработки черных металлов прочая",
"Станки",
"Услуги литейного производства",
"Оборудование осветительное и лампы электрические",
"Резервуары, цистерны и аналогичные емкости из металлов; радиаторы и котлы центрального отопления",
"Оборудование специального назначения прочее",
"Двигатели, генераторы, трансформаторы и преобразователи электрические",
"Оборудование механическое, кроме авиационных, ракетных, автомобильных и мотоциклетных двигателей",
"Автотранспортные средства, прицепы и полуприцепы",
"Аппаратура распределительная и регулирующая электрическая",
"Железо, чугун, сталь и ферросплавы",
"Изделия полимерные",
"Материалы лакокрасочные и аналогичные для нанесения покрытий, краски и мастики полиграфические",
"Глицерин; мыло и моющие средства, средства чистящие и полирующие, средства парфюмерные и косметические",
"Пестициды и прочие агрохимические продукты",
"Волокна и нити химические",
"Стекло и изделия из стекла",
"Продукты химические прочие (без взрывчатых веществ)",
"Изделия резиновые",
"Вещества химические основные",
"Разные промышленные изделия, не включенные в другие группировки",
"Препараты фармацевтические, продукты медицинские химические и продукты лекарственные растительные",
"Продукты молочные и мороженое",
"Мясо, продукты мясные и прочая продукция переработки животных",
"Рыба и прочая продукция рыболовства и рыбоводства; услуги, связанные с рыболовством и рыбоводством",
"Рыба и продукты рыбные переработанные и консервированные",
"Культуры сельскохозяйственные, продукция овощеводства и садоводства",
"Продукция мукомольно-крупяного производства, крахмалы и крахмалопродукты",
"Масла и жиры животные и растительные",
"Изделия табачные",
"Корма готовые для животных",
"Животные живые и продукты животного происхождения",
"Фрукты, овощи и картофель переработанные и консервированные",
"Культуры сельскохозяйственные, продукция овощеводства и садоводства",
"Напитки",
"Продукция горнодобывающих производств прочая",
"Руды железные",
"Руды цветных металлов, кроме урановых и ториевых руд",
"Руды урановые и ториевые",
"Тара деревянная",
"Изделия из дерева, изделия из пробки, соломки и материалов для плетения прочие",
"Листы для облицовки; фанера клееная, плиты многослойные столярные, плиты древесно-стружечные, плиты древесно-волокнистые, панели и плиты прочие",
"Конструкции деревянные строительные и изделия столярные",
"Лесоматериалы, продольно распиленные, строганые или пропитанные",
"Целлюлоза, бумага и картон",
"Продукция лесоводства, лесозаготовок и связанные с этим услуги",
"Мебель",
"Изделия из бумаги и картона",
"Книги, газеты и прочие материалы печатные и носители информации записанные",
"Провода и кабели изолированные",
"Металлы основные драгоценные и цветные прочие",
"Источники тока химические, их части, отходы и лом",
"Изделия ювелирные и изделия аналогичного типа",
"Электрооборудование, не включенное в другие группировки",
"Изделия из бетона, гипса и цемента",
"Цемент, известь и гипс",
"Изделия керамические неогнеупорные нестроительные; огнеупоры",
"Плиты и плитки керамические",
"Кирпичи, черепица и изделия строительные из обожженной глины",
"Камень декоративный и строительный разрезанный, обработанный и отделанный и изделия из него; продукция минеральная неметаллическая прочая",
"Одежда прочая и аксессуары ",
"Меха; меховые изделия",
"Текстиль",
"Одежда из кожи",
"Чемоданы, дамские сумки и аналогичные изделия; шорно-седельные изделия и упряжь",
"Обувь",
"Кожа",
"Газ природный в газообразном или сжиженном состоянии, включая услуги по сжижению и регазификации природного газа для транспортирования",
"Нефть, включая нефть, получаемую из битуминозных минералов; сланцы горючие (битуминозные) и песчаники битуминозные",
"Услуги, связанные с добычей нефти и горючего природного газа, кроме геологоразведочных работ",
"Услуги транспортирования по трубопроводам",
"Нефтепродукты",
"Продукция коксовых печей",
"Уголь каменный и уголь бурый (лигнит); торф",
"Приборы и инструменты для измерения, контроля, испытаний, навигации, управления, регулирования; приборы оптические, фото- и кинооборудование; часы",
"Суда, летательные и космические аппараты, прочие транспортные средства и оборудование",
"Компоненты электронные; аппаратура для радио, телевидения и связи",
"Вычислительная техника и прочее оборудование для обработки информации",
"Офисное оборудование и его части",
"Оборудование для сельского и лесного хозяйства",
"Программные продукты и услуги, связанные с использованием вычислительной техники и информационных технологий",
"Изделия медицинские, включая хирургическое оборудование, ортопедические приспособления"
];

var _colors0 = {
	'RU-ALT': '#F0F075',
	'RU-AMU': '#F0F075',
	'RU-ARK': '#FB6C3F',
	'RU-AST': '#3D4C76',
	'RU-BEL': '#3D4C76',
	'RU-BRY': '#3D4C76',
	'RU-VLA': '#FB6C3F',
	'RU-VGG': '#F0F075',
	'RU-VLG': '#F0F075',
	'RU-VOR': '#FB6C3F',
	'RU-YEV': '#F0F075',
	'RU-ZAB': '#F0F075',
	'RU-IVA': '#F0F075',
	'RU-IRK': '#FB6C3F',
	'RU-KB': '#3D4C76',
	'RU-KGD': '#3D4C76',
	'RU-KLU': '#FB6C3F',
	'RU-KAM': '#3D4C76',
	'RU-KC': '#F0F075',
	'RU-KEM': '#F0F075',
	'RU-KIR': '#F0F075',
	'RU-KOS': '#F0F075',
	'RU-KDA': '#F0F075',
	'RU-KYA': '#3D4C76',
	'RU-KGN': '#F0F075',
	'RU-KRS': '#F0F075',
	'RU-LEN': '#F0F075',
	'RU-LIP': '#F0F075',
	'RU-MAG': '#3D4C76',
	'RU-MOS': '#FB6C3F',
	'RU-MUR': '#3D4C76',
	'RU-NIZ': '#FB6C3F',
	'RU-NGR': '#F0F075',
	'RU-NVS': '#FB6C3F',
	'RU-OMS': '#FB6C3F',
	'RU-ORE': '#F0F075',
	'RU-ORL': '#F0F075',
	'RU-PNZ': '#FB6C3F',
	'RU-PER': '#FB6C3F',
	'RU-PRI': '#FB6C3F',
	'RU-PSK': '#F0F075',
	'RU-AD': '#3D4C76',
	'RU-AL': '#3D4C76',
	'RU-BA': '#FB6C3F',
	'RU-BU': '#F0F075',
	'RU-DA': '#3D4C76',
	'RU-IN': '#F0F075',
	'RU-KL': '#3D4C76',
	'RU-KR': '#F0F075',
	'RU-KO': '#3D4C76',
	'RU-ME': '#F0F075',
	'RU-MO': '#F0F075',
	'RU-SA': '#3D4C76',
	'RU-SE': '#3D4C76',
	'RU-TA': '#FB6C3F',
	'RU-TY': '#3D4C76',
	'RU-KK': '#3D4C76',
	'RU-ROS': '#FB6C3F',
	'RU-RYA': '#FB6C3F',
	'RU-SAM': '#FB6C3F',
	'RU-SAR': '#FB6C3F',
	'RU-SAK': '#3D4C76',
	'RU-SVE': '#FB6C3F',
	'RU-SMO': '#3D4C76',
	'RU-STA': '#F0F075',
	'RU-TAM': '#FB6C3F',
	'RU-TVE': '#3D4C76',
	'RU-TOM': '#F0F075',
	'RU-TUL': '#F0F075',
	'RU-TYU': '#F0F075',
	'RU-UD': '#FB6C3F',
	'RU-ULY': '#FB6C3F',
	'RU-KHA': '#FB6C3F',
	'RU-CHE': '#FB6C3F',
	'RU-CE': '#3D4C76',
	'RU-CU': '#F0F075',
	'RU-CHU': '#3D4C76',
	'RU-YAR': '#FB6C3F',
	'RU-SPE': '#FB6C3F',
	'RU-MOW': '#FB6C3F',
	'RU-NEN': '#3D4C76',
	'RU-KHM': '#3D4C76',
	'RU-YAN': '#3D4C76',
	'RU-SEV': '#3D4C76',
	'RU-KRY': '#3D4C76'
}
var _colors1 = {
	'RU-ALT': '#F0F075',
	'RU-AMU': '#F0F075',
	'RU-ARK': '#FB6C3F',
	'RU-AST': '#3D4C76',
	'RU-BEL': '#3D4C76',
	'RU-BRY': '#3D4C76',
	'RU-VLA': '#FB6C3F',
	'RU-VGG': '#F0F075',
	'RU-VLG': '#F0F075',
	'RU-VOR': '#FB6C3F',
	'RU-YEV': '#F0F075',
	'RU-ZAB': '#F0F075',
	'RU-IVA': '#F0F075',
	'RU-IRK': '#FB6C3F',
	'RU-KB': '#3D4C76',
	'RU-KGD': '#3D4C76',
	'RU-KLU': '#FB6C3F',
	'RU-KAM': '#3D4C76',
	'RU-KC': '#F0F075',
	'RU-KEM': '#F0F075',
	'RU-KIR': '#F0F075',
	'RU-KOS': '#F0F075',
	'RU-KDA': '#F0F075',
	'RU-KYA': '#3D4C76',
	'RU-KGN': '#F0F075',
	'RU-KRS': '#F0F075',
	'RU-LEN': '#F0F075',
	'RU-LIP': '#F0F075',
	'RU-MAG': '#3D4C76',
	'RU-MOS': '#FB6C3F',
	'RU-MUR': '#3D4C76',
	'RU-NIZ': '#FB6C3F',
	'RU-NGR': '#F0F075',
	'RU-NVS': '#FB6C3F',
	'RU-OMS': '#FB6C3F',
	'RU-ORE': '#F0F075',
	'RU-ORL': '#F0F075',
	'RU-PNZ': '#FB6C3F',
	'RU-PER': '#FB6C3F',
	'RU-PRI': '#FB6C3F',
	'RU-PSK': '#F0F075',
	'RU-AD': '#3D4C76',
	'RU-AL': '#3D4C76',
	'RU-BA': '#FB6C3F',
	'RU-BU': '#F0F075',
	'RU-DA': '#3D4C76',
	'RU-IN': '#F0F075',
	'RU-KL': '#3D4C76',
	'RU-KR': '#F0F075',
	'RU-KO': '#3D4C76',
	'RU-ME': '#F0F075',
	'RU-MO': '#F0F075',
	'RU-SA': '#3D4C76',
	'RU-SE': '#3D4C76',
	'RU-TA': '#FB6C3F',
	'RU-TY': '#3D4C76',
	'RU-KK': '#3D4C76',
	'RU-ROS': '#FB6C3F',
	'RU-RYA': '#FB6C3F',
	'RU-SAM': '#FB6C3F',
	'RU-SAR': '#FB6C3F',
	'RU-SAK': '#3D4C76',
	'RU-SVE': '#FB6C3F',
	'RU-SMO': '#3D4C76',
	'RU-STA': '#F0F075',
	'RU-TAM': '#FB6C3F',
	'RU-TVE': '#3D4C76',
	'RU-TOM': '#F0F075',
	'RU-TUL': '#F0F075',
	'RU-TYU': '#F0F075',
	'RU-UD': '#FB6C3F',
	'RU-ULY': '#FB6C3F',
	'RU-KHA': '#FB6C3F',
	'RU-CHE': '#FB6C3F',
	'RU-CE': '#3D4C76',
	'RU-CU': '#F0F075',
	'RU-CHU': '#3D4C76',
	'RU-YAR': '#FB6C3F',
	'RU-SPE': '#FB6C3F',
	'RU-MOW': '#FB6C3F',
	'RU-NEN': '#3D4C76',
	'RU-KHM': '#3D4C76',
	'RU-YAN': '#3D4C76',
	'RU-SEV': '#3D4C76',
	'RU-KRY': '#3D4C76'
}
var _colors2 = {
	'RU-ALT': '#F0F075',
	'RU-AMU': '#F0F075',
	'RU-ARK': '#FB6C3F',
	'RU-AST': '#3D4C76',
	'RU-BEL': '#3D4C76',
	'RU-BRY': '#3D4C76',
	'RU-VLA': '#FB6C3F',
	'RU-VGG': '#F0F075',
	'RU-VLG': '#F0F075',
	'RU-VOR': '#FB6C3F',
	'RU-YEV': '#F0F075',
	'RU-ZAB': '#F0F075',
	'RU-IVA': '#F0F075',
	'RU-IRK': '#FB6C3F',
	'RU-KB': '#3D4C76',
	'RU-KGD': '#3D4C76',
	'RU-KLU': '#FB6C3F',
	'RU-KAM': '#3D4C76',
	'RU-KC': '#F0F075',
	'RU-KEM': '#F0F075',
	'RU-KIR': '#F0F075',
	'RU-KOS': '#F0F075',
	'RU-KDA': '#F0F075',
	'RU-KYA': '#3D4C76',
	'RU-KGN': '#F0F075',
	'RU-KRS': '#F0F075',
	'RU-LEN': '#F0F075',
	'RU-LIP': '#F0F075',
	'RU-MAG': '#3D4C76',
	'RU-MOS': '#FB6C3F',
	'RU-MUR': '#3D4C76',
	'RU-NIZ': '#FB6C3F',
	'RU-NGR': '#F0F075',
	'RU-NVS': '#FB6C3F',
	'RU-OMS': '#FB6C3F',
	'RU-ORE': '#F0F075',
	'RU-ORL': '#F0F075',
	'RU-PNZ': '#FB6C3F',
	'RU-PER': '#FB6C3F',
	'RU-PRI': '#FB6C3F',
	'RU-PSK': '#F0F075',
	'RU-AD': '#3D4C76',
	'RU-AL': '#3D4C76',
	'RU-BA': '#FB6C3F',
	'RU-BU': '#F0F075',
	'RU-DA': '#3D4C76',
	'RU-IN': '#F0F075',
	'RU-KL': '#3D4C76',
	'RU-KR': '#F0F075',
	'RU-KO': '#3D4C76',
	'RU-ME': '#F0F075',
	'RU-MO': '#F0F075',
	'RU-SA': '#3D4C76',
	'RU-SE': '#3D4C76',
	'RU-TA': '#FB6C3F',
	'RU-TY': '#3D4C76',
	'RU-KK': '#3D4C76',
	'RU-ROS': '#FB6C3F',
	'RU-RYA': '#FB6C3F',
	'RU-SAM': '#FB6C3F',
	'RU-SAR': '#FB6C3F',
	'RU-SAK': '#3D4C76',
	'RU-SVE': '#FB6C3F',
	'RU-SMO': '#3D4C76',
	'RU-STA': '#F0F075',
	'RU-TAM': '#FB6C3F',
	'RU-TVE': '#3D4C76',
	'RU-TOM': '#F0F075',
	'RU-TUL': '#F0F075',
	'RU-TYU': '#F0F075',
	'RU-UD': '#FB6C3F',
	'RU-ULY': '#FB6C3F',
	'RU-KHA': '#FB6C3F',
	'RU-CHE': '#FB6C3F',
	'RU-CE': '#3D4C76',
	'RU-CU': '#F0F075',
	'RU-CHU': '#3D4C76',
	'RU-YAR': '#FB6C3F',
	'RU-SPE': '#FB6C3F',
	'RU-MOW': '#FB6C3F',
	'RU-NEN': '#3D4C76',
	'RU-KHM': '#3D4C76',
	'RU-YAN': '#3D4C76',
	'RU-SEV': '#3D4C76',
	'RU-KRY': '#3D4C76'
}

ymaps.ready(init);
var myMap, placemark;

var companies = [];

// var coord1 = [57.999544, 56.301705];
// var coord2 = [58.068200, 56.344613];

function init() { 

	$(document).on("click", "input#repaint1", function() {
		loadBordersAndPaint(_colors1);
	});
	$(document).on("click", "input#repaint2", function() {
		loadBordersAndPaint(_colors2);
	});

	objectManager = new ymaps.ObjectManager();

    myMap = new ymaps.Map("gmap", {
        center: [57.999544, 56.301705],
        zoom: 3
    });
    clusterer = new ymaps.Clusterer({
    	preset: 'islands#invertedVioletClusterIcons',
    	groupByCoordinates: false,
    	clusterDisableClickZoom: true,
    	clusterHideIconOnBalloonOpen: false,
    	geoObjectHideIconOnBalloonOpen: false
	});
    // getPointData = function (index) {
    //     return {
    //         balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
    //         balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
    //         balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
    //         clusterCaption: 'метка <strong>' + index + '</strong>'
    //     };
    // };
	geoObjects = [];

	for (var i = 0; i < companies.length; i++) {
		geoObjects[i] = new ymaps.Placemark([companies[i].lat, companies[i].lon], { 
			hintContent: companies[i].name,
			balloonContent: companies[i].address + '' + companies[i].phone 
		}, {
            preset: 'islands#violetIcon'
        });
    };

	// for(var i = 0; i < points.length; i++) {
	//     geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
	// }

	/**
	 * Можно менять опции кластеризатора после создания.
	 */
	// clusterer.options.set({
	//     gridSize: 80,
	//     clusterDisableClickZoom: true
	// });

	/**
	 * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
	 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
	 */
	clusterer.add(geoObjects);
	myMap.geoObjects.add(clusterer);

	/**
	 * Спозиционируем карту так, чтобы на ней были видны все объекты.
	 */

	// myMap.setBounds(clusterer.getBounds(), {
	//     checkZoomRange: true
	// });

    // addCompaniesToMap(companies);
    loadBordersAndPaint(_colors0);
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
                fillOpacity: 0.6,
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
        }

        function unpaint(iso) {
        	var region = regions[iso];
        	delete region.options.fillColor;
        }

        function setDefaultColors() {
            for (var iso in colors) {
	        	for (var i = 0; i < result.features.length; i++) {
	        		if (result.features[i].properties.iso3166 == iso) {
	        			// console.log(result.features[i]);
	        			unpaint(iso);
	        		}
	        	}
	        }
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
    });
};

function addCompaniesToMap(companies) {
	if (Array.isArray(companies) == false) {
		return;
	}
	for (var i = 0; i < companies.length; i++) {
		placemark = new ymaps.Placemark([companies[i].lat, companies[i].lon], { hintContent: companies[i].name, balloonContent: companies[i].address + '' + companies[i].phone });
    	myMap.geoObjects.add(placemark);
    	// $('html, body').animate({
	    //     scrollTop: $("#gmap").offset().top - 300
	    // }, 500);
	}
}

function Company(name, address, lat, lon, phone) {
	this.name = name;
	this.address = address;
	this.lat = lat;
	this.lon = lon;
	this.phone = phone;
}

function getCompaniesForTest() {
	var key = "f9134045-4f6b-4b1e-bdd8-10582c026780";
	var query = "?apikey=" + key + "&type=biz&lang=ru_RU&results=50&text=" + encodeURIComponent(data[0]);
	$.get("https://search-maps.yandex.ru/v1/" + query, function(resp, status){
		// console.log(resp);
		for (var i = 0; i < resp.features.length; i++) {
			var companyMeta = resp.features[i].properties.CompanyMetaData;
			companies.push(new Company(companyMeta.name, companyMeta.address, resp.features[i].geometry.coordinates[1], resp.features[i].geometry.coordinates[0], companyMeta.Phones[0].formatted));
		}
		// console.log(companies);
    });
}
getCompaniesForTest();

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
	
UVM = new ViewModel();
ko.applyBindings(UVM);
// UVM.waiter.show();

Date.prototype.toUserString = function () {
	var strDate = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
	return strDate;
};

function replaceHeaderLogoWithLink() {
	var logoElem = $("#mainNav").find('#header-logo').children('a#full');
	var mobileElem = $("#mainNav").find('#header-logo').children('a#mobile');
	if (window.innerWidth < 768) {
		$(logoElem).css('display', 'none');
		$(mobileElem).css('display', 'block');
		$("#mainNav").find('#header-logo').css('margin-top', '10px');
	} else {
		$("#mainNav").find('#header-logo').css('margin-top', '0');
		$(mobileElem).css('display', 'none');
		$(logoElem).css('display', 'block');
	}
}

function deactivateCatNavLinks() {
	$("#categories-list").find("a").each(function() {
		$(this).css("font-weight", 400);
		$(this).css("background", "#fff");
	});
}

// TODO: jQuery extending example
jQuery.expr.filters.onscreen = function(el) { // only by height !
  var rect = el.getBoundingClientRect();
  return (rect.bottom > 100) && (rect.top > -rect.height && rect.top < window.innerHeight);
};

$(document).ready(function() {

	// String.prototype.includes = function(symbol) {
 //        var includes = false;
 //        for (var i = 0; i < this.length; i++) {
 //            if (this[i] == symbol) {
 //                includes = true;
 //            } 
 //        }
 //        return includes;
 //    };

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
  //   }
  	// $('#slider1').slick();
 //  	$('#slider1').slick({
	//   slidesToShow: 1,
	//   slidesToScroll: 1,
	//   arrows: false,
	//   fade: true,
	//   asNavFor: '#slider1-nav'
	// });
	// $('#slider1-nav').slick({
	//   slidesToShow: 3,
	//   slidesToScroll: 1,
	//   asNavFor: '#slider1',
	//   dots: true,
	//   centerMode: true,
	//   focusOnSelect: true
	// });

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

	if(window.location.hash.length > 0 && window.location.hash === "#feedback_form") {
		// $(document).ajaxComplete(function() {
		// 	$(document).scrollTop($(document).innerHeight());			
		// });
		scroll('#feedback_form');
	}
	if (window.location.href.includes('?query=')) {
		var query = decodeURIComponent(window.location.search.split('?query=')[1]);

		UVM.userQuery(query);
		UVM.getSearchResults();
	}
	replaceHeaderLogoWithLink();
	$('#cat-nav').affix({
	  offset: {
	    top: 470
	  }
	});

	$(document).on("scroll", function() {
		if ($(window).scrollTop() > 575 & $(window).innerWidth() > 760) {
			$("#categories-menu").css('position', 'fixed');
			$("#categories-menu").css('width', '20%');
			$("#categories-menu").css('top', '20px');
		} else {
			$("#categories-menu").css('position', '');
			$("#categories-menu").css('width', '');
			$("#categories-menu").css('top', '');
		}
	});

	$(document).on("click", ".cat-scroll", function() {
		var href = $(this).children("a").attr("href");
		deactivateCatNavLinks();
		$('body').animate({
			scrollTop: $(href).offset().top - $("#cat-nav").outerHeight()
		}, 500);
		$(this).children("a").css("font-weight", 600);
	});

	$(window).resize(function() {
		replaceHeaderLogoWithLink();
		// (window.innerWidth);
	});

	$(".fit-width").on("click", function(elem, event) {
		console.log(this);
	});
});

$(function() {
        
  $('.list-group-item').on('click', function() {
    $('.glyphicon', this)
      .toggleClass('glyphicon-chevron-right')
      .toggleClass('glyphicon-chevron-down');
  });

});