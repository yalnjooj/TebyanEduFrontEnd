import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

   isAuthenticate() {
    return this.http.get('http://localhost:3000/registeration/isValidUser', {
      observe: 'body',
      responseType: 'json',
      headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
      withCredentials: true
   });
}



signUp(email, password, role) {

  return this.http.post('http://localhost:3000/registeration/signUp', {email, password, role}, {
    observe: 'body',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })



}

logIn(email, pass) {
  // response, body

   return this.http.post('http://localhost:3000/registeration/logIn', {email, pass}, {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
    
  })

}


logout() {
  // response, body
  return this.http.get('http://localhost:3000/registeration/logout', {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })

}


forgotPassword(email, linkOrigin) {
  // response, body
  return this.http.post('http://localhost:3000/registeration/forgotPassword', {email, linkOrigin}, {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })

}


resetPassGet(idToken) {
  // response, body
  return this.http.get(`http://localhost:3000/registeration/resetPassword/${idToken}`, {
    observe: 'body',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}


resetPassPost(password, idToken) {
  // response, body
  return this.http.post('http://localhost:3000/registeration/resetPassword', {password, idToken}, {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}



}
