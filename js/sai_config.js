APP.controller('RawdataDownloadToolController',
    function($scope, $http) {
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

                $http.post("/rawdata/v1/create_sai_config_file", {
                    'corp': $scope.CORP
                    ,'mictype': $scope.MicType
                    ,'mic_radius': $scope.MIC_RADIUS
                    ,'nfft':$scope.NFFT
                    ,'in_len':$scope.In_len
                    ,'fs':$scope.Fs
                    ,'mic_num':$scope.mic_num
                    ,'speaker_num':$scope.speaker_num
                    ,'doa_once':$scope.doa_once
                    ,'doa_result':$scope.doa_result
                    ,'amplify':$scope.amplify
                    ,'wakeupth':$scope.wakeupth
                    ,'wakeupmode':$scope.wakeupmode
                    ,'vad_amplify':$scope.VAD_amplify
                    ,'aec_on':$scope.AEC_ON
                    ,'wakeup_denoise_on':$scope.WAKEUP_DENOISE_ON
                    ,'dereverb_on':$scope.DEREVERB_ON
                    ,'adaptivebeam_on':$scope.ADAPTIVEBEAM_ON
                    ,'monoen_on':$scope.MONOEN_ON
                    ,'agc_on':$scope.AGC_ON
                    ,'board':$scope.BOARD
                    ,'sample':$scope.SAMPLE

                    ,'led_on':$scope.LED_ON
                    ,'gesture_on':$scope.GESTURE_ON
                    ,'hw':$scope.HW
                    ,'ch_map':$scope.CH_MAP
                    ,'external_source':$scope.EXTERNAL_SOURCE
                    ,'sample_rate':$scope.SAMPLE_RATE
                    ,'bit':$scope.BIT
                    ,'mic_shift_bits':$scope.MIC_SHIFT_BITS
                    ,'ref_shift_bits':$scope.REF_SHIFT_BITS
                    ,'fake_outdir':$scope.FAKE_OUTDIR
                    ,'wopt_bin_name':$scope.WOPT_BIN_NAME

            }).then(function successCallback(response) {
            if (response.status == 200 && response.data.errorCode == 0) {
             
               //alert("保存完成！"+"地址："+response.data.url );

                $scope.downLoadUrl=response.data.downLoadUrl;
                document.getElementById("tag_a").click();
                // var r=confirm("要下载结果文件吗？")
                // if (r==true)
                // {
                //     document.getElementById("tag_a").click();
                //    // angular.element("#tag_a").click();这个东西不好使。
                // }
                // else
                // {
                //
                // }

                queryEnd($scope);
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
