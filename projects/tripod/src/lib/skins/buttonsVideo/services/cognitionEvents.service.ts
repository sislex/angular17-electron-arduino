import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendDirection } from '../../../+state/skins/move-skin/view/move-view-skin.actions';
import { debounce } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class CoordinatesMessagesService {


    constructor(
        private readonly store: Store,
    ) {}

    sendDirection = debounce((direction: string) => {
        this.store.dispatch(sendDirection({
            direction: direction,
            m: 2
        }));
    }, 10);

    sendCoordinates(coordinates: {top: number; left: number; radius: number}) {
        const { left, top } = coordinates;
        if (Math.abs(top) > 5 && Math.abs(top) < 50 ) {
            this.sendDirection(top > 0 ? 'RIGHT' : 'LEFT');
        }
        if (Math.abs(left) > 5 && Math.abs(left) < 50) {
            this.sendDirection(left > 0 ? 'UP' : 'DOWN');
        };
        if ((!coordinates.top || Math.abs(top) <= 5 || Math.abs(top) >= 50) ) {
            this.sendDirection('HORIZONTALSTOP');
        }
        if ((!coordinates.left || Math.abs(left) <= 5 || Math.abs(left) >= 50)) {
            this.sendDirection('VERTICALSTOP');
        }
    }
}
