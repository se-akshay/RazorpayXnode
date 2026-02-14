const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    dotenv.config();
})