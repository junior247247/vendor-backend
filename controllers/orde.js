const express = require('express')
const io = require('../server')
const { CloseOrden, CreateTotalOrden, ShwoOrdenDetail, CreateOrdenDetails, UpdateOrdenDetail, CreateOrden, OrdenId, CheckProductInOrden, DeleteOrden, SelectOrdenNoClose, CreateTotalOrdenRuta, ListOrdensClient, CountOrdenClietn, ShowOrdenClientPending, CountOrdenClientPending, CreateCajaDiaria, ActualizarOrden, createCajaDiariaVendor, mostrarHistorialClient, ShowAllOrdenClose, MostrarTodasLasOrdenesPendiente } = require('../models/Orden')
const app = express()


io.on('connection', (client) => {



    app.get('/mostrartodaslasordens',(req,res)=>{
        let from=req.query.from || 0
        let limit=req.query.limit || 20
        MostrarTodasLasOrdenesPendiente(from,limit).then((data)=>{
            res.json({ok:true,count:data.length,data:data}).status(200)
        }).catch((err)=>{
            res.json({ok:false,err}).status(400)
        })
    })

    app.get('/showordenclient',(req,res)=>{
        let from =req.query.from || 0
        let limit=req.query.limit ||20 
        ShowAllOrdenClose(from,limit).then((data)=>{
            res.json({ok:true,count:data.length,data:data}).status(200)
        }).catch((err)=>{
            res.json({ok:false,err}).status(400)
        })
    })


    app.get('/mostrarHistorialClient/:id',(req,res)=>{
        let id=req.params.id
        mostrarHistorialClient(id).then((data)=>{
            res.json({ok:false,data:data}).status(200)
        }).catch((err)=>{
            res.json({ok:false,err}).status(400)
        })
    })

    app.post('/createcajaDiariavendor',(req,res)=>{
        let body=req.body
        createCajaDiariaVendor(body).then((data)=>{
            res.json({ok:true,data:data}).status(200)
        }).catch((err)=>{
            res.json({ok:false,err}).status(400)
        })
    })

    app.post('/actualizarodencliente', (req, res) => {
        let body=req.body
        ActualizarOrden(body).then((data)=>{
            res.json({ok:true,data:data}).status(200)
            io.emit('payment',{data:''})
        }).catch((err)=>{
            res.json({ok:false,err}).status(400)
        })
    })



    app.post('/createordentotalruta', (req, res) => {
        let body = req.body
        CreateTotalOrdenRuta(body).then((data) => {
            res.json({ ok: true, data: data }).status(200)
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.get('/nocloseorden/:id', (req, res) => {
        let id = req.params.id
        SelectOrdenNoClose(id).then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.put('/closeorden/:id', (req, res) => {
        let id = req.params.id
        CloseOrden(id).then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.post('/creteordentotal', (req, res) => {
        const body = req.body
        CreateTotalOrden(body).then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.post('/checkproductinorden', (req, res) => {
        const { ordenid, ProductId } = req.body

        CheckProductInOrden(ordenid, ProductId).then((data) => {
            res.json({ ok: true, data: data }).status(200)
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.delete('/orden/:id', (req, res) => {
        let id = req.params.id
        DeleteOrden(id).then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
            io.emit('orden', { data: '' })
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.post('/createorden', (req, res) => {
        CreateOrden().then((data) => {
            OrdenId().then((resp) => {
                res.json({ ok: true, data: resp }).status(200)
            })
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.get('/orden/:id', (req, res) => {
        let id = req.params.id
        let UserId = req.query.userId
        ShwoOrdenDetail(id, UserId).then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        }).catch(err => {
            res.json({ ok: false, err }).status(400)
        })
    })
    app.post('/orden', (req, res) => {
        CreateOrdenDetails(req.body).then((resp) => {

            res.json({ ok: true, data: resp }).status(200)
           // client.emit('orden',  '' )
           client.broadcast.emit('orden',{data:''})
            // io.emit('orden', { data: '' })
        }).catch(err => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.put('/orden', (req, res) => {
        UpdateOrdenDetail(req.body).then((resp) => {

            res.json({ ok: true, data: resp }).status(200)
         //  client.emit('orden',  '' )
         //  io.emit('orden', { data: '' })
       ////  io.in.emit('orden', { data: 'ss' })
         client.broadcast.emit('orden',{data:''})

            console.log(client.id)
        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.get('/ordenapp/:id', (req, res) => {
        let from = req.query.from || 0
        let limit = req.query.limit || 15
        let vendorId = req.params.id
        ListOrdensClient(from, limit, vendorId).then((data) => {
            CountOrdenClietn(26).then((count) => {
                res.json({ ok: true, data: data, count: count.length }).status(200)
            })

        }).catch((err) => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.post('/cajadiaria', (req, res) => {
        let body = req.body
        CreateCajaDiaria(body).then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        }).catch(err => {
            res.json({ ok: false, err }).status(400)
        })
    })

    app.get('/ordenappending/:id', (req, res) => {
        let id = req.params.id
        let from = req.query.from || 0
        let limit = req.query.limit || 15
        ShowOrdenClientPending(from, limit, id).then((data) => {
            CountOrdenClientPending(id).then((count) => {
                res.json({ ok: true, data: data, count: count }).status(200)
            })
        }).catch(err => {
            res.json({ ok: false, err }).status(400)
        })
    })

    client.on('disconnect',()=>{
        console.log('cliente desconectado')
    })
})



module.exports = app