import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService, CreateProjectRequest } from '../../services/project';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss',
})
export class CreateProject {
  project: CreateProjectRequest = {
    title: '',
    description: '',
  };
  loading = false;
  error: string | null = null;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.project.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    this.loading = true;
    this.error = null;

    this.projectService.createProject(this.project).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Failed to create project';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
