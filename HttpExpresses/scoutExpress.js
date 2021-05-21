const express = require('express');
const dbHelper = require("../db")
const router = express.Router();

router.post('/', function(request, response) {
    let data = JSON.parse(request.body);
    dbHelper.scoutLog(data);
});