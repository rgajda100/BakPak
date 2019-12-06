const express = require('express');
const models = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, function (err, user, info, status) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('sign-up');
        }
        res.redirect('/discussion-board');
    })(req, res, next);
});

// router.get('/', (req, res) => {
//   res.render('home');
// });


router.post('/', (req, res) => {
    let input = req.body;
   
        models.Student.findOne({
          where:{
            email: input.emailAddress
          }
        }).then((student) => {
          if(!student){
             models.Student.create({firstname: input.firstName, lastname: input.lastName, email: input.emailAddress, college: 'Queens College' , phone: input.phoneNumber, password: input.password})
              .then(function(){
                //Signs in Student Automatically after registration
                 let pk = 'MIIBOAIBAAJAVPfYwkIYRZ6CUtRQFefcPD9p9GXn8e/capeB6RWkZtE0HTJpAms/Fa6TC8sUIYfC+hlD5Le1ORiL9VPKtydk0wIDAQABAkBU8OB0cnapQmiuPSlCfOOiJxLZC/bv2gXTWVq5lLUhQuOIXEqeQcxcTdNru0ki9C/tRmhcnaT5hlbr/7WDM2EhAiEAl0u3dpB+Y+QK8jp7iGlFPYA2COV0v9n8twfdv2ufBEUCIQCPxTYqF7lkjkStrMH7ysak6uG5PhnckgB+WFvDuwgyNwIgFjONM3/WnC/tj0gXspfIClNTGpEZRcHmPLGRz7IqPoUCIDvIkgFm5BzAXCasE+4UIA4r7bkN7csemz3umBoICBx5AiBzB9RHgQCGx4C4S3eaGI6dmor/A1j/Q4fsHkPs3KSCHQ==';
                 var token = jwt.sign(JSON.parse(JSON.stringify({firstname: input.firstName, lastname: input.lastName, email: input.emailAddress, phone: input.phoneNumber, address: input.address, Student: true})), pk, {expiresIn: 86400 * 30});
                //Store jwt with client side cookie
                //Redirect to debug for now (should be changed to first Student route later)
                res.cookie('authToken',token);
                res.redirect('discussion-board');
              });
          } else {
            let errorCode = 3;
            res.cookie('warningMessage',errorCode, {maxAge: 3000});
            return  res.redirect('back');
          }
  
        })
  
  
   
  });


module.exports = router;