import React from 'react'
const Title = (props) =>{
    return(
        <div className="row">
            <div className="col-md-12">
                <p className="title" style={{paddingTop:props.paddingTop}}>{props.title}</p>
            </div>
        </div>
    )
}
export default Title