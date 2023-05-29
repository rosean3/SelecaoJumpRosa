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
    /*The pipe method in RxJS (Reactive Extensions for JavaScript) is a way of chaining together
    operations on Observable data streams. It's a fundamental method in the library. */
    /*The pipe method is used with two RxJS operators:
      take(1): Ensures that the Observable completes after emitting one value, so any subsequent
      response from this request would be ignored.
      map(): Transforms the emitted value. Here it is used to sanitize the received HTML string
      using bypassSecurityTrustHtml. This tells Angular's security model to trust the HTML string
      and allows it to be bound in the component's template. This can be necessary if the server
      returns a dynamic HTML image representation that needs to be injected into the component's
      HTML. */
  }
}
