import React,{useEffect,useState} from 'react'
import { Fragment} from 'react'
import {Header,Sidebar,Footer,Title,Spinner} from'../../component'
import { MDBDataTable } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import API from '../../services';
import { Source } from '../../services/Config';
import {useHistory} from 'react-router-dom'


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


  const SRActivePasif = () =>{
  const [TOKEN, setTOKEN] = useState(null)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  // Diagram Batang
  var [wilayah, setWilayah] = useState([]);
  var [totalaktif, setTotalAktif] = useState([]);
  var [totalpasif, setTotalPasif] = useState([]);
  

  // Diagram Donut
  var [totalA, setTotalA] = useState(0);
  var [totalP, setTotalP] = useState(0);

  //Persentase
  var [persenAktif,setPersenAktif] = useState(null);
  var [persenPasif,setPersenPasif] = useState(null);
  
  var [intable, setIntable] = useState([]);
  var no=1;
 



  useEffect( () => {
    let isAmounted = false
   
    if(!isAmounted) { 
          Promise.all([getTOKEN()]).then((res) => {
                let tokenData = res[0]
              if(tokenData == null){
                    alert('mohon login terlebih dahulu')
                    history.push(`/login`)
              }else if(tokenData !==null){
                  Promise.all([API.srAktifPasif(tokenData)])
                  .then((result)=>{
                    for (var i = 0; i < result[0].data.length; i++){
                      // setWilayah(wilayah = result[0].data[unit].namawilayah)
                      setWilayah((wilayah)=>[
                        ...wilayah,
                        wilayah = result[0].data[i].namawilayah,
                      ]);
                      setTotalAktif((totalaktif)=>[
                        ...totalaktif,
                        totalaktif = result[0].data[i].totalaktif,
                      ]);
                      setTotalPasif((totalpasif)=>[
                        ...totalpasif,
                        totalpasif = result[0].data[i].totalpasif,
                      ]);
                      setTotalA(totalA += parseInt(result[0].data[i].totalaktif))
                      setTotalP(totalP += parseInt(result[0].data[i].totalpasif))
                    
                    }
                    setIntable(intable=result[0].data)
                 
                    // console.log('totalaktif',result )
                    setLoading(false) 
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
var data = {
  labels: wilayah,
  datasets: [
    {
      label: 'Aktif',
      data: totalaktif,
      backgroundColor: '#23EC1E',
    },
    {
      label: 'Pasif',
      data: totalpasif,
      backgroundColor: '#F00000',
    },
  ],
};

const data1 = {
  labels: ['Aktif','Pasif'],
  datasets: [
    {
      label: '',
      data: [totalA,totalP],
      backgroundColor: [
       '#23EC1E',
       '#F00000'
      ]
    },
  ],
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
                    active="SR Active Pasif"
                />
                <div className="main-panel">
                    <Header
                        Title="SR AKTIF & PASIF"
                    />
                    <div className="content">
                      <Title
                        title="DATA SR AKTIF & PASIF"
                      />
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card ">
                                    <div className="card-header ">
                                        <div className="card-title-edit">Diagram Lingkaran 
                                            SR Aktif & Pasif Semua Unit Periode  {new Date().getFullYear()}</div>
                                    </div>
                                    <div className="card-body ">
                                    <div className='header'>
                                    </div>
                                    <Doughnut data={data1} />
                                    <hr></hr>
                                      <div className="stats">
                                        {Math.round(persenAktif=(totalA/(totalA+totalP))*100)}% Aktif & {Math.round(persenPasif=(totalP/(totalA+totalP))*100)}%Pasif
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card ">
                                    <div className="card-header ">
                                        <div className="card-title-edit">Diagram Batang
                                            SR Aktif & Pasif Semua Unit Periode  {new Date().getFullYear()}</div>
                                    </div>
                                    <div className="card-body ">
                                        <Bar data={data} options={options} />
                                    </div>
                                    <div className="card-footer ">
                                        <div className="legend">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                <div class="card-header ">
                                    <h4 class="card-title">Tabel SR Aktif & Pasif  {new Date().getFullYear()}</h4>
                                </div>
                                <div class="card-body table-full-width table-responsive">
                                  <div className="col-lg-12">
                                      <table  className="table table-bordered"> 
                                        <tr>
                                          <th>No</th>
                                          <th>Unit</th>  
                                          <th>Aktif</th>
                                          <th>Pasif</th>
                                          <th>Total</th>
                                        </tr>
                                        {intable.map((intab, index) => (  
                                          <tr>
                                              <td style={{fontSize:15, color:'black'}}>{no++}</td>
                                              <td style={{fontSize:15, color:'black'}}>{intab.namawilayah}</td>
                                              <td style={{fontSize:15, color:'black'}}>{intab.totalaktif}</td>
                                              <td style={{fontSize:15, color:'black'}}>{intab.totalpasif}</td>
                                              <td style={{fontSize:15, color:'black'}}>{parseInt(intab.totalpasif)+parseInt(intab.totalaktif)}</td>
                                          </tr>
                                          ))   }
                                          <tr>
                                              <td colspan="2">TOTAL</td>
                                              <td>{totalA}</td>
                                              <td>{totalP}</td>
                                              <td>{totalA+totalP}</td>
                                          </tr>
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
export default SRActivePasif