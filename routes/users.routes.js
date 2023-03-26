const express = require('express');
const router = express.Router();


router.get('/', ( req, res ) => {
    res.status(200).json({
        ok: true,
        msg: 'Respuesta get'
    })
})
router.post('/', ( req, res ) => {
    res.status(200).json({
        ok: true,
        msg: 'Respuesta post'
    })
})
router.put('/', ( req, res ) => {
    res.status(200).json({
        ok: true,
        msg: 'Respuesta put'
    })
})
router.delete('/', ( req, res ) => {
    res.status(200).json({
        ok: true,
        msg: 'Respuesta de tipo delete'
    })
})

module.exports = router;