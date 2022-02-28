import mongoose  from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        
        email:
        {
            type: String,
            required: true,
            unique: true
        },

        password: 
        {
            type: String,
            required: true
        },

        idAdmin:
        {
            type: Boolean,
            required: true,
            default: false

        }
    },
        {
            timestamps: true // create fields automatically
        }
    
) 

userSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User