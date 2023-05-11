import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { CardComponent } from './components/card/card.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ListImagesComponent } from './pages/list-images/list-images.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditComponent } from './components/edit/edit.component';
import { TableComponent } from './components/table/table.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ImageService } from './services/image.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { UploadFormComponent } from './components/form/upload-form/upload-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFilterComponent,
    CardComponent,
    LeftSidebarComponent,
    ListImagesComponent,
    EditComponent,
    TableComponent,
    GalleryComponent,
    ModalUploadComponent,
    LoginComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatRadioModule,  
    FormsModule,  
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
