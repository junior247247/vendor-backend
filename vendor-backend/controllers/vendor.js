const express = require('express')


const Vendor = require('../models/vendor')
const io = require('../server')
const app = express()

io.on('connection',(client)=>{



app.get('/misordenes/:id', (req, res) => {
    let id = req.params.id
    let from = req.query.from || 0
    let limit = req.query.limit || 20
    Vendor.mostrarTodaMisOrdenes(id, from, limit).then((data) => {
        res.json({ok:false,data:data}).status(200)
    }).catch(err=>{
        res.json({ok:false,err}).status(400)
    })
})

app.get('/vendor', (req, res) => {
    const limit = req.query.limite || 20
    const from = req.query.from || 0
    Vendor.List(from, limit).then((resp) => {
        res.json({ ok: true, data: resp }).status(200)
    })

})
app.get('/vendor/:id', (req, res) => {
    let id = req.params.id
    Vendor.getVendorById(id).then((resp) => {
        res.json({ ok: true, data: resp }).status(200)
    }).catch((err) => {
        res.json({ ok: false }).status(400)
    })
})
app.post('/verifyProdInventory', (req, res) => {
    let body = req.body
    Vendor.verifyProdInventory(body).then((data) => {
        if (data.length <= 0) return res.json({ ok: false }).status(400)

        res.json({ ok: true }).status(200)
    }).catch((err) => {
        res.json({})
    })
})
app.post('/vendor', (req, res) => {
    const body = req.body
    Vendor.Create(body).then((resp) => {
        Vendor.VendorId().then((data) => {
            res.json({ ok: true, data: data }).status(200)
            io.emit('vendor', { data: '' })
        })
    }).catch(err => {
        res.json({ ok: false, err }).status(400)
    })
})
app.post('/vendorandroute', (req, res) => {
    const body = req.body
    Vendor.CreateVendorAndRoute(body).then((resp, err) => {

        res.json({ ok: true, data: '' }).status(200)

    }).then((err) => {
        res.json({ ok: false, err }).status(400)
    })
})
app.get('/vendorymunuicipios/:id', (req, res) => {
    let id = req.params.id
    Vendor.VendedorYRuta(id).then((data) => {
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})
app.get('/vendorfactvencidas/:id', (req, res) => {
    let id = req.params.id
    Vendor.MostrarMisOrdenVencidas(id).then((data) => {
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})
app.get('/mostrarutadeldia/:id', (req, res) => {
    let id = req.params.id
    Vendor.MostrarRutaDelDia(id).then((data) => {
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: true, err }).status(400)
    })
})
app.post('/createrutadeldia', (req, res) => {
    let body = req.body
    Vendor.CreateRutaDelDia(body).then((data) => {
        io.emit('createruta', { data: '' })
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})
app.delete('/deleteruta/:id', (req, res) => {
    let id = req.params.id
    Vendor.EliminarRuta(id).then((data) => {
        io.emit('createruta', { data: '' })
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})
app.get('/clientpending/:id', (req, res) => {
    Vendor.ClientPending(req.params.id).then((data) => {
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.get('/mostrarFacturasPendientas',(req,res)=>{
    Vendor.mostrarFacturasPendientas().then((data)=>{
        res.json({ok:true,data:data}).status(200)
    }).catch((err)=>{
        res.json({ok:false,err}).status(400)
    })
})

app.post('/actualizarpago',(req,res)=>{
    let body=req.body;
    Vendor.actualizarPago(body).then((data)=>{
        res.json({ok:true,data:data}).status(200)
        client.broadcast.emit('pending','');
    }).catch((err)=>{
        res.json({ok:false,err}).status(400)
    })
})



})


module.exports = app;