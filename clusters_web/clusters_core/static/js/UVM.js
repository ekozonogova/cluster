;

$settings = new Settings();

function ViewModel() {

	var self = this;
    self.waiter = new Waiter();
	self.customer = ko.observable({});
    self.customer.phone = ko.observable('');
    self.customer.email = ko.observable('');
    self.customer.firstName = ko.observable('');
    self.customer.lastName = ko.observable('');
    self.customer.address = ko.observable('');
    self.customer.lastLogin = ko.observable('');
    self.customer.isAuthenticated = ko.observable(false);
    self.customerVoted = ko.observable(false);
    self.customer.agreed = ko.observable(true);
    self.userQuery = ko.observable('');

    self.firstShow = ko.observable(true);
    
    self.settings = ko.observable({});

    self.feedbackText = ko.observable('');

    self.categoryTabHeading = ko.observable('Featured');

    self.customer.phone.isValid = ko.computed(function() {
        var p = self.customer.phone();
        return !!p && typeof p !== "undefined"
        && p.length !== 0 && p.length > 6 && p.match(/\D/i) == null;
    });
    self.customer.email.isValid = ko.computed(function() {
        var e = self.customer.email();
        return !!e && typeof e !== "undefined"
        // TODO: replace includes for IE !!
        && e.length !== 0 && e.includes("@");
    });
    self.feedbackText.isValid = ko.computed(function() {
        var e = self.feedbackText();
        return !!e && typeof e !== "undefined"
        && e.length !== 0 && e.length < 500 && e.length > 2;
    });

    self.customer.firstName.isValid = ko.computed(function() {
        var e = self.customer.firstName();
        return !!e && typeof e !== "undefined"
        && e.length !== 0 && e.length < 500 && e.length > 2;
    });
    self.customer.lastName.isValid = ko.computed(function() {
        var e = self.customer.lastName();
        return !!e && typeof e !== "undefined"
        && e.length !== 0 && e.length < 500 && e.length > 2;
    });

	self.updateSettings = function() {
        $.get($settings.urls.settings).then(function (resp) {
            console.log(resp);
            var fullName = '';
            if(resp["customer_email"]) {
                self.customer.email(resp["customer_email"]);
                self.customer.isAuthenticated(true);
                if (self.customer.isAuthenticated()) {

                }
            }
            if(resp["customer_phone"]) {
                // TODO: use this style all around the javascript code !!
                self.customer.phone(resp["customer_phone"]);
                if (self.customer.isAuthenticated()) {

                }
            }
            if(resp["first_name"]) {
                // TODO: use this style all around the javascript code !!
                self.customer.firstName(resp["first_name"]);
            }
            if(resp["last_name"]) {
                // TODO: use this style all around the javascript code !!
                self.customer.lastName(resp["last_name"]);
            }
            fullName = self.customer.firstName() + ' ' + self.customer.lastName();
            if(fullName.length > 0) {
                if (self.customer.isAuthenticated()) {

                }
            }
            if(resp["last_login"]) {
                // TODO: use this style all around the javascript code !!
                self.customer.lastLogin(resp["last_login"]);
            }
            if(resp["address"]) {
                // TODO: use this style all around the javascript code !!
                self.customer.address(resp["address"]);
            }

            if(resp.settings) {
        		if (!all([resp["settings"]["admin_email"], resp["settings"]["shop_email"], resp["settings"]["site_name"],
					resp["settings"]["c_site_name"], resp["settings"]["company_addresses"], resp["settings"]["company_phone"]
        			])) {
                    console.error("Check all required settings in site settings");
        		}
                $settings.addSetting("adminEmail", resp["settings"]["admin_email"]);
                $settings.addSetting("shopEmail", resp["settings"]["shop_email"]);
                $settings.addSetting("siteName", resp["settings"]["site_name"]);
                $settings.addSetting("cSiteName", resp["settings"]["c_site_name"]);
                $settings.addSetting("company_addresses", resp["settings"]["company_addresses"]);
                $settings.addSetting("company_phones", resp["settings"]["company_phones"]);
            }

            if(resp["settings"]["min_order_sum"]) {
                $settings.addSetting("minOrderSum", resp["settings"]["min_order_sum"]);
            }

            if (resp.status == 0) {

            } else {
                console.log("Error:" + resp.status);                    
            }
        }).always(function() {
            $settings.isConfigured(true);
            self.settings($settings);
            self.waiter.hide();
        });
    };

    self.updateSettings();

    self.availableSpecs = ko.observableArray(
        [
            {
                "values": [
                    {
                        "values": [
                            "обогащение железных руд",
                            "добыча железных руд"
                        ],
                        "name": "Добыча и обогащение железных руд"
                    },
                    {
                        "values": [
                            "добыча ториевой руды",
                            "добыча урановой руды"
                        ],
                        "name": "Добыча урановой и ториевой руд"
                    },
                    {
                        "values": [
                            "добыча руд"
                        ],
                        "name": "Добыча руд цветных металлов"
                    },
                    {
                        "values": [
                            "добыча прочих полезных ископаемых"
                        ],
                        "name": "Добыча прочих полезных ископаемых"
                    }
                ],
                "name": "Горнодобывающее производство"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство кирпича",
                            "производство черепицы"
                        ],
                        "name": "Производство кирпича, черепицы и прочих строительных изделий из обожженной глины"
                    },
                    {
                        "values": [
                            "производство цемента",
                            "производство извести",
                            "производство гипса"
                        ],
                        "name": "Производство цемента, извести и гипса"
                    },
                    {
                        "values": [
                            "производство абразивных изделий",
                            "производство неметаллических минеральных изделий"
                        ],
                        "name": "Производство абразивных и неметаллических минеральных изделий, не включенных в другие группировки"
                    },
                    {
                        "values": [
                            "производство керамических плит",
                            "производство керамических плиток"
                        ],
                        "name": "Производство керамических плит и плиток"
                    },
                    {
                        "values": [
                            "производство изделий из бетона",
                            "производство изделий из цемента",
                            "производство изделий из гипса"
                        ],
                        "name": "Производство изделий из бетона, цемента и гипса"
                    },
                    {
                        "values": [
                            "отделка камня",
                            "резка камня",
                            "обработка камня"
                        ],
                        "name": "Резка, обработка и отделка камня"
                    },
                    {
                        "values": [
                            "производство керамических изделий",
                            "производство фарфоровых изделий"
                        ],
                        "name": "Производство прочих фарфоровых и керамических изделий"
                    }
                ],
                "name": "Строительные материалы"
            },
            {
                "values": [
                    {
                        "values": [
                            "отделка кожи",
                            "крашение меха",
                            "дубление",
                            "выделка"
                        ],
                        "name": "Дубление и отделка кожи; выделка и крашение меха"
                    },
                    {
                        "values": [
                            "производство текстильных изделий"
                        ],
                        "name": "Производство текстильных изделий"
                    },
                    {
                        "values": [
                            "производство чемоданов из кожи",
                            "производство дамских сумок",
                            "производство шорно-седельных изделий из кожи"
                        ],
                        "name": "Произв-во чемоданов, дамских сумок и аналог. изделий из кожи и др. матер.; произв-во шорно-седельных и др. изделий из кожи"
                    },
                    {
                        "values": [
                            "производство меховых изделий"
                        ],
                        "name": "Производство меховых изделий"
                    },
                    {
                        "values": [
                            "производство одежды"
                        ],
                        "name": "Производство одежды, кроме одежды из меха"
                    },
                    {
                        "values": [
                            "производство одежды из кожи"
                        ],
                        "name": "Производство одежды из кожи"
                    }
                ],
                "name": "Легкая промышленность"
            },
            {
                "values": [],
                "name": "Специализация межрегионального кластера"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство готовых кормов",
                            "производство готовых кормов для животных"
                        ],
                        "name": "Производство готовых кормов для животных"
                    },
                    {
                        "values": [
                            "производство табачных изделий"
                        ],
                        "name": "Производство табачных изделий"
                    },
                    {
                        "values": [
                            "консервирование фруктов",
                            "консервирование овощей",
                            "переработка фруктов",
                            "переработка овощей"
                        ],
                        "name": "Переработка и консервирование фруктов и овощей"
                    },
                    {
                        "values": [
                            "производство напитков"
                        ],
                        "name": "Производство напитков"
                    },
                    {
                        "values": [
                            "выращивание однолетних культур"
                        ],
                        "name": "Выращивание однолетних культур"
                    },
                    {
                        "values": [
                            "животноводство"
                        ],
                        "name": "Животноводство"
                    }
                ],
                "name": "Пищевая промышленность"
            },
            {
                "values": [
                    {
                        "values": [
                            "добыча природного газа"
                        ],
                        "name": "Добыча природного газа"
                    },
                    {
                        "values": [
                            "предоставление услуг в области добычи нефти",
                            "предоставление услуг в области добычи природного газа"
                        ],
                        "name": "Предоставление услуг в области добычи нефти и природного газа"
                    },
                    {
                        "values": [
                            "производство нефтепродуктов"
                        ],
                        "name": "Производство нефтепродуктов"
                    },
                    {
                        "values": [
                            "добыча нефти"
                        ],
                        "name": "Добыча сырой нефти"
                    },
                    {
                        "values": [
                            "добыча песка",
                            "добыча озокерита",
                            "добыча сланцев"
                        ],
                        "name": "Добыча горючих (битуминозных) сланцев, песка и озокерита"
                    },
                    {
                        "values": [
                            "деятельность трубопроводного транспорта"
                        ],
                        "name": "Деятельность трубопроводного транспорта"
                    },
                    {
                        "values": [
                            "услуги по бурению для добычи нефти",
                            "услуги по бурению для добычи газа",
                            "бурение для добычи газового конденсата"
                        ],
                        "name": "Предоставление услуг по бурению, связанному с добычей нефти, газа и газового конденсата"
                    }
                ],
                "name": "Нефтегазовая промышленность"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство электрических ламп",
                            "производство осветительного оборудования"
                        ],
                        "name": "Производство электрических ламп и осветительного оборудования"
                    },
                    {
                        "values": [
                            "производство регулирующей аппаратуры",
                            "производство электрической распределительной аппаратуры"
                        ],
                        "name": "Производство электрической распределительной и регулирующей аппаратуры"
                    },
                    {
                        "values": [
                            "механическая обработка металлов",
                            "обработка металлов",
                            "нанесение покрытий на металлы"
                        ],
                        "name": "Обработка металлов и нанесение покрытий на металлы; механическая обработка металлов"
                    },
                    {
                        "values": [
                            "производство кабелей",
                            "производство кабельной арматуры"
                        ],
                        "name": "Производство кабелей и кабельной арматуры"
                    },
                    {
                        "values": [
                            "производство чугуна",
                            "производство ферросплавов",
                            "производство стали"
                        ],
                        "name": "Производство чугуна, стали и ферросплавов"
                    },
                    {
                        "values": [
                            "твёрдые материалы",
                            "производство станков",
                            "обработка металлов",
                            "оборудование для обработки металлов",
                            "оборудование для обработки прочих твердых материалов",
                            "призводство машин для обработки металлов"
                        ],
                        "name": "Произ-во станков, машин и оборуд. для обработки металлов и пр. твердых материалов"
                    },
                    {
                        "values": [
                            "производство машин",
                            "производство оборудования общего назначения"
                        ],
                        "name": "Производство машин и оборудования общего назначения"
                    },
                    {
                        "values": [
                            "порошковая металлургия",
                            "штамповка",
                            "профилирование",
                            "прессование",
                            "ковка"
                        ],
                        "name": "Ковка, прессование, штамповка и профилирование; изгот-е изделий методом порошковой металлургии"
                    },
                    {
                        "values": [
                            "литье металлов"
                        ],
                        "name": "Литье металлов"
                    },
                    {
                        "values": [
                            "производство прочих готовых металлических изделий"
                        ],
                        "name": "Производство прочих готовых металлических изделий"
                    },
                    {
                        "values": [
                            "производство распределительных устройств",
                            "производство электродвигателей",
                            "производство контрольно-измерительной аппаратуры",
                            "производство трансформаторов",
                            "производство генераторов"
                        ],
                        "name": "Производство электродвиг., генераторов, трансформаторов, распредел.устр-в, контрольно-измер. аппаратуры"
                    },
                    {
                        "values": [
                            "производство строительных металлических конструкций",
                            "производство строительных металлических изделий"
                        ],
                        "name": "Производство строительных металлических конструкций и изделий"
                    },
                    {
                        "values": [
                            "производство автотранспортных средств",
                            "производство прицепов",
                            "производство полуприцепов"
                        ],
                        "name": "Производство автотранспортных средств, прицепов и полуприцепов"
                    },
                    {
                        "values": [
                            "производство инструмента"
                        ],
                        "name": "Производство инструмента"
                    },
                    {
                        "values": [
                            "производство прочих ёмкостей",
                            "производство металлических цистерн",
                            "производство резервуаров"
                        ],
                        "name": "Производство металлических цистерн, резервуаров и прочих емкостей"
                    },
                    {
                        "values": [
                            "стальные трубы",
                            "полые профили",
                            "фитинги"
                        ],
                        "name": "Производство стальных труб, полых профилей и фитингов"
                    }
                ],
                "name": "Металлообработка"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство электрических аккумуляторов",
                            "производство аккумуляторных батарей"
                        ],
                        "name": "Производство электрических аккумуляторов и аккумуляторных батарей"
                    },
                    {
                        "values": [
                            "производство основных драгоценных металлов",
                            "производство прочих цветных металлов",
                            "производство ядерного топлива"
                        ],
                        "name": "Производство основных драгоценных металлов и прочих цветных металлов, производство ядерного топлива"
                    },
                    {
                        "values": [
                            "производство кабелей",
                            "производство кабельной арматуры"
                        ],
                        "name": "Производство кабелей и кабельной арматуры"
                    },
                    {
                        "values": [
                            "производство ювелирных изделий"
                        ],
                        "name": "Производство ювелирных изделий и аналогичных изделий"
                    },
                    {
                        "values": [
                            "производство принадлежностей для автотранспортных средств",
                            "производство комплектующих для автотранспортных средств"
                        ],
                        "name": "Производство комплектующих и принадлежностей для автотранспортных средств"
                    }
                ],
                "name": "Обработка цветных и драгоценных металлов"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство прочих деревянных изделий",
                            "производство изделий из пробки",
                            "производство изделий из соломки",
                            "производство материалов для плетения"
                        ],
                        "name": "Произв-во пр. деревянных изделий; произв-во изделий из пробки, соломки и материалов для плетения"
                    },
                    {
                        "values": [
                            "издание периодических публикаций",
                            "издательская деятельность",
                            "издание книг"
                        ],
                        "name": "Издание книг, периодических публикаций и другие виды издательской деятельности"
                    },
                    {
                        "values": [
                            "производство прочих деревянных строительных конструкций",
                            "производство столярных изделий"
                        ],
                        "name": "Производство пр. дерев.строительных конструкций и столярных изделий"
                    },
                    {
                        "values": [
                            "производство деревянной тары"
                        ],
                        "name": "Производство деревянной тары"
                    },
                    {
                        "values": [
                            "производство мебели"
                        ],
                        "name": "Производство мебели"
                    },
                    {
                        "values": [
                            "строгание древесины",
                            "распиловка древесины"
                        ],
                        "name": "Распиловка и строгание древесины"
                    },
                    {
                        "values": [
                            "производство целлюлозы",
                            "производство древесной массы",
                            "производство картона",
                            "производство бумаги"
                        ],
                        "name": "Производство целлюлозы, древесной массы, бумаги и картона"
                    },
                    {
                        "values": [
                            "производство изделий из бумаги",
                            "производство изделий из картона"
                        ],
                        "name": "Производство изделий из бумаги и картона"
                    },
                    {
                        "values": [
                            "лесозаготовка",
                            "лесоводство"
                        ],
                        "name": "Лесоводство и лесозаготовки"
                    }
                ],
                "name": "Лесная промышленность, деревообработка, целлюлозно-бумажная обработка"
            },
            {
                "values": [],
                "name": "Виды деятельности"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство термоуглей",
                            "агломерация бурого угля (лигнита)",
                            "агломерация угля",
                            "агломерация антрацита"
                        ],
                        "name": "Агломерация угля, антрацита и бурого угля (лигнита) и произв-во термоуглей"
                    },
                    {
                        "values": [
                            "производство кокса"
                        ],
                        "name": "Производство кокса"
                    }
                ],
                "name": "Угольная промышленность"
            },
            {
                "values": [
                    {
                        "values": [
                            "производство мыла",
                            "производство полирующих средств",
                            "производство косметических средств",
                            "производство моющих средств",
                            "производство чистящих средств",
                            "производство парфюмерных средств"
                        ],
                        "name": "Произв-во мыла и моющих, чистящих и полирующих средств; парфюмерных и космет. средств"
                    },
                    {
                        "values": [
                            "производство фармацевтических субстанций"
                        ],
                        "name": "Производство фармацевтических субстанций"
                    },
                    {
                        "values": [
                            "производство стекла",
                            "производство изделий из стекла"
                        ],
                        "name": "Производство стекла и изделий из стекла"
                    },
                    {
                        "values": [
                            "производство химических волокон"
                        ],
                        "name": "Производство химических волокон"
                    },
                    {
                        "values": [
                            "производство резиновых изделий"
                        ],
                        "name": "Производство резиновых изделий"
                    },
                    {
                        "values": [
                            "производство изделий из пластмасс"
                        ],
                        "name": "Производство изделий из пластмасс"
                    },
                    {
                        "values": [
                            "производство прочих химических продуктов"
                        ],
                        "name": "Производство прочих химических продуктов"
                    },
                    {
                        "values": [
                            "производство красок",
                            "производство полиграфических красок",
                            "производство мастик",
                            "производство лаков"
                        ],
                        "name": "Произв-во красок, лаков и аналог. материалов для нанесения покрытий, полиграф. красок и мастик"
                    },
                    {
                        "values": [
                            "производтво стальных труб",
                            "производтво полых профилей",
                            "производтво фитингов"
                        ],
                        "name": "Производство стальных труб, полых профилей и фитингов"
                    },
                    {
                        "values": [
                            "производство основных химических веществ",
                            "производство синтетического каучука в первичных формах",
                            "производство азотных соединений",
                            "производство удобрений",
                            "производство пластмасс"
                        ],
                        "name": "Произв-во осн. хим. вещ-в, удобрений и азотных соед-ний, пластмасс и синтет. каучука в первичных формах"
                    }
                ],
                "name": "Химическая промышленность"
            }
        ]
    );
    self.selectedSpec = ko.observable();

    self.availableProfiles = ko.computed(function() {
        if (self.selectedSpec()) {
            $('#select-profile').attr('size', '' + self.selectedSpec()["values"].length);
            console.log(self.selectedSpec()["values"]);
            return self.selectedSpec()["values"];
        }
    });
    self.selectedProfiles = ko.observableArray();
    self.selectedAll = ko.observable(false);

    self.selectAllProfiles = function() {
        if (self.selectedAll()) {
            for (var i = 0; i < self.availableProfiles().length; i++) {
                self.selectedProfiles.push(self.availableProfiles()[i]);
            }
        }
    };
    self.deselectAllProfiles = function() {
        self.selectedProfiles.removeAll();
    };

    self.selectedAll.subscribe(function(newVal) {
        if (newVal == true) {
            self.selectAllProfiles();
        } else {
            self.deselectAllProfiles();
        }
    });

    self.selectedProfiles.isValid = ko.computed(function() {
        var e = self.selectedProfiles();
        return !!e && typeof e !== "undefined"
        && e.length !== 0 && e.length > 0;
    });

    self.requestData = ko.computed(function() {
        var request = '';
        for (var i = 0; i < self.selectedProfiles().length; i++) {
            var req_part = '';
            for (var j = 0; j < self.selectedProfiles()[i]["values"].length; j++) {
                if (j > self.selectedProfiles()[i]["values"].length - 2) {
                    req_part += self.selectedProfiles()[i]["values"][j];
                } else {
                    req_part += self.selectedProfiles()[i]["values"][j] + ' | ';
                }
            }
            if (i > self.selectedProfiles().length - 2) {
                request += req_part;
            } else {
                request += req_part + ' | ';
            }
        }
        console.log(request);
        return request
    });

    self.updateCompaniesData = function() {
        self.waiter.show();
        var key = "f9134045-4f6b-4b1e-bdd8-10582c026780";
        var query = "?apikey=" + key + "&type=biz&lang=ru_RU&results=500&text=" + encodeURIComponent(self.requestData());
        $.get("https://search-maps.yandex.ru/v1/" + query, function(resp, status){
            console.log(resp);
            companies = [];
            for (var i = 0; i < resp.features.length; i++) {
                var companyMeta = resp.features[i].properties.CompanyMetaData;
                var phone, url, addr = 'нет данных';
                if (typeof companyMeta.Phones !== 'undefined') {
                    phone = companyMeta.Phones[0].formatted;
                }
                if (typeof companyMeta.url !== 'undefined') {
                    url = companyMeta.url;
                }
                if (typeof companyMeta.address !== 'undefined') {
                    addr = companyMeta.address;
                }
                companies.push(new Company(companyMeta.name, addr, resp.features[i].geometry.coordinates[1], resp.features[i].geometry.coordinates[0], phone, url));
            }
            updateCompaniesOnMap();
            self.waiter.hide();
            // TODO: 
            // loadBordersAndPaint(_colors1);
        });
    };
    // self.updateCompaniesData();
};

function hideshow(id) {
    console.log(id);
    this.event.stopPropagation();
    $('#' + id + ' > ul').animate({
        left: "+=50",
        height: "toggle"
    }, 200, function() {
        // Animation complete.
    });
}


