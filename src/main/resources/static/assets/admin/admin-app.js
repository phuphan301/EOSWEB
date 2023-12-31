app = angular.module("admin-app",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/product",{
        templateUrl:"/assets/admin/product/index.html",
        controller: "product-ctrl"
    })
    .when("/category",{
        templateUrl:"/assets/admin/category/index.html",
        controller: "category-ctrl"
    })
    .when("/statistical",{
        templateUrl:"/assets/admin/statistical/view.html",
        controller: "statistical-ctrl"
    })
    .when("/account",{
        templateUrl:"/assets/admin/account/index.html",
        controller: "account-ctrl"
    })
    .when("/order",{
        templateUrl:"/assets/admin/order/order.html",
        controller: "order-ctrl"
    })
    .when("/authorize",{
        templateUrl:"/assets/admin/authority/index.html",
        controller: "authority-ctrl"
    })
    .when("/unauthorized",{
        templateUrl:"/assets/admin/authority/unauthorized.html",
        controller: "authority-ctrl"
    })
    /*.otherwise({
        redirectTo: "/summary",
        controller: "summary-ctrl"
    })*/
    .otherwise({
        redirectTo: "/account",
        controller: "account-ctrl"
    })
})