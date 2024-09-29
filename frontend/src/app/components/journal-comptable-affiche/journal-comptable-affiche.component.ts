import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { JournalComptableService } from 'src/app/services/journal-comptable-service.service';
import { PieceComptableService } from 'src/app/services/piece-comptable-service.service';
import { JournalComptable, PieceComptable } from 'src/app/services/systeme.interface';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-journal-comptable-affiche',
  templateUrl: './journal-comptable-affiche.component.html',
  styleUrls: ['./journal-comptable-affiche.component.css']
})
export class JournalComptableAfficheComponent implements OnInit {
  journals: JournalComptable[] = [];
  searchJournalCode: string = '';
  searchJournalLibelle: string = '';
  searchPieceReference: string = '';
  searchJournalId: number | null = null;
  searchPieceId: number | null = null;
  searchPieceDate: string ='' ;
  constructor(
    private pieceComptableService: PieceComptableService,
    private journalService: JournalComptableService
  ) {}

  ngOnInit() {
    this.loadJournals();
  }

  loadJournals(): void {
    this.journalService.getAll().subscribe((journals) => {
      this.journals = journals;
      this.loadPieces();
    });
  }

  loadPieces(): void {
    this.journals.forEach(journal => {
      this.journalService.getPiecesByJournalId(journal.id).subscribe(pieces => {
        journal.pieces = pieces;
        pieces.forEach(piece => {
          this.pieceComptableService.getLignesByPiece(piece.id).subscribe(lignes => {
            piece.lignes = lignes;
          });
        });
      });
    });
  }

  filteredJournals(): JournalComptable[] {
    return this.journals.filter(journal =>
      (this.searchJournalId === null || journal.id === this.searchJournalId) &&
      journal.code.toLowerCase().includes(this.searchJournalCode.toLowerCase()) &&
      journal.libelle.toLowerCase().includes(this.searchJournalLibelle.toLowerCase())
    );
  }

  filteredPieces(journal: JournalComptable): PieceComptable[] {
    return journal.pieces.filter(piece =>
      piece.reference.toLowerCase().includes(this.searchPieceReference.toLowerCase()) &&
      (this.searchPieceId == null || piece.id == this.searchPieceId) &&
      (this.searchPieceDate === '' || new Date(piece.date).toDateString() === new Date(this.searchPieceDate).toDateString())
    );
  }

  generatePDF(journal: JournalComptable): void {
    const doc = new jsPDF();
    doc.text('Journal Comptable', 10, 10);
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Code', 'Libelle']],
      body: [
        [journal.id, journal.code, journal.libelle]
      ]
    });

    let finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.text('Pièces Comptables:', 10, finalY);

    const pieces = journal.pieces || [];
    if (pieces.length > 0) {
      pieces.forEach((piece, index) => {
        autoTable(doc, {
          startY: finalY + 10 + (index * 60),
          head: [['ID', 'Référence', 'Date']],
          body: [
            [piece.id, piece.reference, this.formatDate(piece.date)]
          ]
        });

        finalY = (doc as any).lastAutoTable.finalY;

        doc.text('Lignes Comptables de la pièce ' + piece.reference + ':', 10, finalY + 10);

        const lignes = piece.lignes || [];
        if (lignes.length > 0) {
          autoTable(doc, {
            startY: finalY + 20,
            head: [['Compte ID', 'Débit', 'Crédit']],
            body: lignes.map(ligne => [ligne.compte.id, ligne.debit, ligne.credit])
          });
        } else {
          doc.text('Aucune ligne comptable disponible.', 10, finalY + 20);
        }

        finalY = (doc as any).lastAutoTable.finalY + 10;
      });
    } else {
      doc.text('Aucune pièce comptable disponible.', 10, finalY + 10);
    }

    doc.save(`journal_comptable_${journal.code}.pdf`);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  generateExcel(journal: JournalComptable): void {
    const data = [];
    data.push(['ID', 'Code', 'Libelle']);
    data.push([journal.id, journal.code, journal.libelle]);

    data.push(['', '', 'Pièces Comptables:']);
    data.push(['ID', 'Référence', 'Date']);

    journal.pieces.forEach(piece => {
      data.push([piece.id, piece.reference, this.formatDate(piece.date)]);
      data.push(['', '', 'Lignes Comptables de la pièce ' + piece.reference + ':']);
      data.push(['Compte ID', 'Débit', 'Crédit']);
      
      piece.lignes.forEach(ligne => {
        data.push([ligne.compte.id, ligne.debit, ligne.credit]);
      });
      
      if (piece.lignes.length === 0) {
        data.push(['', '', 'Aucune ligne comptable disponible.']);
      }
    });

    if (journal.pieces.length === 0) {
      data.push(['', '', 'Aucune pièce comptable disponible.']);
    }

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Journal Comptable');
    XLSX.writeFile(wb, `journal_comptable_${journal.code}.xlsx`);
  }
  deleteJournal(id: number): void {
    this.journalService.delete(id).subscribe(() => {
      this.journals = this.journals.filter(journal => journal.id !== id);
      console.log(`Journal with id ${id} deleted`);
    }, error => {
      console.error('Error deleting journal:', error);
    });
  }
}