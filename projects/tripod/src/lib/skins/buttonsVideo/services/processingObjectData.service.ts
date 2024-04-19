import { Injectable } from '@angular/core';
import {ICoordinates, ITarget, Target} from '../../../+state/targets/targets.reducer';


@Injectable({
  providedIn: 'root'
})
export class ProcessingObjectData {

  distanceByCoordinates(coords1: ICoordinates, coords2: ICoordinates) {
    let distanceTarget = Math.sqrt(coords1.left*coords1.left + coords1.top*coords1.top);
    let distanceObject = Math.sqrt(coords2.left*coords2.left + coords2.top*coords2.top);
    let valueDifference = Math.abs(distanceTarget - distanceObject) / distanceTarget * 100;
    return valueDifference;
  }

    processMatchingTargets(coordinates: ICoordinates[], targets: ITarget[]): ITarget[] {
      let newTargetList: ITarget[] = [];
      let usedCoordinates: ICoordinates[] = [];
      let reuseCoords: ICoordinates[] = [];

      if (targets.length === 0) {
        newTargetList = coordinates.map((coordinate, key) => {
          return new Target(key, coordinate);
        });
      } else {
        targets.forEach(target => {
          let closestTarget: ITarget | null = null;
          let minDistance = Infinity;
          let matchFound = false;
          coordinates.forEach((coordinate, key) => {

            let distance = this.distanceByCoordinates(target.coordinates, coordinate);
            if (distance < 30) {
              if (distance < minDistance) {
                matchFound = true;
                minDistance = distance;
                closestTarget = new Target(target.id, coordinate);
                // usedCoordinates.push(closestTarget.coordinates);
                console.log('координаты которые оказались ближе',closestTarget.coordinates)
              }
            } else {
              reuseCoords.push(coordinate);
              console.log('координаты которые не повторились', reuseCoords)
              reuseCoords.forEach((reuse: ICoordinates) => {
                if (reuse != coordinate) {
                  console.log('координаты которые мы уже использовали', reuse)
                  newTargetList.push(new Target(target.id + 1, reuse))
                }
              })
            }
          });

          if (closestTarget) {
            newTargetList.push(closestTarget);
            }
          if (!matchFound) {
            newTargetList.push(target);
            console.log('координаты цели которые не повторились',target.coordinates);
          }
        });
      }
    return newTargetList;
    }
}
