import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  constructor( private fileservice: FileService,
          ) 
    { 
    }

  ngOnInit() {
    this.form = new FormGroup({
     image: new FormControl(null, { validators:[]})
    });
  }
  onSubmit(){    
    this.fileservice.saveFile(this.form.value.image).subscribe();
  }
  filePicker(event){
  const file = event.target.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);    
  }

}
