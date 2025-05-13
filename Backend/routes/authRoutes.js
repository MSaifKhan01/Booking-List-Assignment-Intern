
const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const { userModel } = require('../models/User');


 authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));



// Google OAuth callback
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`https://booking-list-assignment-intern.vercel.app/auth-success?token=${token}`);
  }
);



// Set role route
authRouter.post('/set-role', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update user role
    await userModel.findByIdAndUpdate(decoded.id, { role: req.body.role });
    
    // Respond with success message
    res.status(200).send({ success: true });
  } catch (err) {
    console.error("❌ Error in /set-role:", err.message);
    
    // Handle errors and respond with error message
    res.status(401).send({ error: 'Invalid token' });
  }
});


module.exports = authRouter;
