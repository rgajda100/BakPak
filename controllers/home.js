const express = require('express');
const models = require('../models');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('../config/passport.js')(passport); 

const router = express.Router();


router.get('/', (req, res, next) => {
  passport.authenticate('jwt', {session: false}, function (err, user, info, status) {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.render('home');
      }
      res.redirect('/discussion-board');
  })(req, res, next);
});

//Protected Sign Out Get Route (You can only access if you are signed in)
router.get('/signout', passport.authenticate('jwt', { session: false }),
    //Everything in this function only occurs if user token is valid
    function(req, res) {
        res.clearCookie('authToken'); //In the future use refresh token?
        res.redirect('/');
    }
);

router.post('/', (req, res) => {
  let input = req.body;
  let studentLogin = true;

  models.Student.findOne({
      where:{
          email: input.emailAddress
      }
  })
  .then((student) => {
      if(!student){
          let errorCode = 1;
          res.cookie('warningMessage',errorCode, {maxAge: 3000});
          return res.redirect('back');
      }
      student.comparePassword(req.body.userPassword, (err, isMatch) => {
          //console.log("Password: "+req.body.userPassword + "Matched Password: "+isMatch);
          let pk = 'MIIBOAIBAAJAVPfYwkIYRZ6CUtRQFefcPD9p9GXn8e/capeB6RWkZtE0HTJpAms/Fa6TC8sUIYfC+hlD5Le1ORiL9VPKtydk0wIDAQABAkBU8OB0cnapQmiuPSlCfOOiJxLZC/bv2gXTWVq5lLUhQuOIXEqeQcxcTdNru0ki9C/tRmhcnaT5hlbr/7WDM2EhAiEAl0u3dpB+Y+QK8jp7iGlFPYA2COV0v9n8twfdv2ufBEUCIQCPxTYqF7lkjkStrMH7ysak6uG5PhnckgB+WFvDuwgyNwIgFjONM3/WnC/tj0gXspfIClNTGpEZRcHmPLGRz7IqPoUCIDvIkgFm5BzAXCasE+4UIA4r7bkN7csemz3umBoICBx5AiBzB9RHgQCGx4C4S3eaGI6dmor/A1j/Q4fsHkPs3KSCHQ==';
          if(isMatch && !err) {
                var token = jwt.sign(JSON.parse(JSON.stringify({firstname:student.firstname, lastname:student.lastname, email:student.email, phone:student.phone, Student: true})), pk, {expiresIn: 86400 * 30});
            
                //Store jwt with client side cookie
                //Redirect to debug for now (should be changed to first Student route later)
                res.cookie('authToken',token);
                //res.redirect('/debug');
                res.redirect('/discussion-board');
          } else {
             let errorCode = 1;
             res.cookie('warningMessage',errorCode, {maxAge: 3000});
            return  res.redirect('back');
          }
        })
      }).catch((error) => res.status(400).send(error));
});


router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});


module.exports = router;
