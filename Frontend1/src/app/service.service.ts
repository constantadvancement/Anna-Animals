import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = 'http://localhost:3000/animals';
  createUrl = 'http://localhost:3000/create';

  constructor(private http: HttpClient) {}

  // Getting all animals
  getAllAnimals(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Create data
  createAnimal(data: any): Observable<any> {
    console.log(data, 'Data created');
    return this.http.post(`${this.createUrl}`, data);
  }

  // Delete an animal by ID
  deleteData(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Update data
  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.createUrl}/${ids}`, data);
  }

  // Get single data (by ID)
  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`);
  }

  // Get single data (by ID)
  getDescription(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.apiUrl}/descriptions/${ids}`);
  }
}
