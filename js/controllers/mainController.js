app.controller('mainController', function ($scope, elasticClient) {
    $scope.results = [];
    $scope.autoCompleteResults = [];
    $scope.highlightResults = [];
    $scope.search = {
        queryTerm: ''
    };

    $scope.autoComplete = function () {
        elasticClient.search({
            index: 'books',
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
            index: 'books',
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
        
        elasticClient.search({
            index: 'books',
            body: {
				'query':{
					'filtered':{
						'query':{
							'match':{
								'_all':{
									'query':$scope.search.queryTerm,
									'type':'phrase'
									}
								}
							}
						}
					},
				'highlight':{
					'pre_tags':'<em>',
					'post_tags':'</em>',
					'fields':{'*':{}}
				}
			}
        }).then(function (response) {
            $scope.highlightResults = response.hits.hits;
        });
    }
});
