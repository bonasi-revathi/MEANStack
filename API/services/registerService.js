var User = require("../models/user");
const bycrypt = require("bcryptjs");
let generator = require("generate-password");
var jwt = require('jsonwebtoken');
var saltRounds = 8;


// exports.createUser = function(userData, callback) {
//     console.log("userdataa",userData);
//     console.log(callback);
  
//     //2.constructing the query
//     var userDao = new User(userData);
//     //3.executing the query
//     userDao.save(function(err, data) {
//       // 4.get the result
//       if (!err) {
//         console.log(data);
//       } else {
//         console.log(err);
//       }
//       callback(err, data); //5.send the result
//     });
//   };

  exports.getUsers = function(callback) {
    User.find({},function(err,data){
      if(!err){
        console.log(data);
      }else{
        console.log(err);
      }
      callback(err,data);
    });
   };

   exports.createUser = function (registerdata, callback) {
     console.log(registerdata);
    User.find({ email: registerdata.email }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else if(doc.length) {
            console.log(doc);
            var status = {
                info: 'user registered already',
                status: 409,
                data: doc
            }
            return callback(err, status);
        } else {
            jwt.sign({registerdata},'3x6le09r0^p',{expiresIn: '1d'},(err,token) => {
            let password = generator.generate({
                length: 8,
                numbers: true
            });
            console.log(password);
            bycrypt.hash(password, saltRounds, async function (err, hash) {
                var enrolldata = new User({
                    name:registerdata.name,
                    phone:registerdata.phone,
                    email: registerdata.email,
                    password: hash,
                    state: registerdata.state
                });
                enrolldata.save((err, doc1) => {
                    if (!err) {
                        console.log('1',doc1);
                    } else {
                        console.log(err);
                    }
                    var status = {
                        data: doc1,
                        password: password,
                        authtoken: token
                    }
                    //sendEmail(registerdata,password);
                      callback(err, status);
                })

            })
        })
        }
    })
}

   exports.loginUser = function(logindata,callback){
    var user = new User(logindata);
    console.log("be",user);
    User.find({email:user.email},(err,doc) => {
      if(err){
        console.log(err);
      }else if(doc.length < 1){
        var status ={
          info: 'User not Authenticated',
          status: 404
        }
        return callback(err,status)
      } else{
        console.log("bk doc",doc);
        console.log(doc[0].password);
        if(bycrypt.compareSync(user.password,doc[0].password)){
          jwt.sign({logindata},'3x61e09r0^p',{expiresIn:'1d'},(err,token) => {
            var status ={
              info : 'User authenticated successfully',
              status: 200,
              data: doc,
              authtoken:token
            }
            return callback(err,status);
          })
        }else{
          var status ={
            info: 'Invalid credentials',
            status:402
          }
          return callback(err,status)
        };
      };
    });
   };
