import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlobServiceClient } from "@azure/storage-blob";
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatRadioButton, MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { faUpload, faTrash, faClose, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styleUrls: ['./modal-upload.component.scss'],
    styles: [
        
    ]
})
export class ModalUploadComponent implements OnInit {

    @ViewChild('imageInput', { static: false }) imageInput: ElementRef;
    selectedImages: string[] = []
    allFileNames: string[] = []
    fileName = '';
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: any = null;
    selectedOption: string = 'file';
    faUpload = faUpload;
    faTrash = faTrash;
    faClose = faClose;
    faList = faList;
    containerName = "passionfroid-storage-container";
    eventFile: any;
    urlImage: string = '';
    titleModal = "un fichier local";
    reader: FileReader = new FileReader();
    gallery: boolean = true;
    table: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private http: HttpClient, 
        private sanitizer: DomSanitizer,
        private imageService: ImageService
    ) {
        this.imageInput = new ElementRef(null);
    }

    ngOnInit(): void {
    }

    onSelected(e: any): void {
        this.selectedOption = e.target.value;
        if(this.selectedOption == "url"){
            this.titleModal = "une url";
        } else {
            this.titleModal = "un fichier local"
        }
    }

    handleInputChange(e: any) {
        var parts = e.target.value.split("\\");
        
        var lastPart = parts[parts.length - 1];
        this.fileName = lastPart.split(".")[0]
        
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            var pattern = /image-*/;
            
            this.allFileNames.push(file.name)
            if(file.type != undefined){
                if (!file.type.match(pattern)) {
                    alert('invalid format');
                    return;
                }
            }
    
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsDataURL(file);
        }
        
        
        this.loaded = false;
    }

    _handleReaderLoaded(e: any) {
        this.eventFile = e;
        var reader = e.target;
        this.imageSrc = reader.result;
        this.selectedImages.push(this.imageSrc);
        this.loaded = true;
    }

    clearImg(index: number){
        console.log(index);
        
        this.selectedImages.splice(index, 1)
        this.allFileNames.splice(index, 1)
       // console.log(this.imageSrc, "this.imageSrc");
       // console.log(this.eventFile, "this.eventFile");
       // console.log(this.loaded, "this.loaded");
        if(this.imageInput && this.imageInput.nativeElement) {
            this.imageInput.nativeElement.value = '';
        }
       // this.imageSrc = null;
       // this.eventFile = null;
        //this.loaded = false;
        if(this.selectedImages.length <= 0){
            this.loaded = false;
        }
        
    }

    async urlToB64(url: string){
        return fetch(this.urlImage)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
            }))
    }

    onFormSubmit(form: NgForm) {
        let stringBase64 = "";

        if(form.controls['url-image'] != undefined){
            this.urlImage = form.controls['url-image'].value;
            this.fileName = form.controls['url-image'].value.split("/").pop()
            console.log(this.fileName, "this.fileName");
            
            let tt = this.urlToB64(this.urlImage)
            tt.then((data: any) => {
                console.log(data, 'data dans le then');
                stringBase64 = data.split(",")[1]
            }).then(()=>{
                
                this.imageService.add(this.fileName, stringBase64).catch((err) => {console.log(err, "errrrrr");
                })
            })
        }else{    
            stringBase64 = this.imageSrc.split(",")[1]
            this.selectedOption = form.controls['image'].value;
            this.imageService.add(this.fileName, stringBase64)
        }
        
    }
    
    toDataURL(url: string){
      
    }  


    toggleComponents(component: string) {
        if (component === 'gallery') {
          this.gallery = true;
          this.table = false;
        } else if (component === 'table') {
          this.gallery = false;
          this.table = true;
        }
      }
}
