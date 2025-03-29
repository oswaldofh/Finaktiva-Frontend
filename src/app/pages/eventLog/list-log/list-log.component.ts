import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { LogService } from '../../../services/log.service';
import Swal from 'sweetalert2'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../components/loader/loader.component';
import ApiResponse from '../../../interfaces/ApiResponse';
import EventLog from '../../../interfaces/EventLog';
import CreateEventLog from '../../../interfaces/CreateEventLog';
import PaginatedResponse from '../../../interfaces/PaginatedResponse';
import EventType from '../../../interfaces/EventType';
import Filter from '../../../interfaces/Filter';

@Component({
  selector: 'app-list-log',
  imports: [SidebarComponent, FontAwesomeModule, CommonModule, ReactiveFormsModule, LoaderComponent, FormsModule],
  templateUrl: './list-log.component.html',
  styleUrl: './list-log.component.css'
})

export class ListLogComponent implements OnInit {
  paginationData: PaginatedResponse<EventLog> | null = null;
  filter: Filter | null = null;

  currentPage = 1;
  pageSize = 5;

  selectedType: number | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  eventTypes: EventType[] = [];
  hasError = false;
  isLoading = true;
  faTrash = faTrash;
  faEdit = faEdit;
  isModalOpen = false;
  isModalEditOpen = false;
  textLoader = 'Cargando...';

  eventLogForm: FormGroup;
  updateEventLogForm: FormGroup;

  constructor(public logService: LogService) {
    this.eventLogForm = new FormGroup({
      description: new FormControl('', Validators.required),
      eventTypeId: new FormControl(Number, Validators.required),
      date: new FormControl(Date, Validators.required)
    });

    this.updateEventLogForm = new FormGroup({
      id: new FormControl(),
      description: new FormControl('', Validators.required),
      eventTypeId: new FormControl(Number, Validators.required),
      date: new FormControl(Date, Validators.required)
    });
   
  }
   
  ngOnInit(): void {
    this.getAll(1);
    this.getTypes();
  }

  
  openModal() {
    this.isModalOpen = true; 
  }
  
  closeModal() { 
    this.isModalOpen = false;
    this.eventLogForm.reset();
  }
  
  closeModalEdit() { 
    this.isModalEditOpen = false;
    this.updateEventLogForm.reset();
  }

  handleSubmit(): void {
    console.log(this.eventLogForm.value);
    if (this.eventLogForm.invalid) {
      this.eventLogForm.markAllAsTouched();
      return;
    }
    this.createNew(this.eventLogForm.value);
    this.closeModal();
  }

  handleSubmitEdit(): void {
    if (this.updateEventLogForm.invalid) {
      this.updateEventLogForm.markAllAsTouched();
      return;
    }

    this.updateItem(this.updateEventLogForm.value);
    this.closeModalEdit();
  }

  onPageChange(newPage: number): void {
    
    console.log(newPage);
    this.currentPage = newPage;
    if (newPage > 0 && newPage <= (this.paginationData?.pageCount || 1)) {
      this.getAll(newPage);
    }
  }

  get pageNumbers(): number[] {
    if (!this.paginationData) return [];
    return Array.from({length: this.paginationData.pageCount}, (_, i) => i + 1);
  }
 
  getAll(pageIndex: number = 1) {
    this.isLoading = true;
    this.hasError = false;

    
    this.filter = {
      pageIndex,
      pageSize: this.pageSize,
      eventTypeId: this.selectedType,
      startDate: this.startDate,
      endDate: this.endDate
    };
    

    this.logService.getAll(this.filter).subscribe({

      next: (response: ApiResponse<PaginatedResponse<EventLog>>) => {
        console.log(response.result)
        this.paginationData = response.result;
        this.isLoading = false;
      },
      error: (e) => {
        this.handleError(e, 'cargar los tipos de evento');
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  openEditModal(id: number) {
    this.isModalEditOpen = true;
    this.getById(id);
  }

  getById(id: number) {
    this.logService.getById(id).subscribe({
      next: ({result}: ApiResponse<EventLog>) => {
        this.updateEventLogForm.patchValue({
          id: result.id,
          description: result.description,
          eventTypeId: result.eventTypeId,
          date: this.formatDateForInput(result.date.toString())
        });
      },
      error: (e) => this.handleError(e, 'obtener el tipo de evento')
    });
  }

  createNew(model: CreateEventLog) {
    this.logService.create(model).subscribe({
      next: () => this.getAll(),
      error: (e) => this.handleError(e, 'crear el tipo de evento')
    });
  }

  updateItem(model: EventLog) {
    this.logService.update(model).subscribe({
      next: () => this.getAll(),
      error: (e) => this.handleError(e, 'actualizar el tipo de evento')
    });
  }

  deleteItem(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este elemento?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.logService.delete(id).subscribe({
          next: () => this.getAll(),
          error: (e) => this.handleError(e, 'eliminar el tipo de evento')
        });
      }
    });
    
  }

  onToggleRegional(model: EventLog, event: Event) {
    //model.isActive = (event.target as HTMLInputElement).checked;
    this.logService.update(model).subscribe({
      next: () => this.getAll(),
      error: (e) => this.handleError(e, 'cambiar el estado')
    });
  }

  private handleError(error: any, action: string): void {
    console.error(`Error al ${action}:`, error);
    // Aquí podrías agregar notificaciones al usuario
  }

  getTypes() {
    this.logService.getTypes().subscribe({
      next: ({result}: ApiResponse<EventType[]>) => {
        this.eventTypes = result.reverse();
      },
      error: (e) => {
        this.handleError(e, 'cargar los tipos de evento');
      }
    });
  }

 
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  resetFilters(): void {
    this.selectedType = null;
    this.startDate = null;
    this.endDate = null;
    this.applyFilters();
  }
  
  onTypeChange(value: number | null): void {
    this.selectedType = value;
    this.applyFilters();
  }

  onStartDateChange(value: string): void {
    this.startDate = value;
    this.applyFilters();
  }

  onEndDateChange(value: string): void {
    this.endDate = value;
    this.applyFilters();
  }
  applyFilters(): void {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      return;
    }
    this.getAll(1);
  }
}
