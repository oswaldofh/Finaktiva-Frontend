import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import EventType from '../../../interfaces/EventType';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { TypesService } from '../../../services/types.service';
import CreateEventType from '../../../interfaces/CreateEventType';
import ApiResponse from '../../../interfaces/ApiResponse';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  imports: [SidebarComponent, FontAwesomeModule, CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  hasError = false;
  isLoading = true;
  eventTypes: EventType[] = [];
  faTrash = faTrash;
  faEdit = faEdit;
  isModalOpen = false;
  isModalEditOpen = false;
  textLoader = 'Cargando...';

  eventTypeForm: FormGroup;
  updateEventTypeForm: FormGroup;

  constructor(public typeService: TypesService) {
    this.eventTypeForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.updateEventTypeForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      isActive: new FormControl(false)
    });
  }
   
  ngOnInit(): void {
    this.getAll();
  }

  // Modal handlers
  openModal() { this.isModalOpen = true; }
  closeModal() { 
    this.isModalOpen = false;
    this.eventTypeForm.reset();
  }
  
  closeModalEdit() { 
    this.isModalEditOpen = false;
    this.updateEventTypeForm.reset();
  }

  // Form handlers
  handleSubmit(): void {
    console.log(this.eventTypeForm.value);
    if (this.eventTypeForm.invalid) {
      this.eventTypeForm.markAllAsTouched();
      return;
    }

    this.createNew(this.eventTypeForm.value);
    this.closeModal();
  }

  handleSubmitEdit(): void {
    if (this.updateEventTypeForm.invalid) {
      this.updateEventTypeForm.markAllAsTouched();
      return;
    }

    this.updateItem(this.updateEventTypeForm.value);
    this.closeModalEdit();
  }

  // Data operations
  getAll() {
    this.isLoading = true;
    this.typeService.getAll().subscribe({
      next: ({result}: ApiResponse<EventType[]>) => {
        this.eventTypes = result.reverse();
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
    this.typeService.getById(id).subscribe({
      next: ({result}: ApiResponse<EventType>) => {
        this.updateEventTypeForm.patchValue({
          id: result.id,
          name: result.name,
          isActive: result.isActive
        });
      },
      error: (e) => this.handleError(e, 'obtener el tipo de evento')
    });
  }

  createNew(model: CreateEventType) {
    this.typeService.create(model).subscribe({
      next: () => this.getAll(),
      error: (e) => this.handleError(e, 'crear el tipo de evento')
    });
  }

  updateItem(model: EventType) {
    this.typeService.update(model).subscribe({
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
        this.typeService.delete(id).subscribe({
          next: () => this.getAll(),
          error: (e) => this.handleError(e, 'eliminar el tipo de evento')
        });
      }
    });
    
  }

  onToggleRegional(model: EventType, event: Event) {
    model.isActive = (event.target as HTMLInputElement).checked;
    this.typeService.update(model).subscribe({
      next: () => this.getAll(),
      error: (e) => this.handleError(e, 'cambiar el estado')
    });
  }

  private handleError(error: any, action: string): void {
    console.error(`Error al ${action}:`, error);
    // Aquí podre agregar notificaciones al usuario
  }
}
