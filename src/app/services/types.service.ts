import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/base-http-service';
import EventType from '../interfaces/EventType';
import CreateEventType from '../interfaces/CreateEventType';
import ApiResponse from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class TypesService extends BaseHttpService {

  getAll(){
    return this.http.get<ApiResponse<EventType[]>>(`${this.apiUrl}/eventType`);
  }

  getById(id: number){
    return this.http.get<ApiResponse<EventType>>(`${this.apiUrl}/eventType/${id}`);
  }

  create(model: CreateEventType) {
    return this.http.post<ApiResponse<EventType>>(`${this.apiUrl}/eventType`, model);
  }

  update(model: EventType) {
    return this.http.put<ApiResponse<EventType>>(`${this.apiUrl}/eventType`, model);
  }

  delete(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/eventType/${id}`);
  }
}
