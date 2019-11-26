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

    self.availableSpecs = ko.observableArray(
        // [
        //   {
        //     "color": "c6",
        //     "name": "Металлообработка",
        //     "values": [
        //       {
        //         "name": "Производство автотранспортных средств, прицепов и полуприцепов",
        //         "values": [
        //           "производство автотранспортных средств",
        //           "производство прицепов",
        //           "производство полуприцепов"
        //         ]
        //       },
        //       {
        //         "name": "Производство чугуна, стали и ферросплавов",
        //         "values": [
        //           "производство чугуна",
        //           "производство ферросплавов",
        //           "производство стали"
        //         ]
        //       },
        //       {
        //         "name": "Литье металлов",
        //         "values": [
        //           "литье металлов"
        //         ]
        //       },
        //       {
        //         "name": "Производство кабелей и кабельной арматуры",
        //         "values": [
        //           "производство кабелей",
        //           "производство кабельной арматуры"
        //         ]
        //       },
        //       {
        //         "name": "Ковка, прессование, штамповка и профилирование; изгот-е изделий методом порошковой металлургии",
        //         "values": [
        //           "порошковая металлургия",
        //           "штамповка",
        //           "профилирование",
        //           "прессование",
        //           "ковка"
        //         ]
        //       },
        //       {
        //         "name": "Производство электродвиг., генераторов, трансформаторов, распредел.устр-в, контрольно-измер. аппаратуры",
        //         "values": [
        //           "производство распределительных устройств",
        //           "производство электродвигателей",
        //           "производство контрольно-измерительной аппаратуры",
        //           "производство трансформаторов",
        //           "производство генераторов"
        //         ]
        //       },
        //       {
        //         "name": "Производство строительных металлических конструкций и изделий",
        //         "values": [
        //           "производство строительных металлических конструкций",
        //           "производство строительных металлических изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство машин и оборудования общего назначения",
        //         "values": [
        //           "производство машин",
        //           "производство оборудования общего назначения"
        //         ]
        //       },
        //       {
        //         "name": "Производство электрических ламп и осветительного оборудования",
        //         "values": [
        //           "производство электрических ламп",
        //           "производство осветительного оборудования"
        //         ]
        //       },
        //       {
        //         "name": "Производство стальных труб, полых профилей и фитингов",
        //         "values": [
        //           "производство стальных труб",
        //           "производство полых профилей",
        //           "производство фитингов"
        //         ]
        //       },
        //       {
        //         "name": "Производство электрической распределительной и регулирующей аппаратуры",
        //         "values": [
        //           "производство регулирующей аппаратуры",
        //           "производство электрической распределительной аппаратуры"
        //         ]
        //       },
        //       {
        //         "name": "Производство металлических цистерн, резервуаров и прочих емкостей",
        //         "values": [
        //           "производство прочих ёмкостей",
        //           "производство металлических цистерн",
        //           "производство резервуаров"
        //         ]
        //       },
        //       {
        //         "name": "Производство прочих готовых металлических изделий",
        //         "values": [
        //           "производство прочих готовых металлических изделий"
        //         ]
        //       },
        //       {
        //         "name": "Обработка металлов и нанесение покрытий на металлы; механическая обработка металлов",
        //         "values": [
        //           "механическая обработка металлов",
        //           "обработка металлов",
        //           "нанесение покрытий на металлы"
        //         ]
        //       },
        //       {
        //         "name": "Производство инструмента",
        //         "values": [
        //           "производство инструмента"
        //         ]
        //       },
        //       {
        //         "name": "Произ-во станков, машин и оборуд. для обработки металлов и пр. твердых материалов",
        //         "values": [
        //           "производство станков",
        //           "оборудование для обработки металлов",
        //           "оборудование для обработки прочих твердых материалов",
        //           "призводство машин для обработки металлов"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c5",
        //     "name": "Горнодобывающее производство",
        //     "values": [
        //       {
        //         "name": "Добыча урановой и ториевой руд",
        //         "values": [
        //           "добыча ториевой руды",
        //           "добыча урановой руды"
        //         ]
        //       },
        //       {
        //         "name": "Добыча прочих полезных ископаемых",
        //         "values": [
        //           "добыча прочих полезных ископаемых"
        //         ]
        //       },
        //       {
        //         "name": "Добыча руд цветных металлов",
        //         "values": [
        //           "добыча руд цветных металлов"
        //         ]
        //       },
        //       {
        //         "name": "Добыча и обогащение железных руд",
        //         "values": [
        //           "обогащение железных руд",
        //           "добыча железных руд"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c3",
        //     "name": "Пищевая промышленность",
        //     "values": [
        //       {
        //         "name": "Переработка и консервирование мяса и мясной пищевой продукции",
        //         "values": [
        //           "переработка мяса",
        //           "консервирование мяса",
        //           "переработка мясной продукции",
        //           "консервирование мясной продукции"
        //         ]
        //       },
        //       {
        //         "name": "Производство растительных и животных масел и жиров",
        //         "values": [
        //           "производство растительных масел",
        //           "производство растительных жиров",
        //           "производство животных масел",
        //           "производство животных жиров"
        //         ]
        //       },
        //       {
        //         "name": "Производство готовых кормов для животных",
        //         "values": [
        //           "производство готовых кормов",
        //           "производство готовых кормов для животных"
        //         ]
        //       },
        //       {
        //         "name": "Рыболовство и рыбоводство",
        //         "values": [
        //           "рыболовство",
        //           "рыбоводство"
        //         ]
        //       },
        //       {
        //         "name": "Производство табачных изделий",
        //         "values": [
        //           "производство табачных изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство продуктов мукомольной и крупяной промышленности, крахмала и крахмалосодержащих продуктов",
        //         "values": [
        //           "производство продуктов мукомольной промышленности",
        //           "производство продуктов крупяной промышленности",
        //           "производство крахмала",
        //           "производство крахмалосодержащих продуктов"
        //         ]
        //       },
        //       {
        //         "name": "Выращивание однолетних культур",
        //         "values": [
        //           "выращивание однолетних культур",
        //           "растениеводство"
        //         ]
        //       },
        //       {
        //         "name": "Производство молочной продукции",
        //         "values": [
        //           "производство молочной продукции"
        //         ]
        //       },
        //       {
        //         "name": "Переработка и консервирование рыбы, ракообразных и моллюсков",
        //         "values": [
        //           "переработка рыбы",
        //           "консервирование рыбы",
        //           "переработка ракообразных",
        //           "консервирование ракообразных",
        //           "переработка моллюсков",
        //           "консервирование моллюсков"
        //         ]
        //       },
        //       {
        //         "name": "Животноводство",
        //         "values": [
        //           "животноводство"
        //         ]
        //       },
        //       {
        //         "name": "Переработка и консервирование фруктов и овощей",
        //         "values": [
        //           "консервирование фруктов",
        //           "консервирование овощей",
        //           "переработка фруктов",
        //           "переработка овощей"
        //         ]
        //       },
        //       {
        //         "name": "Производство напитков",
        //         "values": [
        //           "производство напитков"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c2",
        //     "name": "Нефтегазовая промышленность",
        //     "values": [
        //       {
        //         "name": "Производство нефтепродуктов",
        //         "values": [
        //           "производство нефтепродуктов"
        //         ]
        //       },
        //       {
        //         "name": "Добыча сырой нефти",
        //         "values": [
        //           "добыча нефти"
        //         ]
        //       },
        //       {
        //         "name": "Добыча горючих (битуминозных) сланцев, песка и озокерита",
        //         "values": [
        //           "добыча песка",
        //           "добыча озокерита",
        //           "добыча сланцев"
        //         ]
        //       },
        //       {
        //         "name": "Деятельность трубопроводного транспорта",
        //         "values": [
        //           "трубопроводный транспорт"
        //         ]
        //       },
        //       {
        //         "name": "Предоставление услуг в области добычи нефти и природного газа",
        //         "values": [
        //           "Услуги по добыче нефти и природного газа"
        //         ]
        //       },
        //       {
        //         "name": "Добыча природного газа",
        //         "values": [
        //           "добыча газа"
        //         ]
        //       },
        //       {
        //         "name": "Предоставление услуг по бурению, связанному с добычей нефти, газа и газового конденсата",
        //         "values": [
        //           "услуги по бурению для добычи нефти",
        //           "услуги по бурению для добычи газа",
        //           "бурение для добычи газового конденсата"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c1",
        //     "name": "Лесная промышленность, деревообработка, целлюлозно-бумажная обработка",
        //     "values": [
        //       {
        //         "name": "Производство целлюлозы, древесной массы, бумаги и картона",
        //         "values": [
        //           "производство целлюлозы",
        //           "производство древесной массы",
        //           "производство картона",
        //           "производство бумаги"
        //         ]
        //       },
        //       {
        //         "name": "Производство мебели",
        //         "values": [
        //           "производство мебели"
        //         ]
        //       },
        //       {
        //         "name": "Издание книг, периодических публикаций и другие виды издательской деятельности",
        //         "values": [
        //           "издание периодических публикаций",
        //           "издательская деятельность",
        //           "издание книг"
        //         ]
        //       },
        //       {
        //         "name": "Распиловка и строгание древесины",
        //         "values": [
        //           "строгание древесины",
        //           "распиловка древесины"
        //         ]
        //       },
        //       {
        //         "name": "Производство деревянной тары",
        //         "values": [
        //           "производство деревянной тары"
        //         ]
        //       },
        //       {
        //         "name": "Произв-во пр. деревянных изделий; произв-во изделий из пробки, соломки и материалов для плетения",
        //         "values": [
        //           "производство деревянных изделий",
        //           "производство изделий из пробки",
        //           "производство изделий из соломки",
        //           "производство материалов для плетения"
        //         ]
        //       },
        //       {
        //         "name": "Лесоводство и лесозаготовки",
        //         "values": [
        //           "лесозаготовка",
        //           "лесоводство"
        //         ]
        //       },
        //       {
        //         "name": "Производство пр. дерев.строительных конструкций и столярных изделий",
        //         "values": [
        //           "производство деревянных строительных конструкций",
        //           "производство столярных изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство изделий из бумаги и картона",
        //         "values": [
        //           "производство изделий из бумаги",
        //           "производство изделий из картона"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c1",
        //     "name": "Высокотехнологическое оборудование и ИТ",
        //     "values": [
        //       {
        //         "name": "Производство элементов электронной аппаратуры и печатных схем (плат)",
        //         "values": [
        //           "производство элементов электронной аппаратуры",
        //           "производство печатных схем",
        //           "производство печатных плат"
        //         ]
        //       },
        //       {
        //         "name": "Производство летательных аппаратов, включая космические, и соответствующего оборудования",
        //         "values": [
        //           "производство летательных аппаратов",
        //           "производство космических аппаратов",
        //           "производство двигателей для летательных",
        //           "производство самолетов",
        //           "производство вертолетов",
        //           "производство ракет-носителей"
        //         ]
        //       },
        //       {
        //         "name": "Производство машин и оборудования для сельского и лесного хозяйства",
        //         "values": [
        //           "производство машин для сельского хозяйства",
        //           "производство оборудования для сельского хозяйства",
        //           "производство машин для лесного хозяйства",
        //           "производство оборудования для лесного хозяйства"
        //         ]
        //       },
        //       {
        //         "name": "Производство компьютеров и периферийного оборудования",
        //         "values": [
        //           "производство компьютеров",
        //           "производство периферийного оборудования"
        //         ]
        //       },
        //       {
        //         "name": "Производство контрольно-измерительных и навигационных приборов и аппаратов; производство часов",
        //         "values": [
        //           "контрольно-измерительные приборы",
        //           "Производство навигационных приборов",
        //           "Производство контрольно-измерительных аппаратов",
        //           "Производство навигационных аппаратов",
        //           "производство часов",
        //           "ПНППК",
        //           "Инкаб",
        //           "Инверсия-Сенсор",
        //           "ПНППК-Электрон-Контракт",
        //           "ПНППК-Квантек"
        //         ]
        //       },
        //       {
        //         "name": "Производство оптических приборов, фото- и кинооборудования",
        //         "values": [
        //           "производство оптических приборов",
        //           "производство фотооборудования",
        //           "производство кинооборудования"
        //         ]
        //       },
        //       {
        //         "name": "Производство фотокопировальных машин, офисных машин для офсетной печати и прочих офисных машин и оборудования и их составных частей",
        //         "values": [
        //           "производство фотокопировальных машин",
        //           "производство офисного оборудования",
        //           "производство офисной техники"
        //         ]
        //       },
        //       {
        //         "name": "Производство медицинских инструментов и оборудования",
        //         "values": [
        //           "производство медицинских инструментов",
        //           "производство медицинского оборудования"
        //         ]
        //       },
        //       {
        //         "name": "Разработка компьютерного программного обеспечения, консультационные услуги в данной области и другие сопутствующие услуги",
        //         "values": [
        //           "разработка компьютерного программного обеспечения",
        //           "консультационные услуги в области программного обеспечения"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c9",
        //     "name": "Строительные материалы",
        //     "values": [
        //       {
        //         "name": "Производство изделий из бетона, цемента и гипса",
        //         "values": [
        //           "производство изделий из бетона",
        //           "производство изделий из цемента",
        //           "производство изделий из гипса"
        //         ]
        //       },
        //       {
        //         "name": "Производство цемента, извести и гипса",
        //         "values": [
        //           "производство цемента",
        //           "производство извести",
        //           "производство гипса"
        //         ]
        //       },
        //       {
        //         "name": "Резка, обработка и отделка камня",
        //         "values": [
        //           "отделка камня",
        //           "резка камня",
        //           "обработка камня"
        //         ]
        //       },
        //       {
        //         "name": "Производство кирпича, черепицы и прочих строительных изделий из обожженной глины",
        //         "values": [
        //           "производство кирпича",
        //           "производство черепицы"
        //         ]
        //       },
        //       {
        //         "name": "Производство абразивных и неметаллических минеральных изделий, не включенных в другие группировки",
        //         "values": [
        //           "производство абразивных изделий",
        //           "производство неметаллических минеральных изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство прочих фарфоровых и керамических изделий",
        //         "values": [
        //           "производство керамических изделий",
        //           "производство фарфоровых изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство керамических плит и плиток",
        //         "values": [
        //           "производство керамических плит",
        //           "производство керамических плиток"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c10",
        //     "name": "Угольная промышленность",
        //     "values": [
        //       {
        //         "name": "Производство кокса",
        //         "values": [
        //           "производство кокса"
        //         ]
        //       },
        //       {
        //         "name": "Агломерация угля, антрацита и бурого угля (лигнита) и произв-во термоуглей",
        //         "values": [
        //           "термоугли",
        //           "бурый уголь",
        //           "уголь",
        //           "антрацит"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c0",
        //     "name": "Химическая промышленность",
        //     "values": [
        //       {
        //         "name": "Производство химических волокон",
        //         "values": [
        //           "производство химических волокон"
        //         ]
        //       },
        //       {
        //         "name": "Производство стекла и изделий из стекла",
        //         "values": [
        //           "производство стекла",
        //           "производство изделий из стекла"
        //         ]
        //       },
        //       {
        //         "name": "Производство фармацевтических субстанций",
        //         "values": [
        //           "производство фармацевтических субстанций"
        //         ]
        //       },
        //       {
        //         "name": "Производство изделий из пластмасс",
        //         "values": [
        //           "производство изделий из пластмасс"
        //         ]
        //       },
        //       {
        //         "name": "Произв-во осн. хим. вещ-в, удобрений и азотных соед-ний, пластмасс и синтет. каучука в первичных формах",
        //         "values": [
        //           "производство основных химических веществ",
        //           "производство синтетического каучука в первичных формах",
        //           "производство азотных соединений",
        //           "производство удобрений",
        //           "производство пластмасс"
        //         ]
        //       },
        //       {
        //         "name": "Производство резиновых изделий",
        //         "values": [
        //           "производство резиновых изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство прочих химических продуктов",
        //         "values": [
        //           "производство химических продуктов"
        //         ]
        //       },
        //       {
        //         "name": "Произв-во красок, лаков и аналог. материалов для нанесения покрытий, полиграф. красок и мастик",
        //         "values": [
        //           "производство красок",
        //           "производство полиграфических красок",
        //           "производство мастик",
        //           "производство лаков"
        //         ]
        //       },
        //       {
        //         "name": "Произв-во мыла и моющих, чистящих и полирующих средств; парфюмерных и космет. средств",
        //         "values": [
        //           "производство мыла",
        //           "производство полирующих средств",
        //           "производство косметических средств",
        //           "производство моющих средств",
        //           "производство чистящих средств",
        //           "производство парфюмерных средств"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c8",
        //     "name": "Обработка цветных и драгоценных металлов",
        //     "values": [
        //       {
        //         "name": "Производство электрических аккумуляторов и аккумуляторных батарей",
        //         "values": [
        //           "производство электрических аккумуляторов",
        //           "производство аккумуляторных батарей"
        //         ]
        //       },
        //       {
        //         "name": "Производство комплектующих и принадлежностей для автотранспортных средств",
        //         "values": [
        //           "производство принадлежностей для автотранспортных средств",
        //           "производство комплектующих для автотранспортных средств"
        //         ]
        //       },
        //       {
        //         "name": "Производство ювелирных изделий и аналогичных изделий",
        //         "values": [
        //           "производство ювелирных изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство кабелей и кабельной арматуры",
        //         "values": [
        //           "производство кабелей",
        //           "производство кабельной арматуры"
        //         ]
        //       },
        //       {
        //         "name": "Производство основных драгоценных металлов и прочих цветных металлов, производство ядерного топлива",
        //         "values": [
        //           "производство основных драгоценных металлов",
        //           "производство цветных металлов",
        //           "производство ядерного топлива"
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "color": "c7",
        //     "name": "Легкая промышленность",
        //     "values": [
        //       {
        //         "name": "Произв-во чемоданов, дамских сумок и аналог. изделий из кожи и др. матер.; произв-во шорно-седельных и др. изделий из кожи",
        //         "values": [
        //           "производство чемоданов из кожи",
        //           "производство дамских сумок",
        //           "производство шорно-седельных изделий из кожи"
        //         ]
        //       },
        //       {
        //         "name": "Производство одежды из кожи",
        //         "values": [
        //           "производство одежды из кожи"
        //         ]
        //       },
        //       {
        //         "name": "Производство одежды, кроме одежды из меха",
        //         "values": [
        //           "производство одежды"
        //         ]
        //       },
        //       {
        //         "name": "Производство меховых изделий",
        //         "values": [
        //           "производство меховых изделий"
        //         ]
        //       },
        //       {
        //         "name": "Производство текстильных изделий",
        //         "values": [
        //           "производство текстильных изделий"
        //         ]
        //       },
        //       {
        //         "name": "Дубление и отделка кожи; выделка и крашение меха",
        //         "values": [
        //           "отделка кожи",
        //           "крашение меха",
        //           "дубление",
        //           "выделка"
        //         ]
        //       }
        //     ]
        //   }
        // ]
    );

    self.init = function() {
      $.get('static/specs3.json', function(resp) {
        self.availableSpecs(resp);
        $.get('static/region_colors.json', function(resp) {
          colors = resp;
        });
      });
    };

    self.init();

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

    self.selectedSpec = ko.observable();
    self.collapsedProfiles = ko.observable(false);

    self.selectedSpec.subscribe(function(newVal) {
        self.waiter.show();
        var color = newVal["color"];
        console.log(color);
        console.log(colors[color]);
        loadBordersAndPaint(colors[color]);
    });

    self.availableProfiles = ko.computed(function() {
        if (self.selectedSpec()) {
            $('#select-profile').attr('size', '10');
            self.collapsedProfiles(false);
            console.log(self.selectedSpec()["values"]);
            return self.selectedSpec()["values"];
        }
    });
    self.selectedProfiles = ko.observableArray();
    self.selectedAll = ko.observable(false);

    self.selectAllProfiles = function() {
        if (!self.selectedAll()) {
            self.selectedProfiles.removeAll();
            for (var i = 0; i < self.availableProfiles().length; i++) {
                self.selectedProfiles.push(self.availableProfiles()[i]);
            }
            self.selectedAll(true);
            console.log(1);
            console.log(self.selectedAll());
        } else {
            self.selectedProfiles.removeAll();
            self.selectedAll(false);
            console.log(2);
            console.log(self.selectedAll());
        }
    };
    self.deselectAllProfiles = function() {
        self.selectedProfiles.removeAll();
        self.selectedAll(false);
    };
    $(document).ready(function() {
        $('#select-profile').on('click', function() {
            if(self.selectedAll()) {
                self.deselectAllProfiles();
            }
        });
    });

    self.collapseProfiles = function() {
        if(!self.collapsedProfiles()) {
            $('#select-profile').attr('size', '1');
            self.collapsedProfiles(true);
        } else {
            $('#select-profile').attr('size', '10');
            self.collapsedProfiles(false);
        }
    };

    // self.selectedAll.subscribe(function(newVal) {
    //     if (newVal == true) {
    //         self.selectAllProfiles();
    //     } else {
    //         self.deselectAllProfiles();
    //     }
    // });

    self.selectedProfiles.isValid = ko.computed(function() {
        var e = self.selectedProfiles();
        return !!e && typeof e !== "undefined"
        && e.length !== 0 && e.length > 0;
    });

    self.requestData = ko.computed(function() {
        var request = [];
        for (var i = 0; i < self.selectedProfiles().length; i++) {
            for (var j = 0; j < self.selectedProfiles()[i]["values"].length; j++) {
                request.push(self.selectedProfiles()[i]["values"][j]);
            }
        }
        console.log(request);
        return request
    });

    // self.requestData = ko.computed(function() {

    // });
    self.companiesLoaded = ko.observable(false);

    self.requestsCount = ko.observable(0);

    self.requestsHandled = 0;

    self.reqCallback = function(resp, status) {
        console.log(resp);
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
            if (!companyExists(companyMeta.name)) {
                allCompanies.push(new Company(companyMeta.name, addr, resp.features[i].geometry.coordinates[1], resp.features[i].geometry.coordinates[0], phone, url));
            }
        }
        self.requestsHandled++;
    }

    self.sendRequest = function(requestData) {
        var key = "f9134045-4f6b-4b1e-bdd8-10582c026780";
        var query = "?apikey=" + key + "&type=biz&lang=ru_RU&results=500&text=" + encodeURIComponent(requestData);
        $.get("https://search-maps.yandex.ru/v1/" + query, self.reqCallback);
    }

    self.waitForResponseParse = function() {
        var t;
        if (self.requestsHandled == self.requestsCount()) {
            console.log('Loaded');
            self.companiesLoaded(true);
            clearTimeout(t);
        } else {
            console.log('Waiting...');
            t  = setTimeout(self.waitForResponseParse, 500);
        }
    };

    self.updateCompaniesData = function() {
        self.waiter.show();
        self.companiesLoaded(false);
        self.requestsHandled = 0;
        allCompanies = [];
        self.requestsCount(self.requestData().length);

        for (var i = 0; i < self.requestsCount(); i++) {
            self.sendRequest(self.requestData()[i]);
        }

        var t = setTimeout(self.waitForResponseParse, 100);
    };

    self.companiesLoaded.subscribe(function(newVal) {
        if (newVal == true) {
            updateCompaniesOnMap();
            self.waiter.hide();
            // TODO: 
            // loadBordersAndPaint(_colors1);
        }
    });
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


