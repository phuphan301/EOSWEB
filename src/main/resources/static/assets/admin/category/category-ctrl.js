app.controller("category-ctrl",function($scope,$http){
    $scope.items = [];
    $scope.form = {};

    $scope.initialize = function(){
        //load category
        $http.get("/rest/categories").then(resp=>{
            $scope.items = resp.data;
        })
        //load categories
        // $http.get("/rest/categories").then(resp=>{
        //     $scope.cates = resp.data;
        // })
    }

    //Xoá form
    $scope.reset = function(){
		$scope.form = {
			image:'cloud-upload.jpg',
			available:true,
		}
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

    //Hiển thị lên form
    $scope.edit = function(item){
		$scope.form = angular.copy(item);
		$('#pills-home-tab').tab('show');
    }

    //Thêm loại sản phẩm
    $scope.create = function(){
		var item = angular.copy($scope.form);
		$http.post(`/rest/categories`,item).then(resp=>{
			resp.data.createDate = new Date(resp.data.createDate);
			$scope.items.push(resp.data);
			$scope.reset();
			alert('Thêm mới loại sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi thêm mới loại sản phẩm!')
			console.log("Error ",err);
		})
    }

    //Update loại sản phẩm
    $scope.update = function(){
		var item = angular.copy($scope.form);
		$http.put(`/rest/categories/${item.id}`,item).then(resp=>{
			var index = $scope.items.findIndex(p=>p.id == item.id);
			$scope.items[index] = item;
			alert('Cập nhật loại sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi cập nhật loại sản phẩm!')
			console.log("Error ",err);
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