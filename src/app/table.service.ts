import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient:HttpClient) { }
getTickets(queries ?:any):Observable<any>{

  return this.httpClient.get('http://localhost:3000/api/tickets', {
params:queries
  });
}

  
  getData(url: string, queries ?:any): Observable<any> {
    return this.httpClient.get<any>(url, {
      params:queries
    });
  }


}
