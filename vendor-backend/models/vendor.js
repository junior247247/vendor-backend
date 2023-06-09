const sql = require('mssql')
const config = require('../config/connect')

const Create = async (body) => {
    const { name, cedula, adress, telefono, userId } = body
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('name', sql.VarChar(50), name)
        .input('cedula', sql.VarChar(50), cedula)
        .input('adress', sql.VarChar(50), adress)
        .input('telefono', sql.VarChar(50), telefono)
        .input('userId', sql.Int, userId).execute('CreateVendor')
    return result.rowsAffected
}




const List = async (from, limite) => {
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('from', sql.Int, from)
        .input('limit', sql.Int, limite)
        .execute('ShowVendor')
    return result.recordset
}
const CreateVendorAndRoute = async (body) => {
    const { VendorId, RutaId } = body
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('VendorId', sql.Int, VendorId)
        .input('RutaId', sql.Int, RutaId)
        .execute('CreateRutaAndVendor')

    return result.rowsAffected
}

const VendorId = async () => {
    const pool = await sql.connect(config)
    const result = await pool.request().execute('VendorId')
    return result.recordset
}


const showRutaWithVendor = async (vendorId,limit,from) => {
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('vendorId', sql.Int, vendorId)
        .input('from',sql.Int,from)
        .input('limit',sql.Int,limit)
        .execute('showRutaWithVendor')
    return result.recordset
}

const verifyProdInventory = async (body) => {
    let { userId, ProductId } = body
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('UserId', sql.Int, userId)
        .input('ProductId', sql.Int, ProductId)
        .execute('verifyProdInventory')
    return result.recordset
}



const getVendorById = async (id) => {
    let pool = await sql.connect(config)
    const result = await pool.request().input('vendorId', sql.Int, id).execute('getVendorById')
    return result.recordset
}



const VendedorYRuta=async(vendorId)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('vendorId',sql.Int,vendorId)
    .execute('VendedorYRuta')
    return result.recordset
}

/*
MostrarMisOrdenVencidas
@vendorId int*/
const MostrarMisOrdenVencidas=async(vendorId)=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('vendorId',sql.Int,vendorId)
    .execute('MostrarMisOrdenVencidas')
    return result.recordset
}

const MostrarRutaDelDia=async(vendorId)=>{
    const pool=await sql.connect(config)
    const result= await pool.request()
    .input('VendorId',sql.Int,vendorId)
    .execute('MostrarRutaDelDia')
    return result.recordset
}


const CreateRutaDelDia=async(body)=>{
    const {vendorId,RutaId} =body
    const pool=await sql.connect(config)
    const result=await pool.request()
    .input('VendorId',sql.Int,vendorId)
    .input('RutaId',sql.Int,RutaId) 
    .execute('CreateRutaDelDia')  
}

const EliminarRuta=async(id)=>{
    const pool= await sql.connect(config)
    const result=await pool.request().input('id',sql.Int,id).execute('EliminarRuta')
    return result.recordset
}



const ClientPending=async(id)=>{
    const pool= await sql.connect(config)
    const result=await pool.request().input('RutaId',sql.Int,id).execute('ClientPending')
    return result.recordset
}



const mostrarTodaMisOrdenes=async(vendorId,from,limit)=>{
    const pool= await sql.connect(config)
    const result=await pool.request()
    .input('vendorId',sql.Int,vendorId)
    .input('from',sql.Int,from)
    .input('limit',sql.Int,limit)
    .execute('mostrarTodasMisOrdenes')
    return result.recordset
}

const mostrarFacturasPendientas=async()=>{
    const pool=await sql.connect(config)
    const result=await pool.request()
    .execute('mostrarFacturasPendientas');
    return result.recordset;
}


const actualizarPago=async(body)=>{
    const {OrdenId,vendorId,monto} =body;
    const pool=await sql.connect(config)
    const resitl=await pool.request()
    .input('OrdenId',sql.Int,OrdenId)
    .input('vendorId',sql.Int,vendorId)
    .input('monto',sql.Decimal(18,2),monto)
    .execute('actualizarPago')
    return resitl.rowsAffected;
}

module.exports = {
    Create,
    VendorId,
    CreateVendorAndRoute,
    List,
    verifyProdInventory,
    showRutaWithVendor,
    getVendorById,
    VendedorYRuta,
    MostrarMisOrdenVencidas,
    MostrarRutaDelDia,
    CreateRutaDelDia,
    EliminarRuta,
    ClientPending,
    mostrarTodaMisOrdenes,
    mostrarFacturasPendientas,

    actualizarPago

}