const router = require('express').Router();
const Todo = require('../Models/employeeModel');

// this is main page .here you can find your information
router.get('/', (req, res, next) => {
    res.render('addorEdit', {
        viewTitle: 'Insert Employee',
        employee: req.body
    })
})

router.post('/', (req, res) => {
    if(req.body._id === ''){
        insertRecord(req, res)
    } else {
        updateRecord(req, res)
    }
    
})

// here we can insert any employee 
const insertRecord = (req, res) => {
    const employee = new Todo();
        employee.fullName = req.body.fullName,
        employee.email = req.body.email,
        employee.mobile = req.body.mobile,
        employee.city = req.body.city;

        employee.save((err, doc) => {
            if(!err){
                res.redirect('employee/list')
            } else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render('addorEdit', {
                        viewTitle: 'Insert Employee',
                        employee: req.body
                    })
                }
                else {
                    console.log('Erroe Occured', +err);
                }
            }           
        })   
}

// here we can insert any employee 
const updateRecord = (req, res) => {
    Todo.findOneAndUpdate({_id: req.body._id}, req.body, { new: true}, (err, doc) => {
        if(!err) {
            res.redirect('employee/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('addorEdit', {
                    viewTitle: 'Update Employee',
                    employee: req.body
                })
            }
            else {
                console.log('Erroe Occured during record update', +err);
            }
        }
    })
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

// here we find all employee
router.get('/list', (req, res ) => {
    Todo.find((err, doc) => {
        if(!err) {
            res.render('list', {
                listView: doc
            });
        } else {
            console.log('Error Occured', +err)
        }
    });
});

//here we can find all employee
router.get('/:id', (req, res, next) => {
    Todo.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('addorEdit', {
                viewTitle: 'Update Employee',
                employee: doc
            })
        }
    });   
})

//delete any employee
router.get('/delete/:id', (req, res) => {
    Todo.findByIdAndRemove( req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        } else {
            console.log(' Error in employee delte : ', +err)
        }
    })
});

module.exports = router;