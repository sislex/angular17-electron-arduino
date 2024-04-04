import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendDirection } from '../../../+state/skins/move-skin/view/move-view-skin.actions';

@Injectable({
  providedIn: 'root',
})
export class CoordinatesMessagesService {

    constructor(
        private readonly store: Store,
      ) {
      }

    sendCoordinates(coordinates: {top: number; left: number}) {
        let work1 = false;
        let work2 = false;
        if (coordinates.left > 5 && coordinates.left < 50) {
            if (!work1) {
                work1 = true;
                this.store.dispatch(sendDirection({
                direction: 'UP',
                m: 2
            }));
        } else if ((coordinates.left > -5 && coordinates.left < 5)  || coordinates.left > 50 || coordinates.left < -50){ 
            work1 = false;
                this.store.dispatch(sendDirection({
                direction: 'UP',
                m: 2
            }));
        }
    }
        if (coordinates.left < -5 && coordinates.left > -50) {
            if (!work1) {
                work1 = true;
                this.store.dispatch(sendDirection({
                direction: 'DOWN',
                m: 2
            }));
        } else if ((coordinates.left > -5 && coordinates.left < 5)  || coordinates.left > 50 || coordinates.left < -50){ 
            work1 = false;
                this.store.dispatch(sendDirection({
                direction: 'DOWN',
                m: 2
            }));
        }
    }

        if (coordinates.top > 5 && coordinates.top < 50) {
            if (!work2) {
                work2 = true;
                this.store.dispatch(sendDirection({
                direction: 'RIGHT',
                m: 2
            }));
        } else if ((coordinates.top > -5 && coordinates.top < 5)  || coordinates.top > 50 || coordinates.top < -50){ 
            work2 = false;
                this.store.dispatch(sendDirection({
                direction: 'RIGHT',
                m: 2
            }));
        }
    }
        if (coordinates.top < -5 && coordinates.top > -50) {
            if (!work2) {
                work2 = true;
                this.store.dispatch(sendDirection({
                direction: 'LEFT',
                m: 2
            }));
        } else if ((coordinates.top > -5 && coordinates.top < 5)  || coordinates.top > 50 || coordinates.top < -50){ 
            work2 = false;
                this.store.dispatch(sendDirection({
                direction: 'LEFT',
                m: 2
            }));
        }
        
    }
    }
}
