import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreStateService {
  public eventUploadStates = signal({
    uploading: false,
    uploaded: false,
    error: false,
    errorMessage: '',
  });
  public eventUploadProgress = signal(0);
  public eventUploadProgressMessage = signal('');
  public fileName = signal('');

  public aiResult = signal('');
}
