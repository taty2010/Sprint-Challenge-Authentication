const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Secrets = require('../config/secrets');
const Users = require('../users/userModel');

router.post('/register',(req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = gentoken(saved);
      res.status(200).json({ created_user: saved, token:token });
    })
    .catch( err => {
      res.status(500).json({message: 'Unable to register user'})
    });

});

router.post('/login', (req, res, error) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then( user => {
      if ( user && bcrypt.compareSync(password, user.password)){
        const token = gentoken(user);

        res.status(200).json({
          message: `Welcome back to Dad Jokes ${user.username}`,
          jwt_token: token
        });
      } else {
        res.status(400).json({ message: 'Invalid login' })
      }
    })
    .catch( err => {
      res.status(500).json(err)
    })
});

function gentoken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '30min'
  }

  const token = jwt.sign(payload, Secrets.jwtSecret, options)
  return token
}



module.exports = router;
