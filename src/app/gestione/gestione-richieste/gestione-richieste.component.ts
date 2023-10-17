import {Component, OnInit, ViewChild} from '@angular/core';
import {TicketResumeOperatore} from "@core/model/ticketing/ticketResumeOperatore";
import {MatTableDataSource} from "@angular/material/table";
import {TicketTableElement} from "@core/model/ticketing/TicketTableElement";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {MatSelectChange} from "@angular/material/select";
import {ModalTicketViewComponent} from "../../utils/components/modals/modal-ticket-view/modal-ticket-view.component";
import {EmpFilter} from "../../dashboard/home/home.component";
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {AdminService} from "@core/services/admin.service";
import {TicketAdminElement} from "@core/model/admin/TicketAdminElement";

@Component({
  selector: 'app-gestione-richieste',
  templateUrl: './gestione-richieste.component.html',
  styleUrls: ['./gestione-richieste.component.scss']
})
export class GestioneRichiesteComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  public operatoreResume!: TicketAdminElement;
  public selectedHash!: TicketResumeOperatore | undefined;

  empFilters: EmpFilter[] = [];

  displayedColumns: string[] = [
    'date',
    'nominativo',
    'cliente',
    'email',
    'telefono',
    'noteOperatore',
    'dataPresaInCarico',
    'dataChiusura',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<TicketTableElement>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  filterDictionary = new Map<string, string>();
  clienti: string[] = [];
  selectedValue: string = '';

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService
  ) {

    super();

    this.dataSource = new MatTableDataSource<TicketTableElement>([]);


  }

  loadDataTabble() {


    this.subs.sink = this.adminService.getAllClientiCodes().subscribe({
      next: (res) => {
        console.log("INSIER")
        console.log(res)
        this.clienti = [];

        this.clienti = res;
        this.clienti.push("Filtra per ...");

        this.selectedValue = this.clienti[this.clienti.length - 1];

        this.empFilters.push({name: 'cliente', options: this.clienti, defaultValue: 'Filtra per ...'});
        this.empFilters.push({
          name: 'status',
          options: ['Filtra per ...', 'APERTO', 'IN_LAVORAZIONE', 'CHIUSO'],
          defaultValue: 'Filtra per ...'
        });
      },
      error: res => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Qualcosa è andato storto!',
          footer: '' +
            '',
        });
      }
    });

    console.log(this.empFilters)

    this.subs.sink = this.adminService.getAdminResumeTicket().subscribe({
      next: (res) => {
        if (res) {
          console.log("LOADTABLE")
          console.log(res.adminResumeTicket)
          this.operatoreResume = res.adminResumeTicket;
          this.selectedHash = {
            aperti: this.operatoreResume.aperti,
            totali: this.operatoreResume.totali,
            chiusi: this.operatoreResume.chiusi,
            lavorazione: this.operatoreResume.lavorazione
          };
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

  changeHash($event: any) {
    console.log("OPERATORERESUME")
    console.log(this.operatoreResume.ticketResume)
    console.log($event.value)
    if ($event.value === "Filtra per ...") {
      this.selectedHash = {
        aperti: this.operatoreResume.aperti,
        totali: this.operatoreResume.totali,
        chiusi: this.operatoreResume.chiusi,
        lavorazione: this.operatoreResume.lavorazione
      };

    } else {
      this.selectedHash = this.operatoreResume.ticketResume[$event.value];

    }
  }
}
