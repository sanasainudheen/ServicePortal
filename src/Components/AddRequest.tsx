import React,{useState} from 'react'
import ICategoryData from '../types/category';
import UserDataService from "../Services/UserService";
import IUserData from '../types/User';
import IServiceData from '../types/service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import Button from '@mui/material/Button';
import IServiceRequestData from '../types/ServiceRequest';
import moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-bootstrap';
import './AddUser.css';

const minDate=new Date();

const AddRequest = () => {
    const initialRequestState = {
        userId:null,
        categoryId:null,
        serviceId:null,
        modeOfPay:null,
        startDate:'',
        endDate:''
      };
    const [categories, setCategories] = useState<Array<ICategoryData>>([{id:0,categoryName:'Select A Category'}]);
    const [services, setServices] = useState<Array<IServiceData>>([]);
        const [users, setUsers] = useState<Array<IUserData>>([]);
        const [selUser, setSelUserValue] = React.useState("");
    const [selCategoryValue, setSelCategoryValue] = React.useState("");
    const [selServiceValue, setSelServiceValue] = React.useState("");
    const [selPayModeValue, setSelPayModeValue] = React.useState("1");
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [serviceRequest, setServiceRequest] = useState<IServiceRequestData>(initialRequestState);
    const [message, setMessage] = useState<string>("");
React.useEffect(()=>{
    async function getUsers(){
        UserDataService.getAll()
        .then((response: any) => {
            const UserList = [{id: -1, name: 'Please Select A User...',userName:'',password:''}, ...response.data];
            setUsers(UserList);
    })
        .catch((e: Error) => {
        });       
    }
    async function getCategories(){
        UserDataService.getAllCategories()
        .then((response: any) => {
            const CategoryList = [{id: -1, categoryName: 'Please Select a Category...'}, ...response.data];
            setCategories(CategoryList);       
        })         
        .catch((e: Error) => {
        });       
    }
    getUsers();
    getCategories();    
},[]);
const handleCategoryChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
setSelCategoryValue(e.currentTarget.value);
console.log(selCategoryValue);
UserDataService.getAllServices(selCategoryValue)
.then((response: any) => {
    const ServiceList = [{id: -1, serviceName: 'Please Select a Service...',categoryId:-1}, ...response.data];
    setServices(ServiceList);

 // setServices(response.data);
  //console.log(response.data);
})
.catch((e: Error) => {
 // console.log(e);
});
} 
const saveRequest = () => {
    
    var data = {
        userId:selUser,
        categoryId:selCategoryValue,
        serviceId:selServiceValue,
        modeOfPay:selPayModeValue,
        startDate:moment(startDate).format('DD/MM/YYYY'),
        endDate:moment(endDate).format('DD/MM/YYYY')
    };
console.log(data);
 //   UserDataService.AddServiceRequest(data)
  //    .then((response: any) => {
  //      setMessage("Request has been added successfully!");
    
  //    })
  //    .catch((e: Error) => {
  //      console.log('error:');
  //    });
  };
 return (
     <div className="AddUser">

       
<form>
<div className="row">
    <div className="col-md-4">
    <label htmlFor="formGroupUser">Select a User</label>
         
         <select id="formGroupUser" className="form-control" value={selUser} onChange={e=>setSelUserValue(e.currentTarget.value)}>
         {users.map(({id,name})=>(
             <option               
              key={id} value={id}>
                 {name}
             </option>
            
         ))}
     </select>
    </div>
    <div className="col-md-4">
    <label htmlFor="category">Select a Category</label>

<select className="form-control" value={selCategoryValue} onChange={handleCategoryChange}>
    {categories.map(({id,categoryName})=>(
        <option               
         key={id} value={id}>
            {categoryName}
        </option>
    ))}
</select>
    </div>
  </div>


  <div className="row">
    <div className="col-md-4">
    <label htmlFor="service">Select a Service</label>
   
   <select className="form-control" value={selServiceValue} onChange={e=>setSelServiceValue(e.currentTarget.value)}>
   {
       services.map(({id,serviceName})=>(
           <option
           key={id} value={id}>{serviceName}</option>
       ))
   }
   </select>
    </div>
    <div className="col-md-4">
    <label htmlFor="pmode">Select a Mode Of Pay</label>

<select className="form-control" value={selPayModeValue} onChange={e=>setSelPayModeValue(e.currentTarget.value)} >
    <option value="1">Debit Card</option>
    <option value="2">Credit Card</option>
</select>
    </div>
  </div>

  <form>
  <div className="row">
    <div className="col-md-4">
    <label htmlFor="sdate">Choose the start date</label>

<DatePicker selected={startDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setStartDate(date)}  minDate={minDate}/>
    </div>
    <div className="col-md-4">
    <label htmlFor="edate">Choose the end date</label>
 <DatePicker selected={endDate}  minDate={minDate}
      onChange={date=>setEndDate(date)} dateFormat='dd/MMM/yyyy'/>
    </div>
  </div>
</form>
</form>

 <div>
 <Button type="submit"
                 onClick={saveRequest}
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Submit</span>
                </Button>
<p>{message}</p>
   </div>
   </div>
   
 
  );
}

export default AddRequest
