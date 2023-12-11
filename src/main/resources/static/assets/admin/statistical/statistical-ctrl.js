app.controller("statistical-ctrl", function ($scope, $http) {
  $scope.order = [];
  $scope.startDate = new Date();
  $scope.endDate = new Date();
  $scope.revenueData = [];
  $scope.chart = null;
  $scope.chartCategories = null;
  $scope.revenueCategories = [];
  $scope.startDateCate = new Date();
  $scope.endDateCate = new Date();
  $scope.initialize = function () {
    $http.get("/rest/orders/RevenueProduct").then(resp => {
      $scope.revenueData = resp.data;

      const labels = $scope.revenueData.map(item => item[0]);  // Mảng nhãn
      const revenueValues = $scope.revenueData.map(item => item[2]);  // Mảng giá trị
      //const quantitiesValues = $scope.revenueData.map(item => item[1]) // Lấy ra giá trị tổng số lượng của sản phẩm

      const ctx = document.getElementById('myChart');

      $scope.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue',
            data: revenueValues,
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
    });

    // const ctx = document.getElementById('myChart');

    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  };

  $scope.datacategories = function () {
    $http.get('/rest/orders/RevenueCategories').then(resp => {
      $scope.revenueCategories = resp.data;

      const labels = $scope.revenueCategories.map(item => item[0]);  // Mảng nhãn
      const revenueValues = $scope.revenueCategories.map(item => item[2]);  // Mảng giá trị

      const chartCate = document.getElementById('chartCategories');

      $scope.chartCategories = new Chart(chartCate, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue',
            data: revenueValues,
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

    });
  };

  $scope.updateData = function () {
    // Format ngày giờ theo định dạng ISO 8601
    console.log('Start-Date: ' + $scope.startDate);
    console.log('End-Date: ' + $scope.endDate);
    var isoStartDate = moment($scope.startDate).format('YYYY-MM-DD');
    var isoEndDate = moment($scope.endDate).format('YYYY-MM-DD');
    console.log('ISO Start-Date: ' + isoStartDate);
    console.log('ISO End-Date: ' + isoEndDate);
    $http.get('/rest/orders/byDate', {
      params: {
        startDate: isoStartDate,
        endDate: isoEndDate
      }
    }).then(function (response) {
      $scope.revenueData = response.data;

      // Xóa và tạo lại biểu đồ
      if ($scope.chart) {
        $scope.chart.destroy();
      }

      // Chuyển đổi dữ liệu thành định dạng phù hợp cho biểu đồ
      const labels = $scope.revenueData.map(item => item[0]);  // Mảng nhãn
      const revenueValues = $scope.revenueData.map(item => item[2]);  // Mảng giá trị

      // Cập nhật biểu đồ
      const ctx = document.getElementById('myChart');

      $scope.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue',
            data: revenueValues,
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

    });
  };

  $scope.updateDateCategories = function () {
    var isoStartDate = moment($scope.startDateCate).format('YYYY-MM-DD');
    var isoEndDate = moment($scope.endDateCate).format('YYYY-MM-DD');
    console.log('ISO Start-Date Categories: ' + isoStartDate);
    console.log('ISO End-Date Categories: ' + isoEndDate);

    $http.get('/rest/orders/Categories/byDate', {
      params: {
        startDateCate: isoStartDate,
        endDateCate: isoEndDate
      }
    }).then(function (response) {
      $scope.revenueCategories = response.data;

      
      // Xóa và tạo lại biểu đồ
      if ($scope.chartCategories) {
        $scope.chartCategories.destroy(); 
      }

      const labels = $scope.revenueCategories.map(item => item[0]);  // Mảng nhãn
      const revenueValues = $scope.revenueCategories.map(item => item[2]);  // Mảng giá trị

      const chartCate = document.getElementById('chartCategories');

      $scope.chartCategories = new Chart(chartCate, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue Categories',
            data: revenueValues,
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

    });
  };

  // $scope.getRevenue = function () {
  //   $http.get('/rest/orders/byDate', { params: { startDate: $scope.startDate.toISOString(), endDate: $scope.endDate.toISOString() } })
  //     .then(function (response) {
  //       $scope.revenueData = response.data;
  //     });
  // };

  // Gọi updateData khi trang được load lần đầu
  //$scope.updateData();

  $scope.initialize();
  $scope.datacategories();

  $scope.pager = {
    page: 0,
    size: 10,
    get revenueData() {
      var start = this.page * this.size;
      return $scope.revenueData.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil(1.0 * $scope.revenueData.length / this.size);
    },
    first() {
      this.page = 0;
    },
    previous() {
      this.page--;
      if (this.page < 0) {
        this.last();
      };
    },
    next() {
      this.page++;
      if (this.page >= this.count) {
        this.first();
      };
    },
    last() {
      this.page = this.count - 1;
    },
  }

})