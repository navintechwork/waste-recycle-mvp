import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { Observable, startWith,map } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  map:any;
  myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  options: string[] = [
    'Aargau', 
    'Appenzell Ausserrhoden', 
    'Appenzell Innerrhoden',
    'Basel-Landschaft',
    'Basel-Stadt',
    'Bern',
    'Fribourg',
    'Geneva',
    'Glarus',
    'Grisons',
    'Jura',
    'Lucerne',
    'Neuchâtel',
    'Nidwalden',
    'Obwalden',
    'Schaffhausen',
    'Schwyz',
    'Solothurn',
    'St. Gallen',
    'Thurgau',
    'Ticino',
    'Uri',
    'Valais',
    'Vaud',
    'Zug',
    'Zürich'
    ];
  filteredOptions!: Observable<string[]>;
  favoriteSeason!: string;
  seasons: string[] = ['Glass', 'Metal', 'Oil', 'Textile'];

  constructor() { }

  ngOnInit() {
    // this.map = L.map('map').setView([51.505, -0.09], 13);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value || '')),
    );
  }
  ngAfterViewInit():void
{
  const map = L.map('map').setView([46.56, 7.26], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'  
  }).addTo(map);

}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

  
}
