import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project';
import { VideoService, Video } from '../../services/video';
import { CommentService, Comment, CreateCommentRequest } from '../../services/comment';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  project: Project | null = null;
  videos: Video[] = [];
  comments: Comment[] = [];
  loading = true;
  error: string | null = null;
  newComment: CreateCommentRequest = {
    content: '',
    videoId: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private videoService: VideoService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProjectDetails(Number(projectId));
    }
  }

  loadProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadVideos(projectId);
      },
      error: (err) => {
        this.error = 'Failed to load project details';
        this.loading = false;
        console.error(err);
      },
    });
  }

  loadVideos(projectId: number): void {
    this.videoService.getVideos().subscribe({
      next: (videos) => {
        this.videos = videos.filter(v => v.projectId === projectId);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  loadComments(videoId: number): void {
    this.commentService.getCommentsByVideo(videoId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addComment(videoId: number): void {
    if (!this.newComment.content.trim()) {
      return;
    }

    const comment: CreateCommentRequest = {
      content: this.newComment.content,
      videoId: videoId,
    };

    this.commentService.createComment(comment).subscribe({
      next: () => {
        this.newComment.content = '';
        this.loadComments(videoId);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
