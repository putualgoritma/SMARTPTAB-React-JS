import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDataTable } from 'mdbreact';
import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import { Footer, Header, Sidebar, Spinner, Title } from '../../component';
import API from '../../services';


const Mapping = ()=>{

  const [TOKEN, setTOKEN] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory()
  var [intable, setIntable] = useState([]);
  var [operat, setOperat] = useState([]);
  var number=1;
  const [token,setToken] = useState(null);
  const [form, setForm] = useState({
    month :'--Pilih Periode--',
    year : null,
    operator :'s',
    nomorrekening : null
})
  const [columnsTable, setColumnstable] = useState([
    {
        label :'NO',
        field :'no',
        sort :'disabled',
        width : 80
    },
    {
        label :'OPERATOR',
        field :'operator',
        sort :'disabled',
        width : 180
    },
    {
        label :'PERIODE',
        field :'periode',
        sort :'disabled',
        width : 180
    },
    {
        label :'TANGGAL',
        field :'tanggal',
        sort :'disabled',
        width : 180
    },
    {
        label :'SBG/NAMA/GOL/AREAL',
        field :'sbg',
        sort :'disabled',
        width : 180
    },
    {
        label :'METER M3',
        field :'meter',
        sort :'disabled',
        width : 180
    },
    {
        label :'FOTO',
        field :'foto',
        sort : 'disabled',
        width : 220
    },
])
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="form-control" onClick={onClick} ref={ref} style={{textAlign:'left'}}>
    {value}
  </button>
   ));

  const [startDate, setStartDate] = useState(null);
  const handleDate =(str)=>{
    let date = new Date(str)
    let month = date.getMonth() + 1
    let year = date.getFullYear() 
    setStartDate((date))
    setForm({...form, month: month, year:year },date)
  }

const [widerData, setWiderData] = useState()

  useEffect(async()=>{
    let token = await getTOKEN();
    if(token == null){   alert('mohon login terlebih dahulu')
      history.push(`/login`)
    }else if(token !==null){
    // Promise.all([API.mapping(form, token),API.operator(token)]).then(res => {
      Promise.all([API.operator(token)]).then(res => {
      console.log('operator', res);
      setOperat(res[0].data)
      // res[0].data.map((intab, no) => {
      //   setIntable(intable[no]={
      //       no:number++,
      //       operator:intab.operator,
      //       periode:intab.tanggal,
      //       tanggal:intab.infowaktu,
      //       sbg:intab.nomorrekening +'/'+ intab.namapelanggan +'/'+ intab.idgol,
      //       meter:intab.pemakaianair,
      //       foto:  <a href={(process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar))} className="fancybox" data-fancybox="gallery1">
      //       <img src= {(intab.filegambar == null ? 'Tidak ada Foto' :( process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar).replace('public/', '')))} alt="alt" style={{width:200, height:'30%'}}/></a>
      //     })
      // })
      // console.log('intable',intable);
      // setWiderData({
      //   columns: columnsTable,
      //   rows:  intable,
      // })
    }).catch((e) => {
      console.log('eror',e);
    }).finally((f) => setLoading(false))
}}, [])

  
  const getTOKEN =  () => {
    let data =  sessionStorage.getItem('TOKEN')
    data = JSON.parse(data)
    setTOKEN( data)
    return data;
    
    }
    
   
  const handleAction = () =>{
    if(form.operator == 's'){
      alert('Data Operator tidak boleh kosong !')
    }else if(form.year ==null){
      alert('Data Periode tidak boleh kosong !')
    }else{
          setLoading(true)
          API.mapping(form,TOKEN).then((res) => {
            console.log('new',res);
            setLoading(false)
            console.log('ress',res)
            intable=[]
            res.data.map((intab, no) => {
              setIntable(intable[no]={
                  no:number++,
                  operator:intab.operator,
                  periode:intab.tanggal,
                  tanggal:intab.infowaktu,
                  sbg:intab.nomorrekening +'/'+ intab.namapelanggan +'/'+ intab.idgol,
                  meter:intab.pemakaianair,
                  foto:  <a href={(process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar))} className="fancybox" data-fancybox="gallery1">
                  <img src= {(intab.filegambar == null ? 'Tidak ada Foto' :( process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar).replace('public/', '')))} alt="alt" style={{width:200, height:'30%'}}/></a>
                })
            })
            console.log('intable1',intable);
            columnsTable
            setWiderData({
              columns: columnsTable,
              rows:  intable,
            })
          }).catch(e => console.log('errorni',e))
           
        }
    console.log(form) 
      }


      if(loading){
        return (
              <Spinner/>
        )
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
                          title="FOTO MAPPING (SBG)"
                        />
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">Operator</label>
                            </div>
                            <div className="col-md-3">
                            <select class="form-control " data-live-search="true" value={form.operator} placeholder="Pilih Operator" onChange={e => setForm({...form, operator: e.target.value })}>
                                        {form.operator =='s' && 
                                        <option value='s'> --Pilih Operator-- </option>
                                      }
                                        {operat.map((item, index) => (  
                                          <option value={item.Name}>{item.Name}</option>
                                        ))   }
                                  </select>
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-3">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => handleDate(date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                value={form.month}
                                // placeholderText='--Pilih Periode--'
                                customInput={<ExampleCustomInput />
                                }
                              />
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">NO.SBG</label>
                            </div>
                            <div className="col-md-3">
                            <Form.Control type="text" placeholder='Masukan No SBG' onChange={e => setForm({...form, nomorrekening: e.target.value })}  value={form.nomorrekening}/>
                            </div>
                        </div>

                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label" >Filter</label>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" onClick={()=>handleAction()} >Filter</button>
                            </div>
                        </div>
                        <MDBDataTable hover scrollX data={widerData} />
                    </div>
                    
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Mapping