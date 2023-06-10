const sql = require('mssql')
const config = require('../config/connect')



const CloseOrden=async(id)=>{
    const pool = await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,id)
        .execute('closeOrden')
    return result.rowsAffected
}


const CreateTotalOrdenRuta=async(body)=>{
    const {OrdenId,VendorId,SubTotal,itbis,Total,Condition,day,descuento,pendiente,pagado,forma_de_pago,RutaId}=body
    const pool= await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,OrdenId)
        .input('VendorId',sql.Int,VendorId)
        .input('SubTotal',sql.Decimal(18,2),SubTotal)
        .input('itbis',sql.Decimal(18,2),itbis)
        .input('total',sql.Decimal(18,2),Total)
    
        .input('condition',sql.VarChar(50),Condition)
        .input('day',sql.Int,day)
        .input('descuento',sql.Decimal(18,2),descuento)
        .input('pendiente',sql.Decimal(18,2),pendiente)
        .input('pagado',sql.Decimal(18,2),pagado)
        .input('forma_de_pago',sql.VarChar(50),forma_de_pago)
        .input('RutaId',sql.Int,RutaId)
        .execute('CreateTotalOrdenRuta')

        return result.rowsAffected
}



const CreateTotalOrden=async(body)=>{
    const {OrdenId,VendorId,SubTotal,itbis,Total,Date,Condition,day,descuento,pendiente,pagado,forma_de_pago,isVendor}=body
    const pool= await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,OrdenId)
        .input('VendorId',sql.Int,VendorId)
        .input('SubTotal',sql.Decimal(18,2),SubTotal)
        .input('itbis',sql.Decimal(18,2),itbis)
        .input('total',sql.Decimal(18,2),Total)
        .input('date',sql.Date,Date)
        .input('condition',sql.VarChar(50),Condition)
        .input('day',sql.Int,day)
        .input('descuento',sql.Decimal(18,2),descuento)
        .input('pendiente',sql.Decimal(18,2),pendiente)
        .input('pagado',sql.Decimal(18,2),pagado)
        .input('forma_de_pago',sql.VarChar(50),forma_de_pago)
        .input('isVendor',sql.VarChar(50),isVendor)
        .execute('CreateTotalOrden')

        return result.rowsAffected
}

const CreateOrdenDetails = async (obj) => {
    const { OrdenId, flag, ProductId, Cant, Total,Itbis,userId } = obj
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('OrdenId', sql.Int, OrdenId)
        .input('flag', sql.VarChar(50), flag)
        .input('ProductId', sql.Int, ProductId)
        .input('Cant', sql.Int, Cant)
        .input('total', sql.Decimal(18, 2), Total)
        .input('itbis',sql.Decimal(18,2),Itbis)
        .input('UserId',sql.Int,userId)
        .execute('CreateOrdenDetail')

    return result.rowsAffected
}

const UpdateOrdenDetail = async (obj) => {
    const { OrdenId, ProductId, Cant, Total,Itbis,flag,userId } = obj
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('OrdenId', sql.Int, OrdenId)
        .input('ProductId', sql.Int, ProductId)
        .input('Cant', sql.Int, Cant)
        .input('total', sql.Decimal(18, 2), Total)
        .input('itbis',sql.Decimal(18,2,),Itbis)
        .input('flag',sql.VarChar(50),flag)
        .input('UserId',sql.Int,userId)
        .execute('UpdateOrdenDetail')
    return result.rowsAffected
}


const ShwoOrdenDetail=async(OrdenId,UserId)=>{
    const pool = await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,OrdenId)
        .input('UserId',sql.Int,UserId)
        .execute('showOrdenDetail')
        return result.recordset
}


const CheckProductInOrden=async(ordenid,productid)=>{
    
    const pool= await sql.connect(config)
    const result= await pool.request()
    .input('OrdenId',sql.Int,ordenid)
    .input('ProductId',sql.Int,productid)
    .execute('CheckProductInOrden')

    return result.recordset
}



const DeleteOrden= async(id)=>{
    const pool= await sql.connect(config)
    const result= await pool.request()
        .input('id',sql.Int,id)
        .execute('deleteItemOrdenDetail')

        return result.rowsAffected
}

const CreateOrden = async () => {
    const pool = await sql.connect(config)
    const result = await pool.request().execute('InsertOrden')
    return result.rowsAffected;
}
const OrdenId = async () => {
    const pool = await sql.connect(config)
    const result = await pool.request().execute('OrdenId')
    return result.recordset
}
const SelectOrdenNoClose=async(id)=>{
    const pool = await sql.connect(config)
    const result= await pool.request()
    .input('UserId',sql.Int,id)
    .execute('SelectOrdenNoClose')
    return result.recordset
}


const ListOrdensClient=async(from,limit,vendorId)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('from',sql.Int,from)
    .input('limit',sql.Int,limit)
    .input('vendorId',sql.Int,vendorId)
    .execute('ShowOrdenClient')
    return result.recordset
}

const CountOrdenClietn=async(vendorId)=>{
    const pool= await sql.connect(config)
    const result= await pool.request()
    .input('vendorId',sql.Int,vendorId)
    .execute('CountOrdenClient')
    return result.recordset
}

/*
CountordenClientPending
@vendorId int*/

const ShowOrdenClientPending=async(from,limit,vendorId)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('from',sql.Int,from)
    .input('limit',sql.Int,limit)
    .input('vendorId',sql.Int,vendorId)
    .execute('ShowOrdenClientPending')
    return result.recordset
}

const CountOrdenClientPending=async(vendorId)=>{
    const pool=await sql.connect(config)
    const result= await pool.request()
    .input('vendorId',sql.Int,vendorId)
    .execute('CountordenClientPending')
    return result.recordset
}


const CreateCajaDiaria=async(body)=>{
    const {subTotal,Total,forma_de_pago,userId}=body
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('subTotal',sql.Decimal(18,2),subTotal)
    .input('total',sql.Decimal(18,2),Total)
    .input('forma_de_pago',sql.VarChar(50),forma_de_pago)
    .input('UserId',sql.Int,userId)
    .execute('CreateCajaDiaria')
    return result.rowsAffected
}


const ActualizarOrden=async(body)=>{
    const {ClientId,UserId,OrdenId,Monto} =body;
    const pool= await sql.connect(config)
    const resul= await pool.request()
    .input('ClientId',sql.Int,ClientId)
    .input('UserId',sql.Int,UserId)
    .input('OrdenId',sql.Int,OrdenId)
    .input('Monto',sql.Decimal(18,2),Monto)
    .execute('ActualizarOrden')
    return resul.rowsAffected;

}


const createCajaDiariaVendor=async(body)=>{
    const {vendorId,clientId,forma_de_pago,total,ordenId}=body
    const pool=await sql.connect(config)
    const rsult=await pool.request()
    .input('vendorId',sql.Int,vendorId)
    .input('clientId',sql.Int,clientId)
    .input('forma_de_pago',sql.VarChar(50),forma_de_pago)
    .input('total',sql.Decimal(18,2),total)
    .input('ordenId',sql.Int,ordenId)
    .execute('createCajaDiaria')
    return rsult.rowsAffected
}
/*
mostrarHistorialClient
@clientId int*/


const mostrarHistorialClient=async(id)=>{
    const pool= await sql.connect(config)
    const result= await pool.request()
    .input('clientId',sql.Int,id)
    .execute('mostrarHistorialClient')
    return result.recordset
}

const ShowAllOrdenClose=async(from,limit)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('from',sql.Int,from)
    .input('limit',sql.Int,limit)
    .execute('mostrarTodasLasOrdenesDeLoscLiente');
    return result.recordset;
}


const MostrarTodasLasOrdenesPendiente=async(from,limit)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('from',sql.Int,from)
    .input('limit',sql.Int,limit)
    .execute('mostrarCuentasPorCobrarClienta')
    return result.recordset
}


module.exports = {
    CreateOrden,
    OrdenId,
    CreateOrdenDetails,
    CheckProductInOrden,
    UpdateOrdenDetail,
    ShwoOrdenDetail,
    DeleteOrden,
    SelectOrdenNoClose,
    CreateTotalOrden,
    CloseOrden,
    CreateTotalOrdenRuta,
    ListOrdensClient,
    CountOrdenClietn,
    ShowOrdenClientPending,
    CountOrdenClientPending,
    CreateCajaDiaria,
    ActualizarOrden,
    createCajaDiariaVendor,
    mostrarHistorialClient,
    ShowAllOrdenClose,
    MostrarTodasLasOrdenesPendiente
}