import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendDirection } from '../../../+state/skins/move-skin/view/move-view-skin.actions';

@Injectable({
    providedIn: 'root',
})
export class CoordinatesMessagesService {
    work1 = false;
    work2 = false;

    constructor(
        private readonly store: Store,
    ) {}

    sendDirection(direction: string) {
        setTimeout(() => {
            this.store.dispatch(sendDirection({
                direction: direction,
                m: 2
            }));
            // console.log('PLAY', coordinates);
        }, 15);
    }

        sendCoordinates(coordinates: {top: number; left: number}) {
        const { left, top } = coordinates;

        if (Math.abs(top) > 5 && Math.abs(top) < 50 && !this.work2) {
            this.work2 = true;
            this.sendDirection(top > 0 ? 'RIGHT' : 'LEFT');
        }

        if (Math.abs(left) > 5 && Math.abs(left) < 50 && !this.work1) {
            this.work1 = true;
            this.sendDirection(left > 0 ? 'UP' : 'DOWN');
        };

        if ((!coordinates.top || Math.abs(top) <= 5 || Math.abs(top) >= 50) && this.work2) {
            this.work2 = false;
            this.sendDirection('HORIZONTALSTOP');
        }

        if ((!coordinates.left || Math.abs(left) <= 5 || Math.abs(left) >= 50) && this.work1) {
            this.work1 = false;
            this.sendDirection('VERTICALSTOP');

        }

    }
}
