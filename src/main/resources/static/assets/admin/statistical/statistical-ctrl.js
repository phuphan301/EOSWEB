app.controller("statistical-ctrl", function ($scope, $http,  $timeout) {
  $scope.order = [];
  $timeout(function () {
    $scope.initialize();
  });
  $scope.initialize = function () {
    const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  };

  $scope.initialize();
})