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
import {getYears} from "../../utils/functions";
import moment = require("moment");


@Component({
  selector: 'app-gestione-richieste',
  templateUrl: './gestione-richieste.component.html',
  styleUrls: ['./gestione-richieste.component.scss']
})
export class GestioneRichiesteComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  public operatoreResume!: TicketAdminElement;
  public selectedHash!: TicketResumeOperatore | undefined;

  empFilters: EmpFilter[] = [];
  public selectPeriodo: string[] = ['all', 'all','','']


  displayedColumns: string[] = [
    'date',
    'id',
    'nominativo',
    'cliente',
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
  operatoriNames:string[]=[];
  selectedValue: string = '';

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService
  ) {

    super();

    this.dataSource = new MatTableDataSource<TicketTableElement>([]);


  }

  StatoSelect=['Filtra per ...', 'Aperto', 'Lavorazione', 'Chiuso']


  loadDataTabble() {

    this.subs.sink=this.adminService.getAllOperatoreNominativo().subscribe({
      next:(res)=>{
        this.operatoriNames=res;
        this.operatoriNames.push('Filtra per ...')
        this.empFilters[2]={
          name: 'nominativo',
          options: this.operatoriNames,
          defaultValue: 'Filtra per ...'
        };
      },
      error:()=>{

      }

    })


    this.subs.sink = this.adminService.getAllClientiCodes().subscribe({
      next: (res) => {
        this.clienti = [];

        this.clienti = res;
        this.clienti.push("Filtra per ...");


        this.empFilters[0]= {name: 'cliente', options: this.clienti, defaultValue: 'Filtra per ...'};
        this.empFilters[1]={
          name: 'status',
          options: ['Filtra per ...', 'APERTO', 'IN_LAVORAZIONE', 'CHIUSO'],
          defaultValue: 'Filtra per ...'
        };

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

    let method='';

    if(this.selectPeriodo[0]!='all' || this.selectPeriodo[1]!='all'){
      method='annomese'
    }

    if(this.selectPeriodo[2]!=''){
      console.log("PERIODO : "+this.selectPeriodo[1])
      method='periodo'
    }

    this.subs.sink = this.adminService.getAdminResumeTicket(method,(method!='periodo')?[this.selectPeriodo[0],this.selectPeriodo[1]]:[this.selectPeriodo[2],this.selectPeriodo[3]]).subscribe({
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

  protected readonly getYears = getYears;

  changeDatePicker(id: number) {
    if (!this.selectPeriodo[id]) {
      this.selectPeriodo[3] = '';
      this.selectPeriodo[2] = '';

    } else if (this.selectPeriodo[id] !== '') {
      this.selectPeriodo[id] = moment(this.selectPeriodo[id]).format('YYYY-MM-DD');
    }
  }

  checkComboStatus(id:number) {
    switch (id){
      case 1:
        if(this.selectPeriodo[2]!=''){
          this.selectPeriodo[0]='all'
          this.selectPeriodo[1]='all'
          return true
        }
        break;

      case 2:
        return this.selectPeriodo[0]!='all' || this.selectPeriodo[1]!='all';

    }


    return false;
  }

  exportExcel() {
    let method='';

    if(this.selectPeriodo[0]!='all' || this.selectPeriodo[1]!='all'){
      method='annomese'
    }

    if(this.selectPeriodo[2]!=''){
      console.log("PERIODO : "+this.selectPeriodo[1])
      method='periodo'
    }

    this.subs.sink=this.adminService.exportAdminResumeTicket(method,(method!='periodo')?[this.selectPeriodo[0],this.selectPeriodo[1]]:[this.selectPeriodo[2],this.selectPeriodo[3]]).subscribe()
  }
}
