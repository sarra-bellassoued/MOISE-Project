import { Component } from '@angular/core';
import { CompteComptable} from 'src/app/services/systeme.interface';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CompteComptableService } from 'src/app/services/api.service';
@Component({
  selector: 'app-comptes-comptable-affiche',
  templateUrl: './comptes-comptable-affiche.component.html',
  styleUrls: ['./comptes-comptable-affiche.component.css']
})
export class ComptesComptableAfficheComponent {
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
