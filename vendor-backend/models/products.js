const sql = require('mssql')
const config = require('../config/connect')



const create = async (obj) => {
    let pool = await sql.connect(config)
    let result = await pool.request()
        .input('codigo', sql.Int,obj.codigo)
        .input('description', sql.VarChar(200), obj.description)
        .input('pCompra', sql.Decimal(18,2), obj.pCompra)
        .input('pVenta', sql.Decimal(18,2), obj.pVenta)
        .input('ganancia', sql.Decimal(18,2),obj.ganancia)
        .input('fechaVencimiento', sql.Date,obj.fechaVencimiento)
        .input('Itbis',sql.Decimal(18,2),obj.itbis)
        .execute('CreteProduct')
    return result;

}

const Update = async (obj) => {
    let pool = await sql.connect(config)
    let result = await pool.request()
        .input('ProductId',sql.Int,obj.productId)
        .input('codigo', sql.Int,obj.codigo)
        .input('description', sql.VarChar(200), obj.description)
        .input('pCompra', sql.Decimal(18,2), obj.pCompra)
        .input('pVenta', sql.Decimal(18,2), obj.pVenta)
        .input('ganancia', sql.Decimal(18,2),obj.ganancia)
        .input('fechaVencimiento', sql.Date,obj.fechaVencimiento)
        .input('Itbis',sql.Decimal(18.2),obj.itbis)
        .execute('Updateproduct')
    return result;

}

const UpdateStock=async(UserId,Stock,ProductId)=>{
    let pool= await  sql.connect(config)
    let result= await pool.request().input('UserId',sql.Int,UserId).input('ProductId',sql.Int,ProductId).input('Stock',sql.Int,Stock).execute('UpdateStock');
    return result.recordset
}

const List= async(UserId,from,limit)=>{
    let pool= await sql.connect(config)
    let result= await pool.request().input('UserId',sql.Int,UserId).input('from',sql.Int,from).input('limit',sql.Int,limit).execute('ShowProducts')
    return result.recordsets[0]

}

const ProductById= async(ProductId,UserId)=>{
    let pool= await sql.connect(config)
    let result= await pool.request().input('ProductId',sql.Int,ProductId).input('UserId',sql.Int,UserId).execute('ProducById')
    return result.recordset[0]
}

const getId=async()=>{
    let pool= await sql.connect(config)
    let result= await pool.request()
        .execute('ProductId')

        return result.recordset[0];
}



module.exports = {
    create,
    getId,
    List,
    ProductById,
    Update,
    UpdateStock
}