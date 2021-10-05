import React,{Fragment,useEffect,useState} from 'react'
import {Header,Sidebar,Footer,Title,Spinner} from'../../component'
import { MDBDataTable } from 'mdbreact';
import  {Form}  from  'react-bootstrap' ;
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import API from '../../services';
import {useHistory} from 'react-router-dom'
import { Source } from '../../services/Config';
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";


const Mapping = ()=>{
  const [TOKEN, setTOKEN] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory()

  // const [year,setYear] = useState('');
  // const [month, setMonth] = useState('');

  var [intable, setIntable] = useState([]);
  var [operat, setOperat] = useState([]);
  var no=1

  const [token,setToken] = useState(null);
  const [form, setForm] = useState({
    month :null,
    year : null,
    operator : '',
    nomorrekening : null
})



  // const [startDate, setStartDate] =  useState(new Date());

  // const handleChange =(datee)=>{
  //   setStartDate(datee)
  // }

  // const onFormSubmit=(e)=>{
  //   e.preventDefault();
  //   console.log(startDate)
  // }
  const [startDate, setStartDate] = useState(new Date());
  

const handleDate =(str)=>{
let date = new Date(str)
let month = date.getMonth() + 1
let year = date.getFullYear() 
setStartDate((date))
setForm({...form, month: month, year:year },date)

// setForm({...form, year: year })
// alert(form.mounth)
}

//   const handleForm = (key, value) => {
//     setForm({
//         ...form, 
//         [key] : value
//     })
// }

// const handleForm = e => {
//   setForm(prevForm  => {
//     ...prevForm,
//     [e.target.name]: e.target.value,
//   });
// };


  useEffect(()=>{
    let isAmounted = false
    if(!isAmounted) { 
          Promise.all([getTOKEN()]).then((res) => {
                let tokenData = res[0]
                setToken(tokenData=tokenData)
                if(tokenData == null){
                  alert('mohon login terlebih dahulu')
                  history.push(`/login`)
                }else if(tokenData !==null){
                  Promise.all([API.mapping(form,tokenData),API.operator(tokenData)])
                  .then((result)=>{
                    console.log('hasil new',result)
                    // console.log('nilai',allTotal)
                    setLoading(false) 
                    setIntable(intable=result[0].data)
                    setOperat(operat=result[1].data)
                    console.log('data operat',operat)
                    }).catch((e)=>{
                      console.log(e);
                      setLoading(false)
                    })

                  }
  
            });
     }
     return () => {
      Source.cancel('cancel api')
      isAmounted = true;
}
}, [])

  
  const getTOKEN =  () => {
    let data =  sessionStorage.getItem('TOKEN')
    data = JSON.parse(data)
    setTOKEN( data)
    return data;
    
    }
    if(loading){
      return (
            <Spinner/>
      )
  }

  const handleAction = () =>{
    if(form.operator == ''&& form.year == '' && form.month == ''){
      alert('Data Operator/Periode tidak boleh kosong !')
    }else{
          setLoading(true)
          API.mapping(form,token).then((res) => {
            console.log('new',res);
            setLoading(false)
            console.log('ress',res.data)
            // setForm(form)
            setIntable(intable=res.data)
          }).catch(e => console.log(e))
        }
    console.log(form) 
      }
    

    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                   active="Mapping"
                />
                <div className="main-panel">
                    <Header
                        Title="MAPPING"
                    />
                    <div className="content">
                      <Title
                          title="FOTO MAPPING (OPERATOR)"
                        />
                        <div className="row mid">
                            <div className="col-md-1">
                              <label className="form-label">Operator</label>
                            </div>
                            <div className="col-md-3">
                              {/* <Autocomplete
                              id="combo-box-demo"
                              options={operator}
                              getOptionLabel={(option) => option.title}
                              style={{}}
                              renderInput={(params) => <TextField {...params} label="OPERATOR" variant="outlined" />}
                              /> */}
                              <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Pilih Operator" value ={form.operator} onChange={e => setForm({...form, operator: e.target.value })} />
                                <datalist id="datalistOptions">
                                {operat.map((item, index) => (  
                                    <option value={item.Name}>{item.Name}</option>
                                  ))   }
                                  </datalist>
                            </div>
                        </div>
                     
                        <div className="row mid distance">
                            <div className="col-md-1">
                                <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-3">
{/*                             
                            <form onSubmit={onFormSubmit}>
                            <div className="form-group">
                              <DatePicker
                                  selected={startDate }
                                  onChange={handleChange }
                                  name="startDate"
                                  dateFormat="MM/yyyy"
                                  
                              />
                            </div>    
                            </form> */}
                            
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => handleDate(date)}
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                            />
                            
                            {/* <Form.Group controlId="dob">
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control  type="date" name="dob" placeholder="Pilih Periode"  onChange={e => handleDate(e.target.value)} />
                            </Form.Group> */}

                                {/* <DatePickerComponent 
                                    placeholder="Pilih Periode"
                                    format="MMM-yy"
                                    start="Year"
                                    depth="Year"
                                    value={'2020-05'}
                                    onChange={e => handleDate(e.target.value)}
                                    >
                                </DatePickerComponent>
                               */}
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">NO.SBG</label>
                            </div>
                            <div className="col-md-3">
                            <Form.Control type="text"  onChange={e => setForm({...form, nomorrekening: e.target.value })}  value={form.nomorrekening}/>
                            </div>
                        </div>

                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label" >Filter</label>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" onClick={()=>handleAction()} >Filter</button>
                                 {/* <button className="btn btn-primary" onClick={alert(form.month)} >Filter</button> */}
                            </div>
                        </div>
                        {/* Table */}

                        <div class="card-body table-full-width table-responsive">
                                  <div className="col-lg-12">
                                      <table  className="table table-bordered"> 
                                        <tr>
                                          <th>NO</th>
                                          <th>OPERATOR</th>  
                                          <th>PERIODE</th>
                                          <th>TANGGAL</th>
                                          <th>SBG/NAMA/GOL/AREA</th>
                                          <th>METER 3</th>
                                          <th>FOTO</th>
                                        </tr>
                                        {intable.map((intab, index) => (  
                                          <tr>
                                              <td className="table-text">{no++}</td>
                                              <td className="table-text">{intab.operator}</td>
                                              <td className="table-text">{intab.tanggal}</td>
                                              <td className="table-text">{intab.infowaktu}</td>
                                              <td className="table-text">{intab.nomorrekening}/{intab.namapelanggan}/{intab.idgol}/{intab.idareal}</td>
                                              <td className="table-text">{intab.pemakaianair}</td>
                                              {/* <td>{intab.filegambar}</td> */}
                                              <td>
                                                  <img src= {(intab.filegambar == null ? 'Tidak ada Foto' :( process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar).replace('public/', '')))} alt="alt" style={{width:200, height:'30%'}}/>
                                              </td>
                                          </tr>
                                           ))   }
                                      </table>
                                  </div>  
                                </div>


                        <Title
                          title="FOTO MAPPING (SBG)"
                        />
                        <div className="row mid">
                            <div className="col-md-1">
                              <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-3">
                                <DatePickerComponent placeholder="Pilih Periode"
                                format="MMM-yyyy"
                                start="Year"
                                depth="Year"></DatePickerComponent>
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">NO.SBG</label>
                            </div>
                            <div className="col-md-3">
                              <Form.Control type="text"/>
                            </div>
                        </div>
                     
                     {/* Table */}
                    </div>
                    
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Mapping