(function () {

  'use strict';

  angular.module('DownloaderApp', [])

  .controller('DownloaderController', ['$scope', '$log', '$http', '$timeout',
    function($scope, $log, $http, $timeout) {
        var timeout = "";

        $scope.addDownload = function () {
            $http.post('/add', {'url': $scope.url}).success(function (results) {
                $log.log(results);
                $('#url-box').val('');
                $('#url-box').attr('rows', 1);
            }).error(function (error) {
                $log.log(error);
            });
        };

        $scope.deleteDownload = function (id) {
            $http.delete('/remove/' + id).success(function (results) {
                $log.log(results);
            }).error(function (error) {
                $log.log(error);
            });
        };

        $scope.restartDownload = function (id) {
            $http.post('/restart/' + id).success(function (results) {
                $log.log(results);
            }).error(function (error) {
                $log.log(error);
            })
        };

        $scope.getDownloads = function () {
            $http.get('/downloads').success(function (results) {
                $scope.downloads = results;
                timeout = $timeout($scope.getDownloads, 2000);
            }).error(function (error) {
                $log.log(error);
                $timeout.cancel(timeout);
            });
        };

        $scope.getDownloads();

        $scope.$watch('url', function () {
            $('#url-box').attr('rows', $('#url-box').val().split('\n').length);
        });

    }])
      .filter('bytes', function() {
            return function(bytes, precision) {
                if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
                if (typeof precision === 'undefined') precision = 1;
                var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                    number = Math.floor(Math.log(bytes) / Math.log(1024));
                return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
            }
      });

}());

$(function(){
    $('a.disabled').on('click',function(event){
        event.preventDefault();
    });
});
