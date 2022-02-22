import mongoose  from "mongoose"

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

const User = mongoose.model('User', userSchema)

export default User