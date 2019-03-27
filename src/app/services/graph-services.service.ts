import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Content type to graphql
const _headers = new HttpHeaders({ 'Content-Type': 'application/graphql' });
@Injectable({
  providedIn: 'root'
})
export class GraphServicesService {
  constructor(private http: HttpClient) {}

  Query(request:string):Observable<any>{
    let sql = `query {${request}}`;
    return this.http.post('http://localhost:5000/graphql', sql, {
      headers: _headers
    });
  }
  Mutation(request:string):void{

  }
}
