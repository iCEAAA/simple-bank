

	var app= angular.module("meanTodo", []);
	app.controller("mainController", 
	function($scope){
					 $scope.account={"id":"10022","name":"sb","balance":12000};
	
		$scope.Save=function(number)
		{
			if(!Number(number))
				alert("存款失败，请输入合法的数数！")
			else if(Number(number)<=0)
				alert("存款金额应该在0以上")
			else
			{alert("存款成功！");
			//changeBalance( $scope.account.id,Number(number));这里调用一个和数据库库交互的函数，具体咋弄咱还得想想哈
			}
			$scope.number1=" ";
			
		}
	    $scope.WithDraw=function(number)
	    {if(!Number(number))
				alert("取款失败，请输入合法的数数！")
			else if(Number(number)<=0)
				alert("取款金额应该在0以上")
			else
			{
			if(true)//changeBalance( $scope.account.id,-Number(number))这个地方要改
				alert("取款成功！");
			else
				alert("你的余额是"+$scope.account.balance+"，余额不足！")
				
				/*这里调用一个和数据库库交互的函数，我暂时认为只有一个函数changeBalance，且改变具体咋弄咱还能改哈*/
			}
		 $scope.number2="";
		
	    }
	});
	
	//test1的后端交互代码 存取款系统里要改几个标签注意去改