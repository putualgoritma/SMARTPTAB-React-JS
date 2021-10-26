import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheckDouble, faCreditCard, faHome, faLayerGroup, faMapMarkerAlt, faMoneyBill, faMoneyBillWaveAlt, faNewspaper, faTachometerAlt, faTags, faUsersCog, faWater } from '@fortawesome/free-solid-svg-icons'
import {background} from '../../assets';
const Sidebar = (props) => {
  return (
    <Fragment>
      <div className="sidebar none" data-color="blue" data-image>
      <img src={background} style={{position:'absolute', width:'100%', height:'100%'}}/>
          <div className="sidebar-wrapper">
            <div className="logo">
              <div className="simple-text">
                <span>SIMPELTAB</span>
              </div>
            </div>
            <ul className="nav">
              <li>
                <li className={props.active === 'Dashboard' ? "nav-item active" : ''}>
                  <a className="nav-link" href='/'>
                    <i className="nc-icon"><FontAwesomeIcon icon={faTachometerAlt} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>Dashboard</p>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'SR Active Pasif' ? "nav-item active" : ''}>
                  <a className="nav-link" href='/SRActivePasif'>
                    <i className="nc-icon"><FontAwesomeIcon icon={faTags} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>SR AKTIF & PASIF</p>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'New SR' ? "nav-item active" : ''}>
                  <a className="nav-link" href='/NewSR'>
                  <i className="nc-icon"><FontAwesomeIcon icon={faNewspaper} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>SR BARU</p>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'Mapping' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./Mapping">
                  <i className="nc-icon"><FontAwesomeIcon icon={faMapMarkerAlt} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>MAPPING OPERATOR</p>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'MappingSBG' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./MappingSBG">
                  <i className="nc-icon"><FontAwesomeIcon icon={faMapMarkerAlt} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>MAPPING SBG</p>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'CustomerCubic' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./CustomerCubic">
                  <i className="nc-icon"><FontAwesomeIcon icon={faLayerGroup} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>KUBIKASI PELANGGAN</p>
                  </a>
                </li>
              </li>
                <li className={props.active === 'WMStatus' ? "nav-item active" : ''}>
                <a className="nav-link" href="./WMStatus">
                   <div style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faCheckDouble} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                      </div>
                      <div>
                        <p>STATUS WM PELANGGAN</p>
                      </div>
                    </div>
                  </a>
                </li>
              <li>
                <li className={props.active === 'Reading Result' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./ReadingResult">
                  <i className="nc-icon"><FontAwesomeIcon icon={faBookOpen} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                    <p>HASIL BACAAN</p>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'Finance Audited' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./FinanceAudited">
                  <div style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faMoneyBill} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                      </div>
                      <div>
                        <p>LAPORAN KEUANGAN AUDITED</p>
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'Monthly Finance' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./MonthlyFinance">
                    <div style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faMoneyBillWaveAlt} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                      </div>
                      <div>
                        <p>LAPORAN KEUANGAN BULANAN</p>
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'Payment Customer' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./PaymentCustomer">
                  <div style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faCreditCard} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                      </div>
                      <div>
                        <p>INFO PEMBAYARAN REKENING PELANGGAN</p>
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'Water Sale' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./WaterSale">
                    <div style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faWater} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                      </div>
                      <div>
                        <p>LAPORAN PENJUALAN AIR BULANAN</p>
                      </div>
                    </div>
                  </a>
                </li>
              </li>
              <li>
                <li className={props.active === 'Personalia' ? "nav-item active" : ''}>
                  <a className="nav-link" href="./Personalia">
                  <div style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <i className="nc-icon"><FontAwesomeIcon icon={faUsersCog} style={{color:'#FFFFFFF', width:25, height:25}}/></i>
                      </div>
                      <div>
                        <p>LAPORAN PERSONALIA</p>
                      </div>
                    </div>
                  </a>
                </li>
              </li>
            </ul>
          </div>
      </div>
    </Fragment>     
  );
};

export default Sidebar;
