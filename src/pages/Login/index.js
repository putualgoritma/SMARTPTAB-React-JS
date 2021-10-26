import React,{Fragment, useState} from 'react'
import API from '../../services'
import { Link, useHistory} from 'react-router-dom'
import { Wellcome } from '../../assets'
import { Spinner } from'../../component'

const Login = ()=>{
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        email: null,
        password: null,
  })
    const onChangeForm = (name, value) => {
        setForm(
            { ...form,
            [name] : value}
        )
    }
    
    const setTOKEN = async (data) => {
          let setData =  await  sessionStorage.setItem('TOKEN', JSON.stringify(data));
    }

  const handleLogin = () => {
    if(form.email !==null && form.password !==null){
      setLoading(true)
          API.login(form).then(result => {
            if(result.success == true){
            setTOKEN(result.token);
            console.log(result);
                setForm({
                      email:null,
                      password:null,
                })
                setLoading(false)
                
                history.push("/Dashboard");
              }else{ 
                alert('data tidak ditemukan')
                setLoading(false)
                history.push("/Login");
              }   
          }).catch((e) => {
                console.log(e.request);
                alert('login gagal')
                setLoading(false)
          })
    }else{
          alert('mohon isi data dengan benar')
    }
}
  if(loading ){
    return (
          <Spinner/>
    )
  }
    return(
        <Fragment>
           {/* <div className="container-fluid">
      <div className="container">
        <div className="login">
            <div className="row  mb-1">
                <div className="col-md-8 col-md-offset-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            onChange={(value) => onChangeForm('email', value.target.value)}/>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-8 col-md-offset-2">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleFormControlInput2"
                          placeholder="******"
                          onChange={(value) => onChangeForm('password', value.target.value)}/>
                 </div>
            </div>
            <div className="mb-3">
              <button
                  type='submit'
                  className='button1'
                  onClick={() => {handleLogin()}
                  }>
                  Login
                  </button><br/>
                  <button
                  type='submit'
                  className='button1'
                  onClick={() =>console.log('email dan password',form.email, form.password)
                  }>
                  Login
                  </button>
                   
            </div>     

        </div>
      </div>
    </div> */}

<div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100">
      <div className="login100-pic js-tilt" data-tilt>
        <img src = {Wellcome}/>
      </div>
      <div className="login100-form validate-form">
        <span className="login100-form-title">
          Login
        </span>
        Email
        <div className="wrap-input100 validate-input" >
          <input 
                className="input100" 
                placeholder="Email"
                type="email"
                onChange={(value) => onChangeForm('email', value.target.value)}
          />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
        </div>
        Password
        <div className="wrap-input100 validate-input">
          <input 
                className="input100" 
                placeholder="Password" 
                type="password"
                onChange={(value) => onChangeForm('password', value.target.value)}
            />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
        <div className="container-login100-form-btn">
          <button 
                  className="login100-form-btn"  
                  type="submit"
                  onClick={() => {handleLogin()}
                  }>
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

        </Fragment>
    )
}

export default Login