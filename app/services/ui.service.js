uiApp.service('uiService',['$http','$q',function($http,$q){


    this.getTeamWiseData = function(){
        var defer = $q.defer();
        $http.get('app/data.json')
            .then(function(response){
                defer.resolve(response.data);
            },function(error){
                defer.reject(error);
            });
            return defer.promise;
    }
}]);