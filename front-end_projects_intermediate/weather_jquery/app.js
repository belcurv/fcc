/*jslint */
/*globals console, $ */

(function () {
    'use strict';
    
    var weatherModule = {
        units: "F",
        
        locApiEndpoint: "http://ip-api.com/json",
        
        weatherApi: {
            endpoint: "http://api.aerisapi.com/observations/closest",
            params: {
                client_id: "jzZUiGjVLSgY2oRYeDUHY",
                client_secret: "zRdiCDMVKZC1IWjF3ikpyDiQHJSaeRjkk6e8YTKT"
            }
        },
        
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.getLocation();
        },
        
        cacheDom: function () {
            this.$el     = $("#weatherModule");
            this.$button = this.$el.find("button");
            this.$city   = this.$el.find("#city");
            this.$cond   = this.$el.find("#conditions");
            this.$temp   = this.$el.find("#temp");
            this.$icon   = this.$el.find("#icon");
        },
        
        render: function () {
            this.$city.html(this.weather.city);
            this.$cond.html(this.weather.conditions);
            this.$temp.html(this.weather.tempF);
            this.$icon.html(this.weather.icon);
        },
        
        bindEvents: function () {
            this.$button.on("click", this.toggleUnits.bind(this));
        },
        
        toggleUnits: function () {
            if (this.units === "F") {
                this.units = "C";
                this.$temp.html(this.weather.tempC);
            } else {
                this.units = "F";
                this.$temp.html(this.weather.tempF);
            }
        },
        
        getLocation: function () {
            $.getJSON(this.locApiEndpoint, this.getWeather.bind(this));
        },
        
        getWeather: function (location) {
            var lat = location.lat,
                lon = location.lon,
                fullUrl = this.weatherApi.endpoint + "?p=" + lat + "," + lon;

            $.getJSON(fullUrl, this.weatherApi.params, this.weatherCallback.bind(this));
        },
        
        weatherCallback: function (weather) {
            var res = weather.response[0];
    
            this.weather = {
                city       : res.place.name + ', ' + res.place.state,
                conditions : res.ob.weather,
                tempC      : res.ob.tempC + 'C',
                tempF      : res.ob.tempF + 'F',
                icon       : res.ob.icon
            };
            
            this.render();
        }
    };

    // kick it off
    weatherModule.init();

}());