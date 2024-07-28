const mongoose = require('mongoose')

const studentClassListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASS BOOKING

studentClassListSchema.statics.addClass = async function (info, id, name) {
    try {
        const date = info.date
        if (info.Maths) {
            const maths = new StudentClassList({ name, id, subject: "maths", date })
            await maths.save()
        }
        if (info.Physics) {
            const physics = new StudentClassList({ name, id, subject: "physics", date })
            await physics.save()
        }
        if (info.Chemistry) {
            const chemistry = new StudentClassList({ name, id, subject: "chemistry", date })
            await chemistry.save()
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  DATA RETREIVEL

studentClassListSchema.statics.getStudentClassList = async function () {
    try {
        const today = new Date()
        const date = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()
        const list = StudentClassList.find({ date })
        return list
    } catch (error) {
        console.log(error)
    }
}

studentClassListSchema.statics.deleteAllSeats = async function () {
    try {
        //  SEND MESSAGE TO ALL USERS IN STUDENT CLASS LIST SO THAT THEY KNOW THAT THE CLASS HAS TO BOOKED AGAIN
        //  OR HAS BEEN CANCELLED
        //  It can be easily done by adding inbox in userSchema and adding a message there for every entry in studentClassList
        //  as we have user id of all users and send them subject name and date of cancel
        const today = new Date()
        const date = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()
        await StudentClassList.deleteMany({ date })
    } catch (error) {
        console.log(error)
    }
}


/////////////////////////////////////////////////////////////////////////////////////////

const StudentClassList = mongoose.model('STUDENTCLASSLIST', studentClassListSchema)
module.exports = StudentClassList