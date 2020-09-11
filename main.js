const express = require('express')
const app = express();
const employeeController = require('./Controllers/employeeController');
const port = process.env.port || 3000

require('./Models/db'); // Here connected db

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/employee', employeeController);


app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
})