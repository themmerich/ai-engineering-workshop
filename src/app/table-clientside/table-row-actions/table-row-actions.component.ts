import { Component, input, output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { getFieldValue } from '../table-row-formatter';

/**
 * Renders the action-button cell of a `babs-table-clientside` row.
 *
 * Attribute selector so the host stays a real `<td>`, keeping the table DOM intact.
 * Each output re-emits the row object; the parent keeps its existing `on*` handlers.
 */
@Component({
  selector: 'td[babsTableRowActions]',
  imports: [ButtonDirective],
  styles: `
    .btn-text {
      color: black;
    }
  `,
  template: `
    @if (inTerminKontext()) {
      @if (getFieldValue(rowData(), 'typ').toLowerCase() === 'blocker') {
        <button
          pButton
          type="button"
          (click)="edit.emit(rowData())"
          aria-label="Bearbeiten"
          icon="pi pi-pencil"
          class="btn-text margin-right-5"
          [attr.id]="'edit_' + index()"
        ></button>
        <button
          pButton
          type="button"
          (click)="delete.emit(rowData())"
          aria-label="Löschen"
          icon="pi pi-trash"
          class="btn-text"
          [attr.id]="'delete_' + index()"
        ></button>
      } @else {
        <button
          pButton
          type="button"
          (click)="view.emit(rowData())"
          aria-label="Details"
          icon="pi pi-eye"
          class="btn-text margin-right-5"
          [attr.id]="'view_' + index()"
        ></button>
      }
    } @else if (isReadOnly()) {
      @if (showView()) {
        <button
          pButton
          type="button"
          (click)="view.emit(rowData())"
          aria-label="Details"
          icon="pi pi-eye"
          class="btn-text margin-right-5"
          [attr.id]="'view_' + index()"
        ></button>
      }
    } @else {
      @if (showEdit()) {
        <button
          pButton
          type="button"
          (click)="edit.emit(rowData())"
          aria-label="Bearbeiten"
          icon="pi pi-pencil"
          class="btn-text margin-right-5"
          [attr.id]="'edit_' + index()"
        ></button>
      }
      @if (showDelete()) {
        <button
          pButton
          type="button"
          (click)="delete.emit(rowData())"
          aria-label="Löschen"
          icon="pi pi-trash"
          class="btn-text margin-right-5"
          [attr.id]="'delete_' + index()"
        ></button>
      }
      @if (showViewMitarbeiter()) {
        <button
          pButton
          type="button"
          (click)="viewMitarbeiter.emit(rowData())"
          aria-label="Mitarbeiter"
          icon="pi pi-users"
          class="btn-text"
          [attr.id]="'view_mitarbeiter_' + index()"
        ></button>
      }
    }
    @if (showHistory()) {
      <button
        pButton
        type="button"
        (click)="history.emit(rowData())"
        aria-label="Historie"
        icon="pi pi-history"
        class="btn-text margin-right-5"
        [attr.id]="'history_' + index()"
      ></button>
    }
    @if (showLocations()) {
      <button
        pButton
        type="button"
        (click)="locations.emit(rowData())"
        aria-label="Ort"
        icon="pi pi-map-marker"
        class="btn-text margin-right-5"
        [attr.id]="'locations_' + index()"
      ></button>
    }
    @if (showDownload()) {
      <button
        pButton
        type="button"
        (click)="download.emit(rowData())"
        aria-label="Herunterladen"
        icon="pi pi-download"
        class="btn-text margin-right-5"
        [attr.id]="'downloads_' + index()"
      ></button>
    }
    @if (showFile()) {
      <button
        pButton
        type="button"
        (click)="file.emit(rowData())"
        aria-label="Datei herunterladen"
        icon="pi pi-file"
        class="btn-text margin-right-5"
        [attr.id]="'file_' + index()"
      ></button>
    }
    @if (showAssign() && !rowData()['inhaberBuroId']) {
      <button
        pButton
        type="button"
        (click)="assign.emit(rowData())"
        aria-label="Übernehmen"
        icon="pi pi-check"
        class="btn-text margin-right-5"
        [attr.id]="'assign_' + index()"
      ></button>
    }
    @if (showAssignUser()) {
      <button
        pButton
        type="button"
        (click)="assignUser.emit(rowData())"
        [disabled]="rowData().bearbeiter !== null"
        aria-label="Mir zuweisen"
        icon="pi pi-user-plus"
        class="btn-text margin-right-5"
        [attr.id]="'assign_user_' + index()"
      ></button>
    }
    @if (showRemoveUser()) {
      <button
        pButton
        type="button"
        (click)="removeUser.emit(rowData())"
        [disabled]="rowData().bearbeiter === null"
        aria-label="Bearbeiter entfernen"
        icon="pi pi-user-minus"
        class="btn-text margin-right-5"
        [attr.id]="'remove_user_' + index()"
      ></button>
    }
    @if (showActivate()) {
      <button
        pButton
        type="button"
        (click)="activate.emit(rowData())"
        aria-label="Aktivieren"
        icon="pi pi-check"
        class="btn-text margin-right-5"
        [attr.id]="'activate_' + index()"
      ></button>
    }
    @if (showDeactivate()) {
      <button
        pButton
        type="button"
        (click)="deactivate.emit(rowData())"
        aria-label="Deaktivieren"
        icon="pi pi-times"
        class="btn-text margin-right-5"
        [attr.id]="'deactivate_' + index()"
      ></button>
    }
  `,
})
export class TableRowActionsComponent {
  readonly rowData = input.required<any>();
  readonly index = input.required<number>();

  readonly inTerminKontext = input(false);
  readonly isReadOnly = input(false);
  readonly showView = input(false);
  readonly showEdit = input(false);
  readonly showDelete = input(false);
  readonly showViewMitarbeiter = input(false);
  readonly showHistory = input(false);
  readonly showLocations = input(false);
  readonly showDownload = input(false);
  readonly showFile = input(false);
  readonly showAssign = input(false);
  readonly showAssignUser = input(false);
  readonly showRemoveUser = input(false);
  readonly showActivate = input(false);
  readonly showDeactivate = input(false);

  readonly view = output<any>();
  readonly edit = output<any>();
  readonly delete = output<any>();
  readonly viewMitarbeiter = output<any>();
  readonly history = output<any>();
  readonly locations = output<any>();
  readonly download = output<any>();
  readonly file = output<any>();
  readonly assign = output<any>();
  readonly assignUser = output<any>();
  readonly removeUser = output<any>();
  readonly activate = output<any>();
  readonly deactivate = output<any>();

  protected readonly getFieldValue = getFieldValue;
}
