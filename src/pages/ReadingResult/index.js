import React,{Fragment, useEffect,useState,forwardRef} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { Bar } from 'react-chartjs-2';
import API from '../../services';
import { Source } from '../../services/Config';
import { Spinner } from'../../component'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ReadingResult = ()=>{
    const [TOKEN, setTOKEN] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    var [operat, setOperat] = useState([]);
    var [total, setTotal] = useState([]);
    var [tanggal, setTanggal] = useState([]);
    var [allTotal, setAllTotal] = useState(0);
    var [intable, setIntable] = useState([]);
    var no=1;

    var [colors,setColors]=useState([]);

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split(''),
            colors = '#';
        for (var i = 0; i < 6; ++i) {
            colors += letters[Math.round(Math.random() * 15)];
        }
        return colors;
    }
    const [form, setForm] = useState({
        month :'--Pilih Periode--',
        year : null,
        operator :'s',
    })

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
  
    useEffect(async()=>{
        let token = await getTOKEN();
        if(token == null){   alert('mohon login terlebih dahulu')
          history.push(`/login`)
        }else if(token !==null){
        // Promise.all([API.reading(form, token),API.operator(token)]).then(res => {
        Promise.all([API.operator(token)]).then(res => {
        setOperat(res[0].data)
        // for (var i = 0; i < res[0].data.length; i++){
        //     setTanggal((tanggal)=>[
        //         ...tanggal,
        //         tanggal = res[0].data[i].date,
        //       ]);
        //     setTotal((total)=>[
        //         ...total,
        //         total = res[0].data[i].total,
        //       ]);
        //     setAllTotal(allTotal += parseInt((res[0].data[i].total)))
        // }

        // setIntable(intable=res[0].data)
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
            API.reading(form,TOKEN).then((res) => {
                console.log('nilai',res)
            setLoading(false)
            intable=[]
            setTanggal([])
            setTotal([])
            setIntable(intable=res.data)
            for (var i = 0; i < res.data.length; i++){
                setTanggal((tanggal)=>[
                    ...tanggal,
                    tanggal = res.data[i].date,
                  ]);
                setTotal((total)=>[
                    ...total,
                    total = res.data[i].total,
                  ]);
                  setColors((colors)=>[
                    ...colors,
                    colors = getRandomColor()
                ]);
                setAllTotal(allTotal += parseInt((res.data[i].total)))
            }

            }).catch(e => console.log('errorni',e))
        }
    console.log(form) 
      }
  
      
  
        const data = {
          labels: tanggal,
          datasets: [
            {
              label: '',
              data: total,
              
              backgroundColor: colors
            },
          ],
        };
        
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
                    active="Reading Result"
                />
                <div class="main-panel">
                    <Header
                        Title="HASIL BACAAN"
                    />
                    <div className="content">
                    <Title
                          title="HASIL BACAAN OPERATOR"
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
                                            <div className="card-title-edit">Diangram Batang
                                            Data Jumlah Hasil Bacaan</div>
                                        </div>
                                        <div className="card-body">
                                            <div className='header'>
                                                <Bar data={data} options={options}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            <div class="col-md-12">
                                <div class="card strpied-tabled-with-hover">
                                    <div class="card-header ">
                                        <h4 class="card-title">Tabel Hasil Bacaan</h4>
                                    
                                    </div>
                                    <div class="card-body table-full-width table-responsive">
                                    <div className="col-lg-12">
                                        <table  className="table table-bordered"> 
                                            <tr>
                                            <th>No</th>
                                            <th>Tanggal</th>  
                                            <th>Jumlah Bacaan</th>
                                            </tr>
                                            {intable.map((intab, index) => (  
                                            <tr>
                                                <td style={{fontSize:15, color:'black'}}>{no++}</td>
                                                <td style={{fontSize:15, color:'black'}}>{intab.date}</td>
                                                <td style={{fontSize:15, color:'black'}}>{intab.total}</td>
                                            </tr>
                                            ))   }
                                            <tr>
                                                <td colspan="2">TOTAL</td>
                                                <td>{allTotal}</td>
                                            </tr>
                                        </table>
                                    </div>  
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
export default ReadingResult