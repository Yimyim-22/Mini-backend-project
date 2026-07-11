const express = require('express');
const app = express();

app.get('/api/welcome', (req, res) => {
    res.json({
  "message": "Hello from Yimika's server"
});
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
});