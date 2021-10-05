import React,{useState,Fragment,useEffect} from 'react';
import Sidebar from 'react-sidebar';
import Side from '../SidebarRes';
import { Spinner } from'../../component'
import {useHistory} from 'react-router-dom'

const Header = (props) =>{
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const logout = () => {
        setLoading(true)
        Promise.all([sessionStorage.removeItem('TOKEN')]).then((result) => {
              setTimeout(function () {
                    setLoading(false)
                    history.push('/login')
                }, 2000); 
        }).catch((e) => {
              setLoading(false)
              alert('logout failed')
        })  
    }

    const [sideBar, setSideBar] = useState(false)

    if(loading){
        return (
              <Spinner/>
        )
  }
    return(
        
        <Fragment>
            <Sidebar
            sidebar={<Side/>}
            open={sideBar}
            onSetOpen={setSideBar}
            >  
            </Sidebar>
            <nav className="navbar navbar-expand-lg " color-on-scroll={500}>
                <div className="container-fluid">
                    <div className="navbar-brand" style={{color:'#1F77D0'}}>{props.Title}</div>
                        <div className="navbar-toggler navbar-toggler-right" onClick={() => setSideBar(true)} >
                        <span className="navbar-toggler-bar burger-lines" />
                        <span className="navbar-toggler-bar burger-lines" />
                        <span className="navbar-toggler-bar burger-lines" />
                        </div>

                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                            <a style={{color:'#1F77D0', fontSize:20, fontWeight:400}} onClick={() => logout()}>  Logout </a>
                    </div>
                </div>
            </nav>
            
        </Fragment>
    )
}
export default Header