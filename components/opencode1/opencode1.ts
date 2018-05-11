import { Component } from '@angular/core';

/**
 * Generated class for the Opencode1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'opencode1',
  templateUrl: 'opencode1.html'
})
export class Opencode1Component {

  text: string;

  constructor() {
    console.log('Hello Opencode1Component Component');
    this.text = 'Hello World';
  }

}
