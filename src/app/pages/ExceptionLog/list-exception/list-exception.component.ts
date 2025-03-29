import { Component } from '@angular/core';
import ExceptionLog from '../../../interfaces/ExceptionLog';
import { ExceptionLogService } from '../../../services/exception-log.service';
import ApiResponse from '../../../interfaces/ApiResponse';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-list-exception',
  imports: [SidebarComponent, LoaderComponent],
  templateUrl: './list-exception.component.html',
  styleUrl: './list-exception.component.css'
})
export class ListExceptionComponent {
  hasError = false;
  isLoading = true;
  exceptionLogInterface: ExceptionLog[] = [];
  textLoader = 'Cargando...';

  constructor(public  exceptionLog: ExceptionLogService){

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoading = true;
    this.exceptionLog.getAll().subscribe({
      next: ({result}: ApiResponse<ExceptionLog[]>) => {
        this.exceptionLogInterface = result.reverse();
        this.isLoading = false;
      },
      error: (e) => {
        this.handleError(e, 'cargar los tipos de evento');
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }
  private handleError(error: any, action: string): void {
    console.error(`Error al ${action}:`, error);
    // Aquí podrías agregar notificaciones al usuario
  }
}


