app.controller("account-ctrl",function($scope,$http,$location){
    $scope.authorities = [];
    $scope.items = [];
    $scope.form = {};
    $scope.roles = [];
    $scope.selection =[];
	//$scope.searchName = '';
    // $scope.initialRoles= [{name:"Customer",value:'CUST'},{name:"Staff",value:'STAF'},{name:"Director",value:'DIRE'}]
    $scope.initialize = function(){
		//load all roles
		$http.get("/rest/roles").then(resp=>{
			$scope.roles = resp.data;
		});
		
		//load accounts
		$http.get("/rest/accounts").then(resp=>{
			$scope.items = resp.data;
		})
		
		//load authorities of staffs and directors
		$http.get("/rest/authorities?admin=true").then(resp=>{
			$scope.authorities = resp.data;
		}).catch(err=>{
			$location.path("/unauthorized");
		})
		
		$scope.reset();
	}
	
	//Chọn roles
	$scope.atLeastOneCheckboxSelected = false;

	//Chọn roles
	$scope.toggleRole = function(role){
		var compareElement = -1;
		var idx = $scope.selection.indexOf(role);
		console.log(idx);
		//Currently Selected
		if(idx>-1){
			$scope.selection.splice(idx,1);
		}
		//Is newly added
		else{
			$scope.selection.push(role);
		}

		// Cập nhật atLeastOneCheckboxSelected
		$scope.atLeastOneCheckboxSelected = $scope.selection.length > 0;
	}
	
	//Load Roles on form by clicking Edit
	$scope.getOneByRole = function(username){
		$http.get(`/rest/authoritiesOne?username=${username}`).then(resp=>{
			$scope.selection = [];
			$scope.roles.forEach(e=>{
				resp.data.forEach(e1=>{
					if(e.name == e1.role.name){
						$scope.selection.push(e);
					}
				})
			})
		})
	}
	
	//Hiển thị lên form
    $scope.edit = function(item){
		$scope.form = angular.copy(item);
		$scope.getOneByRole(item.username);
		$scope.form.confirmPassword = $scope.form.password;
		$('#pills-home-tab').tab('show');
    }
	//Thêm account
    $scope.create = function(){
		var item = angular.copy($scope.form);
		if ($scope.form.username == null || $scope.form.username == "") {
			alert("Tên đăng nhập không được bỏ trống!");
			return;
		}
		if ($scope.form.password == null || $scope.form.password == "") {
			alert("Mật khẩu không được bỏ trống!");
			return;
		}
		if (!$scope.form.password || $scope.form.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test($scope.form.password)) {
		    alert("Password must contain at least 8 characters and at least one special character.")
		    return;
		}
		if ($scope.form.fullname == null || $scope.form.fullname == "") {
			alert("Họ tên không được bỏ trống!");
			return;
		}
		if ($scope.form.email == null || $scope.form.email == "") {
			alert("Email không được bỏ trống!");
			return;
		}
		if($scope.form.phonenumber == null || $scope.form.phonenumber == ""){
			alert("Phone Number không được bỏ trống")
			return
		}
		$http.post(`/rest/accountsManage`,item).then(resp=>{
			$scope.items.push(resp.data);
			console.log(resp.data);
			//thêm phân quyền
			$scope.selection.forEach(r=>{
				var authority = {account:item,role:r};
				$http.post(`/rest/authorities`,authority).then(resp=>{
					$scope.items.push(resp.data);
				}).catch(err=>{
					console.log("Error ",err);
				})
			})
			$scope.reset();
			alert("Thêm tài khoản thành công!");
		}).catch(err=>{
			console.log("Error ",err);
			alert("Thêm tài khoản thất bại!");
		})
    }

    //Update account
    $scope.update = function(){
		var item = angular.copy($scope.form);
		if ($scope.form.username == null || $scope.form.username == "") {
			alert("Tên đăng nhập không được bỏ trống!");
			return;
		}
		if ($scope.form.password == null || $scope.form.password === "") {
			alert("Mật khẩu không được bỏ trống!");
			return;
		}
		if (!$scope.form.password || $scope.form.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test($scope.form.password)) {
		    alert("Password must contain at least 8 characters and at least one special character.")
		    return;
		}
		if ($scope.form.fullname == null || $scope.form.fullname == "") {
			alert("Họ tên không được bỏ trống!");
			return;
		}
		if ($scope.form.email == null || $scope.form.email == "") {
			alert("Email không được bỏ trống!");
			return;
		}
		$http.put(`/rest/accounts/${item.username}`,item).then(resp=>{
			var index = $scope.items.findIndex(p=>p.username == item.username);
			$scope.items[index] = item;
			
			//xoá toàn bộ roles của user hiện tại
			$http.delete(`/rest/authoritiesOne/${item.username}`).then(resp=>{
			//sau khi xoá thì thêm mới lại role đã chọn
				$scope.selection.forEach(r=>{
					var authority = {account:item,role:r};
					$http.post(`/rest/authorities`,authority).then(resp=>{
						$scope.items.push(resp.data);
					}).catch(err=>{
						console.log("Error ",err);
					})
				})
			})
			alert('Cập nhật tài khoản thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi cập nhật tài khoản!')
			console.log("Error ",err);
		})
		
		
	}

/*	$scope.updateConfirmPassword = function() {
		// Gán giá trị từ trường mật khẩu vào trường xác nhận mật khẩu
		$scope.form.confirmPassword = $scope.form.password;
	  };*/

    //Remove account
/* */   $scope.delete = function(item){
		$http.delete(`/rest/accounts/${item.username}`).then(resp=>{
			var index = $scope.items.findIndex(p=>p.username == item.username);
			$scope.items.splice(index,1);
			$scope.reset();
			alert('Xoá User thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi xóa user!')
			console.log("Error ",err);
		})
	}

	//reset form
	$scope.reset = function(){
		$scope.form = {
			photo:'user.png',
		}
    }
    //Upload Hình
    $scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file',files[0]);
		$http.post('/rest/upload/avatar',data,{
			transformRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp=>{
			$scope.form.photo = resp.data.name;
		}).catch(err=>{
			alert('Lỗi upload Ảnh');
			console.log("Error ",err)
		})
    }
	//khởi đầu
	$scope.initialize();
	
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

	$scope.searchFullname = function(){
		//alert($scope.searchName);
		var keyword = $scope.searchName;
		console.log($scope.searchName);
        if($scope.searchName == ''){
            //load accounts
			$http.get("/rest/accounts").then(resp=>{
				$scope.items = resp.data;
			})
        }else{
            $http.get("/rest/accounts/search/",
			{params: {
				searchName: keyword
			}
		}).then(resp=>{
				console.log($scope.searchName);
				$scope.items = resp.data;
			})
        }
    };
})