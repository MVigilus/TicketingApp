import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {AdminService} from "@core/services/admin.service";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import {EditClienteModalComponent} from "../../utils/components/modals/edit-cliente-modal/edit-cliente-modal.component";
import {EditLogoClienteComponent} from "../../utils/components/modals/edit-logo-cliente/edit-logo-cliente.component";


@Component({
  selector: 'app-gestione-cliente',
  templateUrl: './gestione-cliente.component.html',
  styleUrls: ['./gestione-cliente.component.scss']
})
export class GestioneClienteComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns: string[] = [
    'codice',
    'riferimento',
    'ragioneSociale',
    'telefono',
    'mail',
    'alias',
    'action'
  ];
  dataSource: MatTableDataSource<ClienteElementTable> = new MatTableDataSource<ClienteElementTable>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public searchValue: string = '';

  constructor(private adminservice: AdminService, private dialog: MatDialog) {
    super();
    this.loadDataTabble()
  }

  DeleteCliente(element: ClienteElementTable) {
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

  ngOnInit(): void {
  }

  UpdateStatus(element: ClienteElementTable) {

    const dialogRef = this.dialog.open(EditClienteModalComponent, {
      data: {action: "edit", cliente: element},
    });


    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()

    });

  }

  UpdateLogo(element: ClienteElementTable) {

    const dialogRef = this.dialog.open(EditLogoClienteComponent, {
      data: {action: "edit", cliente: element.id, code:element.codice},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });

  }

  addNew() {
    const dialogRef = this.dialog.open(EditClienteModalComponent, {
      data: {action: "", cliente: {}},
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.loadDataTabble()

      },2500)
    });
  }

  loadDataTabble() {
    this.subs.sink = this.adminservice.getAllClienti().subscribe({
      next: (res) => {
        if (res) {
          console.log(JSON.stringify(res))
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
