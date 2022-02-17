import IOrderData from "./Order";
import ISubRequestData from "./SubRequests";

export default interface INewServiceData {
   // order:IOrderData[],
   // itemDetails:ISubRequestData[]
   userId:string,
   payMode:string,
   status:string

  }

 