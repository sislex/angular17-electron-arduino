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

  getLastId(targets: ITarget[]) {
    let lastId = -1;
    targets.forEach(target => {
      if (lastId < target.id) {
        lastId = target.id;
      }
    })

    return lastId;
  }

  processMatchingTargets(coordinates: ICoordinates[], targets: ITarget[]): ITarget[] {
    let newTargetList: ITarget[] = [];
    let lastId = this.getLastId(targets);

    if (targets.length === 0) {
      newTargetList = coordinates.map((coordinate) => {
        return new Target(++lastId, coordinate);
      });
    } else {
      const matchTargetsWithCoordinates: any = [];

      targets.forEach(target => {
        const coordinatesList = coordinates
          .filter(coordinate => this.distanceByCoordinates(target.coordinates, coordinate) < 30)
          .sort((a, b) => this.distanceByCoordinates(target.coordinates, a) - this.distanceByCoordinates(target.coordinates, b));
        if (coordinatesList.length !== 0) {
          matchTargetsWithCoordinates.push({target, coordinates: coordinatesList});
        }
      });
      let matchTargets: ITarget[] = [];
      if (matchTargetsWithCoordinates.length !== 0) {
        matchTargets  = this.getTargets(matchTargetsWithCoordinates).map(target => {

          let counter = target.counter + 1;
          if (counter === 10) {
            counter = 20;
          } else if (counter > 20) {
            counter = 20;
          } else if (counter === 11) {
            counter = 0;
          }
          return {...target, counter}
        });

      }


      newTargetList.push(...matchTargets);

      const noMatchTargets: ITarget[] = targets.filter(target => {
        return !matchTargets.find(item => item.id === target.id);
      }).map(target => ({
        ...target,
        counter: target.counter - 1,
      })).filter(target => {
        return target.counter > 0;
      });

      newTargetList.push(...noMatchTargets);

      const noMatchCoordinates = coordinates.filter(coordinate => {
        return !matchTargets.find((item) => {
          return item.coordinates.top === coordinate.top &&
            item.coordinates.left === coordinate.left &&
            item.coordinates.radius === coordinate.radius
        });
      }).map(coordinate => new Target(++lastId, coordinate))

      newTargetList.push(...noMatchCoordinates);
    }
    return newTargetList
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
