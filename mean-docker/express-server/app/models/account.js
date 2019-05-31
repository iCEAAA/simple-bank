var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Account', {
    ID: {         //ID为6位数字
        type:String,
        require: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /\d{6}/.test(v);
            },
            message: '{VALUE} is not valid !'
          },
    },

    name: {
        type: String,
        default: '',
    },

    password: {
        type: String,
        default: '',
    },

    balance: {       //账户余额
        type: Number,
        default : 0,
        min : 0
    }
});
