import React, { useState} from 'react'
import { Form, Button, FormControl} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const history = useNavigate()
   const [keyword, setKeyword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history(`/search/${keyword}`)
        } else {
            history('/')
        } 
    }

   return (
   <Form onSubmit={submitHandler} inline>
      
       <FormControl
       type='text'
       name='q'
       onChange={(e) => setKeyword(e.target.value)}
       placeholder='Search Products...'
       style={{width:"300px", marginTop:'30px', marginRight: '50px'}}       
       >
       </FormControl>
       <Button type='submit' variant="outline-success" className='p-2'
        style={{width:"300px", marginTop:'30px', marginRight: '50px'}}>
            Search</Button>
    </Form>
    )   
}

export default SearchBox 