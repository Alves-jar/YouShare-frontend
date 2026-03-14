import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  projectId: number;
  uploadedBy: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  uploadVideo(videoData: FormData): Observable<Video> {
    return this.http.post<Video>(`${this.API_URL}/videos/upload`, videoData);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.API_URL}/videos`);
  }
}
