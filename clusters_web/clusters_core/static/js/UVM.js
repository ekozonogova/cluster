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
                "name": "Лесная промышленность, деревообработка, целлюлозно-бумажная обработка",
                "values": [
                    {
                        "name": "Производство прочих деревянных строительных конструкций и столярных изделий",
                        "values": [
                            "прочие деревянные строительные конструкции",
                            "столярные изделия"
                        ]
                    },
                    {
                        "name": "Издание книг, периодических публикаций и другие виды издательской деятельности",
                        "values": [
                            "периодические публикации",
                            "издательская деятельность",
                            "издание книг",
                            "другие виды"
                        ]
                    },
                    {
                        "name": "Производство прочих деревянных изделий; производство изделий из пробки, соломки и материалов для плетения",
                        "values": [
                            "прочие деревянные изделия",
                            "производство изделий",
                            "соломка",
                            "производство",
                            "пробка",
                            "плетение",
                            "материалы"
                        ]
                    },
                    {
                        "name": "Производство целлюлозы, древесной массы, бумаги и картона",
                        "values": [
                            "производство целлюлозы",
                            "древесная масса",
                            "картон",
                            "бумага"
                        ]
                    },
                    {
                        "name": "Лесоводство и лесозаготовки",
                        "values": [
                            "лесозаготовка",
                            "лесоводство"
                        ]
                    },
                    {
                        "name": "Производство мебели",
                        "values": [
                            "производство мебели"
                        ]
                    },
                    {
                        "name": "Производство изделий из дерева, пробки, соломки и материалов для плетения",
                        "values": [
                            "производство изделий",
                            "соломка",
                            "пробка",
                            "плетение",
                            "материалы",
                            "дерево"
                        ]
                    },
                    {
                        "name": "Производство изделий из бумаги и картона",
                        "values": [
                            "производство изделий",
                            "картон",
                            "бумага"
                        ]
                    },
                    {
                        "name": "Распиловка и строгание древесины",
                        "values": [
                            "строгание древесины",
                            "распиловка"
                        ]
                    },
                    {
                        "name": "Производство деревянной тары",
                        "values": [
                            "деревянная тара",
                            "производство"
                        ]
                    }
                ]
            },
            {
                "name": "Металлообработка",
                "values": [
                    {
                        "name": "Производство кабелей и кабельной арматуры",
                        "values": [
                            "производство кабелей",
                            "кабельная арматура"
                        ]
                    },
                    {
                        "name": "Производство машин и оборудования общего назначения",
                        "values": [
                            "производство машин",
                            "оборудование общего назначения"
                        ]
                    },
                    {
                        "name": "Производство электродвиг., генераторов, трансформаторов, распредел.устр-в, контрольно-измер. аппаратуры",
                        "values": [
                            "распределительные устройства",
                            "производство электродвигателей",
                            "контрольно-измерительная аппаратура",
                            "трансформаторы",
                            "генераторы"
                        ]
                    },
                    {
                        "name": "Обработка металлов и нанесение покрытий на металлы; механическая обработка металлов",
                        "values": [
                            "механическая обработка металлов",
                            "обработка металлов",
                            "нанесение покрытий",
                            "металлы"
                        ]
                    },
                    {
                        "name": "Производство инструмента",
                        "values": [
                            "производство инструмента"
                        ]
                    },
                    {
                        "name": "Производство чугуна, стали и ферросплавов",
                        "values": [
                            "производство чугуна",
                            "ферросплавы",
                            "сталь"
                        ]
                    },
                    {
                        "name": "Производство станков, машин и оборуд. для обработки металлов и пр. твердых материалов",
                        "values": [
                            "твёрдые материалы",
                            "производство станков",
                            "обработка металлов",
                            "оборудование для обработки металлов",
                            "машины"
                        ]
                    },
                    {
                        "name": "Производство металлических цистерн, резервуаров и прочих емкостей",
                        "values": [
                            "прочие ёмкости",
                            "металлические цистерны",
                            "резервуары"
                        ]
                    },
                    {
                        "name": "Литье металлов",
                        "values": [
                            "литье металлов"
                        ]
                    },
                    {
                        "name": "Производство строительных металлических конструкций и изделий",
                        "values": [
                            "строительные металлические конструкции",
                            "строительные металлические изделия"
                        ]
                    },
                    {
                        "name": "Производство прочих готовых металлических изделий",
                        "values": [
                            "готовые металлические изделия"
                        ]
                    },
                    {
                        "name": "Производство электрических ламп и осветительного оборудования",
                        "values": [
                            "электрические лампы",
                            "осветительный оборудование"
                        ]
                    },
                    {
                        "name": "Производство электрической распределительной и регулирующей аппаратуры",
                        "values": [
                            "регулирующая аппаратура",
                            "электрическая распределительная аппаратура"
                        ]
                    },
                    {
                        "name": "Производство стальных труб, полых профилей и фитингов",
                        "values": [
                            "стальные трубы",
                            "полые профили",
                            "фитинги"
                        ]
                    },
                    {
                        "name": "Производство автотранспортных средств, прицепов и полуприцепов",
                        "values": [
                            "автотранспортные средства",
                            "прицепы",
                            "полуприцепы"
                        ]
                    },
                    {
                        "name": "Ковка, прессование, штамповка и профилирование; изгот-е изделий методом порошковой металлургии",
                        "values": [
                            "порошковая металлургия",
                            "штамповка",
                            "профилирование",
                            "прессование",
                            "ковка"
                        ]
                    }
                ]
            },
            {
                "name": "Горнодобывающее производство",
                "values": [
                    {
                        "name": "Добыча прочих полезных ископаемых",
                        "values": [
                            "прочие полезные ископаемые"
                        ]
                    },
                    {
                        "name": "Добыча урановой и ториевой руд",
                        "values": [
                            "ториевая руда",
                            "урановая руда"
                        ]
                    },
                    {
                        "name": "Добыча и обогащение железных руд",
                        "values": [
                            "железные руды",
                            "обогащение руд",
                            "добыча руд"
                        ]
                    },
                    {
                        "name": "Добыча руд цветных металлов",
                        "values": [
                            "руды цветных металлов",
                            "добыча руд"
                        ]
                    }
                ]
            },
            {
                "name": "Пищевая промышленность",
                "values": [
                    {
                        "name": "Производство готовых кормов для животных",
                        "values": [
                            "готовые корма",
                            "производство",
                            "животные"
                        ]
                    },
                    {
                        "name": "Производство напитков",
                        "values": [
                            "производство напитков"
                        ]
                    },
                    {
                        "name": "Переработка и консервирование фруктов и овощей",
                        "values": [
                            "консервирование фруктов",
                            "переработка",
                            "овощи"
                        ]
                    },
                    {
                        "name": "Выращивание однолетних культур",
                        "values": [
                            "однолетние культуры",
                            "выращивание"
                        ]
                    },
                    {
                        "name": "Производство табачных изделий",
                        "values": [
                            "табачные изделия",
                            "производство"
                        ]
                    },
                    {
                        "name": "Животноводство",
                        "values": [
                            "животноводство"
                        ]
                    }
                ]
            },
            {
                "name": "Виды деятельности",
                "values": []
            },
            {
                "name": "Угольная промышленность",
                "values": [
                    {
                        "name": "Агломерация угля, антрацита и бурого угля (лигнита) и производство термоуглей",
                        "values": [
                            "производство термоуглей",
                            "бурый уголь",
                            "агломерация угля",
                            "лигнит",
                            "антрацит"
                        ]
                    },
                    {
                        "name": "Производство кокса",
                        "values": [
                            "производство кокса"
                        ]
                    }
                ]
            },
            {
                "name": "Нефтегазовая промышленность",
                "values": [
                    {
                        "name": "Производство нефтепродуктов",
                        "values": [
                            "производство нефтепродуктов"
                        ]
                    },
                    {
                        "name": "Добыча сырой нефти",
                        "values": [
                            "сырой нефть",
                            "добыча"
                        ]
                    },
                    {
                        "name": "Добыча горючих (битуминозных) сланцев, песка и озокерита",
                        "values": [
                            "песок",
                            "озокерит",
                            "добыча"
                        ]
                    },
                    {
                        "name": "Деятельность трубопроводного транспорта",
                        "values": [
                            "трубопроводный транспорт",
                            "деятельность"
                        ]
                    },
                    {
                        "name": "Добыча природного газа",
                        "values": [
                            "природное газа",
                            "добыча"
                        ]
                    },
                    {
                        "name": "Предоставление услуг по бурению, связанному с добычей нефти, газа и газового конденсата",
                        "values": [
                            "предоставление услуг",
                            "добыча нефти",
                            "газовое конденсат",
                            "газа",
                            "бурение"
                        ]
                    },
                    {
                        "name": "Предоставление услуг в области добычи нефти и природного газа",
                        "values": [
                            "область добычи нефти",
                            "природное газа",
                            "предоставление услуг"
                        ]
                    }
                ]
            },
            {
                "name": "Обработка цветных и драгоценных металлов",
                "values": [
                    {
                        "name": "Производство основных драгоценных металлов и прочих цветных металлов, производство ядерного топлива",
                        "values": [
                            "производство",
                            "прочие цветные металлы",
                            "основные драгоценные металлы",
                            "ядерное топливо"
                        ]
                    },
                    {
                        "name": "Производство комплектующих и принадлежностей для автотранспортных средств",
                        "values": [
                            "автотранспортные средства",
                            "производство",
                            "принадлежности"
                        ]
                    },
                    {
                        "name": "Производство ювелирных изделий и аналогичных изделий",
                        "values": [
                            "ювелирные изделия",
                            "аналогичные изделия",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство электрических аккумуляторов и аккумуляторных батарей",
                        "values": [
                            "электрические аккумуляторы",
                            "аккумуляторные батареи",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство кабелей и кабельной арматуры",
                        "values": [
                            "производство кабелей",
                            "кабельная арматура"
                        ]
                    }
                ]
            },
            {
                "name": "Строительные материалы",
                "values": [
                    {
                        "name": "Производство абразивных и неметаллических минеральных изделий, не включенных в другие группировки",
                        "values": [
                            "неметаллические минеральные изделия",
                            "другие группировка",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство цемента, извести и гипса",
                        "values": [
                            "производство цемента",
                            "известь",
                            "гипс"
                        ]
                    },
                    {
                        "name": "Производство керамических плит и плиток",
                        "values": [
                            "керамические плиты",
                            "производство",
                            "плитки"
                        ]
                    },
                    {
                        "name": "Производство кирпича, черепицы и прочих строительных изделий из обожженной глины",
                        "values": [
                            "прочие строительные изделия",
                            "производство кирпича",
                            "обожжённая глина",
                            "черепица"
                        ]
                    },
                    {
                        "name": "Резка, обработка и отделка камня",
                        "values": [
                            "отделка камня",
                            "резка",
                            "обработка"
                        ]
                    },
                    {
                        "name": "Производство изделий из бетона, цемента и гипса",
                        "values": [
                            "производство изделий",
                            "цемент",
                            "гипс",
                            "бетон"
                        ]
                    },
                    {
                        "name": "Производство прочих фарфоровых и керамических изделий",
                        "values": [
                            "керамические изделия",
                            "производство"
                        ]
                    }
                ]
            },
            {
                "name": "Легкая промышленность",
                "values": [
                    {
                        "name": "Производство одежды из кожи",
                        "values": [
                            "производство одежды",
                            "кожа"
                        ]
                    },
                    {
                        "name": "Производство текстильных изделий",
                        "values": [
                            "текстильные изделия",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство чемоданов, дамских сумок и аналогичных изделий из кожи и других материалов; производство шорно-седельных и других изделий из кожи",
                        "values": [
                            "кожа",
                            "производство чемоданов",
                            "другие материалы",
                            "другие изделия",
                            "дамские сумки",
                            "аналогичные изделия",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство одежды, кроме одежды из меха",
                        "values": [
                            "производство одежды",
                            "одежда",
                            "мех"
                        ]
                    },
                    {
                        "name": "Производство меховых изделий",
                        "values": [
                            "меховые изделия",
                            "производство"
                        ]
                    },
                    {
                        "name": "Дубление и отделка кожи, производство чемоданов, сумок, шорно-седельных изделий из кожи; выделка и крашение меха",
                        "values": [
                            "шорно-седельные изделия",
                            "производство чемоданов",
                            "отделка кожи",
                            "крашение меха",
                            "сумки",
                            "кожа",
                            "дубление",
                            "выделка"
                        ]
                    }
                ]
            },
            {
                "name": "Химическая промышленность",
                "values": [
                    {
                        "name": "Производство изделий из пластмасс",
                        "values": [
                            "производство изделий",
                            "пластмассы"
                        ]
                    },
                    {
                        "name": "Производство изделий, не включенных в другие группировки",
                        "values": [
                            "производство изделий",
                            "другие группировка"
                        ]
                    },
                    {
                        "name": "Производство музыкальных инструментов",
                        "values": [
                            "музыкальные инструменты",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство стекла и изделий из стекла",
                        "values": [
                            "производство стекла",
                            "стекло",
                            "изделия"
                        ]
                    },
                    {
                        "name": "Производство фармацевтических субстанций",
                        "values": [
                            "фармацевтические субстанции",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство основных химических веществ, удобрений и азотных соединений, пластмасс и синтетического каучука в первичных формах",
                        "values": [
                            "основные химические вещества",
                            "синтетический каучук",
                            "первичные формы",
                            "азотные соединения",
                            "удобрения",
                            "производство",
                            "пластмассы"
                        ]
                    },
                    {
                        "name": "Производство красок, лаков и аналогичных материалов для нанесения покрытий, полиграфических красок и мастик",
                        "values": [
                            "производство красок",
                            "полиграфические краски",
                            "нанесение покрытий",
                            "аналогичные материалы",
                            "мастики",
                            "лаки"
                        ]
                    },
                    {
                        "name": "Производство мыла и моющих, чистящих и полирующих средств; парфюмерных и косметических средств",
                        "values": [
                            "производство мыла",
                            "полирующие средства",
                            "косметические средства"
                        ]
                    },
                    {
                        "name": "Производство прочих химических продуктов",
                        "values": [
                            "прочие химические продукты",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство спортивных товаров",
                        "values": [
                            "спортивные товары",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство химических волокон",
                        "values": [
                            "химические волокна",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство резиновых изделий",
                        "values": [
                            "резиновые изделия",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство стальных труб, полых профилей и фитингов",
                        "values": [
                            "стальные трубы",
                            "полые профили",
                            "фитинги",
                            "производство"
                        ]
                    },
                    {
                        "name": "Производство игр и игрушек",
                        "values": [
                            "производство игр",
                            "игрушки"
                        ]
                    }
                ]
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
        var key = "f9134045-4f6b-4b1e-bdd8-10582c026780";
        var query = "?apikey=" + key + "&type=biz&lang=ru_RU&results=50&text=" + encodeURIComponent(self.requestData());
        $.get("https://search-maps.yandex.ru/v1/" + query, function(resp, status){
            // console.log(resp);
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


