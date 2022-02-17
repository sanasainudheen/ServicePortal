import axios from "axios";
import ISubRequestData from "../types/SubRequests";


const API_URL = "https://localhost:5001/api/Login/authentication";
const baseURL= "https://localhost:5001/api/ServiceRequest";

class AuthService {
  
  login(username: string, password: string) {
    return axios
      .post(API_URL, {
        username,
        password
      })
      .then(response => {
        if (response.data) {
            
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
}
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
    
        return null;
      }
     
      CreateNewOrder(userId: string, payMode: string,status:number,mainDocFileName:string ,itemslist:ISubRequestData[]) {
      
return axios.post(baseURL, {userId,payMode,status,mainDocFileName,Items:itemslist},{headers: {'Content-Type': 'application/json' }}
)
       // return axios
         // .post(baseURL, {
          //    userId,payMode,MainDocument,items:reqServices,
        //  })
          .then(response => {
            if (response.data) {
                
             // localStorage.setItem("user", JSON.stringify(response.data));
            }
            
            return response.data;
          }).catch((err)=>{
            return err;
            })
      }
  }
 
  

export default new AuthService();