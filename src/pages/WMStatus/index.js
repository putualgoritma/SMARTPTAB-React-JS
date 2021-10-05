import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { MDBDataTable } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
const WMStatus = () =>{
    const [datatable,setDatatable] = React.useState({
        columns:[
            {
                label: 'NO',
                field: 'no',
                sort: 'disabled',
            },
            {
                label: 'STATUS',
                field: 'status',
                sort: 'disabled',
            },
            {
                label: 'JUMLAH',
                field: 'jumlah',
                sort: 'disabled',
            },
        ],
        rows:[
            {
                no:'1',
                status:'WM Mati',
                jumlah:'3000'
            },
            {
                no:'2',
                status:'WM Rusak',
                jumlah:'5000'
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
    labels: ['','','','','',''],
    datasets: [
        {
            label:"",
            data:[10,4,5,7,8,2],
            backgroundColor:[
            '#F00000',
            '#FAFF00',
            '#23EC1E',
            '#F00000',
            '#23EC1E',
            '#F00000',
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
                        <div className="row">
                            <div className="col-md-6">
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
                        </div>
                        <MDBDataTable hover scrollX data={widerData} />
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default WMStatus