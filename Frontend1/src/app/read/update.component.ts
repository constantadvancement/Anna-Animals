import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  constructor(private router: Router, private api: ServiceService) {}

  readAnimal: any;
  successMsg: any;

  ngOnInit(): void {
    this.getAlldata();
  }

  deleteId(id: any) {
    console.log('Deleting animal with ID:', id);
    this.api.deleteData(id).subscribe(
      (res) => {
        console.log('Deleted animal successfully:', res);
        this.successMsg = res.message; // Assuming your backend sends a message upon successful deletion
        // Optionally, you can call a method to refresh your data after deletion
        this.getAlldata();
      },
      (error) => {
        console.error('Error deleting animal:', error);
        // Handle error, show user-friendly message if needed
      }
    );
  }

  getAlldata() {
    this.api.getAllAnimals().subscribe((res) => {
      // console.log('Get All Animals', res);
      this.readAnimal = res.data;
    });
  }
}
