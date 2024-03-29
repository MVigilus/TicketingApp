import {Component, ViewChild} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {MatTableDataSource} from "@angular/material/table";
import {OperatoreElementTable} from "@core/model/admin/OperatoreElementTable";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdminService} from "@core/services/admin.service";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {
  EditOperatoreModalComponent
} from "../../utils/components/modals/edit-operatore-modal/edit-operatore-modal.component";

@Component({
  selector: 'app-gestione-operatore-fr',
  templateUrl: './gestione-operatore-fr.component.html',
  styleUrls: ['./gestione-operatore-fr.component.scss']
})
export class GestioneOperatoreFRComponent extends UnsubscribeOnDestroyAdapter {

  displayedColumns: string[] = [
    'nominativo',
    'email',
    'username',
    'clienti',
    'action'
  ];
  dataSource: MatTableDataSource<OperatoreElementTable> = new MatTableDataSource<OperatoreElementTable>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public searchValue: string = '';

  constructor(private adminservice: AdminService, private dialog: MatDialog) {
    super();
    this.loadDataTabble()
  }

  DeleteCliente(element: OperatoreElementTable) {
    Swal.fire({
      title: 'Sei Sicuro?',
      text: "Se Continui con l'eliminazione del Cliente tutte i ticket associati verrano rimossi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procedi',
      cancelButtonText: "Annulla"
    }).then((result) => {
      if (result.value) {
        this.adminservice.deleteCliente(element.id).subscribe({
          next: res => {
            Swal.fire('Cliente eliminato!', 'Cliente e ticket associati sono stato eliminati', 'success');
          },
          error: res => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Qualcosa è andato Storto!',
              footer: '' +
                '',
            });
          }
        })
      }
    });
  }


  UpdateStatus(element: OperatoreElementTable) {

    const dialogRef = this.dialog.open(EditOperatoreModalComponent, {
      data: {action: "edit", operatore: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });

  }

  addNew() {
    const dialogRef = this.dialog.open(EditOperatoreModalComponent, {
      data: {action: "", operatore: {}},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });
  }

  loadDataTabble() {
    this.subs.sink = this.adminservice.getAllOperatoreFR().subscribe({
      next: (res) => {
        if (res) {
          console.log(res)
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.data = res.filter((element) => {
            // Convert all the properties to lowercase and check if any property contains the search value
            return Object.values(element).some((value) =>
              value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
            );
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '' +
            '',
        });
      },
    });
  }

}
