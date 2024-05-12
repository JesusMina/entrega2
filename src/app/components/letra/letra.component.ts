import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent {
  @Input() letra: string = '';
  public miletra: string = '';

}
