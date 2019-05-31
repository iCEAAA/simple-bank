angular.module('accountService', [])

	// super simple service
	// each function returns a promise object
	.factory('Accounts', ['$http',function($http) {	//
		return {
			get : function(id) {						//根据id查询单个账户
				return $http.get('/api/account/'+id);//
			},
			
			getAllAccount : function(){   //查询全部账户
				return $http.get('/api/accounts')
			},

			updateBalance : function(data) {    //更新余额
				return  $http.post('/api/accounts/balance' ,data);
			},

			create : function(accountData){    //创建账户
				return $http.post('/api/accounts', accountData);
			},

		}
	}]);