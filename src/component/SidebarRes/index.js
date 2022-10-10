import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheckDouble, faCreditCard, faFile, faHome, faLayerGroup, faMapMarkerAlt, faMoneyBill, faMoneyBillWaveAlt, faNewspaper, faTachometerAlt, faTags, faUsersCog, faWater } from '@fortawesome/free-solid-svg-icons'
import {background} from '../../assets';
const Sidebar = (props) => {
  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <div style={{width:200, height:'100%'}} className="bgimage" >
            <center style={{color:'#FFFFFF', fontSize:18, paddingTop:20, fontWeight:'bold'}}>SIMPELTAB</center>
            <hr style={{backgroundColor:'#FFFFFF'}}></hr>
        <ul className="nav">
          <div style={{paddingTop:0}}>
              <li className="box">
                <li className={props.active === 'Dashboard' ? "nav-item active" : ''}>
                  <a className="nav-link" href='/Dashboard'>
                    <div className="mid">
                      <div>
                        <FontAwesomeIcon icon={faTachometerAlt} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                        DASHBOARD
                        </div>
                    </div>
                  </a>
                </li>
              </li>
            </div>
            <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'SR Active Pasif' ? "nav-item active" : ''}>
                  <a className="nav-link" href='/SRActivePasif'>
                    <div className="mid">
                        <div>
                          <FontAwesomeIcon icon={faTags} style={{color:'#FFFFFF', width:15, height:15}}/>
                        </div>
                        <div className="text-sidebar">
                        SR AKTIF PASIF
                        </div>
                      </div>
                    </a>
                  </li>
                </li>
              </div>
              <div style={{paddingTop:10}}>
                <li className="box">
                <li className={props.active === 'New SR' ? "nav-item active" : ''}>
                  <a className="nav-link" href='/NewSR'>
                    <div className="mid">
                      <div>
                        <FontAwesomeIcon icon={faNewspaper} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                       SR BARU
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              </div>
              <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'Mapping' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./Mapping">
                  <div className="mid">
                      <div>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                       MAPPING
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              </div>
              <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'MappingSBG' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./MappingSBG">
                  <div className="mid">
                      <div>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                       MAPPING SBG
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              </div>
              <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'CustomerCubic' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./CustomerCubic">
                    <div className="mid">
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faLayerGroup} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                      </div>
                      <div className="text-sidebar">
                       KUBIKASI PELANGGAN
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              </div>
              <div style={{paddingTop:10}}>
                <li className="box">
                  <li className={props.active === 'WMStatus' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./WMStatus">
                    <div className="mid">
                        <div>
                          <i className="nc-icon"><FontAwesomeIcon icon={faCheckDouble} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                        </div>
                        <div className="text-sidebar">
                        STATUS WM PELANGGAN
                        </div>
                      </div>
                    </a>
                  </li>
                </li>
                </div>
              <div style={{paddingTop:10}}>
                <li className="box">
                  <li className={props.active === 'Reading Result' ? "nav-item active" : ''}>
                    <a className="nav-link" href="./ReadingResult">
                      <div className="mid">
                        <div>
                          <i className="nc-icon"><FontAwesomeIcon icon={faBookOpen} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                        </div>
                        <div className="text-sidebar">
                        HASIL BACAAN
                        </div>
                      </div>
                    </a>
                  </li>
                </li>
              </div>
              <div style={{paddingTop:10}}>
                <li className="box">
                  <li className={props.active === 'Request' ? "nav-item active" : ''}>
                    <a className="nav-link" href="./Request">
                      <div className="mid">
                        <div>
                          <i className="nc-icon"><FontAwesomeIcon icon={faFile} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                        </div>
                        <div className="text-sidebar">
                        REKAP PERMINTAAN
                        </div>
                      </div>
                    </a>
                  </li>
                </li>
              </div>
              <div style={{paddingTop:10}}>
                <li className="box">
                  <li className={props.active === 'Complaint' ? "nav-item active" : ''}>
                    <a className="nav-link" href="./Complaint">
                      <div className="mid">
                        <div>
                          <i className="nc-icon"><FontAwesomeIcon icon={faBookOpen} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                        </div>
                        <div className="text-sidebar">
                        REKAP KELUHAN
                        </div>
                      </div>
                    </a>
                  </li>
                </li>
              </div>
            <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'Finance Audited' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./FinanceAudited">
                  <div className="mid">
                      <div>
                        <FontAwesomeIcon icon={faMoneyBill} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                      LAPORAN KEUANGAN AUDITED
                      </div>
                    </div>
                  </a>
                </li>
              </li>
            </div>
            {/* <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'Monthly Finance' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./MonthlyFinance">
                  <div className="mid">
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faMoneyBillWaveAlt} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                      </div>
                      <div className="text-sidebar">
                      LAPORAN KEUANGAN BULANAN
                      </div>
                    </div>
                  </a>
                </li>
              </li>
            </div>
            <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'Payment Customer' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./PaymentCustomer">
                  <div className="mid">
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faCreditCard} style={{color:'#FFFFFF', width:15, height:15}}/></i>
                      </div>
                      <div className="text-sidebar">
                      INFO PEMBAYARAN REKENING PELANGGAN
                      </div>
                    </div>
                  </a>
                </li>
              </li>
            </div>
            <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'Water Sale' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./WaterSale">
                  <div className="mid">
                      <div>
                       <FontAwesomeIcon icon={faWater} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                      LAPORAN PENJUALAN AIR BULANAN
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              </div>
              <div style={{paddingTop:10}}>
              <li className="box">
                <li className={props.active === 'Personalia' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./Personalia">
                  <div className="mid">
                      <div>
                       <FontAwesomeIcon icon={faUsersCog} style={{color:'#FFFFFF', width:15, height:15}}/>
                      </div>
                      <div className="text-sidebar">
                      LAPORAN PERSONALIA
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              </div> */}
            </ul>
        </div>
      </div>

    </Fragment>     
  );
};

export default Sidebar;
