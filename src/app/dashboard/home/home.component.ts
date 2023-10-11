import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {HomeService} from "@core/services/dashboard/home.service";
import {TicketTableElement} from "@core/model/ticketing/TicketTableElement";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";
import {TicketResumeOperatore} from "@core/model/ticketing/ticketResumeOperatore";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {ModalTicketViewComponent} from "../../utils/components/modals/modal-ticket-view/modal-ticket-view.component";
import {
  AdvanceTicketLavorazioneComponent
} from "../../utils/components/modals/advance-ticket-lavorazione/advance-ticket-lavorazione.component";

export interface EmpFilter {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit{

  public operatoreResume!: TicketResumeOperatore;

  empFilters: EmpFilter[] = [];

  displayedColumns: string[] = [
    'date',
    'nominativo',
    'cliente',
    'email',
    'telefono',
    'NoteOperatore',
    'dataPresaInCarico',
    'dataChiusura',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<TicketTableElement>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  filterDictionary = new Map<string, string>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private homeservice: HomeService

  ) {

    super();

    this.dataSource = new MatTableDataSource<TicketTableElement>([]);

    let clienti = this.authService.currentUserValue.clienti;

    clienti.push("Filtra per ...");

    this.empFilters.push({name: 'cliente', options: clienti, defaultValue: 'Filtra per ...'});
    this.empFilters.push({
      name: 'status',
      options: ['Filtra per ...', 'APERTO', 'IN_LAVORAZIONE', 'CHIUSO'],
      defaultValue: 'Filtra per ...'
    });

  }

  loadDataTabble() {
    this.subs.sink = this.homeservice.getOperatoreResume(this.authService.currentUserValue.clienti).subscribe({
      next: (res) => {
        if (res) {
          //console.log(res)
          this.operatoreResume = res.ticketResumeOperatore;
          this.dataSource.data = res.ticketElementTable;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.dataSource.filterPredicate = function (record, filter) {

            var map = new Map(JSON.parse(filter));
            let isMatch = false;

            for (let [key, value] of map) {
              isMatch = (value == "Filtra per ...") || (record[key as keyof TicketTableElement] == value);
              if (!isMatch) return false;
            }

            return isMatch;
          }

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

  onSubmit() {
    this.subs.sink =  this.homeservice
      .getAll()
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res)
          }
        },
        error: (error) => {
          console.log(error)
        },
      });
    }

    logout(){
      this.authService.logout().subscribe((res) => {
        this.router.navigate(['/authentication/signin']);
      });
    }

  ngOnInit(): void {

    this.loadDataTabble();

  }

  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter) {

    this.filterDictionary.set(empfilter.name, ob.value);
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));

  }

  UpdateStatus(element: TicketTableElement) {

    console.log("ELEMENT :::: " + element)

    const dialogRef = this.dialog.open(ModalTicketViewComponent, {
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });


  }

  getElementBadge(status: string) {
    switch (status) {
      case "CHIUSO":
        return "badge badge-solid-red"
      case "APERTO":
        return "badge badge-solid-green"
      case "IN_LAVORAZIONE":
        return "badge badge-solid-orange"
    }
    return "";
  }

  UpdateLavorazione(element: TicketTableElement) {
    console.log("CCCCCCCCCCCCCC")
    console.log(element)
    const dialogRef = this.dialog.open(AdvanceTicketLavorazioneComponent, {
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });
  }

  UpdateChiuso(element: TicketTableElement) {
    Swal.fire({
      title: 'Sei Sicuro?',
      text: "Vuoi Evadere il ticket selezionato?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procedi',
      cancelButtonText: "Annulla"
    }).then((result) => {
      if (result.value) {
        this.homeservice.updateStatusTickeChiuso(element).subscribe({
          next: res => {
            Swal.fire('Ticket Chiuso!', 'Il ticket è stato evaso con successo', 'success');
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
}
