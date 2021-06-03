import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.css']
})
export class TextBlockComponent {
  @Input() mainText: string;
  @Input() secondaryText: string;
  @Input() color: string;
}
