import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  drawerState: boolean = false
constructor(private router:Router){}
  ngOnInit(): void {
    this.router.navigate(["dashboard/notes"])
  }

navigateTo(route:string){
this.router.navigate([`/dashboard/${route}`])
}
toggleDrawerState() {
  this.drawerState = !this.drawerState
}
}
