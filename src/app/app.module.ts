import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModule } from './layouts/default/default.module';
import {MatTabsModule} from '@angular/material/tabs';
import { HowToRecycleComponent } from './modules/how-to-recycle/how-to-recycle.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AboutUsComponent,
    HowToRecycleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    DefaultModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[MatTabsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
