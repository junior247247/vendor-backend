const express = require('express');
const { CreateRutaAndMunicipio ,UpdateMunicipio} = require('../models/ruta');
const io = require('../server');

const app = express()




app.post('/rutaAndMunicipio', (req, res) => {
    const { RouteId, MunicioId } = req.body;
    CreateRutaAndMunicipio(RouteId, MunicioId).then((resp, err) => {
        if (err) return res.json({ ok: false, err }).status(400)
        res.json({ ok: true, data: resp }).status(200)
        io.emit('route',{data:''})
    })
})

app.put('/rutaAndMunicipio',(req,res)=>{
    const { id, MunicioId } = req.body;
    UpdateMunicipio(id, MunicioId).then((resp, err) => {
        if (err) return res.json({ ok: false, err }).status(400)
          res.json({ ok: true, data: resp }).status(200)
        io.emit('route',{data:''})
    })
})

module.exports = app;