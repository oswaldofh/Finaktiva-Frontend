import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  public http: HttpClient;

  public apiUrl = environment.API_URL;

  constructor(private injectHttp: HttpClient) {
    this.http = injectHttp;
  }
}
