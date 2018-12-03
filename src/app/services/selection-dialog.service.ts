import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectionDialogComponent } from '../components';
import { SelectionRef } from '../classes';


@Injectable()
export class SelectionDialog {

  private selectionRef = null;

  constructor(public dialog: MatDialog) {}

  public open(config, data) {

    if (this.selectionRef) {
      return this.selectionRef;
    }

    this.selectionRef = new SelectionRef();

    const dialogRef = this.dialog.open(SelectionDialogComponent, {
      width: '100%',
      panelClass: 'fs-selection-pane',
      hasBackdrop: false,
      position: { left: '0px', bottom: '0px', right: '0px' },
      data: { data: data, selectionRef: this.selectionRef, config: config }
    });

    this.selectionRef.dialogRef = dialogRef;

    dialogRef.beforeClose().subscribe(result => {
      this.selectionRef.cancel();
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectionRef = null;
    });

    return this.selectionRef;
  }
}
