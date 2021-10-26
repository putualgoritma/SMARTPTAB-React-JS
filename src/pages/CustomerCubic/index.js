import React, {forwardRef,Fragment, useEffect,useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Footer, Header, Sidebar,Title,Spinner} from '../../component';
import API from '../../services';
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker';


const CustomerCubic = () =>{

  const [TOKEN, setTOKEN] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory()
  const [form, setForm] = useState({
    month : '--Pilih Periode--',
    year : null,
    areal : '',
  })
  const [customer, setCustomer] = useState([]);
  const [kubikasi, setKubikasi] = useState([]);
  const [sr,setSR] = useState([]);
  const [startDate, setStartDate] = useState(null);

  var [unit,setUnit] = useState([]);
  var [intable, setIntable] = useState([]);
  var no=1;

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

  useEffect(async()=>{
    let token = await getTOKEN();
    if(token == null){   alert('mohon login terlebih dahulu')
      history.push(`/login`)
    }else if(token !==null){
      // Promise.all([API.kubikasi(form, token),API.arealGroup(token)]).then(res => {
      Promise.all([API.arealGroup(token)]).then(res => {
      // console.log('hasil', res);
      // for (var i = 0; i < res[0].data.length; i++){
      //   setCustomer((customer)=>[
      //     ...customer,
      //     customer = res[0].data[i].jenispelanggan,
      //   ]);
      //   setKubikasi((kubikasi)=>[
      //     ...kubikasi,
      //     kubikasi = res[0].data[i].kubikasi,
      //   ]);
      //   setSR((sr)=>[
      //     ...sr,
      //     sr = res[0].data[i].lembar,
      //   ]);
      // }
      // setIntable(intable=res[0].data)
      setUnit(unit=res[0].data)
    }).catch((e) => {
      console.log('error',e);
    }).finally((f) => setLoading(false))
}}, [])


const getTOKEN =  () => {
  let data =  sessionStorage.getItem('TOKEN')
  data = JSON.parse(data)
  setTOKEN( data)
  return data;
  
  }

  const handleAction = () =>{
  if(form.areal == ''){
    alert('Data Nama Wilayah tidak boleh kosong !')
  }else if(form.year == null){
      alert('Data Periode tidak boleh kosong !')
    }else{
          setLoading(true)
          API.kubikasi(form,TOKEN).then((res) => {
            console.log('new',res);
            setLoading(false)
            console.log('ress',res.data)
            setForm(form)
            setKubikasi([])
            setSR([])
            for (var i = 0; i < res.data.length; i++){
              setCustomer((customer)=>[
                    ...customer,
                    customer = res.data[i].jenispelanggan,
                  ]);
              setKubikasi((kubikasi)=>[
                ...kubikasi,
                kubikasi = res.data[i].kubikasi,
              ]);
              setSR((sr)=>[
                ...sr,
                sr = res.data[i].lembar,
              ]);
            }
            console.log('kubi',kubikasi)
            setIntable(intable=res.data)
          }).catch(e => console.log(e))
        }
    console.log(form) 
      }


      const data = {
        labels: customer,
        datasets: [
            {
                label:"",
                data:kubikasi,
                backgroundColor:[
                  '#F00000',
                  '#FAFF00',
                  '#23EC1E',
                  '#F00000',
                  '#FAFF00',
                  '#FAFF00',
                  '#23EC1E',
                  '#23EC1E',
                  '#FAFF00',
                  '#FAFF00',
                  '#23EC1E',
                  '#FAFF00',
                  '#F00000',
                  '#FAFF00',
            ]
            }
        ]
    }
    const data1 = {
      labels: customer,
      datasets: [
          {
              label:"",
              data:sr,
              backgroundColor:[
                '#F00000',
                '#FAFF00',
                '#23EC1E',
                '#F00000',
                '#FAFF00',
                '#FAFF00',
                '#23EC1E',
                '#23EC1E',
                '#FAFF00',
                '#FAFF00',
                '#23EC1E',
                '#FAFF00',
                '#F00000',
                '#FAFF00',
          ]
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
                   active="CustomerCubic"
                />
                <div className="main-panel">
                    <Header
                        Title="KUBIKASI PELANGGAN"
                    />
                    <div className="content">
                    <Title
                        title="REKAP PEMAKAIAN AIR PELANGGAN BERDASARKAN WILAYAH"
                    />
                    <div className="row mid distance">
                          <div className="col-md-1">
                            <label className="form-label">Unit</label>
                          </div>
                          <div className="col-md-3">
                            <select class="form-control " data-live-search="true" value={form.areal} placeholder="Pilih Unit" onChange={e => setForm({...form, areal: e.target.value })}>
                            {form.areal =='' && 
                                <option value=''> --Pilih Unit-- </option>
                              }
                                {unit.map((item, index) => (  
                                    <option value={item.group_unit}>{item.namawilayah}</option>
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
                      <div className="row mid distance"> </div>
            
                      <div className="row">
                              <div className="col-md-12">
                                  <div className="card">
                                      <div className="card-header">
                                          <div className="card-title-edit">Diagram Kubikasi</div>
                                      </div>
                                      <div className="card-body">
                                          <div className='header'>
                                              <Bar data={data} options={options}/>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-12 ">
                                  <div className="card">
                                      <div className="card-header">
                                          <div className="card-title-edit">Diagram Jumlah SR</div>
                                      </div>
                                      <div className="card-body">
                                          <div className='header'>
                                          </div>
                                              <Bar data={data1} options={options}/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                
                          
                          {/* //form control */}
                
                    <div class="col-md-12">
                      <div class="card strpied-tabled-with-hover">
                          <div class="card-header ">
                              <h4 class="card-title">Tabel Rekap Pemakaian Air Pelanggan Berdasarkan Wilayah</h4>
                          </div>
                          <div class="card-body table-full-width table-responsive">
                              <div className="col-lg-12">
                                  <table  className="table table-bordered"> 
                                  <tr>
                                    <th rowspan="2">No</th>
                                    <th rowspan="2">GOLONGAN TARIF</th>
                                    <th rowspan="2">JML.LEMBAR</th>
                                    <th colspan="2" className="text-center">PEMAKAIAN AIR(M3)</th>
                                  
                                </tr>
                                <tr>
                                    <th colspan="1" class="text-center">TOTAL M3</th>
                                    <th colspan="1" class="text-center">RATA-RATA M3</th>
                                </tr>
                                {intable.map((intab, index) => (
                                  <tr>
                                      <td>{no++}</td>
                                      <td>{intab.jenispelanggan}</td>
                                      <td>{intab.lembar}</td>
                                      <td>{intab.kubikasi}</td>
                                      <td>{intab.avg}</td>
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
export default CustomerCubic