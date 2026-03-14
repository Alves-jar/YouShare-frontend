import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/projects`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/projects/${id}`);
  }

  createProject(project: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(`${this.API_URL}/projects`, project);
  }
}
