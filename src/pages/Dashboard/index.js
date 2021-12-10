import React, { Fragment } from 'react'
import { ImageDashboard } from '../../assets'
import { Header, Sidebar } from '../../component'
const Dashboard = () =>{
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                   active="Dashboard"
                />
                <div className="main-panel">
                <Header
                    Title="DASHBOARD    "
                />
                    <div className="content" style={{backgroundColor:'#D5F3FE'}}>
                      <img src={ImageDashboard} style={{width:'100%', height:'100%'}}/>
                    </div>

                </div>
            </div>


        </Fragment>
    )
}
export default Dashboard