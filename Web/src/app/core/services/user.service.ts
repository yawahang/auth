import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl= environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`, {
      params: { email }
    });
  }
  getAllUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/getAllUsers`);
  }
    getUserById(id: number): Observable<UserModel> {
      return this.http.get<UserModel>(`${this.baseUrl}/${id}`);
    }
    activatePage(email: string): Observable<{ status: boolean | string }> {
    return this.http.post<{ status: boolean | string }>(`${this.baseUrl}/users/activate-page`,  {email});
  }

  updateProfile(profile: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}/updateProfile`, profile);
  }

}
