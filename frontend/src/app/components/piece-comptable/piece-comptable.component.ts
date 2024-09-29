import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { PieceComptableService } from 'src/app/services/piece-comptable-service.service';
import { JournalComptableService } from 'src/app/services/journal-comptable-service.service';
import { CompteComptableService } from 'src/app/services/api.service';
import { JournalComptable, CompteComptable, PieceComptable } from 'src/app/services/systeme.interface';

@Component({
  selector: 'app-piece-comptable',
  templateUrl: './piece-comptable.component.html',
  styleUrls: ['./piece-comptable.component.css']
})
export class PieceComptableComponent implements OnInit {
  pieceComptableForm: FormGroup;
  journaux: JournalComptable[] = [];
  comptes: CompteComptable[] = [];
  totalDebit: number = 0;
  totalCredit: number = 0;
  difference: number = 0;

  constructor(
    private fb: FormBuilder,
    private pieceService: PieceComptableService,
    private journalService: JournalComptableService,
    private compteService: CompteComptableService
  ) {
    this.pieceComptableForm = this.fb.group({
      journalId: ['', Validators.required],
      date: ['', Validators.required],
      reference: ['', Validators.required],
      lignes: this.fb.array([]) // Initialize the FormArray
    });
  }

  ngOnInit(): void {
    this.loadJournaux();
    this.loadComptes();
    // Calculate totals when the component initializes
    this.calculateTotals();
  }

  get lignes(): FormArray {
    return this.pieceComptableForm.get('lignes') as FormArray;
  }

  loadJournaux(): void {
    this.journalService.getAll().subscribe(journaux => {
      this.journaux = journaux;
    });
  }

  loadComptes(): void {
    this.compteService.getAll().subscribe(comptes => {
      this.comptes = comptes;
    });
  }

  addLigne(): void {
    const ligneFormGroup = this.fb.group({
      compte: this.fb.group({
        id: ['', Validators.required]
      }),
      debit: [0, Validators.required],
      credit: [0, Validators.required]
    });
    this.lignes.push(ligneFormGroup);

    // Recalculate totals whenever a new line is added
    this.calculateTotals();
  }

  removeLigne(index: number): void {
    this.lignes.removeAt(index);
    // Recalculate totals after removing a line
    this.calculateTotals();
  }

  onSubmit(): void {
    if (this.pieceComptableForm.valid) {
      console.log(this.pieceComptableForm.value);
      const piece: PieceComptable = this.pieceComptableForm.value;
      this.pieceService.create(piece).subscribe(() => {
        this.pieceComptableForm.reset();
        this.lignes.clear();
        this.totalDebit = 0;
        this.totalCredit = 0;
        this.difference = 0;
      }, error => {
        console.error('Error creating piece:', error);
      });
    } else {
      console.error('Form is invalid:', this.pieceComptableForm.errors);
    }
  }

  onDebitChange(index: number): void {
    const ligne = this.lignes.at(index) as FormGroup;
    const debitValue = ligne.get('debit')?.value;
    const creditValue = ligne.get('credit')?.value;

    if (debitValue > 0) {
      ligne.get('credit')?.setValue(0);
    } else if (creditValue > 0) {
      ligne.get('debit')?.setValue(0);
    }

    // Recalculate totals after debit change
    this.calculateTotals();
  }

  onCreditChange(index: number): void {
    const ligne = this.lignes.at(index) as FormGroup;
    const debitValue = ligne.get('debit')?.value;
    const creditValue = ligne.get('credit')?.value;

    if (creditValue > 0) {
      ligne.get('debit')?.setValue(0);
    } else if (debitValue > 0) {
      ligne.get('credit')?.setValue(0);
    }

    // Recalculate totals after credit change
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalDebit = 0;
    this.totalCredit = 0;

    // Explicitly type each control as FormGroup
    this.lignes.controls.forEach((control: AbstractControl) => {
      const ligne = control as FormGroup;
      const debit = parseFloat(ligne.get('debit')?.value) || 0;
      const credit = parseFloat(ligne.get('credit')?.value) || 0;

      this.totalDebit += debit;
      this.totalCredit += credit;
    });

    // Calculate the difference
    this.difference = this.totalDebit - this.totalCredit;
  }
}
