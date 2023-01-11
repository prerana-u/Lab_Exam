angular.module("myApp",[])

.controller("myController",function($scope,$http)
{
    $http.get("http://localhost:3000/depsearch")
    .then(function(response) {
      $scope.datas=response.data;
      console.log("hi");
});
});