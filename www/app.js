requirejs.config({
    baseUrl: 'lib',
    paths: {
        knockout: 'knockout-3.5.1',
        jquery: 'jquery-3.4.1.min',
        axios: 'axios.min',
        app: '../app'
    }
});

requirejs(['knockout', 'domReady', 'app/image-search'], function (ko, domRady, weatherViewModel) {
    domRady(function init() {
        ko.applyBindings(new weatherViewModel());
    });
});
