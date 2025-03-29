import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/base-http-service';
import ApiResponse from '../interfaces/ApiResponse';
import ExceptionLog from '../interfaces/ExceptionLog';

@Injectable({
  providedIn: 'root'
})
export class ExceptionLogService extends BaseHttpService {

  getAll(){
    return this.http.get<ApiResponse<ExceptionLog[]>>(`${this.apiUrl}/exceptionLog`);
  }
}
