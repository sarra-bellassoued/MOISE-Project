import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompteComptable } from 'src/app/services/systeme.interface';

@Component({
  selector: 'app-ligne-comptable',
  templateUrl: './ligne-comptable.component.html',
  styleUrls: ['./ligne-comptable.component.css']
})
export class LigneComptableComponent implements OnInit {
  @Input() ligne!: FormGroup;
  @Input() comptes!: CompteComptable[];
  @Output() debitChange = new EventEmitter<void>();
  @Output() creditChange = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(compte: CompteComptable): void {
    const compteGroup = this.ligne.get('compte') as FormGroup;
    compteGroup.patchValue({ id: compte.id });
  }
}