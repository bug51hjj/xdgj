import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GameSideMenuComponent } from './game-side-menu/game-side-menu';

//引入BrowserModule  解决 ngFor报错的问题
import { BrowserModule } from '@angular/platform-browser';
import { GameSelect_01Component } from './game-select-01/game-select-01';
@NgModule({
	declarations: [GameSideMenuComponent,
    GameSelect_01Component],
	imports: [BrowserModule,IonicModule],
	exports: [GameSideMenuComponent,
    GameSelect_01Component]
})
export class ComponentsModule {}
