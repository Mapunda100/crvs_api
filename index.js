const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const dbConfig = require('./config/db')
dbConfig()

const cors = require('cors')
app.use(cors())

const routes = require('./src/routes')
routes(app)

app.listen(8200,()=>{
    console.log('Server started on port 8200')
})