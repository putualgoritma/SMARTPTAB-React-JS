import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDataTable } from 'mdbreact';
import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import { Footer, Header, Sidebar, Spinner, Title } from '../../component';
import API from '../../services';


const MappingSBG = ()=>{

  const [TOKEN, setTOKEN] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory()
  var [intable, setIntable] = useState([]);
  const [token,setToken] = useState(null);
  const [form, setForm] = useState({
    year : null,
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
        width : 180
    },
])
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="form-control" onClick={onClick} ref={ref} style={{textAlign:'left'}}>
    {value}
  </button>
   ));

  const [startDate, setStartDate] = useState(new Date());
    const handleDate =(str)=>{
    let date = new Date(str)
    let year = date.getFullYear() 
    setStartDate((date))
    setForm({...form, year:year },date)
}

const [widerData, setWiderData] = useState()

  useEffect(async()=>{
    let token = await getTOKEN();
    if(token == null){   alert('mohon login terlebih dahulu')
      history.push(`/login`)
    }else if(token !==null){
    Promise.all([API.mapping(form, token)]).then(res => {
      console.log('operator', res);
      res[0].data.map((intab, no) => {
        setIntable(intable[no]={
            no:no++,
            operator:intab.operator,
            periode:intab.tanggal,
            tanggal:intab.infowaktu,
            sbg:intab.nomorrekening +'/'+ intab.namapelanggan +'/'+ intab.idgol,
            meter:intab.pemakaianair,
            foto:  <a href={(process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar))} className="fancybox" data-fancybox="gallery1">
            <img src= {(intab.filegambar == null ? 'Tidak ada Foto' :( process.env.REACT_APP_IMAGE_URL  + String(intab.filegambar).replace('public/', '')))} alt="alt" style={{width:200, height:'30%'}}/></a>
          })
      })
      console.log('intable',intable);
      setWiderData({
        columns: columnsTable,
        rows:  intable,
      })
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
    if(form.year == null){
      alert('Data Periode tidak boleh kosong !')
    }else if(form.nomorrekening ==null){
      alert('Data No SBG tidak boleh kosong !')
    }else{
          setLoading(true)
          API.mapping(form,TOKEN).then((res) => {
            console.log('new',res);
            setLoading(false)
            console.log('ress',res)
            intable=[]
            res.data.map((intab, no) => {
              setIntable(intable[no]={
                  no:no++,
                  operator:intab.operator,
                  periode:intab.tanggal,
                  tanggal:intab.infowaktu,
                  sbg:intab.nomorrekening,
                  meter:intab.pemakaianair +' ' + intab.nomorrekening,
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
                   active="MappingSBG"
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
                              <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-3">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => handleDate(date)}
                                showYearPicker
                                dateFormat="yyyy"
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
                            <Form.Control type="text"  onChange={e => setForm({...form, nomorrekening: e.target.value })}  value={form.nomorrekening}/>
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
export default MappingSBG