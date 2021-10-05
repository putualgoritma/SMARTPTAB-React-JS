import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import {MDBDataTable} from 'mdbreact';
const Personalia = () =>{
    const [datatable, setDatatable] = React.useState ({
        columns:[
            {
                label:'NO',
                field:'no',
                sort:'disabled'
            },
            {
                label:'URAIAN',
                field:'uraian',
                sort:'disabled'
            },
            {
                label:'AWAL BULAN',
                field:'bulan',
                sort:'disabled'
            },
            {
                label:'TAMBAHAN',
                field:'tambahan',
                sort:'disabled',
            },
            {
                label:'KURANG',
                field:'kurang',
                sort:'disabled',
            },
            {
                label:'LAKI-LAKI',
                field:'L',
                sort:'disabled',
            },
            {
                label:'PEREMPUAN',
                field:'P',
                sort:'disabled'
            },
            {
                label:'JUMLAH',
                field:'Jum',
                sort:'disabled'
            },
            {
                label:'JUMLAH',
                field:'jumlah',
                sort:'disabled'
            }
        ],
        rows :[
            {
                no:'',
                uraian:'',
                bulan:'',
                tambahan:'',
                kurang:'',
                L:'',
                P:'',
                jum:'',
                jumlah:''
            },
            {
                no:'',
                uraian:'',
                bulan:'',
                tambahan:'',
                kurang:'',
                L:'',
                P:'',
                jum:'',
                jumlah:''
            },
            {
                no:'',
                uraian:'',
                bulan:'',
                tambahan:'',
                kurang:'',
                L:'',
                P:'',
                jum:'',
                jumlah:''
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
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="Personalia"
                />
                <div className="main-panel">
                    <Header
                        Title="LAPORAN PERSONALIA"
                    />
                    <div className="content">
                        <Title
                            title="LAPORAN PENJUALAN PERSONALIA"
                        />
                         <MDBDataTable hover scrollX data={widerData} />
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Personalia