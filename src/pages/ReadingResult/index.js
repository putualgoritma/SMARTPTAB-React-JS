import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { MDBDataTable } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const operator = [
    {title: 'OPERATOR 1'},
    {title: 'OPERATOR 2'},
    {title: 'OPERATOR 3'},
    {title: 'OPERATOR 4'},
    {title: 'OPERATOR 5'},
  ];
const ReadingResult = () =>{
    const [datatable, setDatatable] = React.useState ({
        columns:[
            {
                label :'NO',
                field :'no',
                sort  :'disabled',
            },
            {
                label :'TANGGAL',
                field :'tanggal',
                sort  :'disabled',
            },
            {
                label :'JUMLAH',
                field :'jumlah',
                sort  :'disabled',
            },
        ],
        rows:[
            {
                no :'',
                tanggal:'',
                jumlah:''
            },
            {
                no :'',
                tanggal:'',
                jumlah:''
            },
            {
                no :'',
                tanggal:'',
                jumlah:''
            }
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
                        <div className="row mid">
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
                                    <label className="form-label">OPERATOR</label>
                                </div>
                                <div className="col-md-3">
                                <Autocomplete
                                id="combo-box-demo"
                                options={operator}
                                getOptionLabel={(option) => option.title}
                                style={{}}
                                renderInput={(params) => <TextField {...params} label="OPERATOR" variant="outlined" />}
                                />
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title-edit">Diagram Jumlah SR</div>
                                    </div>
                                    <div className="card-body">
                                        <div className='header'>
                                        </div>
                                            <Bar data={data} options={options}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <MDBDataTable hover scrollX data={widerData} />
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