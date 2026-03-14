import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  id: number;
  content: string;
  videoId: number;
  userId: number;
  userName: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  content: string;
  videoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCommentsByVideo(videoId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comments/video/${videoId}`);
  }

  createComment(comment: CreateCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.API_URL}/comments`, comment);
  }
}
