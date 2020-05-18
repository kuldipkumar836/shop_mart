import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  BACKEND_URL = 'http://localhost:5001/shopingzone-77ff1/us-central1/app/'
  constructor( private http: HttpClient) { }

    saveFile(image: File){
      console.log(image);
      
    return this.http
      .post<{ }>(
        this.BACKEND_URL + 'api/file',
        image
      )};
}
