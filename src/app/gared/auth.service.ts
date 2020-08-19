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


forgotPassword(email) {
  // response, body
  return this.http.post('http://localhost:3000/registeration/forgotPassword', {email}, {
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



// ----------------- Certifications ------------------------
uplaodCertifications(image) {
  return this.http.post('http://localhost:3000/requestFiles/uplaodCertifications', image, {
    observe: 'events',
    reportProgress: true
  })
}

getCertifications() {
  return this.http.get('http://localhost:3000/requestFiles/getCertifications', {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}


deleteCertifications(id) {
  return this.http.delete('http://localhost:3000/requestFiles/deleteCertifications/'+id)
}


// ----------------- Marks ------------------------
uplaodMarks(image) {
  return this.http.post('http://localhost:3000/requestFiles/uplaodMarks', image, {
    observe: 'events',
    reportProgress: true
  })
}

getMarks() {
  return this.http.get('http://localhost:3000/requestFiles/getMarks', {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}


deleteMarks(id) {
  return this.http.delete('http://localhost:3000/requestFiles/deleteMarks/'+id)
}


// ----------------- Signatures ------------------------
uplaodSignatures(image) {
  return this.http.post('http://localhost:3000/requestFiles/uplaodSignatures', image, {
    observe: 'events',
    reportProgress: true
  })
}

getSignatures() {
  return this.http.get('http://localhost:3000/requestFiles/getSignatures', {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}


deleteSignatures(id) {
  return this.http.delete('http://localhost:3000/requestFiles/deleteSignatures/'+id)
}

certificationInfo(id, singN_AR, singN_EN, arName, enName) {
  return this.http.put('http://localhost:3000/requestFiles/certificationInfo', {id, singN_AR, singN_EN, arName, enName}, {
    observe: 'body',
    reportProgress: true
  })
}

// ----------------- Stamp ------------------------

uplaodStamps(image) {
  return this.http.post('http://localhost:3000/requestFiles/uplaodStamps', image, {
    observe: 'events',
    reportProgress: true
  })
}

getStamps() {
  return this.http.get('http://localhost:3000/requestFiles/getStamps', {
    observe: 'response',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}


deleteStamps(id) {
  return this.http.delete('http://localhost:3000/requestFiles/deleteStamps/'+id)
}

stampInfo(id, stampN) {
  return this.http.put('http://localhost:3000/requestFiles/stampInfo', {id, stampN}, {
    observe: 'body',
    reportProgress: true
  })
}


// ----------------- Courses Name ------------------------
saveCourses(data) {
  return this.http.post('http://localhost:3000/requestFiles/saveCourseName', data, {
    observe: 'body',
    reportProgress: true
  })
}

getCourses() {
  return this.http.get('http://localhost:3000/requestFiles/getCourseName', {
    observe: 'body',
    responseType: 'json',
    headers:  new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
  })
}


deleteCourses(id) {
  return this.http.delete('http://localhost:3000/requestFiles/deleteCourseName/'+id)
}

editCourses(id, coursesN) {
  return this.http.put('http://localhost:3000/requestFiles/editCourseName', {id, coursesN}, {
    observe: 'body',
    reportProgress: true
  })
}


}
