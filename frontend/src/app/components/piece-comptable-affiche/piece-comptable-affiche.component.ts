import { Component, OnInit } from '@angular/core';
import { PieceComptableService } from 'src/app/services/piece-comptable-service.service';
import { JournalComptableService } from 'src/app/services/journal-comptable-service.service';
import { PieceComptable, LignePieceComptable, JournalComptable } from 'src/app/services/systeme.interface';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 
import { Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { EditPieceComptableComponent } from 'src/app/edit-piece-comptable/edit-piece-comptable.component';


@Component({
  selector: 'app-piece-comptable-affiche',
  templateUrl: './piece-comptable-affiche.component.html',
  styleUrls: ['./piece-comptable-affiche.component.css']
})
export class PieceComptableAfficheComponent implements OnInit {
  pieceComptables: PieceComptable[] = [];
  filteredPieceComptables: PieceComptable[] = [];
  pieceComptableSelectionne: PieceComptable | null = null;
  journaux: JournalComptable[] = [];

  searchReference: string = '';
  searchDate: string = '';
  searchId: string = '';

  constructor(private pieceComptableService: PieceComptableService,
             private journalService: JournalComptableService,
             private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pieceComptableService.getPieceComptables().subscribe((pieces) => {
      this.pieceComptables = pieces || []; 
      this.filteredPieceComptables = this.pieceComptables; 
      this.loadJournaux();
      this.loadAllLignes();
      console.log(pieces);
    });
  }
  loadAllLignes() {
    this.pieceComptables.forEach(piece => {
      this.pieceComptableService.getLignesByPiece(piece.id).subscribe((lignes) => {
        piece.lignes = lignes;
      });
    });
  }
  loadJournaux(): void {
    this.journalService.getAll().subscribe(journaux => {
      this.journaux = journaux;
    });
  }

  toggleLignes(pieceComptable: PieceComptable) {
    if (!pieceComptable.showLignes) {
      this.pieceComptableService.getLignesByPiece(pieceComptable.id).subscribe((lignes) => {
        pieceComptable.lignes = lignes;
        pieceComptable.showLignes = true;
        this.pieceComptableSelectionne = pieceComptable;
      });
    } else {
      pieceComptable.showLignes = false;
      this.pieceComptableSelectionne = null;
    }
  }

  generatePDF(pieceComptable: PieceComptable) {
    const doc = new jsPDF();

    // Titre
    doc.text('Piece Comptable', 10, 10);

    // Informations de la pièce comptable
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Référence', 'Date', 'Journal']],
      body: [
        [pieceComptable.id, pieceComptable.reference, this.formatDate(pieceComptable.date), pieceComptable.journal.id]
      ]
    });

    // Ajouter un espace avant les lignes comptables
    let finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.text('Lignes Comptables:', 10, finalY);

    // Lignes comptables
    const lignes = pieceComptable.lignes || [];
    if (lignes.length > 0) {
      autoTable(doc, {
        startY: finalY + 10,
        head: [['Compte ID', 'Débit', 'Crédit']],
        body: lignes.map(ligne => [ligne.compte.id, ligne.debit, ligne.credit])
      });
    } else {
      doc.text('Aucune ligne comptable disponible.', 10, finalY + 10);
    }

    // Sauvegarder le PDF
    doc.save(`piece_comptable_${pieceComptable.id}.pdf`);
  }

  filterPieces() {
    this.filteredPieceComptables = this.pieceComptables.filter(piece => 
      (!this.searchReference || (piece.reference && piece.reference.toLowerCase().includes(this.searchReference.toLowerCase()))) &&
      (!this.searchDate || (piece.date && this.formatDate(piece.date).includes(this.searchDate))) &&
      (!this.searchId || (piece.id && piece.id.toString().includes(this.searchId)))
    );
  }

  // Formatage de la date en chaîne de caractères
  private formatDate(date: Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  generateExcel(pieceComptable: PieceComptable) {
    // Create a workbook and worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{
      'ID': pieceComptable.id,
      'Référence': pieceComptable.reference,
      'Date': this.formatDate(pieceComptable.date),
      'Journal': pieceComptable.journal.libelle,
    }]);

    // Add ligne data
    const lignes = pieceComptable.lignes || [];
    if (lignes.length > 0) {
      XLSX.utils.sheet_add_aoa(ws, [['Compte ID', 'Débit', 'Crédit']], { origin: -1 });
      XLSX.utils.sheet_add_json(ws, lignes.map(ligne => ({
        'Compte ID': ligne.compte.id,
        'Débit': ligne.debit,
        'Crédit': ligne.credit
      })), { origin: -1 });
    }

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Piece Comptable');

    // Export to Excel file
    XLSX.writeFile(wb, `piece_comptable_${pieceComptable.id}.xlsx`);
  }
 // Function to calculate statistics for pieces comptables
 calculatePieceStatistics(): void {
  // Calculate the number of pieces created per day
  const statistics = this.pieceComptables.reduce((acc, piece) => {
    const date = (piece.date, 'yyyy-MM-dd', 'en-US'); // Format date to YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('Statistics by Date:', statistics);

}
updatePiece(pieceComptable: PieceComptable) {
  const dialogRef = this.dialog.open(EditPieceComptableComponent, {
    width: '400px',
    data: { pieceComptable: pieceComptable }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Refresh the data or handle the update as needed
      this.ngOnInit();
    }
  });

}
}