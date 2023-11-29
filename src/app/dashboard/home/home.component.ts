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
import {
  AdvanceTicketChiusoComponent
} from "../../utils/components/modals/advance-ticket-chiuso/advance-ticket-chiuso.component";
import {getYears} from "../../utils/functions";
import moment = require("moment");

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

  StatoSelect=['Filtra per ...', 'Aperto', 'Lavorazione', 'Chiuso']

  displayedColumns: string[] = [
    'id',
    'date',
    'nominativo',
    'cliente',
    'email',
    'telefono',
    //'noteOperatore',
    'dataPresaInCarico',
    'dataChiusura',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<TicketTableElement>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  filterDictionary = new Map<string, string>();

  get CU(){
    return this.authService.currentUserValue
  }

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

    this.statoSelect=this.empFilters[1].defaultValue
    this.clienteSelect=this.empFilters[0].defaultValue


  }

  public selectPeriodo: string[] = ['all', 'all','','']


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

  loadDataTabble() {

    let method='';

    if(this.selectPeriodo[0]!='all' || this.selectPeriodo[1]!='all'){
      method='annomese'
    }

    if(this.selectPeriodo[2]!=''){
      console.log("PERIODO : "+this.selectPeriodo[1])
      method='periodo'
    }

    this.subs.sink = this.homeservice.getOperatoreResume(this.authService.currentUserValue.clienti,method,(method!='periodo')?[this.selectPeriodo[0],this.selectPeriodo[1]]:[this.selectPeriodo[2],this.selectPeriodo[3]]).subscribe({
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
        this.authService.logout()
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

  statoSelect:string;
  clienteSelect:string;


  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter,index:number) {

    if(index===0){
      this.clienteSelect=ob.value
    }else{
      this.statoSelect=ob.value
    }

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

  UpdateNoteLavorazione(element: TicketTableElement) {
    const dialogRef = this.dialog.open(AdvanceTicketLavorazioneComponent, {
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });
  }

  UpdateLavorazione(element: TicketTableElement) {
    Swal.fire({
      title: 'Sei Sicuro?',
      text: "Vuoi prendere in carico la richiesta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procedi',
      cancelButtonText: "Annulla"
    }).then((result) => {
      if (result.value) {
        this.subs.sink = this.homeservice.updateStatusTicketLavorazione(element).subscribe({
          next: (res: any) => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Operazione effettuata con successo',
                text: 'Stato Ticket modificato In Lavorazione\n' +
                  '\n' +
                  '                                  Inviata notifica Mail al Cliente sullo stato di Avanzamento',
                footer: '',
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
          complete:()=>{
            this.loadDataTabble();
          }
        });
      }
    });

  }

  UpdateChiuso(element: TicketTableElement) {
    const dialogRef = this.dialog.open(AdvanceTicketChiusoComponent, {
      data: {element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDataTabble()
    });
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

    this.subs.sink=this.homeservice.exportResumeTicketOperator(method,(method!='periodo')?[this.selectPeriodo[0],this.selectPeriodo[1],this.statoSelect,this.clienteSelect]:[this.selectPeriodo[2],this.selectPeriodo[3],this.statoSelect,this.clienteSelect]).subscribe()
  }

}
