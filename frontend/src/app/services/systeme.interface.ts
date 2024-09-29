
export interface CompteComptable {
  id: number;
  code: string;
  libelle: string;
}


export interface JournalComptable {
  id: number;
  code: string;
  libelle: string;
  pieces: PieceComptable[];
  journal: JournalComptable;
  showPieces?: boolean;


}

export interface LignePieceComptable {
  piece : PieceComptable ;
  compte : CompteComptable;
  debit: number;
  credit: number;
}

export interface PieceComptable {
  id: number;
  reference: string;
  date: Date;
  journal: JournalComptable;
  lignes: LignePieceComptable[];
  showLignes?: boolean;
}
export interface PieceComptableForm {
  id: number;
}
/*
export interface PieceComptableDTO
{
reference: string;
date: Date;
journalID: number;
lignes: LignePieceComptable[];
}*/

