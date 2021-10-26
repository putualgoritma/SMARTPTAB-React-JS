import { faBookOpen, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import React, { Fragment } from 'react';
import { Footer, Header, Sidebar, Title } from '../../component';

const FinanceAudited = () =>{
    return(
        <Fragment>
            <div className="wrapper">
                <Sidebar
                    active="Finance Audited"
                />
                <div class="main-panel">
                    <Header
                        Title="LAPORAN KEUANGAN AUDITED"
                    />
                    <div className="content">
                    <Title
                          title="DATA LAPORAN KEUANGAN AUDITED"
                        />
                        {/* <div className="row mid distance">
                            <div className="col-md-1">
                                <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-4">
                                <DatePickerComponent placeholder="Pilih Periode"
                                format="MMM-yy"
                                start="Year"
                                depth="Year"></DatePickerComponent>
                            </div>
                        </div> */}
                        {/* <div className="row" style={{justifyContent:'center'}}>
                            <div className="col-md-10" style={{backgroundColor:'white', height:300}}>
                                <div className="col-md-4" style={{backgroundColor:'red'}}>
                                <a href="https://simpletabadmin.ptab-vps.com/pdf/pdf-001.pdf" className="fancybox" data-fancybox="gallery1">
                                   PDF1</a>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-10 offset-md-1" style={{backgroundColor:'white'}}>
                                <h4 class="card-title" style={{paddingTop:10}}>PDF Laporan Keuangan Audited</h4>
                            <div className="row" >
                                <div className="col-md-4 mt-2 mb-2" style={{backgroundColor:'white'}}>
                                    <div className="text-center">
                                        <div className="col-md-10 offset-md-1" style={{backgroundColor:'#147AD0', borderRadius:8}}>
                                            <div> <FontAwesomeIcon icon={faFilePdf} style={{color:'white', width:'40%', height:'40%', paddingTop:5}}/></div>
                                            <div style={{color:'white'}}>Laporan Keuangan Audited PDF</div> 
                                        </div>
                                        <div className="col-md-10 offset-md-1 mt-1">
                                            <span><b>Juli 2021</b></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-md-10 offset-md-1" style={{backgroundColor:'white'}}>
                                <h4 class="card-title" style={{paddingTop:10}}>PDF Laporan Keuangan Audited</h4>
                            <div className="row" >
                                <div className="col-4 col-sm-4 col-lg-4 mt-2 mb-2" >
                                    <div className="text-center">
                                        <a href="https://simpletabadmin.ptab-vps.com/pdf/pdf-001.pdf" className="fancybox" data-fancybox="gallery1">
                                            <div className="col-md-10 offset-md-1 warna">
                                            <FontAwesomeIcon icon={faFilePdf} style={{color:'white', width:'35%', height:'35%', paddingTop:5}}/>
                                                <div style={{color:'white'}}>Laporan Keuangan Audited PDF</div>
                                            </div>
                                        </a>
                                        <div className="col-md-10 offset-md-1 mt-1">
                                            <span><b>Juli 2021</b></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-4 col-sm-4 col-lg-4 mt-2 mb-2" >
                                    <div className="text-center">
                                        <div className="col-md-10 offset-md-1 warna">
                                        <a href="https://simpletabadmin.ptab-vps.com/pdf/pdf-001.pdf" className="fancybox" data-fancybox="gallery1"><FontAwesomeIcon icon={faFilePdf} style={{color:'white', width:'35%', height:'35%', paddingTop:5}}/>
                                            <div style={{color:'white'}}>Laporan Keuangan Audited PDF</div></a>
                                        </div>
                                        <div className="col-md-10 offset-md-1 mt-1">
                                            <span><b>Juli 2021</b></span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        {/* <div className="container">
                            <div className="container-fluid">
                                <div className="col-lg-12" style={{backgroundColor:'white'}}>
                                    <div className="row">
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'blue'}}>
                                                asd
                                        </div>
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'green'}}>
                                            asd
                                        </div>
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'yellow'}}>
                                            asd
                                        </div>
                                        <div className="col-6 col-sm-4 col-lg-6 mt-2" style={{backgroundColor:'red'}}>
                                            asd
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div> */}
             
                        <Title
                          title="DATA LAPORAN KINERJA AUDITED"
                          paddingTop={40}
                        />
                        <div className="row mid distance">
                            <div className="col-md-1">
                                <label className="form-label">Periode</label>
                            </div>
                            <div className="col-md-4">
                                <DatePickerComponent placeholder="Pilih Periode"
                                format="MMM-yy"
                                start="Year"
                                depth="Year"></DatePickerComponent>
                            </div>
                        </div>
                        <div className="row" style={{justifyContent:'center'}}>
                            <div className="col-md-10" style={{backgroundColor:'white', height:300}}>
                                
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default FinanceAudited