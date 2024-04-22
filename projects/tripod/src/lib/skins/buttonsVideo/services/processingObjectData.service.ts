import { Injectable } from '@angular/core';
import {ICoordinates, ITarget, Target} from '../../../+state/targets/targets.reducer';

export interface ITargetsWithCoordinates {
  target: ITarget;
  coordinates: ICoordinates[];
}

@Injectable({
  providedIn: 'root'
})
export class ProcessingObjectData {

  distanceByCoordinates(coords1: ICoordinates, coords2: ICoordinates) {
    let distanceTarget = Math.sqrt(coords1.left*coords1.left + coords1.top*coords1.top);
    let distanceObject = Math.sqrt(coords2.left*coords2.left + coords2.top*coords2.top);

    return Math.abs(distanceTarget - distanceObject) / distanceTarget * 100;
  }

  processMatchingTargets(coordinates: ICoordinates[], targets: ITarget[]): ITarget[] {
    let newTargetList: ITarget[] = [];

    if (targets.length === 0) {
      newTargetList = coordinates.map((coordinate, key) => {
        return new Target(key, coordinate);
      });
    } else {
      const  noMatchTargets: ITarget[] = [];
      const matchTargetsWithCoordinates: any = [];

      targets.forEach(target => {
        const coordinatesList = coordinates
          .filter(coordinate => this.distanceByCoordinates(target.coordinates, coordinate) < 30)
          .sort((a, b) => this.distanceByCoordinates(target.coordinates, a) - this.distanceByCoordinates(target.coordinates, b));
        if (coordinatesList.length !== 0) {
          matchTargetsWithCoordinates.push({target, coordinates: coordinatesList});
        }
      });

      const  matchTargets: ITarget[] = this.getTargets(matchTargetsWithCoordinates);



    }

    return newTargetList;
  }

    getTargets(matchTargetsWithCoordinates: ITargetsWithCoordinates[], matchTargets: ITarget[] = []) {
      const coordinates = matchTargetsWithCoordinates[0].coordinates[0];

      const targetList = matchTargetsWithCoordinates.filter(target => {
        return target.coordinates.find(coordinateItem => coordinateItem === coordinates);
      }).sort((a, b) =>
        this.distanceByCoordinates(coordinates, a.target.coordinates) - this.distanceByCoordinates(coordinates, b.target.coordinates));

      const foundTarget = {
        ...targetList[0].target,
        coordinates: coordinates,
      };

      matchTargets.push(foundTarget);

      const newMatchTargetsWithCoordinates = matchTargetsWithCoordinates
        .filter(matchTargetWithCoordinates => matchTargetWithCoordinates.target !== targetList[0].target)
        .map(matchTargetWithCoordinates => {
          return {target: matchTargetWithCoordinates.target, coordinates: matchTargetWithCoordinates.coordinates.filter(coordinateItem => {
            return coordinateItem.left !== coordinates.left || coordinateItem.top !== coordinates.top || coordinateItem.radius !== coordinates.radius;
            })};
      })
        .filter(matchTargetWithCoordinates => matchTargetWithCoordinates.coordinates.length > 0);

      if (newMatchTargetsWithCoordinates.length !== 0) {
        matchTargets = this.getTargets(newMatchTargetsWithCoordinates, matchTargets);
      }

      return matchTargets;
    }
}
