import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  constructor(private router: Router, private api: ServiceService) {}

  readAnimal: any;
  selectedAnimalDescription: any;

  ngOnInit(): void {
    this.getAlldata();
  }

  getAlldata() {
    this.api.getAllAnimals().subscribe((res) => {
      // console.log('Get All Animals', res);
      this.readAnimal = res.data;
    });
  }

  onAnimalSelected(selectedId: string) {
    console.log('Selected animal ID:', selectedId);

    if (selectedId !== '0') {
      // Make API call or perform logic based on selectedId
      this.api.getDescription(selectedId).subscribe(
        (res: any) => {
          if (res.data && res.data.length > 0) {
            this.selectedAnimalDescription = res.data[0].description;
          } else {
            this.selectedAnimalDescription = 'Animal description not found';
          }
        },
        (error: any) => {
          console.error('Error fetching animal description:', error);
          this.selectedAnimalDescription = 'Error fetching description';
        }
      );
    } else {
      // Handle default case where '0' is selected
      this.selectedAnimalDescription = '';
    }
  }
}
