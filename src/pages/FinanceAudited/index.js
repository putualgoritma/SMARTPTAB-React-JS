import React,{Fragment} from 'react'
import {Header,Sidebar,Footer,Title} from'../../component'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
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