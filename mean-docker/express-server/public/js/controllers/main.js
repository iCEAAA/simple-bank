angular.module('accountController', [])

	// inject the Todo service factory into our controller
    .controller('mainController',['$scope', '$http', 'Accounts',   //
        function ($scope, $http, Accounts)
        {
		var temp = {};
		$scope.Client = {};					
		$scope.loading = true;
		$scope.Register={};
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos

		//注册
		$scope.register=function()
		{
			Accounts.get($scope.Register.ID)
			.success(function(data)
				{
					alert("OK!");
					temp=data;
					if(temp!=null) { alert("该ID已存在，请重新输入！");$scope.Register.ID="";}
					else
					{
						
						$scope.Register.balance=0;
						Accounts.create($scope.Register)
						.success(function(data)
						{
							window.location.href="log.html";
							$scope.Client=data;
						});
					}
				});
			
			
		};
		
		//登陆
		$scope.login=function()
		{
			Accounts.get($scope.Login.ID)
				.success(function(data)
				{
					if(data==null) alert("该ID不存在");
					else
					{
						temp=data;
						if(temp.password==$scope.Login.password)
						{

							$scope.Client=temp;
							window.location.href="log.html";

						}
						else
						{
							alert("密码错误！");
							$scope.Login.password="";
						}
					}
				});

		};


		//存取款
		$scope.Save=function(number)
		{
			if(!Number(number))
				alert("存款失败，请输入合法的数字！");
			else if(Number(number)<=0)
				alert("存款金额应该在0以上");
			else
			{
				Accounts.updateBalance($scope.Client.ID,$scope.Client.balance+$scope.number1)
						.success(function(data)
					{
						$scope.Client=data;
					alert("存款成功！");
					});
			}
			$scope.number1=" ";
			
		};
	    $scope.WithDraw=function(number)
	    {
		    if(!Number(number))
				alert("取款失败，请输入合法的数字！");
			else if(Number(number)<=0)
				alert("取款金额应该在0以上");
			else
			{
			   if($scope.number2<=$scope.Client.balance)
			   {Accounts.updateBalance($scope.Client.ID,$scope.Client.balance-$scope.number1)
						.success(function(data)
					{
						$scope.Client=data;
						alert("取款成功！");
					});
				}
			   else
				alert("你的余额是"+$scope.Client.balance+"，余额不足！");
				
				/*这里调用一个和数据库库交互的函数，我暂时认为只有一个函数changeBalance，且改变具体咋弄咱还能改哈*/
			}
		    $scope.number2="";
		};
		
		
		//汇款
		$scope.deposit=function()
	{
		if(Number($scope.Amount))
		{
			if($scope.Amount>$scope.Client.balance)
		{
			alert("汇款金额不能大于账户余额！ ");
			$scope.amount="";
		}
		else
		{	//						从数据库读取当前账户的信息，将其余额减少amount，会返回一个修改后的当前账户信息（data）
			Accounts.updateBalance($scope.Client.ID,$scope.Client.balance-$scope.Amount)
			.success(function(data)
			{
				$scope.Client=data;
				Accounts.get($scope.receiver)
				.success(function(data)
				{
					var Receiver=data;
					if(Receiver!=null) Accounts.updateBalance($scope.receiver,Receiver.balance+$scope.Amount);
					else 
					{
						alert("收款方不存在！");
					}
				});
				$scope.Amount="";
				$scope.receiver="";
			});
		}
		}
		else
		{
			alert("转账金额必须为数值！");
			$scope.Amount="";
		}
	};

		}]);