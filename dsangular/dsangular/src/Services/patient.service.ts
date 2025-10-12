import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Patient } from 'src/Models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://127.0.0.1:8000/api/patients';

  constructor(private http: HttpClient) {}

  getPatients(page: number, pageSize: number, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { params: { page, pageSize, search } });
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  getFilteredPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/filtered`);
  }


  importPatients(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/import`, formData).pipe(
      catchError(this.handleError),
    );
  }
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    }
}

