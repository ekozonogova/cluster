;

function Settings() {
	var self = this;
	this.shareDescription = "";
	this.minOrderSum = ko.observable(null);
    this.countOfProductsToShow = 4;
	this.siteIndex = "";
	this.imgSize = 1000;
	this.imgSizeMax = 3000;
	this.imgSizeMin = 600;	
	this.serverRoot = '127.0.0.1'; // TODO: take this from server
	this.noProdImg = 'http://127.0.0.1/static/img/no_prod_photo.png';
	this.urls = {
		feedback_view: "/feedback_view/",
		api: {
			categories: "/api/categories/",
			products: "/api/products/"
		},
		settings: "/settings/get/",
		randProducts: "/rand_products/",
		feedback: "/feedback/",
		search: {
			getRes: "/search/get/" 
		},
		categories: {
			getDict: "/categories/get/",
			getProducts: "/category/products/get/"
		},
		availableRegionsList: "/regions_list",
		identicalRegionsList: "/i_regions_list/",
		macroRegionMembers: "/m_region_members/",
		getKeywords: "/get_keywords/"
	};
	this.categoriesHeaderHeight = $("#cat-nav").outerHeight();

	this.addSetting = function (setting_name, setting_value) {
		self[setting_name] = setting_value;
	};

	this.isConfigured = ko.observable(false);
};

function Waiter() {
    var self = this;
    self.status = ko.observable(false);
    self.show = function () {
        self.status(true);
    };
    self.hide = function () {
        self.status(false);
    };
}

$(document).ready(function() {
	$('ul.nav-tabs').children().each(function(idx,elem) {
		$(this).children().removeClass('active');
		if (window.location.pathname.split('/')[1] == $(elem).children().attr('href')) {
			$(this).children().addClass('active');
		}
	});
});
