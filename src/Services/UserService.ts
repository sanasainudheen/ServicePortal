import http from "../http-common";
import ICategoryData from "../types/category";
import IServiceData from "../types/service";
import IUserData from "../types/User";
import IUserRequestData from "../types/userRequest";
import IReqDynamicData from "../types/ReqDynamicData";
import IServiceRequestData from "../types/ServiceRequest";


const getAll = () => {
  return http.get<Array<IUserData>>("/users");
};

const getAllCategories = () => {  
  return http.get<Array<ICategoryData>>("/categories");
};

const getAllServices = (id:any) => {  
  return http.get<Array<IServiceData>>(`/service/${id}`);
};

const getAllServiceRequests = () => {  
  return http.get<Array<IReqDynamicData>>("/servicerequest");
};

const get = (id: any) => {
  return http.get<IUserData>(`/users/${id}`);
};

const create = (data: IUserData) => {
  return http.post<IUserData>("/users", data);
};

const createRequest = (data: IUserRequestData) => {
  return http.post<IUserRequestData>("/ServiceRequest", data);
};

const AddServiceRequest = (data: IServiceRequestData) => {
  return http.post<IServiceRequestData>("/ServiceRequest", data);
};

const update = (id: any, data: IUserData) => {
  return http.put<any>(`/users/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/users/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/users`);
};



const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getAllCategories,
  getAllServices,
  createRequest,
  getAllServiceRequests,
  AddServiceRequest
};

export default UserService;