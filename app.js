import weatherIcons from './weatherIcons.json';

const API_URL = 'https://community-open-weather-map.p.rapidapi.com/weather';

const KELVIN_RATE = 273.15;

const MAX_WEATHER_BOXES = 2;

const ICONS_FOLDER_PATH = 'icons/';
const ICON_FORMAT = 'png';

// api key is supposed to be stored in env vars
const fetchCityWeather = function (city) {
    return axios.get(`${API_URL}?q=${city}`, {
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "0070e351f9msha11a024c200e5ebp17788cjsnc377c56db6e6"
        }
    })
        .then((response) => response.data, (error) => Promise.reject(error.response));
};

const CityWeather = function (name, temp, icon, label) {
    this.name = name;
    this.temp = temp;
    this.icon = icon;
    this.label = label;
    this.getCelsius = function () {
        return (this.temp - KELVIN_RATE).toFixed(0);
    }
    this.getIconPath = function () {
        return `${ICONS_FOLDER_PATH}${this.icon}.${ICON_FORMAT}`;
    }
}

const WeatherViewModel = function () {
    this.term = ko.observable("");
    this.cities = ko.observableArray();
    this.isLoading = ko.observable(false);
    this.showErrorMessage = ko.observable(false);

    this.isTermEmpty = function () {
        return this.term().length === 0;
    };

    this.getCity = function () {
        const city = this.term();

        if (this.isTermEmpty()) {
            alert('Please enter a city name');
            return;
        }

        this.isLoading(true);

        fetchCityWeather(city)
            .then(({ name, main, weather }) => {
                const icon = weatherIcons[weather[0].id].icon;
                const label = weatherIcons[weather[0].id].label;

                this.cities.removeAll();
                this.cities.push(new CityWeather(name, main.temp, icon, label));
            }, () => this.showErrorMessage(true))
            .finally(() => this.isLoading(false));
    }

    this.compareCities = function () {
        const city = this.term();
        const cities = this.cities().length;

        if (this.isTermEmpty()) {
            alert('Please enter a city name');
            return;
        }

        if (cities && this.cities()[0].name === city) {
            alert('Please enter another city to compare with');
            return;
        }

        this.isLoading(true);

        fetchCityWeather(city)
            .then(({ name, main, weather }) => {
                const icon = weatherIcons[weather[0].id].icon;
                const label = weatherIcons[weather[0].id].label;

                if (cities === MAX_WEATHER_BOXES) {
                    this.cities.pop();
                }

                this.cities.push(new CityWeather(name, main.temp, icon, label));
            }, () => this.showErrorMessage(true))
            .finally(() => this.isLoading(false));
    }

    this.hideErrorMessage = function (data, { type, keyCode }) {
        const isClicked = type === 'click';
        const isEnterPressed = type === 'keypress' && keyCode === 13;

        if (isClicked || isEnterPressed) {
            this.showErrorMessage(false);
        }
    };

    this.fadeIn = function (element) {
        $(element).hide();
        $(element).fadeIn();
    };
};

window.onload = function init() {
    ko.applyBindings(new WeatherViewModel());
}
