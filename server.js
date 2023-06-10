require('./config/config')
const express=require('express')

const {Server}=require('socket.io')
const bodyParse=require('body-parser')
const SocketIo=require('socket.io')
const http=require('http')

const cors =require('cors')
const app=express()
app.use(cors())
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())




const server=http.createServer(app)
const io=new Server(server,{cors:{methods:['POST','GET']}})
//onst io = SocketIo(server);

module.exports=io;
app.use(require('./controllers/stock'))
app.use(require('./controllers/products'))
app.use(require('./controllers/usuarios'))
app.use(require('./controllers/munucipe'))
app.use(require('./controllers/Ruta'))
app.use(require('./controllers/routeandmuncipe'))
app.use(require('./controllers/vendor'))
app.use(require('./controllers/usuarios'))
app.use(require('./controllers/orde'))




server.listen(process.env.PORT,()=>{
    console.log("the server is running...",process.env.PORT)
})