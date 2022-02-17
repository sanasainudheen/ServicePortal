import React, { useState, useEffect, useMemo, useRef } from "react";
import {Link } from "react-router-dom";
import IServiceRequestData from "../Services/ServiceRequest";
import UserDataService from "../Services/UserService";
import { useParams } from 'react-router-dom'
import { useTable } from "react-table";
import ICategoryData from '../types/category';
import IServiceData from '../types/service';
import DatePicker from "react-datepicker";
import Button from '@mui/material/Button';
import ISubRequestData from '../types/SubRequests';
import AuthService from "../Services/auth.service";
import './AddUser.css';
import moment from 'moment';
const EditOrder = props => {
  const [services, setServices] = useState([]);
  const servicesRef = useRef();
  servicesRef.current = services;
  const initialOrderState = {
    reqId: null,
    userId: null,
    payMode: null,
    status: null,
    mainDocument:''
  };
  const minDate=new Date();
  const params = useParams();

  const [categories, setCategories] = useState([{id:0,categoryName:'Select A Category'}]);
    const [catServices, setCatServices] = useState([]);
  const [selCategoryValue, setSelCategoryValue] = React.useState("");
  const [selServiceValue, setSelServiceValue] = React.useState("");
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);
  const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [selectedFile,setSelectedFile]=useState(null);
  const[rowId,setRowId]=useState(0);
  const[reqDetId,setReqDetId]=useState(0);

  const getOrder = id => {
    IServiceRequestData.get(id)
      .then(response => {
        setCurrentOrder(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
   retrieveServices(params.id);
    //console.log(params.id);
    async function getCategories(){
      UserDataService.getAllCategories()
      .then((response) => {
          const CategoryList = [{id: -1, categoryName: 'Please Select a Category...'}, ...response.data];
          setCategories(CategoryList);       
      })         
      .catch((e) => {
      });       
  }  
  getCategories();    
  }, []);
const retrieveServices = () => {
 
  IServiceRequestData.getServicesByReqId(params.id)
    .then((response) => {
      setServices(response.data);
     
    })
    .catch((e) => {
      console.log(e);
    });
};
const refreshList = () => {
  retrieveServices(params.id);
  //console.log(params.id);
  function getCategories(){
    UserDataService.getAllCategories()
    .then((response) => {
        const CategoryList = [{id: -1, categoryName: 'Please Select a Category...'}, ...response.data];
        setCategories(CategoryList);       
    })         
    .catch((e) => {
    });       
};
}

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };
 
  const updateOrder = () => {
    IServiceRequestData.update(currentOrder.id, currentOrder)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
 
  const onFileChange = (event) => {
    event.preventDefault();
    if (!event.target.files) return;
    else
    // Update the state
    setSelectedFile(event.target.files[0]);
   // this.setState({ selectedFile: event.target.files[0] });
  
  };
  const updateService = (e) => {   
    e.preventDefault();
    var data = {
      reqDetId:reqDetId ,
    reqId:params.id,
    categoryId:selCategoryValue,
    serviceId:selServiceValue,
    startDate:moment(startDate).format('YYYY-MM-DD'),
    endDate:moment(endDate).format('YYYY-MM-DD'),
    documentFileName:''
  };
  //  console.log(data);
  IServiceRequestData.updateService(reqDetId,data)  
     .then((response) => {
     setMessage("Request has been updated successfully!");
     refreshList();
     })
     .catch((e) => {
      console.log('error:');
     });
  };
  function handleEditServiceClick(rowIdx){
  
    setSelCategoryValue(servicesRef.current[rowIdx].categoryId);
    UserDataService.getAllServices(servicesRef.current[rowIdx].categoryId)
.then((response) => {
    const ServiceList = [{id: -1, serviceName: 'Please Select a Service...',categoryId:-1}, ...response.data];
    setCatServices(ServiceList);
})
.catch((e) => {
 
});
setSelServiceValue(servicesRef.current[rowIdx].serviceId);
setStartDate(new Date(servicesRef.current[rowIdx].startDate));
setEndDate(new Date(servicesRef.current[rowIdx].endDate));
setReqDetId(servicesRef.current[rowIdx].reqDetId);

  }
  const columns = useMemo(
    () => [
  
    {
      Header: "Category",
      accessor: "categoryName",
    },
    {
      Header: "Service",
      accessor: "serviceName",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
   
    {
      Header: "Actions",
      accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id ;
         
          setRowId(props.row.id);
          return (
            
          <div>    
           <button onClick={() => handleEditServiceClick(rowIdx)}>
<i className="far fa-solid  fa-edit action mr-2"></i>
        </button>          
                
          </div>
        );
        },
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: services,
  });
  return (
    <div className="AddUser">
   <div className="col-md-12 list">
      <table
        className="table table-striped table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
   
    <div className="row">
     <div className="col-md-6">
    <label htmlFor="category">Select a Category</label>

<select className="form-control" value={selCategoryValue}  
>

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
     catServices.map(({id,serviceName})=>(
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
  <div>
  <Button type="submit"  onClick={updateService}
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Update</span>
                </Button>
                </div>
                <div>{message}</div>
          
  </div>
);
};
export default EditOrder;