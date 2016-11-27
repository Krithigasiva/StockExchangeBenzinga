var ComponentsQuery = "SELECT distinct [Component],[RowPosition] FROM [HDW_EMIR].[Configuration].[ProcessFlowInformation] order by  [RowPosition]";
var ConfigurationQuery = "SELECT  [Configuration] FROM [HDW_EMIR].[Configuration].[ProcessFlowInformation] where Component='$$$$' order by ColumnPosition"
var checkComponentsQuery = "SELECT [DictionaryQuery] FROM [HDW_EMIR].[Configuration].[TableCatalog] where [DisplayName]='EIM Components'";
var dropdownQuery = "SELECT [ID],[SubjectAreaName] FROM [HDW_EMIR].[Configuration].[SubjectArea] where active =1 union SELECT 0,'Configuration' FROM [HDW_EMIR].[Configuration].[SubjectArea] where active =1";
var innertableQuery;
var navigation;
var initialize = angular.module("indexhtml", []); //initialise the angular module
var dropdownGlobal = null;;
var alreadyexpanded = false;
var elements;
var j = 0;
var deferred;

//This is my service to connect to web service and return json object for what ever query comes in .
initialize.service('MyServices', function ($http, $q) {

    this.webServiceCall = function (q) {
        return $http({
            method: 'POST',
            url: 'http://data.benzinga.com/rest/richquoteDelayed',
            //dataType: 'json',
            data: 'query=' + q,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).
         then(function (results) {
             console.log(results);
             return results.data;

         })
         .catch(function (error) {
             $log.error('ERROR:', error);
             console.log(error);
             throw error;
         });
    }
});

initialize.controller("maincontroller", function ($scope, MyServices, $document) {

    $scope.details = '';
    $scope.Configurations = [];
    $scope.flowarea = false;
  
    var changeColor = {};
    MyServices.webServiceCall(dropdownQuery).then(function (data) {
        $scope.projectlist = data;
    });
    
});
