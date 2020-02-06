const express = require('express');
const app = express();

app.use(express.static('./public'));

app.listen(80, 'localhost', () => { 
    console.log('Express app listening at port 80')
});