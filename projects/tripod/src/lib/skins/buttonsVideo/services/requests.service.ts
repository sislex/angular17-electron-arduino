import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {getVideoUrlHost} from '../../../+state/skins/move-skin/view/move-view-skin.selectors';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RequestsService {
  getVideoUrlHost$ = this.store.select(getVideoUrlHost);
  videoUrlHost: string = '';

  constructor(
    private readonly store: Store,
    private http: HttpClient,
  ) {
    this.getVideoUrlHost$.subscribe((url) => {
      this.videoUrlHost = url;
    });
  }

  setQuality(set: number) {
    this.http.get(
      this.videoUrlHost + '/settings/quality?set=' + set,
      { responseType: 'text' }
    ).subscribe((data) => {
      console.log(data);
    });
  }

  setResolution(set: number) {
    this.http.get(
      this.videoUrlHost + '/settings/video_size?set=' + set,
      { responseType: 'text' }
    ).subscribe((data) => {
      console.log(data);
    });
  }

  setZoom(set: number) {
    this.http.get(
      this.videoUrlHost + '/ptz?zoom=' + set,
      { responseType: 'text' }
    ).subscribe((data) => {
      console.log(data);
    });
  }

  setOrientation(set: number) {
    this.http.get(
      this.videoUrlHost + '/settings/orientation?set=' + set,
      { responseType: 'text' }
    ).subscribe((data) => {
      console.log(data);
    });
  }

}
