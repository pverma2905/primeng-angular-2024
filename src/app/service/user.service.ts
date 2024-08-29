import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient) { }

  getAllUser() {
    return this.Http.get("http://localhost:3000/users")
  }
  getUserById(user:any) {
    return this.Http.get("http://localhost:3000/users/" + user.id)
  }
  createUser(user:any) {
    return this.Http.post("http://localhost:3000/users", user)
  }
  updateUser(user:any) {
    return this.Http.put("http://localhost:3000/users/" + user.id, user)
  }


  deleteUser(user:any) {
    return this.Http.delete("http://localhost:3000/users/" + user.id)
  }
 }
