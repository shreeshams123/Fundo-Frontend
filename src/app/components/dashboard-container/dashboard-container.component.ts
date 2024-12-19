import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  drawerState: boolean = false
  searchQuery: string = ""
  email:string=""
  userName:string=""
  initialValue:string=""
constructor(private router:Router, private dataService: DataService){}
  ngOnInit(): void {
    this.router.navigate(["dashboard/notes"]);
    this.userName=localStorage.getItem('name') as string;
    this.email=localStorage.getItem('email') as string;
    this.initialValue=this.userName.charAt(0);
  }

navigateTo(route:string){
this.router.navigate([`/dashboard/${route}`])
}
toggleDrawerState() {
  this.drawerState = !this.drawerState
}

handleSearchQuery() {
  this.dataService.updateSearchQuery(this.searchQuery)
}
logout(){
  localStorage.clear();
  this.router.navigate(['/']);
}
}
