const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// User Sign Up
exports.createUser = async (req, res) => {
  try {

    // Validate Body
    if (!req.body) {
      return res.status(400).json({
        message: 'Enter required fileds.'
      });
    };

    // Else Check if the email already exist
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({
        message: 'User with this email already exist !'
      });
    }

    else {
      bcrypt.hash(req.body.password, 8, async (err, hash) => {
        try {
          if (err) {
            console.log('========================', err)
            res.status(400).json({
              message: 'Error at BCRYPT !',
              err: err
            })
          }
          else {
            const user = await new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
              status: req.body.status
            });
            let userSaved = await user.save();
            return res.status(201).json({
              message: 'Sign Up is Successful', userSaved
            });
          }
        }
        catch (error) {
          return res.status(401).json({
            message: 'Error at Sign Up (Inner Function) !',
            error: error,
          });
        }
      })
    }

  }
  catch (error) {
    return res.status(401).json({
      message: 'Error at Sign Up !',
      error: error,
    });
  }
};

// User Log In
exports.logIn = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      res.status(400).json({
        message: 'Enter required fields.'
      });
    }

    // Check if the email exist or not
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        try {
          if (err) {
            res.status(400).json({
              message: 'Error at Bcrypt Compare',
              err: err
            })
          }
          else {
            const token = await jwt.sign(
              { email: result.email }, 'mySecretKey', { expiresIn: '1h' }
            );
            return res.status(200).json({
              message: 'Login Successful !',
              token: token
            })
          }
        }
        catch (error) {
          res.status(401).json({
            message: 'Error at Sign In (Inner Function) !',
            error: error
          });
        }
      });
    }
    else {
      res.status(400).json({
        message: 'User with this email does not exist. Sign Up first.'
      });
    }

  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Sign In !',
      error: error
    });
  }
};

// Edit User
exports.edit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Fill the required fileds.'
      })
    }
    else {
      const update = await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          role: req.body.role,
          status: req.body.status
        }
      );
      if (update) {
        return res.status(200).json({
          message: 'Data Updated Successfully !'
        })
      }
      else {
        return res.status(400).json({
          message: 'User Not Found !'
        })
      }
    }
  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Edit !',
      error: error
    });
  }
};

// Delete User
exports.delete = async (req, res) => {
  try {
    if (await User.findByIdAndDelete(req.params.id)) {
      return res.status(200).json({
        message: 'User Deleted Successfully !'
      })
    }
    else {
      return res.status(200).json({
        message: 'User Not Found !'
      })
    }
  }
  catch (error) {
    res.status(401).json({
      message: 'Error at Delete User !',
      error: error
    });
  }
};


