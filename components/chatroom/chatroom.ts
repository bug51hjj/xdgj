import { Component } from '@angular/core';

/**
 * Generated class for the ChatroomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomComponent {

  text: string;

  constructor() {
    console.log('Hello ChatroomComponent Component');
    this.text = 'Hello World';
  }

}
