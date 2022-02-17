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
import ISubRequestData from '../types/SubRequests';
import IOrderData from '../types/Order';
import './AddSubRequest.css';

import axios from 'axios';
import AuthService from "../Services/auth.service";

const minDate=new Date();


const AddServiceRequest = () => {
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
    const [selCategoryValue, setSelCategoryValue] = React.useState<string>("");
    const [selServiceValue, setSelServiceValue] = React.useState<string>("");
    const [selPayModeValue, setSelPayModeValue] = React.useState("1");
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [serviceRequest, setServiceRequest] = useState<IServiceRequestData>(initialRequestState);
    const [message, setMessage] = useState<string>("");
    const [addService,setAddService]=useState<boolean>(false);
    const [selectedMainFile,setSelectedMainFile]=useState<FileList|null|any>(null);
    const [selectedFile,setSelectedFile]=useState<FileList|null|any>(null);
    const [reqServices, setReqServices] = useState<Array<ISubRequestData>>([]);
    const [order, setOrder] = useState<Array<IOrderData>>([]);
    const [test,setTest]=useState<any>();
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

const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    event.preventDefault();   
   const value = event.currentTarget.value;
   setSelCategoryValue(event.target.value)
UserDataService.getAllServices(event.target.value)
.then((response: any) => {
    const ServiceList = [{id: -1, serviceName: 'Please Select a Service...',categoryId:-1}, ...response.data];
    setServices(ServiceList);
})
.catch((e: Error) => {
 
});
} 
const saveRequest = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
  
    var data:ISubRequestData[] = reqServices 
    console.log(data);
 AuthService.CreateNewOrder(selUser,selPayModeValue,1,selectedMainFile.name ,data)
    .then((response: any) => {
      setMessage("Request has been added successfully!");
    
     })
     .catch((e: Error) => {
       console.log('error:');
      });
  };
  const AddService=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
      e.preventDefault();
//setAddService(true)
}
const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) return;
    else
    // Update the state
    setSelectedFile(event.target.files[0]);
   // this.setState({ selectedFile: event.target.files[0] });
  
  };

  const onMainFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
    if (!event.target.files) return;
    else
    // Update the state
    setSelectedMainFile(event.target.files[0]);
   // setTest(event.target.files[0]);
   
  
  };

const  onFileUpload = () => {
    
    // Create an object of formData
    const formData:any = new FormData();
  
    // Update the formData object
    if(!selectedFile)return;
    else
    {
    if(!selectedFile.item(0))return;
    else
    {
    formData.append(
      "myFile",
      selectedFile.item(0),
      selectedFile.item.name

    );
    // Request made to the backend api
    // Send formData object
    axios.post("https://localhost:5001/api/FileUploadApi", formData).then(
      (response) => {
        console.log("success");
      }, () => {
        console.log("fail");
      });
    
  };
}
}
const AddServiceObject=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();      
           
    setReqServices((curGoals) => 
    [...curGoals, { 
        categoryId:selCategoryValue,
        serviceId:selServiceValue,
        startDate:moment(startDate).format('YYYY-MM-DD'),
        endDate:moment(endDate).format('YYYY-MM-DD'),
        //document:selectedFile
        docFileName:selectedFile.name
    }]          
) 
}
React.useEffect(()=>{
    setOrder([{ userId:selUser,
        payMode:selPayModeValue,
        mainDocument:selectedMainFile
    }]
    ) 
  resetFields();
},[reqServices])

const resetFields=()=>{
   
    setSelCategoryValue('');
    setSelServiceValue('');
    setStartDate(null);
    setEndDate(null);
    setSelectedFile(null);
}
 return (
     <div className="AddUser">

       
<form>
<div className="row">
    <div className="col-md-6">
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
   
    <div className="col-md-6">
    <label htmlFor="pmode">Select a Mode Of Pay</label>

<select className="form-control" value={selPayModeValue} onChange={e=>setSelPayModeValue(e.currentTarget.value)} >
    <option value="1">Debit Card</option>
    <option value="2">Credit Card</option>
</select>
    </div>
  </div>
  <div className="row">
  <div className="col-md-6">
                <input type="file" onChange={onMainFileChange} />               
            </div>  
  </div>
  <div className="div_height">

  </div>
  <div className="row">
     <div className="col-md-6">
    <label htmlFor="category">Select a Category</label>

<select className="form-control" value={selCategoryValue}  
onChange={ e=>{handleCategoryChange(e);setSelCategoryValue(e.target.selectedOptions[0].value)}}>

    {categories.map(({id,categoryName})=>(
        <option               
         key={id} value={id}>
            {categoryName}
        </option>
    ))}
</select>
    </div>
    <div  className="col-md-6">
    <label htmlFor="service">Select a Service</label>
   
   <select  className="form-control" value={selServiceValue} onChange={e=>setSelServiceValue(e.currentTarget.value)}>
   {
       services.map(({id,serviceName})=>(
           <option
           key={id} value={id}>{serviceName}</option>
       ))
   }
   </select>
    </div>

    </div>
    <div className="row">
    <div className="col-md-6">
    <label htmlFor="sdate">Choose the start date</label>

<DatePicker selected={startDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setStartDate(date)}  minDate={minDate}/>
    </div>
    <div className="col-md-6">
    <label htmlFor="edate">Choose the end date</label>
 <DatePicker selected={endDate}  minDate={minDate}
      onChange={date=>setEndDate(date)} dateFormat='dd/MMM/yyyy'/>
    </div>
  </div>
  <div className="row">
  <div className="col-md-6">
                <input type="file" onChange={onFileChange} />               
            </div>  
  </div>
  <div className="row button_align">
  <div className="col-md-12">
 
  <button   onClick={(e)=>{AddServiceObject(e);setAddService(false);}} >Add Service</button>
  
  
   
   </div>
  </div>
 

 
</form>

 <div>
 <Button type="submit"
                 onClick={(e)=>{saveRequest(e)}}
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

export default AddServiceRequest

