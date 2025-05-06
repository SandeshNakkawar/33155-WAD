const express = require("express");
const fs = require("fs")
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));



app.get('/api/products', (res, req) => {
    fs.readFile('./products.json', 'utf-8', (err, data)=>{
        if(err){
            console.log("Error :",err);
        }
        const products = JSON.parse(data);
        res.json(products);
    })
})


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})