const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const {
    postNewEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployeesRecords,
    deleteEmployeeRecords
} = require('./controllers/controllers')

const app = express()

const PORT = process.env.PORT

app.use(express.json())

// routes registration
app.get('/', getAllEmployee)
app.post('/add-record', postNewEmployee)
app.get('/single-employee/:id', getSingleEmployee)
app.patch('/update-record/:id', updateEmployeesRecords)
app.delete('/delete-record/:id', deleteEmployeeRecords)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`connected to mongodb and listening to port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
