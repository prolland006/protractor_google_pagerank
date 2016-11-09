import { Routes } from '@angular/router';
import { ImageUploadComponent } from "./images/image-upload/image-upload.component";

export const ROUTES: Routes = [
  { path: '',      component: ImageUploadComponent },
  { path: 'image-upload/:userId',  component: ImageUploadComponent }
];
