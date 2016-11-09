import { ImageUploadComponent } from './image-upload/image-upload.component';
import { BypassSecurityTrustUrlPipe } from './bypass-security-trust-url.pipe';
import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';

/**
 * Created by Administrateur on 28/09/2016.
 */

@NgModule({
  declarations: [
    ImageUploadComponent,
    BypassSecurityTrustUrlPipe
  ],
  exports: [
    BypassSecurityTrustUrlPipe,
    ImageUploadComponent
  ],
  imports: [
    CommonHelper.commonModuleList()
  ],
  providers: [
  ]
})
export class ImageModule {

}
