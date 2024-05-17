const {
    employeeModel
} = require('../model/employee-schema')


// controllers registrations

// post event request 
const postNewEmployee = async (req, res)=>{
    const { name, rank, title, department, location, email } = req.body

    try {

        if (!name && !title && !rank && !location && !email && !department) {
            return res.status(400).json({ message: 'all fields are required' })
        }
        if(!name){
            return res.status(400).json({messag:'please enter employees name'})
        }
        if(!title){
            return res.status(400).json({ message:'please enter employees job title' })
        }
        if(!rank){
            return res.status(400).json({ message:'please enter employees rank' })
        }      
        if(!email){
            return res.status(400).json({ message:'please enter employees email' })
        }
        
        if(!location){
            return res.status(400).json({ message:'please enter event location' })
        }
        
        if(!department){
            return res.status(400).json({ message:'please enter employees department' })
        }

        // saving to database
        
        const postEmployee = new employeeModel({
            name,
            rank,
            title,
            email,
            location,
            department
        })

        await postEmployee.save()

        return res.status(200).json({ message: 'Record added successfully', postEmployee })

    } catch (error) {
        console.log(error);
    }
}

// get all event bookings
const getAllEmployee = async (req, res) => {
    const allEmployee = await employeeModel.find({})

    try{

        if(!allEmployee > 0){
            return res.status(404).json({ message: 'sorry no event bookings found' })
        }
        return res.status(200).json({ message: 'Employees found', allEmployee })
    }catch(error){
        console.log(error)
    }

}

// get bookings by id
const getSingleEmployee = async(req, res)=>{
    const { id } = req.params
    const singleEmployee = await employeeModel.findById(id)

    try{
        res.status(200).json({ message: 'one employee found', singleEmployee })
    }catch(error){
        console.log(error)
    }

}


// update bookings details 
const updateEmployeesRecords = async(req, res)=>{
    const { id } = req.params
    const { name, rank, title, department, location, email } = req.body

    try{

        const updateDetails = await employeeModel.findByIdAndUpdate(id, {
            name,
            rank,
            title,
            department,
            location,
            email
        },
        { new: true }
        )
    
        if(!updateDetails){
            return res.status(400).json({ message: 'could not update records' })
        }
        return res.status(200).json({ message: 'record updated successfully', updateDetails })

    }catch(error){
        console.log(error)
    }
}

// delete user details
const deleteEmployeeRecords = async(req, res)=>{
    const { id } = req.params

    const deleteRecords = await employeeModel.findByIdAndDelete(id)

    try{
        if(!deleteRecords){
            return res.status(400).json({ message: "could not delete records" })
        }
        return res.status(200).json({ message: 'records successfully deleted', deleteRecords })

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getAllEmployee,
    getSingleEmployee,
    updateEmployeesRecords,
    deleteEmployeeRecords,
    postNewEmployee
}