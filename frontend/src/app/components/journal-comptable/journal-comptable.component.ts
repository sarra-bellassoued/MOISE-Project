import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JournalComptableService } from 'src/app/services/journal-comptable-service.service';
import { PieceComptableService } from 'src/app/services/piece-comptable-service.service';
import { JournalComptable, PieceComptable } from 'src/app/services/systeme.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-journal-comptable',
  templateUrl: './journal-comptable.component.html',
  styleUrls: ['./journal-comptable.component.css']
})
export class JournalComptableComponent implements OnInit {
  journalComptableForm: FormGroup;
  pieces: PieceComptable[] = [];

  constructor(
    private fb: FormBuilder,
    private journalComptableService: JournalComptableService,
    private pieceComptableService: PieceComptableService
  ) {
    this.journalComptableForm = this.fb.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required],
      piece1Id: [null, Validators.required],
      piece2Id: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getPieces();
  }

  getPieces() {
    this.pieceComptableService.getAll().subscribe((pieces) => {
      this.pieces = pieces;
    });
  }

  onSubmit() {
    if (this.journalComptableForm.valid) {
      const journalComptable: JournalComptable = this.journalComptableForm.value;
      this.journalComptableService.create(journalComptable).subscribe(
        (createdJournal) => {
          console.log('Journal créé :', createdJournal);
          // Réinitialisez le formulaire ou effectuez d'autres actions après la création
        },
        (error) => {
          console.error('Erreur lors de la création du journal :', error);
        }
      );
    }
  }
}