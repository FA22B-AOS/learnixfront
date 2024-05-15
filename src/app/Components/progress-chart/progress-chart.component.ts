import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {LectionProgress} from "../../Models/LectionProgress";

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [],
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.css'
})
export class ProgressChartComponent {

  @Input() percentage: number | undefined;

  protected getPercentage(): number{
    if(this.percentage === undefined)
      return 0;
    else
      return this.percentage;
  }

}
