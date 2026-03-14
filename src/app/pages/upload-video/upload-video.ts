import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VideoService } from '../../services/video';

@Component({
  selector: 'app-upload-video',
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
  templateUrl: './upload-video.html',
  styleUrl: './upload-video.scss',
})
export class UploadVideo {
  title = '';
  description = '';
  selectedFile: File | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private videoService: VideoService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    if (!this.selectedFile) {
      this.error = 'Please select a video file';
      return;
    }

    this.loading = true;
    this.error = null;

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('file', this.selectedFile);

    this.videoService.uploadVideo(formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Failed to upload video';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
