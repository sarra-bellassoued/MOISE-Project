import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder

@Component({
  selector: 'app-res-coll-form',
  templateUrl: './res-coll-form.component.html',
  styleUrls: ['./res-coll-form.component.css']
})
export class ResCollFormComponent {
  @Input() title: string = ''; // Propriété title pour afficher le titre du formulaire
  meetingDate: Date = new Date();

  constructor() {}

  closeModal(): void {
    // Définissez la méthode closeModal si elle est nécessaire
  }

  submitForm(): void {
    // Exemple de validation du formulaire avant la soumission
    if (this.meetingDate) {
      // Effectuez ici les actions nécessaires après la soumission du formulaire
      console.log('Date de réunion sélectionnée :', this.meetingDate);
      
      // Réinitialisez le formulaire après la soumission si nécessaire
      // Par exemple, réinitialisez la valeur de meetingDate à une nouvelle date
      this.meetingDate = new Date();
      
      // Fermez le modal ou effectuez d'autres actions après la soumission du formulaire
      this.closeModal();
    } else {
      // Gérez le cas où la date de réunion n'a pas été sélectionnée
      console.log('Veuillez sélectionner une date de réunion.');
      // Vous pouvez afficher un message d'erreur ou prendre d'autres mesures nécessaires
    }
  }
  
}
