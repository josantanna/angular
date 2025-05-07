import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports:[CommonModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = [];
  selectedVehicle: any = null;
  vehicleData: any[] = [];
  searchTerm: string = '';
  dataSearchTerm: string = '';

  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.apiService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });

    this.loadVehicleData();
  }

  loadVehicleData(): void {
    this.apiService.getVehicleData().subscribe(data => {
      this.vehicleData = data;
    });
  }

  onVehicleSelect(vehicle: any): void {
    this.selectedVehicle = vehicle;
  }

  get filteredData(): any[] {
    if (!this.dataSearchTerm) return this.vehicleData;
    return this.vehicleData.filter(item => 
      item.codigo.toLowerCase().includes(this.dataSearchTerm.toLowerCase())
    );
  }
}