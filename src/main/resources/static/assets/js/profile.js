var app = angular.module("account-app", []);
app.controller("account-ctrl", function ($scope, $http, $location) {
    $scope.authorities = [];
    $scope.items = [];
    $scope.form = {};
    $scope.roles = [];
    $scope.selection = [];
    // $scope.initialRoles= [{name:"Customer",value:'CUST'},{name:"Staff",value:'STAF'},{name:"Director",value:'DIRE'}]
    $scope.initialize = function () {
        $http.get('/rest/account/edit')
            .then(function (response) {
                // Gán dữ liệu người dùng vào $scope.form
                $scope.form = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching user info:', error);
            });

        //load accounts
        $http.get("/rest/accounts").then(resp => {
            $scope.items = resp.data;
        })
    }

    //Update account
    $scope.update = function () {
        var item = angular.copy($scope.form);
        $http.put(`/rest/accounts/${item.username}`, item).then(resp => {
            var index = $scope.items.findIndex(p => p.username == item.username);
            $scope.items[index] = item;
            alert('Cập nhật tài khoản thành công!');
            console.log(resp.data);
        }).catch(err => {
            alert('Lỗi cập nhật tài khoản!')
            console.log("Error ", err);
        })


    }
    //Upload Hình
    $scope.imageChanged = function (files) {
        var data = new FormData();
        data.append('file', files[0]);
        $http.post('/rest/upload/avatar', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(resp => {
            $scope.form.photo = resp.data.name;
        }).catch(err => {
            alert('Lỗi upload Ảnh');
            console.log("Error ", err)
        })
    }

    $scope.changepass = function () {
        console.log("hksjfjgkdg")
        console.log('$scope.newpassword:', $scope.newpassword);
        console.log('$scope.confirmpassword:', $scope.confirmpassword);
        console.log('$scope.oldpassword:',$scope.oldpassword)
        // Kiểm tra xác nhận mật khẩu
        if ($scope.newpassword !== $scope.confirmpassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        // Gửi yêu cầu đổi mật khẩu
        var data = {
            oldpassword: $scope.oldpassword,
            newpassword: $scope.newpassword
        };
        // In giá trị của data vào Console
        console.log('Data to be sent:', data);
        $http({
            method: 'PUT',
            url: '/rest/account/password',
            data: data, // Đưa dữ liệu vào phần thân của yêu cầu
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (response) {
                alert(response.data);
                $scope.oldpassword = '';
                $scope.newpassword = '';
                $scope.confirmpassword = '';
            })
            .catch(function (error) {
                console.error('Error:', error);
                alert('Lỗi đổi mật khẩu: ' + error.data);
            });
    }
  
    //khởi đầu
    $scope.initialize();
})