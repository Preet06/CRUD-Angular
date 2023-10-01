import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url: string = "http://localhost:3000/profile"

  constructor(private http: HttpClient) { }

  getEmployees():Observable<any>{

    return this.http.get(this.url);
  }

  getEmployeesById(Id:any):Observable<any>{

    return this.http.get(this.url+"/"+Id);
  }

  AddDataEmployees(data:any):Observable<any>{
    return this.http.post(this.url,data);
  }

  DeleteEmployeesdata(id:any):Observable<any>
  {
    return this.http.delete(this.url+"/"+id);
  }

  EditEmployeesdata(data:any,id:any):Observable<any>
  {
    return this.http.put(this.url+"/"+id,data)
  }
}
