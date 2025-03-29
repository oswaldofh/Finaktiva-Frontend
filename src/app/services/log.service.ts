import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/base-http-service';
import ApiResponse from '../interfaces/ApiResponse';
import EventLog from '../interfaces/EventLog';
import CreateEventLog from '../interfaces/CreateEventLog';
import PaginatedResponse from '../interfaces/PaginatedResponse';
import EventType from '../interfaces/EventType';
import { HttpParams } from '@angular/common/http';
import Filter from '../interfaces/Filter';

@Injectable({
  providedIn: 'root'
})
export class LogService extends BaseHttpService {
  
  // getAll(page: number = 1, pageSize: number = 10){
  //   return this.http.get<ApiResponse<PaginatedResponse<EventLog>>>(`${this.apiUrl}/eventLog?page=${page}&pageSize=${pageSize}`);
  // }
  

  getAll(filter: Filter){
    let params = new HttpParams()
      .set('pageIndex', filter.pageIndex)
      .set('pageSize', filter.pageSize);

    
    if (filter.eventTypeId) {
      params = params.set('eventTypeId', filter.eventTypeId);
    }
    if (filter.startDate) {
      params = params.set('startDate', filter.startDate.toString());
    }
    if (filter.endDate) {
      params = params.set('endDate', filter.endDate.toString());
    }

    return this.http.get<ApiResponse<PaginatedResponse<EventLog>>>(`${this.apiUrl}/eventLog`, { params });
  }

  getTypes(){
    return this.http.get<ApiResponse<EventType[]>>(`${this.apiUrl}/eventType`);
  }
  

  getById(id: number){
    return this.http.get<ApiResponse<EventLog>>(`${this.apiUrl}/eventLog/${id}`);
  }

  create(model: CreateEventLog) {
    return this.http.post<ApiResponse<EventLog>>(`${this.apiUrl}/eventLog`, model);
  }

  update(model: EventLog) {
    return this.http.put<ApiResponse<EventLog>>(`${this.apiUrl}/eventLog`, model);
  }

  delete(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/eventLog/${id}`);
  }
}
