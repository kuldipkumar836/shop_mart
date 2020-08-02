import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
interface Image {
    id?: string;
    imageUrl:string;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
banners: Image[];
  constructor( private fileServise: FileService ) { }

  ngOnInit() {
    this.fileServise.getImages().subscribe(a=>{
    this.banners = a.map(item=>{
      return {
        id: item.payload.doc.id,
          ...item.payload.doc.data()
      }as Image
    })
  })
  
  }

}
