process.env.PORT =process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/vendor';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
process.env.DB_HOST='192.168.1.3';
process.env.DB_PWD='147852369';
process.env.DB_NAME='Vendor';
process.env.DB_USER='jr';


  

