const app = angular.module("register-app",[]);
app.controller("register-ctrl",function($scope,$http){
    $scope.authorities = [];
    $scope.items = [];
    $scope.form = {};
    $scope.roles = [];
    $scope.selection =[];
    //Đăng ký account
    $scope.create = function(){

		// Reset previous error messages
		$scope.registrationSuccess = false;
		$scope.registrationFailure = false;
	
		// Validation
		if (!$scope.form.username || !$scope.form.email || !$scope.form.fullname || !$scope.form.phonenumber || !$scope.form.password || !$scope.form.confirmpassword) {
			// Display an error message for required fields
			$scope.registrationFailureMessage = "All fields are required.";
			$scope.registrationFailure = true;
			return;
		}
	
		// Check full name format
		if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test($scope.form.fullname)) {
			// Display an error message for full name format
			$scope.registrationFailureMessage = "Full name must contain at least two words separated by a space.";
			$scope.registrationFailure = true;
			return;
		}
	
		// Check email format
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($scope.form.email)) {
			// Display an error message for email format
			$scope.registrationFailureMessage = "Invalid email address.";
			$scope.registrationFailure = true;
			return;
		}
	
		// Check phone number format (assuming it should be numeric and have 10 digits)
		if (!/^\d{10}$/.test($scope.form.phonenumber)) {
			// Display an error message for phone number format
			$scope.registrationFailureMessage = "Invalid phone number format.";
			$scope.registrationFailure = true;
			return;
		}
		
		if (!$scope.form.password || $scope.form.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test($scope.form.password)) {
		    // Hiển thị thông báo lỗi nếu định dạng mật khẩu không đúng
		    $scope.registrationFailureMessage = "Password must contain at least 8 characters and at least one special character.";
		    $scope.registrationFailure = true;
		    return;
		}
	
		// Check password match
		if ($scope.form.password !== $scope.form.confirmpassword) {
			// Display an error message for password match
			$scope.registrationFailureMessage = "Passwords do not match.";
			$scope.registrationFailure = true;
			return;
		}

		var item = angular.copy($scope.form);
		$http.post(`/rest/accountsManage`,item).then(resp=>{
			$scope.items.push(resp.data);
			console.log(resp.data);
			//$scope.reset();
			// Hiển thị thông báo đăng ký thành công
        // $scope.registrationSuccess = true;
 		// $scope.registrationFailure = false;
			console.log("Đăng ký tài khoản thành công!");
			$scope.registrationSuccess = true;
		}).catch(err=>{
			console.log("Error ",err);
			console.log("Đăng ký tài khoản thất bại!");
			
			// Hiển thị thông báo đăng ký thất bại
        $scope.registrationFailure = true;
		//$scope.registrationSuccess = false;
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