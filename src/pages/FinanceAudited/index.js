import { faBookOpen, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import React, {forwardRef,Fragment, useEffect,useState } from 'react';
import { Footer, Header, Sidebar, Title,Spinner } from '../../component';
import { useHistory } from 'react-router-dom';
import API from '../../services';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const FinanceAudited = () =>{
    const [TOKEN, setTOKEN] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    var [pdf, setPdf] = useState([]);
    const [form, setForm] = useState({
        year : '--Pilih Periode--',
    })

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

    useEffect(async()=>{
        let token = await getTOKEN();
        if(token == null){   alert('mohon login terlebih dahulu')
          history.push(`/login`)
        }else if(token !==null){
          Promise.all([API.audited(form,token)]).then(res => {
          setPdf(res[0].data)
        }).catch((e) => {
          console.log('eror',e);
        }).finally((f) => setLoading(false))
    }}, [])

    const handleAction = () =>{
        if(form.year =='--Pilih Periode--'){
          alert('Data Tahun tidak boleh kosong !')
        }else{
              setLoading(true)
              API.audited(form,TOKEN).then((res) => {
                
                 setPdf(res.data)
                setLoading(false)
              }).catch(e => console.log('errorni',e))
               
            }
            console.log(form) 
          }

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
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="Finance Audited"
                />
                <div class="main-panel">
                    <Header
                        Title="LAPORAN KEUANGAN AUDITED"
                    />
                    <div className="content">
                    <Title
                          title="DATA LAPORAN KEUANGAN AUDITED"
                        />
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-3">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => handleDate(date)}
                                value={form.year}
                                showYearPicker
                                dateFormat="yyyy"
                                customInput={<ExampleCustomInput />
                                }
                              />
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
                        <div className="col-md-10 offset-md-1" style={{backgroundColor:'white'}}>
                                <h4 class="card-title" style={{paddingTop:10}}>PDF Laporan Keuangan Audited</h4>
                            <div className="row" >
                            {pdf.map((item, index) => (  
                                <div className="col-4 col-sm-4 col-lg-4 mt-2 mb-2" >
                                    <div className="text-center">
                                        <a href={(process.env.REACT_APP_IMAGE_URL_PDF  + String(item.file))} className="fancybox" data-fancybox="gallery1">
                                            <div className="col-md-10 offset-md-1 warna">
                                            <FontAwesomeIcon icon={faFilePdf} style={{color:'white', width:'35%', height:'35%', paddingTop:5}}/>
                                                <div style={{color:'white'}}>{item.name}</div>
                                            </div>
                                        </a>
                                        <div className="col-md-10 offset-md-1 mt-1">
                                            <span><b>{item.periode}</b></span>
                                            {/* <span onClick={()=>console.log(form.year)}>test</span> */}
                                        </div>
                                    </div>
                                </div>
                            ))   }
                            </div>
                        </div>

                        {/* <div className="container">
                            <div className="container-fluid">
                                <div className="col-lg-12" style={{backgroundColor:'white'}}>
                                    <div className="row">
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'blue'}}>
                                                asd
                                        </div>
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'green'}}>
                                            asd
                                        </div>
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'yellow'}}>
                                            asd
                                        </div>
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'red'}}>
                                            asd
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div> */}
             
                        <Title
                          title="DATA LAPORAN KINERJA AUDITED"
                          paddingTop={40}
                        />
                        <div className="row mid distance">
                            <div className="col-md-1">
                                <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-4">
                                <DatePickerComponent placeholder="Pilih Periode"
                                format="MMM-yy"
                                start="Year"
                                depth="Year"></DatePickerComponent>
                            </div>
                        </div>
                        <div className="row" style={{justifyContent:'center'}}>
                            <div className="col-md-10" style={{backgroundColor:'white', height:300}}>
                                
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default FinanceAudited