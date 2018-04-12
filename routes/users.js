var express = require('express');
var router = express.Router();
var User = require('../lib/User');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
}).post(function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);

  User.findOne({username:username},function (err,user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!user) {
      return res.status(404).send();
    }

    user.comparePassword(password,function (err, isMatch) {
      if (isMatch&&isMatch == true) {
        req.session.user = user;
        return res.status(200).send(); 
      } else {
        res.status(401).send();
      }
    });
  });
});

router.get('/dashboard',function (req,res) {
  if (!req.session.user) {
    return res.status(401).send();
  }
  return res.status(200).send("welcome to secert super api!");

});

router.get('/logout',function (req,res) {
  req.session.destroy();
  return res.status(200).send();
})

router.get('/register',function (req,res) {
  res.render("register");
});
router.post('/register',function (req,res) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log(username)
  req.checkBody('username', 'name is required').noEmpty();

  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    console.log('YES');
  } else {
    console.log('NO');
  }
  // console.log(email);

  // var firstname = req.body.firstname;
  // var lastname = req.body.lastname;

  // var newuser = new User();
  // newuser.username = username;
  // newuser.password = password;
  // newuser.email = email;
  // newuser.firstname = firstname;
  // newuser.lastname = lastname;

  // newuser.save(function (err, savedUser) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).send();
  //   } else {
  //     return res.status(200).send();
  //   }
  // });
});
module.exports = router;