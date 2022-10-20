import React,{Fragment,useEffect,useState,forwardRef} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import API from '../../services';
import { Source } from '../../services/Config';
import { Spinner } from'../../component'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Complaint = () =>{
    const [TOKEN, setTOKEN] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    const [departement, setDepartement] = useState([]);
    var no=1;
    var [intable, setIntable] = useState([]);

    const [form, setForm] = useState({
        to : '--Pilih Tanggal--',
        from : '--Pilih Tanggal--',
        status :'',
        dapertement_id :'',
      })

    const getTOKEN =  () => {
        let data =  sessionStorage.getItem('TOKEN')
        data = JSON.parse(data)
        setTOKEN( data)
        return data;
        
        }
        const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
            <button className="form-control" onClick={onClick} ref={ref} style={{textAlign:'left'}}>
              {value}
            </button>
             ));
          
    const [startDate, setStartDate] = useState(null);
    const [startTo, setStartTo] = useState(null);

    const handleDate =(str)=>{
        let date = new Date(str)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear() 
        let all = year +'-'+month+'-'+day
        setStartDate((date))
        setForm({...form, from:all},date)
    }
    const handleTo =(str)=>{
        let to = new Date(str)
        let day = to.getDate()
        let month = to.getMonth() + 1
        let year = to.getFullYear() 
        let all = year +'-'+month+'-'+day
        setStartTo((to))
        setForm({...form, to:all},to)
    }

    useEffect(async()=>{
        let token = await getTOKEN();
        if(token == null){   alert('mohon login terlebih dahulu')
          history.push(`/login`)
        }else if(token !==null){
        Promise.all([API.departement(token)]).then(res => {
        setDepartement(res[0].data)
        }).catch((e) => {
          console.log('eror',e);
        }).finally((f) => setLoading(false))
    }}, [])
    
  
    const handleAction = () =>{
        if(form.from == '--Pilih Tanggal--'){
            alert('Dari Tanggal tidak boleh kosong !')   
        }else if(form.to == '--Pilih Tanggal--'){
            alert('Sampai Tanggal tidak boleh kosong !')
        }else{
        setLoading(true)
        API.complaint(form,TOKEN).then((res) => {
            setIntable(res.data)
            setLoading(false)
            console.log(form)
            }).catch(e => console.log(e))
        }
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
                    active="Complaint"
                />
                <div className="main-panel">
                    <Header
                        Title="REKAP KELUHAN"
                    />
                    <div className="content">
                    <Title
                        title="REKAP KELUHAN"
                    />
                        <div className="row mid distance">
                            <div className="col-md-2">
                            <label className="form-label">Dari Tanggal</label>
                            </div>
                            <div className="col-md-3">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => handleDate(date)}
                                dateFormat="dd/MM/yyyy"
                                value={form.from}
                                // placeholderText='--Pilih Periode--'
                                customInput={<ExampleCustomInput />
                                }
                            />
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-2">
                            <label className="form-label">Sampai Tanggal</label>
                            </div>
                            <div className="col-md-3">
                            <DatePicker
                                selected={startTo}
                                onChange={(to) => handleTo(to)}
                                dateFormat="dd/MM/yyyy"
                                value={form.to}
                                // placeholderText='--Pilih Periode--'
                                customInput={<ExampleCustomInput />
                                }
                            />
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-2">
                              <label className="form-label">Departement</label>
                            </div>
                            <div className="col-md-4">
                            <select class="form-control " data-live-search="true" value={form.dapertement_id} placeholder="Pilih Departement" onChange={e => setForm({...form, dapertement_id: e.target.value })}>
                                <option value=''> --Pilih Semua Departement-- </option>
                                {departement.map((item, index) => (  
                                    <option value={item.id}>{item.name}</option>
                                  ))   }
                            </select>
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-2">
                              <label className="form-label">Status</label>
                            </div>
                            <div className="col-md-4">
                            <select class="form-control " data-live-search="true" value={form.status} placeholder="Pilih Status" onChange={e => setForm({...form, status: e.target.value })}>
                                <option value=''> --Pilih Semua Status-- </option>
                                <option value='Pending'>Pending</option>
                                <option value='Active'>Active</option>
                                <option value='Close'>Close</option>
                            </select>
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
                    <div class="col-lg-12">
                      <div class="card strpied-tabled-with-hover">
                          <div class="card-header ">
                              <h4 class="card-title">Tabel Rekap Keluhan</h4>
                          </div>
                          <div className="col-lg-12">
                          <div class="card-body table-full-width table-responsive">
                              
                              <table  className="table table-bordered"> 
                                  <tr>
                                    <th className="align-middle text-center">No</th>
                                    <th className="align-middle text-center">NAMA</th>
                                    <th className="align-middle text-center">ALAMAT</th>
                                    <th className="align-middle text-center">AREA</th>
                                    <th className="align-middle text-center">TGL MASUK</th>
                                    <th className="align-middle text-center" >KELUHAN</th>
                                    <th className="align-middle text-center">NO SPK</th>
                                    <th className="align-middle text-center">TGL DIKERJAKAN</th>
                                    <th className="align-middle text-center">PEKERJA</th>
                                    <th className="align-middle text-center">KET/TINDAKAN</th>
                                </tr>
                               
                                {intable.map((intab, index) => (
                                  
                                  
                                
                                  <tr>
                                      <td>{no++}</td>
                                      <td>{intab.customer.namapelanggan}</td>
                                      <td>{intab.customer.alamat}</td>
                                      <td>{intab.area}</td>
                                      <td>{new Date(intab.created_at).getFullYear()+'-'+(new Date(intab.created_at).getMonth() + 1)+'-'+new Date(intab.created_at).getDate()}</td>
                                      <td>{intab.description}</td>
                                      <td>{intab.spk}</td>
                                      <td>{new Date(intab.created_at).getFullYear()+'-'+(new Date(intab.created_at).getMonth() + 1)+'-'+new Date(intab.created_at).getDate()}</td>
                                      <td>Internal</td>
                                      <td>{intab.action !=null && intab.action.length > 0 ?intab.action[intab.action.length-1].description : null}</td>
                                  </tr>
                                ))} 
                                  </table>
                              </div>  
                          </div>
                        </div>
                    </div>  
                        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Complaint