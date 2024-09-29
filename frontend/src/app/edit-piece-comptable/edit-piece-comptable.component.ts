import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PieceComptableService } from '../services/piece-comptable-service.service';
import { PieceComptable } from 'src/app/services/systeme.interface';

@Component({
  selector: 'app-edit-piece-comptable',
  templateUrl: './edit-piece-comptable.component.html',
  styleUrls: ['./edit-piece-comptable.component.css']
})
export class EditPieceComptableComponent {
  pieceComptable: PieceComptable;

  constructor(
    public dialogRef: MatDialogRef<EditPieceComptableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pieceComptable: PieceComptable },
    private pieceComptableService: PieceComptableService
  ) {
    this.pieceComptable = data.pieceComptable;
  }

  save(): void {
    this.pieceComptableService.update(this.pieceComptable).subscribe(() => {
      this.dialogRef.close(true); // Notify the parent component of the update
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
