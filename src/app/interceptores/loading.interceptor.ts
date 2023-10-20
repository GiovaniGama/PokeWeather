import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../components/loading/service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequest = 0;

  constructor(private _loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.activeRequest === 0){
      this._loadingService.show();
    }

    this.activeRequest ++;
    
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequest --;

        if(this.activeRequest === 0){
          this._loadingService.hide();
        }
      })
    );
  }
}
