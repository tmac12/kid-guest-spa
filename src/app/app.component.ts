import { Component, computed, effect, inject } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CoreStateService } from './services/core-state.service';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kid-guest';

  private readonly coreStateService = inject(CoreStateService);
  private readonly supabaseService = inject(SupabaseService);

  errorUploading = computed(() => {
    return this.coreStateService.eventUploadStates().error;
  });

  errorMessage = computed(() => {
    return this.coreStateService.eventUploadStates().errorMessage;
  });

  uploading = computed(() => {
    return this.coreStateService.eventUploadStates().uploading;
  });

  uploaded = computed(() => {
    return this.coreStateService.eventUploadStates().uploaded;
  });
  progress = computed(() => {
    return this.coreStateService.eventUploadProgress();
  });
  progressMessage = computed(() => {
    return this.coreStateService.eventUploadProgressMessage();
  });

  aiResult = computed(() => {
    return this.coreStateService.aiResult();
  });

  constructor() {
    effect(() => {
      const uploaded = this.uploaded();
      if (uploaded) {
        //call supbase edge function to AI
        console.log('Uploaded successfully');

        this.coreStateService.eventUploadProgressMessage.set(
          'Generating content from image...'
        );
        this.coreStateService.eventUploadProgress.set(0);

        const fileName = this.coreStateService.fileName();
        this.supabaseService
          .invokeEdgeFunction({
            imagePath: 'public/' + fileName,
          })
          .then((response) => {
            console.log('Edge function response:', response);
            this.coreStateService.aiResult.set(JSON.stringify(response));

            this.coreStateService.eventUploadProgress.set(100);
            this.coreStateService.eventUploadProgressMessage.set(
              'Content generated successfully'
            );
          })
          .catch((error) => {
            console.error('Edge function error:', error);

            this.coreStateService.eventUploadProgress.set(0);
          });
      }
    });
  }
}
