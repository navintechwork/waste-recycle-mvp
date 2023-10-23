import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { Observable, startWith,map } from 'rxjs';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface PeriodicElementTwo {
  address: string;
  glass: boolean;
  metal: boolean;
  oil: boolean;
  textile:boolean;
  geolocation:{lat:string;long:string};
}


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
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

  recycleUnit: PeriodicElementTwo[] = [
    {
    address:'Bahnhofquai vis-à-vis 5, 8001',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3755132',long:'8.5388961'}
    },
    {
    address:'Gessnerallee vis-à-vis 36, 8001',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3766852',long:'8.534464'}
    },
    {
    address:'Hirschengraben 13, 8001',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3716041',long:'8.5443133'}
    },
    {
    address:'Am Schanzengraben 25 / Gartenstrasse, 8002',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3689848',long:'8.5323419'}
    },
    {
    address:'Brunaustrasse 6 / Seestrasse, 8002',
    glass:true,
    metal:true,
    oil:true,
    textile:true,
    geolocation:{lat:'47.356558',long:'8.5291725'},
    },
    {
    address:'Grütlistrasse 4, 8002',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3639591',long:'8.527475'}
    },
    {
    address:'Klopstockstrasse vis-à-vis 23, 8002',
    glass:true,
    metal:true,
    oil:true,
    textile:true,
    geolocation:{lat:'47.3621662',long:'8.5234812'},
    },
    {
    address:'Aegertenstrasse vis-à-vis 16(hindernisfrei), 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3688621',long:'8.5208746'},
    },
    {address:'Bertastrasse 59(hindernisfrei), 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3727905',long:'8.5092499'},
    },
    {
    address:'Fritschistrasse vis-à-vis 11, 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3759192',long:'8.5102627'},
    },
    {
    address:'Idaplatz 4(hindernisfrei), 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3741004',long:'8.5116154'},
    },
    {
    address:'Letzigraben 26 / Ecke Edelweissstrasse, 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3804216',long:'8.4990924'},
    },
    {
    address:'Meinrad-Lienert-Strasse vis-à-vis 1 / Seebahnstrasse, 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3740804',long:'8.5162391'},
    },
    {
    address:'Schlossgasse vis-à-vis 22 / Steinstrasse, 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3689345',long:'8.5165983'}
    },
    {
    address:'Seebahnstrasse 89, vis-à-vis Post, 8003',
    glass:true,
    metal:true,
    oil:false,
    textile:true,
    geolocation:{lat:'47.3713443',long:'8.519928'},
    },
    {
    address:'Zentralstrasse vis-à-vis 76, 8003',
    glass:true,
    metal:true,
    oil:true,
    textile:true,
    geolocation:{lat:'47.3733016',long:'8.515351'},
    },
    {
    address:'Albisriederplatz 6 / Einfahrt Hardstrasse(hindernisfrei), 8004',
    glass:true,
    metal:true,
    oil:true,
    textile:true,
    geolocation:{lat:'47.3787878',long:'8.5074885'},
    },
    {
    address:'Bullingerstrasse 41(hindernisfrei), 8004',
    glass:true,
    metal:false,
    oil:false,
    textile:false,
    geolocation:{lat:'47.3806954',long:'8.5085508'},
    },
    {
    address:'Erismannstrasse 31(hindernisfrei), 8004',
    glass:true,
    metal:true,
    oil:true,
    textile:false,
    geolocation:{lat:'47.3787633',long:'8.5159238'},
    },
    {
    address:'Hohlstrasse vis-à-vis 90, 8004',
    glass:true,
    metal:true,
    oil:false,
    textile:false,
    geolocation:{lat:'47.3786913',long:'8.5209575'},
    },
    ];

  displayedColumnsTwo: string[] = ['address', 'glass', 'metal', 'oil', 'textile', 'geolocation'];
  dataSourceTwo = new MatTableDataSource<PeriodicElementTwo>(this.recycleUnit);

  greenIcon = L.icon({
      iconUrl: '../../../assets/img/leaf-green.png',
      shadowUrl: '../../../assets/img/leaf-shadow.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  yellowIcon = L.icon({
    iconUrl: '../../../assets/img/leaf-orange.png',
    shadowUrl: '../../../assets/img/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
redIcon = L.icon({
  iconUrl: '../../../assets/img/leaf-red.png',
  shadowUrl: '../../../assets/img/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
brownIcon = L.icon({
  iconUrl: '../../../assets/img/leaf-brown.png',
  shadowUrl: '../../../assets/img/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
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
  this.dataSourceTwo.paginator = this.paginator;
  const map = L.map('map').setView([47.3786913, 8.5209575], 14);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'  
  }).addTo(map);

  // L.marker([47.3775284, 8.4543347], {icon: this.greenIcon}).addTo(map);

  // 47.3775284,8.4543347

  for(let i = 0; i<this.recycleUnit.length;i++){
    debugger;
    if(this.recycleUnit[i].glass === true){
      L.marker([Number(this.recycleUnit[i].geolocation.lat), Number(this.recycleUnit[i].geolocation.long)], {icon: this.brownIcon}).addTo(map);
    }
    if(this.recycleUnit[i].metal === true){
      L.marker([Number(this.recycleUnit[i].geolocation.lat), Number(this.recycleUnit[i].geolocation.long)], {icon: this.greenIcon}).addTo(map);
    }
    if(this.recycleUnit[i].oil === true){
      L.marker([Number(this.recycleUnit[i].geolocation.lat), Number(this.recycleUnit[i].geolocation.long)], {icon: this.yellowIcon}).addTo(map);
    }
    if(this.recycleUnit[i].textile === true){
      L.marker([Number(this.recycleUnit[i].geolocation.lat), Number(this.recycleUnit[i].geolocation.long)], {icon: this.redIcon}).addTo(map);
    }
  }

}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

  
}
