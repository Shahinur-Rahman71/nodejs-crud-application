const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/curd_Application')
    .then( ()=> {
        console.log('Database Connected')
    })
    .catch( err => {
        console.log(err)
    })

require('./employeeModel');
