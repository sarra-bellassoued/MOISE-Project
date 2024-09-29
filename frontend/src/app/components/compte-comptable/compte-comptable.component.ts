// components/compte-comptable/compte-comptable.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteComptableService } from 'src/app/services/api.service';
import { CompteComptable } from 'src/app/services/systeme.interface';

@Component({
  selector: 'app-compte-comptable',
  templateUrl: './compte-comptable.component.html',
  styleUrls: ['./compte-comptable.component.css'],
})
export class CompteComptableComponent implements OnInit {
  comptes: CompteComptable[] = [];
  compteForm: FormGroup;

  constructor(private fb: FormBuilder, private compteService: CompteComptableService) {
    this.compteForm = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      libelle: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadComptes();
  }

  loadComptes(): void {
    this.compteService.getAll().subscribe(comptes => {
      this.comptes = comptes;
    });
  }

  onSubmit(): void {
    if (this.compteForm.valid) {
      const compte: CompteComptable = this.compteForm.value;
      if (compte.id) {
        this.compteService.update(compte).subscribe(() => this.loadComptes());
      } else {
        this.compteService.create(compte).subscribe(() => this.loadComptes());
      }
      this.compteForm.reset();
    }
  }

  onEdit(compte: CompteComptable): void {
    this.compteForm.patchValue(compte);
  }

  onDelete(id: number): void {
    this.compteService.delete(id).subscribe(() => this.loadComptes());
  }
}
