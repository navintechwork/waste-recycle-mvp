import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { Observable, startWith,map } from 'rxjs';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import * as employeeData from "./geoLocation.json";
import { JsonService } from 'src/app/shared/service/common.service';

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


export interface User {
  address: string;
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
  myControl = new FormControl<string | User>('');
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

  geoLocation:any = [
    {
       "address":"Bahnhofquai vis-à-vis 5, 8001",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3755132",
          "long":"8.5388961"
       }
    },
    {
       "address":"Gessnerallee vis-à-vis 36, 8001",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3766852",
          "long":"8.534464"
       }
    },
    {
       "address":"Hirschengraben 13, 8001",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3716041",
          "long":"8.5443133"
       }
    },
    {
       "address":"Am Schanzengraben 25 / Gartenstrasse, 8002",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3689848",
          "long":"8.5323419"
       }
    },
    {
       "address":"Brunaustrasse 6 / Seestrasse, 8002",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.356558",
          "long":"8.5291725"
       }
    },
    {
       "address":"Grütlistrasse 4, 8002",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3639591",
          "long":"8.527475"
       }
    },
    {
       "address":"Klopstockstrasse vis-à-vis 23, 8002",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3621662",
          "long":"8.5234812"
       }
    },
    {
       "address":"Aegertenstrasse vis-à-vis 16(hindernisfrei), 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3688621",
          "long":"8.5208746"
       }
    },
    {
       "address":"Bertastrasse 59(hindernisfrei), 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3727905",
          "long":"8.5092499"
       }
    },
    {
       "address":"Fritschistrasse vis-à-vis 11, 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3759192",
          "long":"8.5102627"
       }
    },
    {
       "address":"Idaplatz 4(hindernisfrei), 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3741004",
          "long":"8.5116154"
       }
    },
    {
       "address":"Letzigraben 26 / Ecke Edelweissstrasse, 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3804216",
          "long":"8.4990924"
       }
    },
    {
       "address":"Meinrad-Lienert-Strasse vis-à-vis 1 / Seebahnstrasse, 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3740804",
          "long":"8.5162391"
       }
    },
    {
       "address":"Schlossgasse vis-à-vis 22 / Steinstrasse, 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3689345",
          "long":"8.5165983"
       }
    },
    {
       "address":"Seebahnstrasse 89, vis-à-vis Post, 8003",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3713443",
          "long":"8.519928"
       }
    },
    {
       "address":"Zentralstrasse vis-à-vis 76, 8003",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3733016",
          "long":"8.515351"
       }
    },
    {
       "address":"Albisriederplatz 6 / Einfahrt Hardstrasse(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3787878",
          "long":"8.5074885"
       }
    },
    {
       "address":"Bullingerstrasse 41(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3806954",
          "long":"8.5085508"
       }
    },
    {
       "address":"Erismannstrasse 31(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3787633",
          "long":"8.5159238"
       }
    },
    {
       "address":"Hohlstrasse vis-à-vis 90, 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3786913",
          "long":"8.5209575"
       }
    },
    {
       "address":"Kanzleistrasse 137 / Herman-Greulich-Strasse, 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3772497",
          "long":"8.5193288"
       }
    },
    {
       "address":"Kochstrasse 21, 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3781564",
          "long":"8.5121889"
       }
    },
    {
       "address":"Lagerstrasse 47(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3779968",
          "long":"8.5295124"
       }
    },
    {
       "address":"Molkenstrasse vis-à-vis 5(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3762461",
          "long":"8.5247554"
       }
    },
    {
       "address":"St. Jakobstrasse vis-à-vis 29 / Lutherstrasse(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3745217",
          "long":"8.5262611"
       }
    },
    {
       "address":"Seebahnstrasse 171 / Lochergut,8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3756158",
          "long":"8.515536"
       }
    },
    {
       "address":"Tellstrasse vis-à-vis 31 / Militärstrasse(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3792007",
          "long":"8.5265805"
       }
    },
    {
       "address":"Weberstrasse 3(hindernisfrei), 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3700601",
          "long":"8.5261562"
       }
    },
    {
       "address":"Zimmerlistrasse vis-à-vis 4, 8004",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.38388",
          "long":"8.5077917"
       }
    },
    {
       "address":"Geroldstrasse (Kreisel Gerold-/Hardstrasse), 8005",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.385864",
          "long":"8.5172059"
       }
    },
    {
       "address":"Hardturmstrasse 126 / Hardturmweg(hindernisfrei), 8005",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3935736",
          "long":"8.5084171"
       }
    },
    {
       "address":"Heinrichstrasse 200 (Provisorium), 8005",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3878211",
          "long":"8.5227741"
       }
    },
    {
       "address":"Josefstrasse 92(hindernisfrei), 8005",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3832046",
          "long":"8.5283887"
       }
    },
    {
       "address":"Konradstrasse 79(hindernisfrei), 8005",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3822315",
          "long":"8.5303399"
       }
    },
    {
       "address":"Röntgenstrasse 39, 8005",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3840296",
          "long":"8.5243513"
       }
    },
    {
       "address":"Sportweg 39 / Wendeplatz, 8005",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3922069",
          "long":"8.5038852"
       }
    },
    {
       "address":"Kronenstrasse 19 / Kehrplatz(hindernisfrei) , 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3872212",
          "long":"8.5317185"
       }
    },
    {
       "address":"Langmauerstrasse 90, 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3934118",
          "long":"8.541988"
       }
    },
    {
       "address":"Letzistrasse vis-à-vis 50, 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3923988",
          "long":"8.5475575"
       }
    },
    {
       "address":"Ottikerstrasse vis-à-vis 61 / Rigi-Platz(hindernisfrei), 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3852019",
          "long":"8.5452101"
       }
    },
    {
       "address":"Scheuchzerstrasse vis-à-vis 98(hindernisfrei), 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.388781",
          "long":"8.5416751"
       }
    },
    {
       "address":"Sonneggstrasse 26, 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3800366",
          "long":"8.5441208"
       }
    },
    {
       "address":"Sonneggstrasse vis-à-vis 84 / Weinbergstrasse, 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3830821",
          "long":"8.5417198"
       }
    },
    {
       "address":"Vogelsangstrasse vis-à-vis 33 / Gladbachstrasse, 8006",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3835418",
          "long":"8.5463222"
       }
    },
    {
       "address":"Weinbergstrasse 131 / Röslistrasse, 8006",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3882181",
          "long":"8.5378907"
       }
    },
    {
       "address":"Bleulerstrasse 70, 8008",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3484617",
          "long":"8.5681225"
       }
    },
    {
       "address":"Hammerstrasse vis-à-vis 43(hindernisfrei), 8008",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3605314",
          "long":"8.5584185"
       }
    },
    {
       "address":"Mittelstrasse 6 / Klausstrasse, 8008",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3585495",
          "long":"8.5485413"
       }
    },
    {
       "address":"Mühlebachstrasse 35, 8008",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3646655",
          "long":"8.5484057"
       }
    },
    {
       "address":"Mühlebachstrasse 200, 8008",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3546948",
          "long":"8.5575821"
       }
    },
    {
       "address":"Riesbachstrasse 61 / Höschgasse, 8008",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3582515",
          "long":"8.5529224"
       }
    },
    {
       "address":"Seefeldstrasse 152, 8008",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3567855",
          "long":"8.5524813"
       }
    },
    {
       "address":"Seefeldstrasse 233, 8008",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.351057",
          "long":"8.5588988"
       }
    },
    {
       "address":"Bergstrasse vis-à-vis 142 / Jupitersteig, 8032",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.365902",
          "long":"8.5627724"
       }
    },
    {
       "address":"Dolderstrasse vis-à-vis 39 / Bungertweg, 8032",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3711027",
          "long":"8.5575348"
       }
    },
    {
       "address":"Forchstrasse 261 / Burgwies(hindernisfrei), 8032",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3584465",
          "long":"8.5691205"
       }
    },
    {
       "address":"Merkurstrasse 4, 8032",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.3657708",
          "long":"8.5503882"
       }
    },
    {
       "address":"Merkurstrasse 4, 8032",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.2775874",
          "long":"8.4461706"
       }
    },
    {
       "address":"Hönggerstrasse vis-à-vis 41 / Leutholdstrasse, 8037",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3915253",
          "long":"8.5226025"
       }
    },
    {
       "address":"Im Waidegg 1 / Bucheggplatz, 8037",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3984598",
          "long":"8.5295166"
       }
    },
    {
       "address":"Lehenstrasse 65, 8037",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3963578",
          "long":"8.5188806"
       }
    },
    {
       "address":"Rebbergstrasse vis-à-vis 19, 8037",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3980444",
          "long":"8.5136137"
       }
    },
    {
       "address":"Rosengartenstrasse 10, unter Rosengartenbrücke, 8037",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3938519",
          "long":"8.5225943"
       }
    },
    {
       "address":"Rousseaustrasse vis-à-vis 101, 8037",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3927234",
          "long":"8.5270813"
       }
    },
    {
       "address":"Wasserwerkstrasse 109, Parkplatz, 8037",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3883798",
          "long":"8.5288322"
       }
    },
    {
       "address":"Weihersteig 7 / Wibichstrasse, bei Kirche, 8037",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3970269",
          "long":"8.5244141"
       }
    },
    {
       "address":"Alte Kalchbühlstrasse 15, bei Coop(hindernisfrei), 8038",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.339937",
          "long":"8.5281844"
       }
    },
    {
       "address":"Etzelstrasse vis-à-vis 6(hindernisfrei), 8038",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3444245",
          "long":"8.528131"
       }
    },
    {
       "address":"Morgentalstrasse vis-à-vis 73, 8038",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3432385",
          "long":"8.5217068"
       }
    },
    {
       "address":"Paradiesstrasse 45, Parkplatz Krankenheim Entlisberg, 8038",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3345139",
          "long":"8.5244559"
       }
    },
    {
       "address":"Salomon-Vögelin-Strasse 3, 8038",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3468379",
          "long":"8.5237248"
       }
    },
    {
       "address":"Tannenrauchstrasse 116 / Rainfussweg(hindernisfrei), 8038",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3426774",
          "long":"8.5272881"
       }
    },
    {
       "address":"Leimbachstrasse 160 / Klebestrasse, 8041",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3271274",
          "long":"8.5102898"
       }
    },
    {
       "address":"Maneggpromenade vis-à-vis 88(hindernisfrei), 8041",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3329593",
          "long":"8.511419"
       }
    },
    {
       "address":"Tuchmacherstrasse 18 / Green-City(hindernisfrei) , 8041",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3411911",
          "long":"8.5181772"
       }
    },
    {
       "address":"Moussonstrasse 22, 8044",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3762721",
          "long":"8.5525686"
       }
    },
    {
       "address":"Spyristrasse 20 / Spyriplatz, 8044",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3823372",
          "long":"8.5497281"
       }
    },
    {
       "address":"Zürichbergstrasse vis-à-vis 80 / Vorderberg, 8044",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3765261",
          "long":"8.557768"
       }
    },
    {
       "address":"Zürichbergstrasse 196 / Forrenweidstrasse, Parkplatz Zoo, 8044",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3834245",
          "long":"8.5711003"
       }
    },
    {
       "address":"Arbentalstrasse 329, 8045",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3596",
          "long":"8.5059045"
       }
    },
    {
       "address":"Bachtobelstrasse vis-à-vis 10 / Uetlibergstrasse, 8045",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.361478",
          "long":"8.5143088"
       }
    },
    {
       "address":"Giesshübelstrasse vis-à-vis 106 / Brunaupark, 8045",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3588597",
          "long":"8.5148512"
       }
    },
    {
       "address":"Hegianwandweg 75 / Adolf-Lüchinger-Strasse, 8045",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3558468",
          "long":"8.5063676"
       }
    },
    {
       "address":"Schweighofstrasse 7, 8045",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3544909",
          "long":"8.5081175"
       }
    },
    {
       "address":"Fronwaldstrasse vis-à-vis 94, 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.4212747",
          "long":"8.5104863"
       }
    },
    {
       "address":"Georg-Kempf-Strasse 53, 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4207468",
          "long":"8.4964211"
       }
    },
    {
       "address":"Glaubtenstrasse 98, 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4120325",
          "long":"8.5106236"
       }
    },
    {
       "address":"Lerchenhalde vis-à-vis 53 / Schulhaus Schauenberg, 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4146464",
          "long":"8.5065415"
       }
    },
    {
       "address":"Mühlackerstrasse 122 / Buswendeschleife, 8046",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":false,
       "geolocation":{
          "lat":"47.4259395",
          "long":"8.4949168"
       }
    },
    {
       "address":"Riedenhaldenstrasse 280 / Bahnhof Affoltern(hindernisfrei), 8046",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4208217",
          "long":"8.5064569"
       }
    },
    {
       "address":"Schwandenholzstrasse vis-à-vis 194 / Buswendeschlaufe(hindernisfrei), 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4240471",
          "long":"8.5206106"
       }
    },
    {
       "address":"Wehntalerstrasse 440 / Neuwiesenstrasse(hindernisfrei), 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4158238",
          "long":"8.5111328"
       }
    },
    {
       "address":"Wehntalerstrasse 597 / alte Busschlaufe, 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4210614",
          "long":"8.4990484"
       }
    },
    {
       "address":"Wolfswinkel vis-à-vis 41(hindernisfrei), 8046",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.4252024",
          "long":"8.5073892"
       }
    },
    {
       "address":"Albisriederstrasse 334 / Albisriederhaus(hindernisfrei), 8047",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3761942",
          "long":"8.4845031"
       }
    },
    {
       "address":"Letzigraben 104, 8047",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3775832",
          "long":"8.4953887"
       }
    },
    {
       "address":"Mühlezelgstrasse 1a / Letzigraben(hindernisfrei) , 8047",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3755659",
          "long":"8.4936251"
       }
    },
    {
       "address":"Triemlistrasse 22 / Hagenbuchrain, 8047",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3732983",
          "long":"8.4817627"
       }
    },
    {
       "address":"Altstetterstrasse 162 / Pfarrhausstrasse, 8048",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.3869042",
          "long":"8.4834325"
       }
    },
    {
       "address":"Dachslernstrasse 9 / Werkhof(hindernisfrei), 8048",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3881611",
          "long":"8.478192"
       }
    },
    {
       "address":"Ernst-Zöbeli-Strasse vis-à-vis 4, 8048",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3920288",
          "long":"8.4712769"
       }
    },
    {
       "address":"Eugen-Huber-Strasse 4, 8048",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3849653",
          "long":"8.4841362"
       }
    },
    {
       "address":"Hardgutstrasse vis-à-vis 9, 8048",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3852883",
          "long":"8.5020526"
       }
    },
    {
       "address":"Hohlstrasse 665 / Werdhölzlistrasse , 8048",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3914696",
          "long":"8.4787"
       }
    },
    {
       "address":"Loogartenstrasse 37 / Schulhaus, 8048",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3892368",
          "long":"8.4707507"
       }
    },
    {
       "address":"Rautistrasse 77 / Freilager, 8048",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3818571",
          "long":"8.4861732"
       }
    },
    {
       "address":"Rautistrasse 345, 8048",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3867433",
          "long":"8.4700987"
       }
    },
    {
       "address":"Appenzellerstrasse vis-à-vis 73, 8049",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4012987",
          "long":"8.5043914"
       }
    },
    {
       "address":"Geeringstrasse 95 / Kehrplatz, 8049",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4147696",
          "long":"8.4734574"
       }
    },
    {
       "address":"Im Stelzenacker 11 / Kehrplatz, 8049",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4161233",
          "long":"8.4804489"
       }
    },
    {
       "address":"Paul-Feyerabend-Hof 3 / ETH, 8049",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4071619",
          "long":"8.5032832"
       }
    },
    {
       "address":"Riedhofstrasse 9 / Wieslergasse(hindernisfrei), 8049",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4036586",
          "long":"8.4932033"
       }
    },
    {
       "address":"Riedhofstrasse vis-à-vis 104 / Schulhaus, 8049",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.405543",
          "long":"8.4881812"
       }
    },
    {
       "address":"Riedhofstrasse vis-à-vis 378(hindernisfrei), 8049",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.4099816",
          "long":"8.4787725"
       }
    },
    {
       "address":"Werdinsel vis-à-vis 1 Voraussichtlich ab November 2023 wieder in Betrieb, 8049",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3993975",
          "long":"8.4864299"
       }
    },
    {
       "address":"Baumackerstrasse vis-à-vis 28 / Schulstrasse(hindernisfrei), 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4089648",
          "long":"8.5419874"
       }
    },
    {
       "address":"Binzmühlestrasse 210(hindernisfrei), 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4140786",
          "long":"8.5287639"
       }
    },
    {
       "address":"Dörflistrasse vis-à-vis 90 / Parkplatz Stadthof 11, 8050",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4092955",
          "long":"8.5481504"
       }
    },
    {
       "address":"Hagenholzstrasse 110(hindernisfrei), 8050",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4151429",
          "long":"8.5608169"
       }
    },
    {
       "address":"Neunbrunnenstrasse 60(hindernisfrei), 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.417217",
          "long":"8.5347704"
       }
    },
    {
       "address":"Oleanderstrasse 1 / Affolternstrasse, 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4101643",
          "long":"8.5370868"
       }
    },
    {
       "address":"Opfikonstrasse 18 / Kehrplatz, 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4137786",
          "long":"8.5696446"
       }
    },
    {
       "address":"Regensbergstrasse vis-à-vis 30, 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4048722",
          "long":"8.5516503"
       }
    },
    {
       "address":"Tramstrasse 55 / Kirchenackerweg, 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4085322",
          "long":"8.5493434"
       }
    },
    {
       "address":"Tramstrasse vis-à-vis 208 / Schulhaus Saatlen, 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4084213",
          "long":"8.5596204"
       }
    },
    {
       "address":"Wattstrasse vis-à-vis 6, 8050",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4132023",
          "long":"8.5430752"
       }
    },
    {
       "address":"Bocklerstrasse vis-à-vis 14 / Parkplatz, 8051",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4034654",
          "long":"8.567484"
       }
    },
    {
       "address":"Dübendorfstrasse 350 / Parkplatz Mattenhof, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3981119",
          "long":"8.589256"
       }
    },
    {
       "address":"Helen-Keller-Strasse 6 / Altwiesenstrasse, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4000851",
          "long":"8.5905126"
       }
    },
    {
       "address":"Hirzenbachstrasse 40(hindernisfrei) , 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4034817",
          "long":"8.58674"
       }
    },
    {
       "address":"Im Altried vis-à-vis 3, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4050114",
          "long":"8.5884346"
       }
    },
    {
       "address":"Kronwiesenstrasse 29, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4041908",
          "long":"8.5758258"
       }
    },
    {
       "address":"Luchswiesenstrasse 25, 8051",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4023488",
          "long":"8.5828362"
       }
    },
    {
       "address":"Luegislandstrasse 173, 8051",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4095861",
          "long":"8.56864"
       }
    },
    {
       "address":"Ueberlandstrasse 14 / Waldgarten, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4041532",
          "long":"8.5545707"
       }
    },
    {
       "address":"Ueberlandstrasse 381, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4078167",
          "long":"8.5825283"
       }
    },
    {
       "address":"Ueberlandstrasse 409, 8051",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4071098",
          "long":"8.5850031"
       }
    },
    {
       "address":"Bahnhaldenstrasse 17 / Bahnhof Seebach(hindernisfrei), 8052",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4187879",
          "long":"8.5420787"
       }
    },
    {
       "address":"Birchstrasse vis-à-vis 408, 8052",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4233222",
          "long":"8.5370784"
       }
    },
    {
       "address":"Hertensteinstrasse vis-à-vis 20(hindernisfrei) , 8052",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.4245785",
          "long":"8.5414574"
       }
    },
    {
       "address":"Köschenrütistrasse 72(hindernisfrei), 8052",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.4256457",
          "long":"8.5344633"
       }
    },
    {
       "address":"Schaffhauserstrasse vis-à-vis 502 / Parkplatz , 8052",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4215375",
          "long":"8.5477624"
       }
    },
    {
       "address":"Stiglenstrasse 50 / Parkplatz, 8052",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4278865",
          "long":"8.5453639"
       }
    },
    {
       "address":"Drusbergstrasse 135 / Witikonerstrasse 136(hindernisfrei), 8053",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.357716",
          "long":"8.5809295"
       }
    },
    {
       "address":"Katzenschwanzstrasse vis-à-vis 28 / Parkplatz, 8053",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3617521",
          "long":"8.5951584"
       }
    },
    {
       "address":"Trichtenhausenstrasse 93 / Kienastenwiesweg, 8053",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3556672",
          "long":"8.5979456"
       }
    },
    {
       "address":"Waserstrasse vis-à-vis 36 / Eierbrechtstrasse, 8053",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3582618",
          "long":"8.5752258"
       }
    },
    {
       "address":"Witikonerstrasse 390 / Parkplatz(hindernisfrei) , 8053",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3592233",
          "long":"8.590571"
       }
    },
    {
       "address":"Berneggweg vis-à-vis 8(hindernisfrei), 8055",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3667371",
          "long":"8.515048"
       }
    },
    {
       "address":"Birmensdorferstrasse 432(hindernisfrei), 8055",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3691475",
          "long":"8.498203"
       }
    },
    {
       "address":"Birmensdorferstrasse 488 / Parkplatz, 8055",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.368569",
          "long":"8.4937525"
       }
    },
    {
       "address":"Gutstrasse 149, 8055",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3731964",
          "long":"8.5007274"
       }
    },
    {
       "address":"Friesenbergstrasse 193 / Bolistrasse, 8055",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3631482",
          "long":"8.5036863"
       }
    },
    {
       "address":"Schweighofstrasse 357 / Paul-Clairmont-Strasse, 8055",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3655214",
          "long":"8.4996386"
       }
    },
    {
       "address":"Talwiesenstrasse vis-à-vis 118, 8055",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3674569",
          "long":"8.5103843"
       }
    },
    {
       "address":"Talwiesenstrasse 169 / Birmensdorferstrasse(hindernisfrei), 8055",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3694319",
          "long":"8.507605"
       }
    },
    {
       "address":"Anna-Heer-Strasse vis-à-vis 14(hindernisfrei), 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3997167",
          "long":"8.5388788"
       }
    },
    {
       "address":"Hoffeld vis-à-vis 46 / Birchstrasse(hindernisfrei), 8057",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.4068028",
          "long":"8.5328579"
       }
    },
    {
       "address":"Käferholzstrasse 44 / Parkplatz, 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4020329",
          "long":"8.5297338"
       }
    },
    {
       "address":"Milchbuckstrasse 2 / Schaffhauserstrasse, 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3951446",
          "long":"8.537583"
       }
    },
    {
       "address":"Mimosenstrasse vis-à-vis 1 / Schaffhauserstrasse, 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4023932",
          "long":"8.5435509"
       }
    },
    {
       "address":"Ringstrasse 72 / Ulmenweg, 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.4050708",
          "long":"8.5376958"
       }
    },
    {
       "address":"Viktoriastrasse 34, 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.404643",
          "long":"8.5485108"
       }
    },
    {
       "address":"Zeppelinstrasse 43 / Spelteriniweg, 8057",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":false,
       "geolocation":{
          "lat":"47.3955746",
          "long":"8.5341083"
       }
    },
    {
       "address":"Bändlistrasse 94 / vor Recyclinghof(hindernisfrei), 8064",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3978918",
          "long":"8.4786552"
       }
    },
    {
       "address":"Grünauring vis-à-vis 25, 8064",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3959057",
          "long":"8.4859291"
       }
    },
    {
       "address":"Grünauring vis-à-vis 37 / Tüffenwies, 8064",
       "glass":true,
       "metal":true,
       "oil":false,
       "textile":true,
       "geolocation":{
          "lat":"47.3963615",
          "long":"8.4837079"
       }
    },
    {
       "address":"Hardhof 9 / bei Wasserversorgung / unter Europabrücke, 8064",
       "glass":true,
       "metal":true,
       "oil":true,
       "textile":true,
       "geolocation":{
          "lat":"47.3978666",
          "long":"8.4937874"
       }
    }
 ];

  displayedColumnsTwo: string[] = ['address', 'glass', 'metal', 'oil', 'textile', 'geolocation'];
  dataSourceTwo = new MatTableDataSource<PeriodicElementTwo>(this.geoLocation);

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
blueIcon = L.icon({
  iconUrl: '../../../assets/img/leaf-blue.png',
  shadowUrl: '../../../assets/img/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  filteredOptions!: Observable<any[]>;
  favoriteSeason!: string;
  seasons: string[] = ['Glass', 'Metal', 'Oil', 'Textile'];
  jsonArray:any = [];
  markers:any;
  searchtext = '';
  selectedAutoComplete = '';

  constructor(private json: JsonService) { 
    // json.getData(')').subscribe((result)=> {
    //   console.log('Result---->',result)
    // });
  }

  ngOnInit() {
    // this.map = L.map('map').setView([51.505, -0.09], 13);
    // this.jsonArray = employeeData;
    // console.log('Length of json--->',employeeData)
    // console.log('Length of json--->',employeeData.length)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value:any) => {
        // this._filter(value || '')
        const address = typeof value === 'string' ? value : value?.address;
        return address ? this._filter(address as string) : this.geoLocation.slice();
      }
      
      ),
    );
    console.log('filteredoption--->',this.filteredOptions);
  }
  ngAfterViewInit():void
{
  this.dataSourceTwo.paginator = this.paginator;
  this.map = L.map('map').setView([47.3786913, 8.5209575], 14);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);

  this.markers = new L.FeatureGroup();

  // L.marker([47.3775284, 8.4543347], {icon: this.greenIcon}).addTo(map);

  // 47.3775284,8.4543347

  for(let i = 0; i<this.geoLocation.length;i++){
    let tempIcon:any;
    let tempRecycleUnitCount = 0;

    if(this.geoLocation[i].glass){tempRecycleUnitCount++}
    if(this.geoLocation[i].metal){tempRecycleUnitCount++}
    if(this.geoLocation[i].oil){tempRecycleUnitCount++}
    if(this.geoLocation[i].textile){tempRecycleUnitCount++}

    if(tempRecycleUnitCount === 4){tempIcon = this.redIcon}
    if(tempRecycleUnitCount === 3){tempIcon = this.yellowIcon}
    if(tempRecycleUnitCount === 2){tempIcon = this.blueIcon}
    let popuptext = `<b>Address : ${this.geoLocation[i].address}</b><br/><b>Recycle Option : ${this.geoLocation[i].glass ? 'Glass' : ''} ${this.geoLocation[i].metal ? 'Metail' : ''} ${this.geoLocation[i].oil ? 'Oil' : ''} ${this.geoLocation[i].textile ? 'Textile' : ''}</b>`;
    
    let marker = L.marker([Number(this.geoLocation[i].geolocation.lat), Number(this.geoLocation[i].geolocation.long)], {icon: tempIcon}).bindPopup(popuptext);

    this.markers.addLayer(marker);
  }

  this.map.addLayer(this.markers);

}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.geoLocation.filter((option:any) => option.address.toLowerCase().includes(filterValue));
}

onSelectionChange(event:any){
  console.log('Event--->',event);
  let searchtext = event.option.value;
  this.searchtext = event.option.value;

  // this.geoLocation.filter((element:any) => {
  //   for (var property in element) {
  //       if (element.hasOwnProperty(property)) {
  //           if(element[property] == searchtext) {
  //               // return true;

  //           }
  //       }
  //   }
  // });
}

searchRecycleUnit(){
  this.geoLocation.filter((element:any) => {
    for (var property in element) {
        if (element.hasOwnProperty(property)) {
            if(element[property] == this.searchtext) {
                // return true;
              this.map.removeLayer(this.markers);
              console.log('Element selected-->',element);

              this.markers = new L.FeatureGroup();
              let popuptext = `<b>Address : ${element.address}</b><br/><b>Recycle Option : ${element.glass ? 'Glass' : ''} ${element.metal ? 'Metail' : ''} ${element.oil ? 'Oil' : ''} ${element.textile ? 'Textile' : ''}</b>`;
              let marker = L.marker([Number(element.geolocation.lat), Number(element.geolocation.long)], {icon: this.greenIcon}).bindPopup(popuptext);

              this.markers.addLayer(marker);
              this.map.addLayer(this.markers);

              this.map.setView([Number(element.geolocation.lat), Number(element.geolocation.long)], 14)
              this.selectedAutoComplete = '';

              let tempArray:any = [];
              tempArray.push(element);
              this.dataSourceTwo = new MatTableDataSource<PeriodicElementTwo>(tempArray);
              this.dataSourceTwo.paginator = this.paginator;
            }
        }
    }
  });
}

showAllRecycleUnit(){
  this.map.removeLayer(this.markers);
  this.markers = new L.FeatureGroup();

  for(let i = 0; i<this.geoLocation.length;i++){
    let tempIcon:any;
    let tempRecycleUnitCount = 0;

    if(this.geoLocation[i].glass){tempRecycleUnitCount++}
    if(this.geoLocation[i].metal){tempRecycleUnitCount++}
    if(this.geoLocation[i].oil){tempRecycleUnitCount++}
    if(this.geoLocation[i].textile){tempRecycleUnitCount++}

    if(tempRecycleUnitCount === 4){tempIcon = this.redIcon}
    if(tempRecycleUnitCount === 3){tempIcon = this.yellowIcon}
    if(tempRecycleUnitCount === 2){tempIcon = this.blueIcon}
    let popuptext = `<b>Address : ${this.geoLocation[i].address}</b><br/><b>Recycle Option : ${this.geoLocation[i].glass ? 'Glass' : ''} ${this.geoLocation[i].metal ? 'Metail' : ''} ${this.geoLocation[i].oil ? 'Oil' : ''} ${this.geoLocation[i].textile ? 'Textile' : ''}</b>`;
    
    let marker = L.marker([Number(this.geoLocation[i].geolocation.lat), Number(this.geoLocation[i].geolocation.long)], {icon: tempIcon}).bindPopup(popuptext);

    this.markers.addLayer(marker);
  }
  this.map.addLayer(this.markers);
  this.dataSourceTwo = new MatTableDataSource<PeriodicElementTwo>(this.geoLocation);
  this.dataSourceTwo.paginator = this.paginator;
}

  
}
