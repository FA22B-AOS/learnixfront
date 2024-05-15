import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../Services/activity.service';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit{
  recentActivities: any[] = [];
  plannedActivities: any[] = [];

  constructor(private activitiyService: ActivityService) {

    ngOnInit(): void {
      this.loadActivities
    }

    loadActivities() {
      this.activitiyService.getRecentActivities().subscribe((activities: any[]) =>{
        this.recentActivities = activities;
      });

      this.activitiyService.getPlannedActivities().subscribe((activities: any[]) =>{
        this.plannedActivities = activities;
    });
  }
}
