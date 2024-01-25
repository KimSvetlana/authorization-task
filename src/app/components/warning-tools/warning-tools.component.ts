import { Component } from '@angular/core';
import { WarningService } from 'src/app/warning.service';
import { IErrorItem, Status } from "../../utils"

@Component({
  selector: 'app-warning-tools',
  templateUrl: './warning-tools.component.html',
  styleUrls: ['./warning-tools.component.scss']
})
export class WarningToolsComponent {

  constructor(private warningService: WarningService) {  }

  warnings: IErrorItem[] = [];

  ngOnInit(): void {
    this.warningService.warningData$.subscribe((error) => {
      if(error) this.warnings.push(error);
      if(this.warnings.length >= 4) this.warnings.shift();

      setTimeout(() => {
        this.removeElement(error);
      }, 15000);
    });
  }

  removeElementByIndex(i: number) {
    this.warnings.splice(i, 1);
  }

  removeElement(error: IErrorItem){
    const index = this.warnings.indexOf(error);
    if (index != -1) {
      this.removeElementByIndex(index);
    }
  }

}
