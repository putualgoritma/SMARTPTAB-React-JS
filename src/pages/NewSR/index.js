import React, {Fragment,useEffect,useState} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { MDBDataTable } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import API from '../../services';
import { Source } from '../../services/Config';
import { Spinner } from'../../component'
import {useHistory} from 'react-router-dom'

const NewSR = ()=>{
  const [TOKEN, setTOKEN] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory()

  var [bulan, setBulan] = useState([]);
  var [total, setTotal] = useState([]);
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

  useEffect(()=>{
    let isAmounted = false
    if(!isAmounted) { 
          Promise.all([getTOKEN()]).then((res) => {
                let tokenData = res[0]
                if(tokenData == null){
                  alert('mohon login terlebih dahulu')
                  history.push(`/login`)
                }else if(tokenData !==null){
                  Promise.all([API.srNew(tokenData)])
                  .then((result)=>{
                    console.log('hasil new',result)
                    for (var i = 0; i < result[0].data.length; i++){
                      setBulan((bulan)=>[
                        ...bulan,
                        bulan = result[0].data[i].bulan,
                      ]);
                      setTotal((total)=>[
                        ...total,
                        total = result[0].data[i].total,
                      ]);
                      setColors((colors)=>[
                        ...colors,
                        colors = getRandomColor()
                      ]);
                      setIntable(intable=result[0].data)
                      // console.log('hasil bulan',result[0].data[i].bulan)
                      setAllTotal(allTotal += parseInt((result[0].data[i].total)))
                     
                    }
                    // console.log('nilai',allTotal)
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


    const [datatable, setDatatable] = React.useState({
        columns: [
          {
            label: 'NO',
            field: 'no',
            width: 150,
            sort: 'disabled',
          },
          {
            label: 'BULAN',
            field: 'bulan',
            sort: 'disabled',
            width: 270,
          },
          {
            label: 'SR BARU',
            field: 'sr',
            sort: 'disabled',
            width: 200,
          },
        ],
        rows: [
          {
            no: '',
            bulan :'',
            sr :'',
          },
          {
            no: '',
            bulan :'',
            sr :'',
          },
          {
            no: '',
            bulan :'',
            sr :'',
          },
          {
            no: '',
            bulan :'',
            sr :'',
          },
        ],
      });

      const widerData = {
        columns: [
          ...datatable.columns.map((col) => {
            col.width = 200;
            return col;
          }),
        ],
        rows: [...datatable.rows],
      };
      

      const data = {
        labels: bulan,
        datasets: [
          {
            label: '',
            data: total,
            
            backgroundColor: colors,
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
                   active="New SR"
                />
                <div className="main-panel">
                    <Header
                        Title="SR BARU"
                    />
                    <div className="content">
                    <Title
                        title="DATA JUMLAH SR BARU"
                      />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title-edit">Diangram Batang
                                        Data Jumlah SR Baru Periode 2021</div>
                                    </div>
                                    <div className="card-body">
                                        <div className='header'>
                                            <Bar data={data} options={options}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <MDBDataTable hover scrollX data={widerData} /> */}
                        <div class="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                <div class="card-header ">
                                    <h4 class="card-title">Tabel SR Baru</h4>
                                   
                                </div>
                                <div class="card-body table-full-width table-responsive">
                                  <div className="col-lg-12">
                                      <table  className="table table-bordered"> 
                                        <tr>
                                          <th>No</th>
                                          <th>Bulan</th>  
                                          <th>SR Baru</th>
                                        </tr>
                                        {intable.map((intab, index) => (  
                                          <tr>
                                              <td style={{fontSize:15, color:'black'}}>{no++}</td>
                                              <td style={{fontSize:15, color:'black'}}>{intab.bulan}</td>
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
                    
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default NewSR