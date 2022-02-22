import bcrypt from 'bcryptjs'

const users =
[
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true
    },

    {
        name: 'Meftah iheb',
        email: 'meftahIheb@outlook.fr',
        password: bcrypt.hashSync('1234', 10)
    },
  
    {
        name: 'meftah Jaafer',
        email: 'meftahJaafer@gmail.com',
        password: bcrypt.hashSync('1234', 10)
    },
]

export default  users