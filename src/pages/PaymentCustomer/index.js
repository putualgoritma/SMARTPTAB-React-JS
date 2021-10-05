import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { MDBDataTable } from 'mdbreact';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import  {Form}  from  'react-bootstrap' ;
const MonthlyFinance = () =>{
    const [datatable, setDatatable] = React.useState ({
        columns:[
            {
                label :'NO',
                field :'no',
                sort :'disabled',
            },
            {
                label :'OPERATOR',
                field :'operator',
                sort :'disabled',
            },
            {
                label :'PERIODE',
                field :'periode',
                sort :'disabled',
            },
            {
                label :'TANGGAL',
                field :'tanggal',
                sort :'disabled',
            },
            {
                label :'SBG/NAMA/GOL/AREAL',
                field :'sbg',
                sort :'disabled',
            },
            {
                label :'METER M3',
                field :'meter',
                sort :'disabled',
            },
            {
                label :'FOTO',
                field :'foto',
                sort : 'disabled',
            },
        ],
        rows :[
            {
                no:'',
                operator:'',
                periode:'',
            },
            {
                no:'',
                operator:'',
                periode:'',
            },
            {
                no:'',
                operator:'',
                periode:'',
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
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="Payment Customer"
                />
                <div className="main-panel">
                    <Header
                        Title="PEMBAYARAN REKENING PELANGGAN"
                    />
                    <div className="content">
                        <Title
                            title="INFO PEMBAYARAN REKENING PELANGGAN"
                        />
                        <div className="row mid distance">
                            <div className="col-md-1">
                                <label className="form-label">Periode</label>
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
                                <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-3">
                                <Form.Control type="text"/>
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
export default MonthlyFinance