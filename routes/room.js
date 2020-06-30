var express = require('express');
var router = express.Router();

router.get('/:room', (req, res) => {
    res.render('room.pug', {roomId: req.params.room});
});

module.exports = router;