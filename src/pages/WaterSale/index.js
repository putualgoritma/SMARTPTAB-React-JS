import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import {MDBDataTable} from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const unit = [
    {title: 'UNIT 1'},
    {title: 'UNIT 2'},
    {title: 'UNIT 3'},
    {title: 'UNIT 4'},
    {title: 'UNIT 5'},
  ];
const WaterSale = () =>{
    const [datatable, setDatatable] = React.useState ({
        columns:[
            {
                label:'NO',
                field:'no',
                sort:'disabled',
            },
            {
                label:'GOLONGAN TARIF',
                field:'golongan',
                sort:'disabled',
            },
            {
                label:'JUMLAH LEMBAR',
                field:'jumlah',
                sort:'disabled',
            },
            {
                label:'TOTAL M3',
                field:'total',
                sort:'disabled'
            }
        ],
        rows:[
            {
                no:'',
                golongan:'',
                jumlah:'',
                total:''
            },
            {
                no:'',
                golongan:'',
                jumlah:'',
                total:''
            },
            {
                no:'',
                golongan:'',
                jumlah:'',
                total:''
            },
        ]
    })
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
        labels: ['','','','',],
        datasets: [
            {
                label:"",
                data:[10,4,5,7],
                backgroundColor:[
                '#FAFF00',
                '#F00000',
                '#F00000',
                '#23EC1E',
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
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="Water Sale"
                />
                <div className="main-panel">
                    <Header
                        Title="LAPORAN PENJUALAN AIR BULANAN"
                    />
                    <div className="content">
                    <Title
                        title="LAPORAN PENJUALAN AIR BULANAN"
                    />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title-edit">Diagram Kubikasi</div>
                                    </div>
                                    <div className="card-body">
                                        <div className='header'>
                                        </div>
                                            <Bar data={data} options={options}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                      <div className="card-header">
                                          <div className="card-title-edit">Diagram Jumlah Rupiah</div>
                                      </div>
                                      <div className="card-body">
                                          <div className='header'>
                                          </div>
                                              <Bar data={data} options={options}/>
                                      </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">PERIODE</label>
                            </div>
                            <div className="col-md-3">
                                <DatePickerComponent placeholder="Pilih Periode"
                                format="MMM-yyyy"
                                start="Year"
                                depth="Year"></DatePickerComponent>
                            </div>
                          </div>
                          <div className="row mid distance">
                            <div className="col-md-1">
                              <label className="form-label">UNIT</label>
                            </div>
                            <div className="col-md-3">
                              <Autocomplete
                                id="combo-box-demo"
                                options={unit}
                                getOptionLabel={(option) => option.title}
                                style={{}}
                                renderInput={(params) => <TextField {...params} label="UNIT" variant="outlined" />}
                                />
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
export default WaterSale