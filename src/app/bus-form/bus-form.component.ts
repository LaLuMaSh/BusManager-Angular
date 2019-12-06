import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {BusService} from '../bus.service';
import {Bus} from '../model/bus';

@Component({
  selector: 'bm-bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.css']
})
export class BusFormComponent implements OnInit {
  error = false;
  message = '';
  bus = new Bus();
  group = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('')
  }, Validators.required);
  typeNames = [];

  getTextError(form: AbstractControl) {
    return form.hasError('required') ? 'Bitte wählen sie einen Wert aus.' : '';
  }
  constructor(private service: BusService) { }

  ngOnInit() {
    this.service.getBusTypes().subscribe(value => {
      value.forEach(value1 => {
        this.typeNames.push(value1.name);
      });
    }, error => {
      this.error = true;
      this.message = error.error.message;
    });
  }

  saveEntry(f: FormGroupDirective) {
    this.service.addBus(this.bus).subscribe(value => {
      f.resetForm();
      this.group.reset();
      this.error = false;
      this.message = 'Bus erfolgreich gespeichert.';
    }, error1 => {
      this.error = true;
      this.message = error1.error.message;
    });
  }
}
