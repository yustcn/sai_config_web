APP.controller('RawdataDownloadToolController',
    function($scope, $http) {
        var ctrl = this;
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.post['dataType'] = 'json';
        $scope.isShow = false;
        $scope.isShowImg = false;
        $scope.sub_text = 'Submit';
        $scope.is_show_page = true;
        $scope.submit = function(isValid) {
            $scope.isShow = false;
            $scope.resultItems = null;
            if (isValid) {
                $scope.sub_text = '加 载 中';
                $scope.isShowImg = true;
                $scope.sub_disable = true;
                $http.post("/rawdata/v1/search_by_page", {
                    'clientId': $scope.clientId,
                    'diaLogId': $scope.diaLogId,
                    'audioType': $scope.audioType,
                    'beginTime': $scope.beginTime,
                    'endTime': $scope.endTime,
                    'currentPage': "0",
                    'pageSize': "100" //这里设置每个分页多少条数据
                }).then(function successCallback(response) {
                        if (response.status == 200 && response.data.errorCode == 0) {
                            $scope.resultItems = response.data.rawDataEntities;
                            angular.forEach($scope.resultItems,
                                function(item) {
                                    item.createTime = new Date(item.createTime + 8 * 3600 * 1000).toISOString();
                                });
                            if ($scope.resultItems && $scope.resultItems.length > 0) {
                                $scope.downloadUrl = response.data.downLoadUrl;
                                $scope.isShow = true;
                                $scope.sub_disable = false;
                                $scope.sub_text = 'Submit';
                                $scope.isShowImg = false;
                                ctrl.itemCnt = response.data.totalCount;
                                ctrl.itemCntEachPage = response.data.pageSize;
                                $scope.is_show_paging = true;

                                ctrl.onChange = function() {
                                    $scope.isShowImg2 = true;
                                    $http.post("/rawdata/v1/search_by_page", {
                                        'clientId': $scope.clientId,
                                        'diaLogId': $scope.diaLogId,
                                        'audioType': $scope.audioType,
                                        'beginTime': $scope.beginTime,
                                        'endTime': $scope.endTime,
                                        'currentPage': ctrl.currentPage,
                                        'pageSize': ctrl.itemCntEachPage
                                    }).then(function successCallback(response) {
                                            if (response.status == 200 && response.data.errorCode == 0) {
                                                $scope.resultItems = response.data.rawDataEntities;
                                                angular.forEach($scope.resultItems,
                                                    function(item) {
                                                        item.createTime = new Date(item.createTime + 8 * 3600 * 1000).toISOString();
                                                    });
                                                if ($scope.resultItems && $scope.resultItems.length > 0) {
                                                    $scope.downloadUrl = response.data.downLoadUrl;
                                                    $scope.isShow = true;
                                                    $scope.sub_disable = false;
                                                    $scope.sub_text = 'Submit';
                                                    $scope.isShowImg = false;
                                                    ctrl.itemCnt = response.data.totalCount;
                                                    ctrl.itemCntEachPage = response.data.pageSize;
                                                    $scope.isShowImg2 = false;
                                                } else {
                                                    alert("没有找到结果.");
                                                    $scope.isShow = false;
                                                    $scope.sub_disable = false;
                                                    $scope.sub_text = 'Submit';
                                                    $scope.isShowImg = false;
                                                }
                                            } else {
                                                alert("error " + response.data.errorCode + " errorMsg " + response.data.errorMessage);
                                                queryEnd($scope);
                                            }
                                        },
                                        function errorCallback(response) {
                                            alert("error " + response.status);
                                            queryEnd($scope);
                                        });
                                }
                            } else {
                                alert("没有找到结果.");
                                $scope.isShow = false;
                                queryEnd($scope);
                            }
                        } else {
                            alert("error " + response.data.errorCode + " errorMsg " + response.data.errorMessage);
                            queryEnd($scope);
                        }
                    },
                    function errorCallback(response) {
                        alert("error " + response.status);
                        queryEnd($scope);
                    });
            }
        };
    });

function queryEnd($scope) {
    $scope.sub_disable = false;
    $scope.sub_text = 'Submit';
    $scope.isShowImg = false;
}