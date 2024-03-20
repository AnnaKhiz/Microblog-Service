require('dotenv').config();
const express = require('express');
const server = express()

const { PORT } = require('./config/default');

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

