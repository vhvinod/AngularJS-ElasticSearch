app.controller('mainController', function ($scope, elasticClient) {
    $scope.results = [];
    $scope.autoCompleteResults = [];
    $scope.highlightResults = [];
	$scope.fuzzyResults = [];
	$scope.multiIndexResults = [];
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
            size: 20,
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
			size: 30,
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
		
		elasticClient.search({
            index: 'fuzzy',
            body: {
			  'query': {
				'multi_match': {
				  'fields':  [ 'bookName', 'description','type' ],
					'query': $scope.search.queryTerm,
					'fuzziness': 2,
					'prefix_length': 1
				}
			  }
			}
        }).then(function (response) {
            $scope.fuzzyResults = response.hits.hits;
        });
		
		elasticClient.search({
            index: 'users,books',
            body: {
                'query': {
                    'query_string': {
                        'query': $scope.search.queryTerm
                    }
                }
            }
        }).then(function (response) {
            $scope.multiIndexResults = response.hits.hits;
        });
    }
});
