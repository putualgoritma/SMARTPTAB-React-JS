import React, { Fragment } from 'react'
import { Loading } from '../../assets'

function Spinner(props) {
      return (
          <Fragment>
              {/* <div style={{display:'flex', alignItems:'center',justifyContent:'center',height:'100%'}}>
                <div style={{maxWidth:'50%',padding:15,backgroundColor:'red'}}>
                    <h1>{props.info}</h1>
                </div>
             </div> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                    <div className="jumbotron min-vh-100 text-center m-0  d-flex flex-column justify-content-center">
                        <h1 className="display-4"><img src = {Loading}/></h1>
                        {/* <p className="lead">Loading...</p> */}
                    </div>
                    </div>
                </div>
            </div>

          </Fragment>
      )
}

export default Spinner
