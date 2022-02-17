import http from "../http-common";
const getAll = () => {
  return http.get("/ServiceRequest");
};
const getServicesByReqId = (id: number) => {  
  return http.get(`/ServiceRequest/${id}`);
};

const get = (id:number) => {
  return http.get(`/tutorials/${id}`);
};
const remove = (orderId:number) => {
  return http.delete(`/ServiceRequest/${orderId}`);
};
const updateService = (reqDetId:number, data:any) => {
  return http.put<any>(`/ServiceRequest/${reqDetId}`, data);
  
};
const ChangeStatus = (orderId:number,data:any) => {
  return http.put(`/ServiceRequest/UpdateOrderAsync/${orderId}`,data);
};
const removeAll = () => {
  return http.delete(`/tutorials`);
};
const findByUser = (user:string) => {
  return http.get(`/tutorials?title=${user}`);
};
const IServiceRequestData = {
  getAll,
  get,
  updateService,
  remove,
  removeAll,
  findByUser,
  getServicesByReqId,
  ChangeStatus
};
export default IServiceRequestData;