import Get from './Get';
import Post from './Post';

// GET
const login = (data)=>Post(process.env.REACT_APP_API_LOGIN, false, data);
const srAktifPasif = (token)=>Get(process.env.REACT_APP_API_SR_AKTIF_PASIF,false,token);
const srNew = (token)=>Get(process.env.REACT_APP_API_SR_NEW,false,token);
const operator = (token)=>Get(process.env.REACT_APP_API_OPERATOR, false,token);
const arealGroup = (token)=>Get(process.env.REACT_APP_API_AREALGROUP, false,token);

// POST
const mapping = (data,token)=>Post(process.env.REACT_APP_API_MAPPING,false,data,token);
const kubikasi =(data,token)=>Post(process.env.REACT_APP_API_KUBIKASI,false,data,token);
const statussm = (data,token)=>Post(process.env.REACT_APP_STATUSSM,false,data,token);
const reading = (data,token)=>Post(process.env.REACT_APP_READING,false,data,token);

const API = {
    login,
    srAktifPasif,
    srNew,
    mapping,
    operator,
    arealGroup,
    kubikasi,
    statussm,
    reading
}

export default API ;