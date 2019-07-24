import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Travel } from "../models/travel";

@Injectable({
  providedIn: "root"
})
export class RestCountriesService {

  constructor(private httpClient: HttpClient) {}

  public getAllCountries(): Observable<any[]> {
    return this.httpClient.get<any[]>("https://restcountries.eu/rest/v2/all", {
      withCredentials: true
    });
  }

}
