var Account=require('./models/account');

function getAccounts(res) {
    Account.find(function (err, accounts) {

      
        if (err) {
            res.send(err);
        }

        res.json(accounts); 
    });
};

function getAccount(req,res){
    Account.findOne({ID: req.params.ID}, //����ID����
        function(err, account){
        if(err){
            res.send(err);
        }

        res.json(account);
    }
        );
}


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all accounts
    app.get('/api/accounts', function (req, res) {  
        //返回全部账户
        getAccounts(res);
    });

    app.get('/api/account/:ID', function (req, res) { //url中加ID， 返回指定账户
        Account.findOne({ID: req.params.ID}, 
            function(err, account){
            if(err){
                res.send(err);
            }
    
            res.json(account);
        }
            );

    });

    app.post('/api/accounts/balance', function (req, res) { //表单中提供ID和money参数，更新余额，返回更新后的账户
        Account.update({ID : req.body.ID,}, {balance : req.body.money } ,
             function (err, account) {
            if (err){
                res.send(err);
            }
            
            Account.findOne({ID: req.body.ID},
                    function(err, account){
                    if(err){
                        res.send(err);
                    }
            
                    res.json(account);       
                })
        });


    });
                                                    
    //创建账户
    app.post('/api/accounts', function (req, res) {   //表单参数为ID，name，password
        Account.create({   //设置id、名字、密码    余额默认为0
            ID : req.body.ID,
            name : req.body.name,
            password : req.body.password,
        }, function (err, account) {
            if (err)
                res.send(err);
            getAccounts(res);
        })
    });

    app.get('/api/login/:ID', function(req,res){  //登录 + ID
        Account.findOne({ID:req.params.ID },function(err, account){
            if(err){
                res.send(err);
            }
            if(account != null){
            res.cookie('user_id',req.params.ID);
            res.json(account);}
        })
    });

    app.get('/api/currentAccount', function(req, res){  //当前账户
        Account.findOne({ID:req.cookies.user_id}, function(err,account){
            if(err){
                res.send(err);
            }
    
            res.json(account);      

            
        })
        
    })

    
    



	app.get('*', function (req, res) {
        res.sendFile('/usr/src/public/login.html'); 
    });

};
