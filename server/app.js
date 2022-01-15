const dotenv = require('dotenv')
const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
}

app.use(cors(corsOptions))

//.env file 
dotenv.config({ path: './config.env' })
//connection file
require('./db/conn')

app.use(express.json())
//routing file
app.use(require('./router/router'))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})