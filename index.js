// Consts
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.static('public'));

// Listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
