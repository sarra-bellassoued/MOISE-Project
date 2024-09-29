import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { PieceComptableComponent } from './components/piece-comptable/piece-comptable.component';
import { JournalComptableComponent } from './components/journal-comptable/journal-comptable.component';
import { CompteComptableComponent } from './components/compte-comptable/compte-comptable.component';
import { LigneComptableComponent } from './components/ligne-comptable/ligne-comptable.component';
import { PieceComptableAfficheComponent } from './components/piece-comptable-affiche/piece-comptable-affiche.component';
import { JournalComptableAfficheComponent } from './components/journal-comptable-affiche/journal-comptable-affiche.component';
import { ComptesComptableAfficheComponent } from './components/comptes-comptable-affiche/comptes-comptable-affiche.component';
import { EditPieceComptableComponent } from './edit-piece-comptable/edit-piece-comptable.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PieceComptableComponent,
    JournalComptableComponent,
    CompteComptableComponent,
    LigneComptableComponent,
   PieceComptableAfficheComponent,
   JournalComptableAfficheComponent,
   ComptesComptableAfficheComponent,
   EditPieceComptableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    NgbModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatInputModule,
    CommonModule,
   

 
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditPieceComptableComponent],
})
export class AppModule { }
