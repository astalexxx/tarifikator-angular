import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetGeoService {
  private url = "http://ip-api.com/json/";

  constructor(private http: HttpClient) { }

  getGeoData(ip: string): Observable<any> {
    return this.http.get<any>(this.url + ip);
  }
}
