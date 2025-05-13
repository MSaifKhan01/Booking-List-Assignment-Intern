// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const passport = require('passport');
// const cors = require('cors');
// const { DB } = require('./config/db');
// const authRouter = require('./routes/authRoutes');
// const formRouter = require('./routes/formRoutes');

// require('./config/passport');

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors(
// ));
// app.use(express.json());
// app.use(passport.initialize());

// // Routes
// app.use('/auth', authRouter);
// app.use('/forms', formRouter);

// // Start server
// app.listen(process.env.PORT, async () => {
//   try {
//     await DB;
//     console.log("DB connected");
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(`Server running on port ${process.env.PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const { DB } = require('./config/db');
const authRouter = require('./routes/authRoutes');
const formRouter = require('./routes/formRoutes');

require('./config/passport');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRouter);
app.use('/forms', formRouter);

app.listen(process.env.PORT, async () => {
  try {
    await DB;
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
