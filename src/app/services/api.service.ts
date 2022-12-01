import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postPersona(data : any){
    return this.http.post<any>("http://localhost:3000/personaList/",data);
  }
  getPersona(){
    return this.http.get<any>("http://localhost:3000/personaList/");
  }
  putPersona(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/personaList/"+id,data);
  }
  deletePersona(id:number){
    return this.http.delete<any>("http://localhost:3000/personaList/"+id)
  }
}
