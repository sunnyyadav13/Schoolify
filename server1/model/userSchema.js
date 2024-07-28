const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Defining schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    todoList: [
        {
            text: {
                type: String,
                required: true
            }
        }
    ],
    classes: [
        {
            Maths: {
                type: Boolean,
                required: true
            },
            Physics: {
                type: Boolean,
                required: true
            },
            Chemistry: {
                type: Boolean,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],
    quizAttempted: {
        type: Boolean,
        default: false
    },
    lastQuizMarks: {
        type: Number,
        required: false
    },
    chatRooms: [
        {
            roomName: {
                type: String,
                required: true
            }
        }
    ],
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    inbox: [
        {
            message: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            seen: {
                type: Boolean,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// We are hashing the password, using pre and post functions
// which allow doing something before and after calling a function
// These are inbuilt in mongoose
// MIDDLE WARE
userSchema.pre('save', async function (next) {  //This keyword works only with standard functions (and not with arrow functions)
    //Therefore we use the keyword function here
    //This function will run before save function

    if (this.isModified('password')) {       //Checking this condition since this needs to be checked only at time of signin and not other times when we use save function
        try {
            this.password = await bcrypt.hash(this.password, 12)
            this.cpassword = await bcrypt.hash(this.password, 12)
        } catch {
            console.log(err)    //Handle it properly (later)
        }
    }
    next()      //This will now allow save function to run
})

userSchema.methods.generateAuthToken = async function () {      //methods => This will make an instance function for userSchema
    //name of instance function is generateAuthToken
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }
}

userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message })    //name: name and so on
        await this.save()
        return this.messages
    } catch (error) {
        console.log(error)
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
// TODO LIST
userSchema.methods.addTodo = async function (text) {
    try {
        this.todoList = this.todoList.concat({ text })
        await this.save()
        return this.todoList
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.deleteTodo = async function (todo) {
    try {
        let index = -1
        for (const a in this.todoList) {
            if (this.todoList[a].text === todo.text) {
                index = a
                break
            }
        }
        if (index > -1)
            this.todoList.splice(index, 1)
        await this.save()
        return this.todoList
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASS BOOKING

userSchema.methods.addClass = async function (info) {
    try {
        const { Maths, Physics, Chemistry, date } = info
        const lastClass = this.classes[this.classes.length - 1]
        if (lastClass.date === date) {
            if (Maths)
                lastClass.Maths = true
            if (Chemistry)
                lastClass.Chemistry = true
            if (Physics)
                lastClass.Physics = true
            this.classes[this.classes.length - 1] = lastClass
        }
        else
            this.classes.push({ Maths, Physics, Chemistry, date })
        await this.save()
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.getClasses = async function () {
    try {
        const classes = this.classes[this.classes.length - 1]
        return classes
    } catch (error) {
        console.log(error)
    }
}

userSchema.statics.deleteStudentClasses = async function (studentClassList) {
    try {
        const uniqueDeleteId = new Set()
        for (const user in studentClassList) {
            uniqueDeleteId.add(studentClassList[user].id)
        }
        const today = new Date()
        const todaysDate = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()
        uniqueDeleteId.forEach(async function (value) {
            let user = await User.findById(value)
            let bookedClasses = user.classes[user.classes.length - 1]
            if (todaysDate === bookedClasses.date) {
                bookedClasses.Maths = false
                bookedClasses.Physics = false
                bookedClasses.Chemistry = false
                user.classes[user.classes.length - 1] = bookedClasses
                user.save()
            }
        })
        return studentClassList
    } catch (error) {
        console.log(error)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////
//  QUIZ

userSchema.methods.addLastQuizMarks = async function (percentage) {
    try {
        this.quizAttempted = true
        this.lastQuizMarks = percentage
        await this.save()
    } catch (error) {
        console.log(error)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////
//  CHATROOMS

userSchema.methods.findAndDeleteChatRoom = async function (roomName) {
    try {
        let index = -1
        for (const a in this.chatRooms) {
            if (this.chatRooms[a].roomName === roomName) {
                index = a
                break
            }
        }
        if (index > -1) {
            this.chatRooms.splice(index, 1)
            await this.save()
            console.log('deleted chatroom', roomName)
        }
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.addChatRoom = async function (roomName) {
    try {
        let index = -1
        for (const a in this.chatRooms) {
            if (this.chatRooms[a].roomName === roomName) {
                index = a
                break
            }
        }
        if (index === -1) {
            this.chatRooms = this.chatRooms.concat({ roomName })
            await this.save()
        }
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.getChatRoomList = async function () {
    try {
        const chatRoomList = this.chatRooms
        return chatRoomList
    } catch (error) {
        console.log(error)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////
//Creating collection with the above schema
const User = mongoose.model('USER', userSchema)

//Exporting collection for use in other components
module.exports = User