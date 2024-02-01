import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-warning-item',
  templateUrl: './warning-item.component.html',
  styleUrls: ['./warning-item.component.scss'],
  animations: [
    trigger('slideIn', [
      state('void', style({
        transform: 'translateY(140px)',
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})


export class WarningItemComponent {
  isVisible = true;

  @Input() message: string | undefined;
  @Input() status: string | undefined;
  @Output() itemClose = new EventEmitter();

  close() {
    this.isVisible = !this.isVisible;
    this.itemClose.emit();
  }

}
