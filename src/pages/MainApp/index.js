import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { 
    Dashboard, 
    NewSR, 
    SRActivePasif,
    Mapping,
    CustomerCubic,
    WMStatus,
    ReadingResult,
    FinanceAudited,
    MonthlyFinance,
    PaymentCustomer,
    WaterSale,
    Personalia,
    Login
} from '../../pages';
const MainApp = () =>{
    return(
        <Router>
            <Switch>
                <Route path ="/Dashboard">
                    <Dashboard/>
                </Route>
                <Route path ="/Personalia">
                    <Personalia/>
                </Route>
                <Route path="/WaterSale">
                    <WaterSale/>
                </Route>
                <Route path ="/PaymentCustomer">
                    <PaymentCustomer/>
                </Route>
                <Route path ="/MonthlyFinance">
                    <MonthlyFinance/>
                </Route>
                <Route path ="/FinanceAudited" >
                    <FinanceAudited/>
                </Route>
                <Route path ="/ReadingResult">
                    <ReadingResult/>
                </Route>
                <Route path ="/WMStatus">
                    <WMStatus/>
                </Route>
                <Route path ="/CustomerCubic">
                    <CustomerCubic/>
                </Route>
                <Route path ="/Mapping">
                    <Mapping/>
                </Route>
                <Route path="/NewSR">
                    <NewSR/>
                </Route>
                <Route path="/SRActivePasif">
                    <SRActivePasif/>
                </Route>
                <Route path="/">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}
export default MainApp