import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RestCountriesService } from "src/app/services/rest-countries.service";
import { Travel } from "src/app/models/travel";

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  

})
export class AppComponent {
  travels = new Array<Travel>();
  travelsObservable = new BehaviorSubject(new Array<Travel>());
  user: any;

  travelForm: FormGroup;
  countries: any[];

  dayCalc: number;
  countryCalc: string[];

  constructor(private fb: FormBuilder, private rcs: RestCountriesService) {}

  ngOnInit() {
    this.rcs.getAllCountries().subscribe(
      countries => {
        this.countries = countries;
      },
      err => {
        alert(err.message);
      }
    );
    this.travelsObservable.subscribe(d => {
      this.travels = d;
      this.countryCalc = this.travels
        .map(x => x.country)
        .filter((value, index, self) => self.indexOf(value) === index);

      console.log(
        this.travels
          .map(x => x.country)
          .filter((value, index, self) => self.indexOf(value) === index)
      );
      this.dayCalc = this.travels.reduce(
        (a, b) =>
          a +
          Math.round(
            Math.abs(
              (new Date(b.startDate).getTime() -
                new Date(b.endDate).getTime()) /
                oneDay
            )
          ),
        0
      );
      console.log(
        this.travels.reduce(
          (a, b) =>
            a +
            Math.round(
              Math.abs(
                (new Date(b.startDate).getTime() -
                  new Date(b.endDate).getTime()) /
                  oneDay
              )
            ),
          0
        )
      );
    });
    this.travelForm = this.fb.group({
      country: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      note: ["", [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    });
  }

  get country() {
    return this.travelForm.get("country");
  }

  get startDate() {
    return this.travelForm.get("startDate");
  }
  get endDate() {
    return this.travelForm.get("endDate");
  }
  get note() {
    return this.travelForm.get("note");
  }

  get agree() {
    return this.travelForm.get("agree");
  }

  addTravel(value) {
    this.travelsObservable.next([...this.travels, value]);
  }
}
