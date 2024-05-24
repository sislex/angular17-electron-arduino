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

describe('processMatchingTargetsNewTests', () => {
  let service: ProcessingObjectData;

  let targets1: ITarget[] = [];
  let coordinates1: ICoordinates[] = [{"top":10,"left":10,"radius":5}];

  let targets2: ITarget[] = [{"id":0, "counter": 1, "coordinates": {"top":11,"left":11,"radius":5.5}}];
  let coordinates2: ICoordinates[] = [{"top":10,"left":10,"radius":5}];

  let targets3: ITarget[] = [{'id':0, 'counter': 1,"coordinates": {"top":20,"left":20,"radius":10}}];
  let coordinates3: ICoordinates[] = [{"top":10,"left":10,"radius":5}];

  let targets4: ITarget[] = [{'id':0, 'counter': 2,"coordinates": {"top":20,"left":20,"radius":10}}];
  let coordinates4: ICoordinates[] = [{"top":10,"left":10,"radius":5}];

  let targets5: ITarget[] = [
    {'id':0, 'counter': 2,"coordinates": {"top":11,"left":11,"radius":5.5}},
    {'id':1, 'counter': 2,"coordinates": {"top":12,"left":12,"radius":5.6}}
  ];
  let coordinates5: ICoordinates[] = [{"top":10,"left":10,"radius":5}];

  let targets6: ITarget[] = [{'id':0, 'counter': 1, "coordinates": {"top":10,"left":10,"radius":5}}];
  let coordinates6: ICoordinates[] = [{"top":9,"left":9,"radius":5}, {"top":12,"left":12,"radius":5}];

  let targets7: ITarget[] = [
  {'id':0, 'counter': 2, "coordinates": {"top":10,"left":10,"radius":5}},
  {'id':1, 'counter': 2, "coordinates": {"top":11,"left":11,"radius":6}}
  ];
  let coordinates7: ICoordinates[] = [{"top":1,"left":1,"radius":1}, {"top":100,"left":100,"radius":50}];

  let targets8: ITarget[] = [
  {'id':0, 'counter': 2, "coordinates": {"top":10,"left":10,"radius":5}},
  {'id':1, 'counter': 2, "coordinates": {"top":11,"left":11,"radius":6}}
  ];
  let coordinates8: ICoordinates[] = [{"top":9,"left":9,"radius":5.5}, {"top":12,"left":12,"radius":5.5}];

  let targets9: ITarget[] = [
  {'id':0, 'counter': 2, "coordinates": {"top":10,"left":10,"radius":5}},
  {'id':1, 'counter': 2, "coordinates": {"top":11,"left":11,"radius":6}}
  ];
  let coordinates9: ICoordinates[] = [{"top":9,"left":9,"radius":5.5}, {"top":120,"left":120,"radius":55}];

  let targets10: ITarget[] = [{'id':0, 'counter': 2, "coordinates": {"top":11,"left":11,"radius":5.5}}];
  let coordinates10: ICoordinates[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingObjectData);

  });

  it('no targets and 1 coordinates', () => {
    const results = service.processMatchingTargets(coordinates1, targets1);
    console.log('test1',JSON.stringify(results));
    expect(results.length).toEqual(1);
    expect(results[0].coordinates.left).toEqual(coordinates1[0].left);
    expect(results[1]).toBeUndefined();
  });

  it('1 coordinate corresponds to the conditions of 1 target', () => {
    const results = service.processMatchingTargets(coordinates2, targets2);
    console.log('test2', JSON.stringify(results));
    expect(results.length).toEqual(1);
    expect(results[0].coordinates.left).toEqual(coordinates2[0].left);
    expect(results[1]).toBeUndefined();
  });

  it('1 coordinate does not meet the conditions of 1 target with counter=1', () => {
    const results = service.processMatchingTargets(coordinates3, targets3);
    console.log('test3', JSON.stringify(results));
    expect(results.length).toEqual(1);
    expect(results[0].coordinates.left).toEqual(coordinates3[0].left);
    expect(results[1]).toBeUndefined();
  });

  it('1 coordinate does not meet the conditions of 1 target with counter=2', () => {
    const results = service.processMatchingTargets(coordinates4, targets4);
    console.log('test4', JSON.stringify(results));
    expect(results.length).toEqual(2);
    expect(results[0].coordinates.left).toEqual(targets4[0].coordinates.left);
    expect(results[1].coordinates.left).toEqual(coordinates4[0].left);
    expect(results[2]).toBeUndefined();
  });

  it('2 targets corresponding to 1 coordinate', () => {
    const results = service.processMatchingTargets(coordinates5, targets5);
    console.log('test5', JSON.stringify(results));
    expect(results.length).toEqual(2);
    expect(results[0].coordinates.left).toEqual(coordinates5[0].left);
    expect(results[1].coordinates.left).toEqual(targets5[1].coordinates.left);
    expect(results[2]).toBeUndefined();
  });

  it('1 target corresponding to 2 coordinates', () => {
    const results = service.processMatchingTargets(coordinates6, targets6);
    console.log('test6', JSON.stringify(results));
    expect(results.length).toEqual(2);
    expect(results[0].coordinates.left).toEqual(coordinates6[0].left);
    expect(results[1].coordinates.left).toEqual(coordinates6[1].left);
    expect(results[2]).toBeUndefined();
  });

 it('2 targets not corresponding to 2 coordinates', () => {
    const results = service.processMatchingTargets(coordinates7, targets7);
    console.log('test7', JSON.stringify(results));
    expect(results.length).toEqual(4);
    expect(results[0].coordinates.left).toEqual(targets7[0].coordinates.left)
    expect(results[1].coordinates.left).toEqual(targets7[1].coordinates.left)
    expect(results[2].coordinates.left).toEqual(coordinates7[0].left);
    expect(results[3].coordinates.left).toEqual(coordinates7[1].left);
    expect(results[4]).toBeUndefined();
  });

 it('2 targets corresponding to 2 coordinates', () => {
    const results = service.processMatchingTargets(coordinates8, targets8);
    console.log('test8', JSON.stringify(results));
    expect(results.length).toEqual(2);
    expect(results[0].coordinates.left).toEqual(coordinates8[0].left);
    expect(results[1].coordinates.left).toEqual(coordinates8[1].left);
    expect(results[2]).toBeUndefined();
  });

 it('2 targets corresponding to 1 coordinate, but not corresponding to the second coordinate', () => {
    const results = service.processMatchingTargets(coordinates9, targets9);
    console.log('test9', JSON.stringify(results));
    expect(results.length).toEqual(3);
    expect(results[0].coordinates.left).toEqual(coordinates9[0].left);
    expect(results[1].coordinates.left).toEqual(targets9[1].coordinates.left)
    expect(results[2].coordinates.left).toEqual(coordinates9[1].left)
    expect(results[3]).toBeUndefined();
  });

 it('1 target, no coordinates', () => {
    const results = service.processMatchingTargets(coordinates10, targets10);
    console.log('test10', JSON.stringify(results));
    expect(results.length).toEqual(1);
    expect(results[0].coordinates.left).toEqual(targets10[0].coordinates.left);
    expect(results[1]).toBeUndefined();
  });

});
