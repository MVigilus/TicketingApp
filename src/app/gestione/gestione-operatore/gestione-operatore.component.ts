import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdminService} from "@core/services/admin.service";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {OperatoreElementTable} from "@core/model/admin/OperatoreElementTable";
import {
  EditOperatoreModalComponent
} from "../../utils/components/modals/edit-operatore-modal/edit-operatore-modal.component";

@Component({
  selector: 'app-gestione-operatore',
  templateUrl: './gestione-operatore.component.html',
  styleUrls: ['./gestione-operatore.component.scss']
})
export class GestioneOperatoreComponent extends UnsubscribeOnDestroyAdapter {

  displayedColumns: string[] = [
    'nominativo',
    'email',
    'username',
    'clienti',
    'action'
  ];
  clienti: string[] = [];
  dataSource: MatTableDataSource<OperatoreElementTable> = new MatTableDataSource<OperatoreElementTable>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public searchValue: string = '';

  constructor(private adminservice: AdminService, private dialog: MatDialog) {
    super();
    this.subs.sink = this.adminservice.getAllClientiCodes().subscribe({
      next: res => {
        this.clienti = res;
      },
      error: res => {

      }
    })
    this.loadDataTabble()
  }

  DeleteCliente(element: OperatoreElementTable) {
    Swal.fire({
      title: 'Sei Sicuro?',
      text: "Vuoi portare l'operatore selezionato in FR?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procedi',
      cancelButtonText: "Annulla"
    }).then((result) => {
      if (result.value) {
        this.adminservice.deleteOperatore(element.id).subscribe({
          next: res => {
            Swal.fire('Operazione Effettuata!', 'Operatore spostato in fine rapporto con successo!', 'success');
          },
          error: res => {
            Swal.fire('Operazione Effettuata!', 'Operatore spostato in fine rapporto con successo!', 'success');
          }
        })
      }
    });
  }


  UpdateStatus(element: OperatoreElementTable) {
    const dialogRef = this.dialog.open(EditOperatoreModalComponent, {
      data: {action: "edit", operatore: element, clienti: this.clienti},
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.loadDataTabble();
      },1000)
    });


  }

  addNew() {
    const dialogRef = this.dialog.open(EditOperatoreModalComponent, {
      data: {action: "", operatore: {}, clienti: this.clienti},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble();
      this.loadDataTabble();

      setTimeout(()=>{
        this.loadDataTabble();
      },2000)


    });


  }

  loadDataTabble() {
    this.subs.sink = this.adminservice.getAllOperatore().subscribe({
      next: (res) => {
        if (res) {
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.data = res.filter((element) => {
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
