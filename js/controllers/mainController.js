app.controller('mainController', function ($scope, elasticClient) {
    $scope.results = [];
    $scope.autoCompleteResults = [];
    $scope.search = {
        queryTerm: ''
    };

    $scope.autoComplete = function () {
        elasticClient.search({
            index: 'user',
            size: 10,
            body: {
                'query': {
                    'query_string': {
                        'query': $scope.search.queryTerm
                    }
                }
            }
        }).then(function (response) {
            $scope.autoCompleteResults = response.hits.hits;
        });
    };

    $scope.search = function () {
        elasticClient.search({
            index: 'bank',
            size: 10,
            body: {
                'query': {
                    'query_string': {
                        'query': $scope.search.queryTerm
                    }
                }
            }
        }).then(function (response) {
            $scope.results = response.hits.hits;
        });
    }
});