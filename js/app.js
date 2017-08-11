angular.module('RawdataDownloadTool', [])
.controller('RawdataDownloadToolController', function ($scope, $http) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.defaults.headers.post['dataType'] = 'json'
    $scope.isShow=false;
    $scope.submit = function() {
        $http.post('http://localhost:8000/rawdata/v1/search', {'clientId': $scope.clientId, 'audioType': $scope.audioType,
                            'beginTime':$scope.beginTime,
                            'endTime': $scope.endTime }
            )
            .then(function successCallback(response) {
                if(response.status == 200 && response.data.errorCode == 0){
                    $scope.resultItems = response.data.rawDataEntities;
                    angular.forEach($scope.resultItems, function(item){
                        item.createTime = new Date(item.createTime).toISOString();
                    });
                    if ($scope.resultItems.length > 0) {
                        $scope.downloadUrl=response.data.downLoadUrl;
                        $scope.isShow=true;
                    } else {
                        $scope.isShow=false;
                    }
                } else {
                    alert("error " + response.data.errorCode + " errorMsg " + response.data.errorMessage)
                }
            }, function errorCallback(response) {
                alert("error " + response.status);
            });

    };
});

