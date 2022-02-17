import React, { useState, useEffect, useMemo, useRef, Fragment  } from "react";
import IServiceRequestData from "../Services/ServiceRequest";
import { useTable } from "react-table";
import './AddUser.css';
import {Route , withRouter} from 'react-router-dom'
import EditOrder from "../Components/EditOrder";
import {Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';    

const RequestList = (props) => {
   
  const [requests, setRequests] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const[showModal,setShowModel]=useState(false);
  const[showModalPopup,setShowModalPopup]=useState(false);
  const [selStatusValue, setSelStatusValue] = React.useState("1");
  const [selRequest, setSelRequest] = React.useState([]);
  const [message, setMessage] = useState("");
  const[rowId,setRowId]=useState(0);
  const requestsRef = useRef();
  requestsRef.current = requests;
  useEffect(() => {   
    retrieveRequests();    
  }, []);
  function isShowPopup (status)  {  
    setShowModalPopup(status);  
  }; 
 
function handleClose ()  {  
  isShowPopup(false); 
}  

const isShowModal = (status) => {  
 handleClose();  
  setShowModel(false);
    const orderId = requestsRef.current[rowId].reqId;
  const data={
    reqId:requestsRef.current[rowId].reqId,
    userId:requestsRef.current[rowId].userId,
    payMode:requestsRef.current[rowId].payMode,
    status:selStatusValue,
    mainDocFileName:requestsRef.current[rowId].mainDocFileName
  }
    IServiceRequestData.ChangeStatus(orderId,data)
    .then((response) => {
      //setRequests(response.data);
    })
    .catch((e) => {
      console.log(e);
    });

}  
 const onChangeSearchUser = (e) => {
    const searchUser = e.target.value;
    setSearchUser(searchUser);
  };
  const retrieveRequests = () => {
    
    IServiceRequestData.getAll()
      .then((response) => {
        setRequests(response.data);
        setShowModalPopup(false);  
       
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveRequests();
  };

  const findByUser = () => {
    IServiceRequestData.findByUser(searchUser)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  // function changeStatus(rowIndex)  {
    
  //   handleModal();
  //   const orderId = requestsRef.current[rowIndex].reqId ;   
  
  // };
 
  const deleteOrder = (rowIndex) => {
    if (window.confirm('Are you sure you wish to delete this order?'))
    //const orderId = requestsRef.current[rowIndex].id;
    IServiceRequestData.remove(rowIndex)
      .then((response) => {
        props.history.push("/RequestList");
        let newRequests = [...requestsRef.current];
        newRequests.splice(rowIndex, 1);
        setRequests(newRequests);
        setMessage("The order has been deleted successfully");
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = useMemo(
    () => [
  
    {
      Header: "User",
      accessor: "name",
    },
    {
      Header: "Payment Mode",
      accessor: "paymentMode",
    },
    {
      Header: "Status",
      accessor: "orderStatus",
    },
    {
      Header: "Document",
      accessor: "mainDocFileName",
    },
   
    {
      Header: "Actions",
      accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          setRowId(props.row.id);
          return (
            
          <div>  
              
            <Link to={`/EditOrder/${requestsRef.current[rowIdx].reqId}`}>
<i className="far fa-solid  fa-edit action mr-2"></i>
            </Link>   
            <button onClick={isShowPopup(false)} className="btn btn-link">Update Status</button>         
            <span onClick={() => deleteOrder(requestsRef.current[rowIdx].reqId)}>
            <i className="fas fa-trash action"></i>
          </span>   
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
    data: requests,
  });
 
  return (
    
    <div className="list row AddUser">
    <Fragment>  
                <Modal show={showModalPopup} onHide={handleClose}   
                    size="sm"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                           Choose the status  
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                    <div className="col-md-8">
<select className="form-control" value={selStatusValue} onChange={e=>setSelStatusValue(e.currentTarget.value)} >
    <option value="1">Pending</option>
    <option value="2">Completed</option>
    <option value="3">Cancelled</option>
</select>
    </div>
    <div></div>
                        <div >  
                            <p><button type="button" className="btn btn-outline-info" onClick={() => this.isShowModal(true)}> Submit</button></p>  
                        </div>  
                    </Modal.Body>  
  
                </Modal >  
            </Fragment >   
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by User"
          value={searchUser}
          onChange={onChangeSearchUser}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByUser}
          >
            Search
          </button>
        </div>
      </div>
    </div>
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
<div>{message}</div>
    
   
  </div>
);
};
export default withRouter(RequestList);