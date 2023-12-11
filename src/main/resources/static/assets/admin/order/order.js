app.controller("order-ctrl",function($scope, $http, $filter){
    $scope.listOrder = [];
    $scope.currentPage = 0;
    $scope.order = {};
    $scope.detailOrder = [];
    $scope.statusOptions = ['processing', 'shipped', 'received','delivered','fail'];
    $scope.order = {}; 
    $scope.loadListOrder = function(page){
        $http.get("/rest/orders/getListOrder/" + page).then(resp=>{
            $scope.listOrder = resp.data.content;
            originalList = resp.data.content;
            $scope.totalPages = resp.data.totalPages;
            pageList = resp.data.totalPages;
        })
    }
    $scope.loadListOrder(1);

    //Phân trang 
    $scope.prevPage = function () {
        if ($scope.currentPage === 0) {
          return;
        } else {
          $scope.currentPage = $scope.currentPage - 1; // Cập nhật trang hiện tại
          $scope.loadListOrder($scope.currentPage);
        }
      };
  
      $scope.nextPage = function () {
        if ($scope.currentPage === $scope.totalPages - 1) {
          return;
        } else {
          $scope.currentPage = $scope.currentPage + 1; // Cập nhật trang hiện tại
          $scope.loadListOrder($scope.currentPage);
        }
      };

    $scope.clickDate = function() {
        $http.get("/rest/orders/filterDatePage/" + $scope.startDate + "/" + $scope.endDate).then(resp=>{
            $scope.listOrder = resp.data.content;
            $scope.totalPages = resp.data.totalPages;
            pageList = resp.data.totalPages;
        })
    }

    $scope.searchOrder = function(){
        var selected = document.getElementById('selectedSearch').value;
        if($scope.searchValue == ''){
            $scope.listOrder = originalList;
            $scope.totalPages = pageList;
        }else{
            if(selected == '0'){
                $http.get("/rest/orders/searchListOrderId/" + 0 + "/" + $scope.searchValue).then(resp=>{
                    $scope.listOrder = resp.data.content;
                    $scope.totalPages = resp.data.totalPages;   
                })
            }else{
                $http.get("/rest/orders/searchListOrderUser/"+ 0 + "/" + $scope.searchValue).then(resp=>{
                    $scope.listOrder = resp.data.content;
                    $scope.totalPages = resp.data.totalPages;
                    
                })
            }
        }
    }

    $scope.orderDetail = function (id){
        $http.get("/rest/orders/detailOrder/"+ id).then(resp=>{
            $scope.detailOrder = resp.data;
            console.log(detailOrder);
        })
        $http.get("/rest/orders/orderById/"+ id).then(resp=>{
            $scope.order = resp.data;
            console.log(order);
        })
        document.getElementById('orderHtml').style.display = 'none';
        document.getElementById('orderDetailHtml').style.display = 'block';
    }

    $scope.backToListOrder = function(){
        document.getElementById('orderHtml').style.display = 'block';
        document.getElementById('orderDetailHtml').style.display = 'none';
    }

    //Update order
    $scope.update = function(){
		var item = angular.copy($scope.order);
		$http.put(`/rest/orders/${item.id}`,item).then(resp=>{
			var index = $scope.listOrder.findIndex(p=>p.id == item.id);
			$scope.listOrder[index] = item;
			alert('Cập nhật Hóa đơn thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi cập nhật hóa đơn!')
			console.log("Error ",err);
		})
	}
});