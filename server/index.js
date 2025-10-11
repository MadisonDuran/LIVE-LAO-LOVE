const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const products = require('/Users/madisonduran/Desktop/LIVE-LAO-LOVE/server/products.json');

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

