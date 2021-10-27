import React,{forwardRef,Fragment,useEffect,useState} from 'react'
import {Header,Sidebar,Footer,Title,Spinner} from'../../component'
import { Bar } from 'react-chartjs-2';
import API from '../../services';
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker';

const WMStatus = () =>{

const [TOKEN, setTOKEN] = useState(null);
const [loading, setLoading] = useState(false);
const history = useHistory()
const [jumlahstatus, setJumlahstatus] = useState([]);
const [namastatus, setNamastatus] = useState([]);
const [startDate, setStartDate] = useState(null);


var [colors,setColors]=useState([]);

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split(''),
        colors = '#';
    for (var i = 0; i < 6; ++i) {
        colors += letters[Math.round(Math.random() * 15)];
    }
    return colors;
  }
var [intable, setIntable] = useState([]);
var no=1;
const [form, setForm] = useState({
    month : '--Pilih Periode--',
    year : null,
})
const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="form-control" onClick={onClick} ref={ref} style={{textAlign:'left'}}>
      {value}
    </button>
     ));

const handleDate =(str)=>{
    let date = new Date(str)
    let month = date.getMonth() + 1
    let year = date.getFullYear() 
    setStartDate((date))
    setForm({...form, month: month, year:year },date)
}

const getTOKEN =  () => {
    let data =  sessionStorage.getItem('TOKEN')
    data = JSON.parse(data)
    setTOKEN( data)
    return data;
    
}

useEffect(async()=>{
    let token = await getTOKEN();
    if(token == null){   alert('mohon login terlebih dahulu')
      history.push(`/login`)
    // }else if(token !==null){
    //   Promise.all([API.statussm(form, token)]).then(res => {
    //   console.log('hasil', res[0].data);
    //   for (var i = 0; i < res[0].data.length; i++){
    //     setJumlahstatus((jumlahstatus)=>[
    //       ...jumlahstatus,
    //       jumlahstatus = res[0].data[i].jumlahstatus,
    //     ]);
    //     setNamastatus((namastatus)=>[
    //         ...namastatus,
    //         namastatus = res[0].data[i].namastatus,
    //     ]);   
    // //   console.log('jumlah status',jumlahstatus)
    //   }
    //   setIntable(intable=res[0].data)
    // }).catch((e) => {
    //   console.log('error',e);
    // }).finally((f) => setLoading(false))
}}, [])

const handleAction = () =>{
    if(form.year == null){
      alert('Data Periode tidak boleh kosong !')
    }else{
          setLoading(true)
          API.statussm(form, TOKEN).then((res) => {
            console.log('new',res);
            setLoading(false)
            setJumlahstatus([])
            setNamastatus([])
            for (var i = 0; i < res.data.length; i++){
                setJumlahstatus((jumlahstatus)=>[
                  ...jumlahstatus,
                  jumlahstatus = res.data[i].jumlahstatus,
                ]);
                setNamastatus((namastatus)=>[
                    ...namastatus,
                    namastatus = res.data[i].namastatus,
                ]);  
                setColors((colors)=>[
                    ...colors,
                    colors = getRandomColor()
                ]);
            }
            setIntable(intable=res.data)
          }).catch(e => console.log(e))
        }
    console.log(form) 
      }
    


const data = {
    labels:namastatus,
    datasets: [
        {
            label:'',
            data:jumlahstatus,
            backgroundColor:colors
        }
    ]
}
const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  if(loading){
    return (
          <Spinner/>
    )
}
  
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="WMStatus"
                />
                <div className="main-panel">
                    <Header
                        Title="STATUS WM PELANGGAN"
                    />
                    <div className="content">
                    <Title
                          title="STATUS WM PELANGGAN"
                        />
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
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title-edit">Diagram Status WM Pelanggan</div>
                                    </div>
                                    <div className="card-body">
                                        <div className='header'>
                                            <Bar data={data} options={options}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div class="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                <div class="card-header ">
                                    <h4 class="card-title">Tabel Status WM Pelanggan</h4>
                                </div>
                                <div class="card-body table-full-width table-responsive">
                                    <div className="col-lg-12">
                                        <table  className="table table-bordered"> 
                                        <tr>
                                            <th>No</th>
                                            <th>Status</th>
                                            <th>Jumlah</th>
                                        </tr>
                                        {intable.map((intab, index) => (
                                        <tr>
                                            <td>{no++}</td>
                                            <td>{intab.namastatus}</td>
                                            <td>{intab.jumlahstatus}</td>
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
export default WMStatus