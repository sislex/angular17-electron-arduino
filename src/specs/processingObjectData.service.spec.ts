import { TestBed } from '@angular/core/testing';
import {
  ITargetsWithCoordinates,
  ProcessingObjectData
} from '../../projects/tripod/src/lib/skins/buttonsVideo/services/processingObjectData.service';
import {ICoordinates, ITarget} from '../../projects/tripod/src/lib/+state/targets/targets.reducer';


describe('TestService', () => {
  let service: ProcessingObjectData;

  let mockCoordinates: ICoordinates[];
  let mockTargets: ITarget[];
  let distanceByCoordinatesSpy: jasmine.Spy;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingObjectData);

    // Инициализация моков и шпионов
    mockCoordinates = [{ top: 10, left: 10, radius: 5 }, { top: 20, left: 20, radius: 5 }];
    mockTargets = [
      { id: 1, counter: 2, coordinates: { top: 15, left: 15, radius: 5 } },
      { id: 2, counter: 3, coordinates: { top: 100, left: 100, radius: 5 } }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create 2 targets from 2 coordinates when targets array is empty', () => {
    const results = service.processMatchingTargets(mockCoordinates, []);
    expect(results.length).toEqual(2);
    expect(results[0].id).toBeDefined();
    expect(results[1].id).toBeDefined();
  });

  // it('should create targets from coordinates when targets array is empty', () => {
  //   const results = service.processMatchingTargets(mockCoordinates, mockTargets);
  //   console.log(JSON.stringify(results));
  //   expect(results.length).toEqual(0);
  // });

});

describe('processMatchingTargets', () => {
  let service: ProcessingObjectData;
  let matchTargetsWithCoordinates: ITargetsWithCoordinates[];
  let distanceByCoordinatesSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingObjectData);

    // Инициализация моков и шпионов
    matchTargetsWithCoordinates = [
      {
        "target":{"id":1,"counter":2, "coordinates":{"top":15,"left":15,"radius":5}},
        "coordinates":[
          {"top":10,"left":10,"radius":5},
          {"top":20,"left":20,"radius":5},
        ],
      },
      {
        "target":{"id":2,"counter":3, "coordinates":{"top":100,"left":100,"radius":5}},
        "coordinates":[
          {"top":10,"left":10,"radius":5},
          {"top":20,"left":20,"radius":5},
        ],
      },
    ];

  });

  it('should create 2 targets from match coordinates', () => {
    const results = service.getTargets(matchTargetsWithCoordinates, []);
    console.log(JSON.stringify(results));
    expect(results.length).toEqual(2);
    expect(results[0].coordinates.left).toEqual(matchTargetsWithCoordinates[0].coordinates[0].left);
    expect(results[1]).toBeDefined();
  });

  it('should create 1 target from match coordinates', () => {
    const matchTargetsWithCoordinates = [
      {
        "target":{"id":1,"counter":2, "coordinates":{"top":15,"left":15,"radius":5}},
        "coordinates":[
          {"top":10,"left":10,"radius":5},
          {"top":20,"left":20,"radius":5},
        ],
      },
      {
        "target":{"id":2,"counter":3, "coordinates":{"top":100,"left":100,"radius":5}},
        "coordinates":[
          {"top":10,"left":10,"radius":5},
        ],
      },
    ];

    const results = service.getTargets(matchTargetsWithCoordinates, []);
    console.log(JSON.stringify(results));
    expect(results.length).toEqual(1);
    expect(results[0].coordinates.left).toEqual(matchTargetsWithCoordinates[0].coordinates[0].left);
  });

});
