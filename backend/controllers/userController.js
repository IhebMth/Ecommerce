import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken  from '../utils/generateToken.js'
// @dec Auth user and get token
// @router POST /api/users/login
// @access Public

const authUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body

const user = await User.findOne({email})
//let result = {...user, token: generateToken(user._id)}
if(user && (await user.matchPassword(password))) {
  
    res.json({
        isAdmin: user.isAdmin,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
} else {
    res.status(401)
    throw new Error('invalid email or password')
    
}


}) 




// @dec get user profile
// @router POST /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user)
  {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
  } else {
      res.status(404)
      throw new Error('User not found')
     
  }
   }) 

 // @dec Update user profile
// @router PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user)
   {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password){
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
      res.status(404)
      throw new Error('User not found')
  }
   }) 

   

   // @dec register a new user
// @router POST /api/users
// @access Public

const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password } = req.body

const userExists = await User.findOne({email})
if (userExists)
{
  res.status(600)
  throw new Error("User already exists") 
} 

const user = await User.create ({
  name,
  email,
  password
})

if (user)
{
  res.status(202).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
  })
} else {

  res.status(400)
  throw new Error ('invalid user data')

}

})

  // @dec Get all users
// @router GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find({})
  res.json(users)
   }) 

 // @dec Delete user
// @router DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id) 
  if (user)
  {
    await user.remove()
    res.json({message:'User removed'})
  } else {
    res.status(404)
    throw new Error ('User not found')
  }
   }) 

   // @dec get user by ID
// @route GET / api/users/:id
// @access Private/Admin

   const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user){
    res.json(user)
    }else {
      res.status(404)
    throw new Error ('User not found')
    }
     }) 

     // @dec Update user 
// @router PUT /api/users/:id
// @access Private

const updateUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)

  if (user)
   {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      
    })
  } else {
      res.status(404)
      throw new Error('User not found')
  }
   }) 

  export {authUser, getUserProfile, updateUserProfile,  registerUser, getUsers, deleteUser, getUserById, updateUser}