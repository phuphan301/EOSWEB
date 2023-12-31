app.controller("product-ctrl",function($scope,$http){
    $scope.items = [];
    $scope.form = {};
    $scope.cates = [];

    $scope.initialize = function(){
        //load products
        $http.get("/rest/products").then(resp=>{
            $scope.items = resp.data;
            $scope.items.forEach(item=>{
                item.createDate = new Date(item.createDate);
            })
        })
        //load categories
        $http.get("/rest/categories").then(resp=>{
            $scope.cates = resp.data;
        })
    }

    //Xoá form
    $scope.reset = function(){
		$scope.form = {
			createDate:new Date(),
			image:'cloud-upload.jpg',
			available:true,
		}
    }

    //Hiển thị lên form
    $scope.edit = function(item){
		$scope.form = angular.copy(item);
		$('#pills-home-tab').tab('show');
    }

    //Thêm sản phẩm
    $scope.create = function(){
		var item = angular.copy($scope.form);
		if ($scope.form.name == null || $scope.form.name == "") {
			alert("Tên sản phẩm không được bỏ trống!");
			return;
		}
		if ($scope.form.price == null || $scope.form.price == "") {
			alert("Giá không được bỏ trống!");
			return;
		}
		if ($scope.form.price < 0 || $scope.form.price === 0) {
			alert("Giá không phù hợp!");
			return;
		}
		if ($scope.form.screen == null || $scope.form.screen == "") {
			alert("Screen không được bỏ trống!");
			return;
		}
		if ($scope.form.ram == null || $scope.form.ram == "") {
			alert("Ram không được bỏ trống!");
			return;
		}
		if ($scope.form.harddrive == null || $scope.form.harddrive == "") {
			alert("Hard Drive không được bỏ trống!");
			return;
		}
		if ($scope.form.cpu == null || $scope.form.cpu == "") {
			alert("Cpu không được bỏ trống!");
			return;
		}
		if (!$scope.form.category.id) {
			// Hiển thị thông báo lỗi hoặc thực hiện các hành động khác tùy thuộc vào yêu cầu của bạn
			alert("Bạn chưa chọn loại sản phẩm!");
			return; // Ngăn chặn tiếp tục xử lý khi có lỗi
		}
		if ($scope.form.description == null || $scope.form.description == "") {
			alert("Mô tả sản phẩm không được bỏ trống!");
			return;
		}
		$http.post(`/rest/products`,item).then(resp=>{
			resp.data.createDate = new Date(resp.data.createDate);
			$scope.items.push(resp.data);
			$scope.reset();
			alert('Thêm mới sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi thêm mới sản phẩm!')
			console.log("Error ",err);
		})
    }

    //Update sản phẩm
    $scope.update = function(){
		var item = angular.copy($scope.form);
		if ($scope.form.name == null || $scope.form.name == "") {
			alert("Tên sản phẩm không được bỏ trống!");
			return;
		}
		if ($scope.form.price == null || $scope.form.price == "") {
			alert("Giá không được bỏ trống!");
			return;
		}
		if ($scope.form.price < 0 || $scope.form.price == 0) {
			alert("Giá không phù hợp!");
			return;
		}
		if ($scope.form.screen == null || $scope.form.screen == "") {
			alert("Screen không được bỏ trống!");
			return;
		}
		if ($scope.form.ram == null || $scope.form.ram == "") {
			alert("Ram không được bỏ trống!");
			return;
		}
		if ($scope.form.harddrive == null || $scope.form.harddrive == "") {
			alert("Hard Drive không được bỏ trống!");
			return;
		}
		if ($scope.form.cpu == null || $scope.form.cpu == "") {
			alert("Cpu không được bỏ trống!");
			return;
		}
		if (!$scope.form.category.id) {
			// Hiển thị thông báo lỗi hoặc thực hiện các hành động khác tùy thuộc vào yêu cầu của bạn
			alert("Bạn chưa chọn loại sản phẩm!");
			return; // Ngăn chặn tiếp tục xử lý khi có lỗi
		}
		if ($scope.form.description == null || $scope.form.description == "") {
			alert("Mô tả sản phẩm không được bỏ trống!");
			return;
		}
		$http.put(`/rest/products/${item.id}`,item).then(resp=>{
			var index = $scope.items.findIndex(p=>p.id == item.id);
			$scope.items[index] = item;
			alert('Cập nhật sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi cập nhật sản phẩm!')
			console.log("Error ",err);
		})
	}

    //Remove sản phẩm
    $scope.delete = function(item){
		$http.delete(`/rest/products/${item.id}`).then(resp=>{
			var index = $scope.items.findIndex(p=>p.id == item.id);
			$scope.items.splice(index,1);
			$scope.reset();
			alert('Xoá sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi xoá sản phẩm!')
			console.log("Error ",err);
		})
	}

    //Upload Hình
    $scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file',files[0]);
		$http.post('/rest/upload/images',data,{
			transformRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp=>{
			$scope.form.image = resp.data.name;
		}).catch(err=>{
			alert('Lỗi upload Ảnh');
			console.log("Error ",err)
		})
    }
    
    $scope.pager = {
		page:0,
		size:10,
		get items(){
			var start = this.page * this.size;
			return	$scope.items.slice(start,start+this.size);
		},
		get count(){
			return Math.ceil(1.0*$scope.items.length/this.size);
		},
		first(){
			this.page = 0;
		},
		previous(){
			this.page--;
			if(this.page<0){
				this.last();
			};
		},
		next(){
			this.page++;
			if(this.page >= this.count){
				this.first();
			};
		},
		last(){
			this.page = this.count -1;
		},
	}
	
	//Khởi đầu
    $scope.initialize();
	$scope.reset();
})