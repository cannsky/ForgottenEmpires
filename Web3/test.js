const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("hey!")
    res.send("Working....");
});

app.listen(port, () => {
    console.log(port);
})