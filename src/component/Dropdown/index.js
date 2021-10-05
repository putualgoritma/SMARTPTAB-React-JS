import React from 'react'
import  {Dropdown}  from  'react-bootstrap' ;

const Drop = (props) =>{
    return(
    <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {props.title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item >{props.item}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}
export default Drop

