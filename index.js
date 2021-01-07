var express = require('express');
const bodyParser = require('body-parser');

require('./db/db')



const app = express();
app.use(bodyParser.json());

//routes
app.use('/Appareil', require('./routes/appareilRoute'));



const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server started on port ${port}`))

module.exports = app;