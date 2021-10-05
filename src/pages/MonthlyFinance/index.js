import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import { MDBDataTable } from 'mdbreact';
const MonthlyFinance = () =>{
    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'NO',
                field: 'no',
                sort: 'disabled',
            },
            {
                label: 'NAMA',
                field: 'nama',
                sort: 'disabled',
            },
            {
                label: 'KODE',
                field: 'kode',
                sort: 'disabled',
            },
            {
                label: 'JUMLAH BULAN INI',
                field: 'jumlah',
                sort: 'disabled',
            },
            {
                label: 'NO',
                field: 'no1',
                sort: 'disabled',
            },
            {
                label: 'NAMA',
                field: 'nama1',
                sort: 'disabled',
            },
            {
                label: 'KODE',
                field: 'kode1',
                sort: 'disabled',
            },
            {
                label: 'JUMLAH BULAN INI',
                field: 'jumlah1',
                sort: 'disabled',
            },
        ],
        rows: [
            {
                no:'',
                nama:'',
                kode:'',
                jumlah:'',
                no1:'',
                nama1:'',
                kode1:'',
                jumlah1:'',
            },
            {
                no:'',
                nama:'',
                kode:'',
                jumlah:'',
                no1:'',
                nama1:'',
                kode1:'',
                jumlah1:'',
            },
            {
                no:'',
                nama:'',
                kode:'',
                jumlah:'',
                no1:'',
                nama1:'',
                kode1:'',
                jumlah1:'',
            },
            {
                no:'',
                nama:'',
                kode:'',
                jumlah:'',
                no1:'',
                nama1:'',
                kode1:'',
                jumlah1:'',
            },  
        ],
        kolom: [
            {
                label: 'NO',
                field: 'no',
                sort: 'disabled',
            },
            {
                label: 'REALISASI',
                field: 'realisasi',
                sort: 'disabled',
            },
            {
                label: 'ANGGARAN',
                field: 'anggaran',
                sort: 'disabled',
            },
            {
                label: 'JUMLAH',
                field: 'jumlah',
                sort: 'disabled',
            },
            {
                label: '%',
                field: 'persentase',
                sort: 'disabled',
            },
            {
                label: 'NAMA PERKIRAAN',
                field: 'nama',
                sort: 'disabled',
            },
            {
                label: 'REALISASI',
                field: 'realisasi1',
                sort: 'disabled',
            },
            {
                label: 'ANGGARAN',
                field: 'anggaran1',
                sort: 'disabled',
            },
            {
                label: 'JUMLAH',
                field: 'jumlah1',
                sort: 'disabled',
            },
            {
                label: '%',
                field: 'persentase1',
                sort: 'disabled',
            },
        ],
        baris: [
            {
                no:'',
                realisasi:'',
                anggaran:'',
                jumlah:'',
                persentase:'',
                nama:'',
                realisasi1:'',
                jumlah1:'',
                persentase1:'',
            },
            {
                no:'',
                realisasi:'',
                anggaran:'',
                jumlah:'',
                persentase:'',
                nama:'',
                realisasi1:'',
                jumlah1:'',
                persentase1:'',
            },
            {
                no:'',
                realisasi:'',
                anggaran:'',
                jumlah:'',
                persentase:'',
                nama:'',
                realisasi1:'',
                jumlah1:'',
                persentase1:'',
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
      const Data = {
        columns: [
          ...datatable.kolom.map((col) => {
            col.width = 200;
            return col;
          }),
        ],
        rows: [...datatable.baris],
      };


    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="Monthly Finance"
                />
                <div className="main-panel">
                    <Header
                        Title="LAPORAN KEUANGAN BULANAN"
                    />
                    <div className="content">
                    <Title
                        title="LAPORAN NERACA KEUANGAN"
                    />
                        Laporan Neraca Keuangan
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
                        <MDBDataTable hover scrollX data={widerData} />
                        <Title
                        title="LAPORAN NERACA RUGI LABA"
                        paddingTop={20}
                         />
                        <MDBDataTable hover scrollX data={Data} />
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default MonthlyFinance