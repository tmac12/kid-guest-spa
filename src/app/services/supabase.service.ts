import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  downLoadImage(path: string) {
    return this.supabaseClient.storage.from('event-images').download(path);
  }

  uploadImage(path: string, file: File) {
    return this.supabaseClient.storage.from('event-images').upload(path, file);
  }

  invokeEdgeFunction(body: object) {
    return this.supabaseClient.functions.invoke('generate-content-from-image', {
      body: body,
    });
  }
}
