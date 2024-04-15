const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');
const port = 3007;
const API_KEY = '9053b61501b841aa240f60b301be5e07';

async function fetchProduct(city){
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

app.get('/weather', async (req, res) => {
    try {
        const data  = await fetchProduct(req.query.city);
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});