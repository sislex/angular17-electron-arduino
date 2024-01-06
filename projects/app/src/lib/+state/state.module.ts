import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CONFIG_FEATURE_KEY, configReducer} from './config/config.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // StateModule.forFeature(CONFIG_FEATURE_KEY, configReducer),
  ]
})
export class StateModule { }
