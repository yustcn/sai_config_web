angular.module('RawdataDownloadTool', [])
.controller('RawdataDownloadToolController', function ($scope, $http) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.defaults.headers.post['dataType'] = 'json'
    $scope.isShow=false;

    $scope.submit = function(isValid) {
        if (isValid) {
            $http.post("/rawdata/v1/search", {'clientId': $scope.clientId,
                                                'diaLogId': $scope.dialogId ,
                                                'audioType': $scope.audioType,
                                                'beginTime':$scope.beginTime,
                                                'endTime': $scope.endTime }
                )
                .then(function successCallback(response) {
                    if(response.status == 200 && response.data.errorCode == 0){
                        $scope.resultItems = response.data.rawDataEntities;
                        angular.forEach($scope.resultItems, function(item){
                            item.createTime = new Date(item.createTime + 8*3600*1000).toISOString();
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
        }

    };
});

