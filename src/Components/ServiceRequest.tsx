import React,{useState,useEffect, ChangeEvent} from 'react'
import ICategoryData from '../types/category';
import IServiceData from '../types/service';
import UserDataService from "../Services/UserService";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router-dom';

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const ServiceRequest: React.FC<Props> = (props: Props) => {
  const initialCategoryState = {
    id: null,
    categoryName:""
  };
  const initialServiceState = {
    id: null,
    serviceName:"",
    categoryId:null
  };
  
    const [categories, setCategories] = useState<Array<ICategoryData>>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategoryData>(initialCategoryState);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(-1);
    const [services, setServices] = useState<Array<IServiceData>>([]);
    const [currentService, setCurrentService] = useState<IServiceData>(initialServiceState);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(-1);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        retrieveCategories();
      }, []);
      const retrieveCategories = () => {
        UserDataService.getAllCategories()
          .then((response: any) => {
            setCategories(response.data);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      };
      const retrieveServices = () => {
        
        UserDataService.getAllServices(currentCategory.id)
          .then((response: any) => {
            setServices(response.data);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      };
      
    const setActiveCategory = (category: ICategoryData, index: number) => {
        setCurrentCategory(category);   
        setCurrentCategoryIndex(index);
        retrieveServices();
      };
      const setActiveService = (service: IServiceData, index: number) => {
        setCurrentService(service);   
        setCurrentServiceIndex(index);
      };
      const AddRequest = () => {
    
        var data = {           
            categoryId:currentCategory.id,
            serviceId:currentService.id,
            userId:props.match.params.id
        };
    
        UserDataService.createRequest(data)
          .then((response: any) => {
            setMessage("Request has been added successfully!");
          })
          .catch((e: Error) => {
            console.log(e);
          });
      };
  return (
    <div>
    <div className="list row">
      
      <div className="col-md-3">
      <h4>Category List</h4>
      {categories.length!==0 ?(    
       <ul className="list-group">
           
          {categories &&
            categories.map((category, index) => (
              <li
                className={
                  "list-group-item " + (index === currentCategoryIndex ? "active" : "")
                }
                onClick={() => setActiveCategory(category, index)}
                key={index}
              >
                {category.categoryName}
              </li>
            ))}
        </ul>
         ):(
            <div>No Categories Found.  Please add a category...</div>
        )}
    </div>
    <div className="col-md-3">
        {currentCategory ? (
          <div>
            <h4>Service List</h4>
            {services.length!==0 ?(    
       <ul className="list-group">           
          {services &&
            services.map((service, index) => (
              <li
                className={
                  "list-group-item " + (index === currentServiceIndex ? "active" : "")
                }
                onClick={() => setActiveService(service, index)}
                key={index}
              >
                {service.serviceName}
              </li>
            ))}
        </ul> 
          
        ) : (
          <div>No Services Found.  Please add a service...</div>
        )}
      </div>
        ):(
          <div>Please select a service</div>
        )}
</div>
<br/>

    </div>
    <div className="col-md-12">
    <button onClick={AddRequest} className="btn btn-success">
                Submit Request
              </button>
    </div>
    <p>{message}</p>
    </div>
   
  )
}

export default ServiceRequest
