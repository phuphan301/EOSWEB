const app = angular.module("register-app",[]);
app.controller("register-ctrl",function($scope,$http){
    $scope.authorities = [];
    $scope.items = [];
    $scope.form = {};
    $scope.roles = [];
    $scope.selection =[];
    //Đăng ký account
    $scope.create = function(){
		var item = angular.copy($scope.form);
		$http.post(`/rest/accountsManage`,item).then(resp=>{
			$scope.items.push(resp.data);
			console.log(resp.data);
			//$scope.reset();
			// Hiển thị thông báo đăng ký thành công
        $scope.registrationSuccess = true;
 		$scope.registrationFailure = false;
			console.log("Đăng ký tài khoản thành công!");
		}).catch(err=>{
			console.log("Error ",err);
			console.log("Đăng ký tài khoản thất bại!");
			
			// Hiển thị thông báo đăng ký thất bại
        $scope.registrationFailure = true;
		$scope.registrationSuccess = false;
		})
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
})