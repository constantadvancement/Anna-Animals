import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  host: {ngSkipHydration: 'true'},
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(private api: ServiceService, private router: ActivatedRoute) {}

  errMsg: any;
  successMsg: any;
  getparamid: any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.api.getSingleData(this.getparamid).subscribe((res) => {
        console.log(res, 'selected update data');
        this.animalForm.patchValue({
          id: res.data[0].id,
          name: res.data[0].name,
          description: res.data[0].description,
        });
      });
    }
  }

  animalForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    created_At: new FormControl(new Date().toISOString()),
    updated_At: new FormControl(new Date().toISOString()),
  });

  animalSubmit() {
    console.log('COME ON HELL WHERE ARE YOU');
    console.log(this.animalForm.value);

    if (this.animalForm.value) {
      console.log(this.animalForm.value);
      this.api.createAnimal(this.animalForm.value).subscribe((res) => {
        console.log(res, 'Data Added Successfully');
        this.animalForm.reset();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }

  //update animal
  updateAnimal() {
    console.log("update animal function in component??")
    console.log(this.animalForm.value);
    if (this.animalForm.value) {
      this.api
        .updateData(this.animalForm.value, this.getparamid)
        .subscribe((res) => {
          console.log(res, 'Data Updated Successfully');
          this.successMsg = res.message;
        });
    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }
}
