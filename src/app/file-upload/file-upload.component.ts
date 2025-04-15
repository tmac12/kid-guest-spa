import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { CoreStateService } from '../services/core-state.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  private readonly supabaseService = inject(SupabaseService);
  private readonly coreStateService = inject(CoreStateService);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      this.coreStateService.eventUploadStates.set({
        uploading: true,
        uploaded: false,
        error: false,
        errorMessage: '',
      });
      this.coreStateService.eventUploadProgress.set(10);
      // Here you can call your upload function
      this.uploadFile(file);
    }
  }
  uploadFile(file: File) {
    // Implement your upload logic here
    console.log('Uploading file:', file);
    this.coreStateService.eventUploadProgress.set(20);
    const fileName = file.name;
    this.coreStateService.fileName.set(fileName);
    // For example, you can use the Supabase service to upload the file
    this.supabaseService
      .uploadImage('public/' + fileName, file)
      .then((response) => {
        console.log('Upload response:', response);
        this.coreStateService.eventUploadStates.set({
          uploading: false,
          uploaded: true,
          error: false,
          errorMessage: '',
        });
        this.coreStateService.eventUploadProgress.set(100);
      })
      .catch((error) => {
        console.error('Upload error:', error);
        this.coreStateService.eventUploadStates.set({
          uploading: false,
          uploaded: false,
          error: true,
          errorMessage: error.message,
        });
        this.coreStateService.eventUploadProgress.set(0);
      });
  }
}
