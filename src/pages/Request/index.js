import React,{Fragment,useEffect,useState,forwardRef} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import API from '../../services';
import { Source } from '../../services/Config';
import { Spinner } from'../../component'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Request = () =>{
    const [TOKEN, setTOKEN] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    const [departement, setDepartement] = useState([]);
    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate));
    var no=1;
    var [intable, setIntable] = useState([]);
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var [hari,setHari]=useState([]);
    var [tanggal,setTanggal]=useState('');
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
        API.request(form,TOKEN).then((res) => {
            setIntable(res.data)
  
            setLoading(false)
            console.log('new',res.data[2].created_at);
            console.log(form)
            }).catch(e => console.log(e))
        }
    }

    function timeDiffCalc(dateFuture, dateNow) {
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        // console.log('calculated hours', hours);
        // console.log('panjang',hours.toString().length)
    
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        // console.log('minutes', minutes);

        //calculate seconds
        const second = Math.floor(diffInMilliSeconds) %60;
        diffInMilliSeconds -= second;
        // console.log('second', second)
    
        let difference = '';
       
        let hasil = (hours.toString().length == 1 ? "0"+hours : hours) +':'+ (minutes.toString().length == 1 ? "0"+minutes : minutes)+':'+(second.toString().length == 1 ? "0"+second : second)
        // difference += (hours === 0 || hours === 1) ? `${hours}:` : `${hours}:`;
    
        // difference += (minutes === 0 || hours === 1) ? `${minutes}:` : `${minutes}:`; 

        // difference += (second === 0 || second === 1) ? `${second}:` : `${second}:`; 
    
        return hasil;
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
                    active="Request"
                />
                <div className="main-panel">
                    <Header
                        Title="REKAP PERMINTAAN"
                    />
                    <div className="content">
                    <Title
                        title="REKAP PERMINTAAN"
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
                              <h4 class="card-title">Tabel Rekap Permintaan</h4>
                          </div>
                          <div className="col-lg-12">
                          <div class="card-body table-full-width table-responsive">
                              
                              <table  className="table table-bordered"> 
                                  <tr>
                                    <th rowspan="3 "className="align-middle text-center" >No</th>
                                    <th rowspan="3" className="align-middle text-center">Hari</th>
                                    <th rowspan="3" className="align-middle text-center">TANGGAL</th>
                                    <th rowspan="3" className="align-middle text-center">AREA</th>
                                    <th rowspan="3" className="align-middle text-center">NO SBG</th>
                                    <th rowspan="3" className="align-middle text-center">NAMA</th>
                                    <th rowspan="3" className="align-middle text-center">ALAMAT</th>
                                    <th colspan="3" className="text-center align-middle">KELUHAN MASUK</th>
                                    <th colspan="2" className="text-center align-middle">RENCANA PENANGANAN SERVICE</th>
                                    <th rowspan="3" className="align-middle text-center">T/P/R/L</th>
                                    <th rowspan="3" className="align-middle text-center">   </th>
                                    <th colspan="2" className="align-middle text-center">TINDAKAN PENYELESESAIAN</th>
                                    <th rowspan="3" className="align-middle text-center">KETERANGAN</th>
                                </tr>
                                <tr>
                                    <th colspan="3" class="text-center">JAM</th>
                                    <th colspan="1" rowspan="2" class="text-center align-middle">KODE</th>
                                    <th colspan="1" rowspan="2" class="text-center align-middle">KELUHAN</th>
                                    <th colspan="1" rowspan="2" class="text-center align-middle">TANGGAL</th>
                                    <th colspan="1" rowspan="2" class="text-center align-middle">KECEPATAN (HARI)</th>
                                </tr>
                                <tr>
                                    <th colspan="1" class="text-center">AWAL</th>
                                    <th colspan="1" class="text-center">AKHIR</th>
                                    <th colspan="1" class="text-center">WAKTU</th>
                                </tr>
                                {intable.map((intab, index) => (
                                  <tr>
                                      <td>{no++}</td>
                                      <td>{days[new Date(intab.created_at).getDay()]}</td>
                                      <td>{new Date(intab.created_at).getFullYear()+'-'+(new Date(intab.created_at).getMonth() + 1)+'-'+new Date(intab.created_at).getDate()}</td>
                                      <td>{intab.area}</td>
                                      <td>{intab.customer_id}</td>
                                      <td>{intab.customer.namapelanggan}</td>                                      
                                      <td>{intab.customer.alamat}</td>
                                      <td>{("0"+new Date(intab.created_at).getHours()).slice(-2)+':'+("0"+new Date(intab.created_at).getMinutes()).slice(-2)+':'+("0"+new Date(intab.created_at).getSeconds()).slice(-2)}</td>
                                      <td>{intab.delegated_at != null ? ("0"+new Date(intab.delegated_at).getHours()).slice(-2)+':'+("0"+new Date(intab.delegated_at).getMinutes()).slice(-2)+':'+("0"+new Date(intab.delegated_at).getSeconds()).slice(-2) : ("0"+new Date(intab.created_at).getHours()).slice(-2)+':'+("0"+new Date(intab.created_at).getMinutes()).slice(-2)+':'+("0"+new Date(intab.created_at).getSeconds()).slice(-2)}</td> 
                                      <td>{timeDiffCalc(new Date(intab.created_at), new Date(intab.delegated_at !=null ? intab.delegated_at : intab.created_at))}</td>
                                      <td>{intab.code}</td>
                                      <td>{intab.category.name}</td>
                                      <td>{intab.category.categorytype.code}</td>
                                      <td>0</td>
                                      <td>{new Date(intab.updated_at).getFullYear()+'-'+(new Date(intab.updated_at).getMonth() + 1)+'-'+new Date(intab.updated_at).getDate()}</td>
                                      <td>{parseInt((new Date(intab.updated_at).getTime()-new Date(intab.created_at).getTime())/(1000 * 3600 * 24))}</td>
                                      <td>{intab.action && intab.action.length > 0  ?intab.action[intab.action.length-1].memo : null}</td>
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
export default Request