import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PieceComptableComponent } from './components/piece-comptable/piece-comptable.component';
import { JournalComptableComponent } from './components/journal-comptable/journal-comptable.component';
import { CompteComptableComponent } from './components/compte-comptable/compte-comptable.component';
import { PieceComptableAfficheComponent } from './components/piece-comptable-affiche/piece-comptable-affiche.component';
import { JournalComptableAfficheComponent } from './components/journal-comptable-affiche/journal-comptable-affiche.component';
import { ComptesComptableAfficheComponent } from './components/comptes-comptable-affiche/comptes-comptable-affiche.component';

const routes: Routes = [
  { path: 'pieces', component: PieceComptableComponent },
  { path: 'journals', component: JournalComptableComponent },
  { path: 'comptes', component: CompteComptableComponent },
  { path: 'affiche', component: PieceComptableAfficheComponent },
  { path: 'journal', component: JournalComptableAfficheComponent },
  { path: 'compteee', component: ComptesComptableAfficheComponent },
  { path: '', redirectTo: '/pieces', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
