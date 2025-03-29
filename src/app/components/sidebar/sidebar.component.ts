import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isMenuProfileOpen = false;
  
  constructor(private themeService: ThemeService) {}

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleMenuProfile(): void {
    this.isMenuProfileOpen = !this.isMenuProfileOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();

    console.log('entro');
  }

}
