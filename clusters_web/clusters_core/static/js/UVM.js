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

    self.availableSpecs = ko.observableArray([
        {
            "name": "Горно-добывающая промышленность",
            "values": [
                {
                    "name": "Добыча полезных ископаемых", 
                    "values": [
                        "прочие полезные ископаемые",
                        "добыча"
                    ]
                },
                {
                    "name": "Что то там еще", 
                    "values": [
                        "Какое то еще что то",
                        "добыча чего то еще там вот"
                    ]
                }
            ]
        }
        // {"name": "2list", "values": ["7890", "0987"]}
    ]);
    self.selectedSpec = ko.observable();

    self.availableProfiles = ko.computed(function() {
        if (self.selectedSpec()) {
            console.log(self.selectedSpec()["values"]);
            return self.selectedSpec()["values"];
        }
    });
    self.selectedProfile = ko.observable('');
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


