var app = angular.module('testApp', ['elasticsearch']);

app.factory('elasticClient', ['esFactory', function (esFactory) {
    return esFactory({
        host: 'http://localhost:9200',
        sniffOnStart: true,
        sniffInterval: 300000
    });
}]);