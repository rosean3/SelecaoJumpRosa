import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImageApiService {
  constructor(
    private readonly http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  public getFlowGraph() {
    return this.http
      .get(`${environment.API_BASE_URL}/api/visualization/image/`, {
        responseType: 'text',
      })
      .pipe(
        take(1),
        map((res: string) => this.sanitizer.bypassSecurityTrustHtml(res))
      );
  }
}
