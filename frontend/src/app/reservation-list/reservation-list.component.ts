import { Component, OnInit } from '@angular/core';
import { ReservationCollocationService } from '../service/ReservationCollocation.service';
import { ReservationCollocation } from '../service/ReservationCollocation.interface';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  reservationcollocations: any[] = [];
  newreservationcollocation: ReservationCollocation = {} as ReservationCollocation; // Nouvelle collocation à ajouter
  selectedCollocation: ReservationCollocation | undefined; // Collocation sélectionnée pour la mise à jour

  constructor(private collocationService: ReservationCollocationService, private snackBar: MatSnackBar, private router : Router) {
    //console.log('Location injected:', this.location);
  }

  ngOnInit(): void {
    this.loadCollocations();
  }

  loadCollocations() {
    this.collocationService.getReservations().subscribe(
      (data: any[]) => {
        this.reservationcollocations = data;
        console.log("Data received:", data);
      },
      (error: any) => {
        console.error("Error fetching collocations:", error);
      }
    );
  }

  // deleteCollocation(id: number) {
  //   if (confirm("Êtes-vous sûr de vouloir supprimer cette collocation ?")) {
  //     this.collocationService.deleteReservation(id).subscribe(
  //       () => {
  //         console.log("Collocation supprimée avec succès.");
  //         this.loadCollocations();
  //       },
  //       (error: any) => {
  //         console.error("Erreur lors de la suppression de la collocation:", error);
  //       }
  //     );
  //   }
  // }
  
  deleteCollocation(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      this.collocationService.deleteReservation(id).subscribe(
        () => {
          console.log("Réservation supprimée avec succès.");
          this.loadCollocations();
          this.snackBar.open('Réservation supprimée', 'Succès', { duration: 2000 });
        },
        (error: any) => {
          console.error("Erreur lors de la suppression de la réservation:", error);
          this.snackBar.open('Erreur lors de la suppression', 'Echec', { duration: 2000 });
        }
      );
    }
  }

  acceptReservation(id: number) {
    this.collocationService.acceptReservation(id).subscribe(() => {
      this.snackBar.open('Reservation accepted', 'Success', { duration: 2000 });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/ReservationCol']); // Replace '/reservations' with your actual route
      });
    });
  }
  

  // addCollocation() {
  //   this.collocationService.addCollocation(this.newreservationcollocation).subscribe(
  //     (response: any) => {
  //       console.log("Collocation ajoutée avec succès.");
  //       this.newreservationcollocation = {} as ReservationCollocation;
  //       this.loadCollocations();
  //     },
  //     (error: any) => {
  //       console.error("Erreur lors de l'ajout de la collocation:", error);
  //     }
  //   );
  // }

  // updateCollocation() {
  //   if (this.selectedCollocation) {
  //     this.collocationService.updateMeetingDate(this.selectedCollocation, meetingDate: Date).subscribe(
  //       (response: any) => {
  //         console.log("Collocation mise à jour avec succès.");
  //         this.selectedCollocation = undefined;
  //         this.loadCollocations();
  //       },
  //       (error: any) => {
  //         console.error("Erreur lors de la mise à jour de la collocation:", error);
  //       }
  //     );
  //   }
  // }

  // openReservationDialog(collocationId: number) {
  //   const dialogRef = this.dialog.open(ReservationModalComponent, {
  //     width: '500px', // Adjust width as needed
  //     data: { collocationId: collocationId }
  //   });
  
  //   // Handle dialog closure and result (optional)
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Reservation was created successfully (handle in ReservationModalComponent)
  //     }
  //   });
  // }
}


