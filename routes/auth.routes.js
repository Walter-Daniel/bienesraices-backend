const express = require('express');
const router = express.Router();


router.post('/login', ( req, res ) => {
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post desde login'
    })
})
router.post('/register', ( req, res ) => {
    res.status(400).json({
        ok: true,
        msg: 'Respuesta post'
    })
})


module.exports = router;