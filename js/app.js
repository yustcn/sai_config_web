angular.module('RawdataDownloadTool', [])
.controller('RawdataDownloadToolController', function ($scope, $http) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.defaults.headers.post['dataType'] = 'json'
    $scope.isShow=false;

    $scope.submit = function() {
        var url = "http://cs-" + $scope.stage + ".sai.corp:8000/rawdata/v1/search"
        $http.post(url, {'clientId': $scope.clientId, 'audioType': $scope.audioType,
                            'beginTime':$scope.beginTime,
                            'endTime': $scope.endTime }
            )
            .then(function successCallback(response) {
                if(response.status == 200 && response.data.errorCode == 0){
                    $scope.resultItems = response.data.rawDataEntities;
                    angular.forEach($scope.resultItems, function(item){
                        item.createTime = new Date(item.createTime).toISOString();
                    });
                    if ($scope.resultItems && $scope.resultItems.length > 0) {
                        $scope.downloadUrl=response.data.downLoadUrl;
                        $scope.isShow=true;
                    } else {
                        alert("没有找到结果.")
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

