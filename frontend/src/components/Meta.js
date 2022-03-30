import React from 'react'
import { Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet> 
            <title>{title}</title>
            <meta name= 'description' content={description}/>
            <meta name= 'keyword' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
 title: 'Welcome to Mobile4you',
 description: 'we sell the best products for cheap',  
 keywords:'electronics, buy cheap electronics',
 
}

export default Meta