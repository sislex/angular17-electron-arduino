import { createAction, props } from '@ngrx/store';
import { IAbout } from './about.reducer';

  export const setData = createAction(
    '[About] Set Data', 
    props<{ titleAbout:string, aboutList:IAbout[]}>()
    );
