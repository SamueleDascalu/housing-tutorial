import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit)="submitForm(filter.value, $event)">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location 
        *ngFor="let housingLocation of filteredLocationList" 
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: Housinglocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Housinglocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  submitForm(value: string, event: Event) {
    if(!value) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(value.toLowerCase())
    );
    event.preventDefault();
  }
}
