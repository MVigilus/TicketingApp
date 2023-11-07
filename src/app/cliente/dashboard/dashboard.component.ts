import {Component, OnInit, ViewChild} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {TicketResumeOperatore} from "@core/model/ticketing/ticketResumeOperatore";
import {MatTableDataSource} from "@angular/material/table";
import {TicketTableElement} from "@core/model/ticketing/TicketTableElement";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UntypedFormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "@core/services/auth.service";
import {HomeService} from "@core/services/dashboard/home.service";
import Swal from "sweetalert2";
import {MatSelectChange} from "@angular/material/select";
import {ModalTicketViewComponent} from "../../utils/components/modals/modal-ticket-view/modal-ticket-view.component";
import {
  AdvanceTicketLavorazioneComponent
} from "../../utils/components/modals/advance-ticket-lavorazione/advance-ticket-lavorazione.component";
import {
  AdvanceTicketChiusoComponent
} from "../../utils/components/modals/advance-ticket-chiuso/advance-ticket-chiuso.component";
import {EmpFilter} from "../../dashboard/home/home.component";
import {getYears} from "../../utils/functions";
import moment = require("moment");
import {AdminService} from "@core/services/admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  extends UnsubscribeOnDestroyAdapter
  implements OnInit{

  public operatoreResume!: TicketResumeOperatore;

  empFilters: EmpFilter[] = [];

  StatoSelect=['Filtra per ...', 'Aperto', 'Lavorazione', 'Chiuso']

  displayedColumns: string[] = [
    'id',
    'date',
    'nominativo',
    //'cliente',
    'email',
    //'telefono',
    //'noteOperatore',
    'dataPresaInCarico',
    'dataChiusura',
    'status',
    //'action',
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
    private homeservice: HomeService,

  ) {

    super();

    this.dataSource = new MatTableDataSource<TicketTableElement>([]);



    this.empFilters.push({
      name: 'status',
      options: ['Filtra per ...', 'APERTO', 'IN_LAVORAZIONE', 'CHIUSO'],
      defaultValue: 'Filtra per ...'
    });

  }

  operatoriNames:string[]=[];


  loadDataTabble() {

    this.subs.sink=this.homeservice.getAllOperatoreNominativo().subscribe({
      next:(res)=>{
        this.operatoriNames=res;
        this.operatoriNames.push('Filtra per ...')
        this.empFilters[3]={
          name: 'nominativo',
          options: this.operatoriNames,
          defaultValue: 'Filtra per ...'
        };
      },
      error:()=>{

      }

    })

    let method='';

    if(this.selectPeriodo[0]!='all' || this.selectPeriodo[1]!='all'){
      method='annomese'
    }

    if(this.selectPeriodo[2]!=''){
      console.log("PERIODO : "+this.selectPeriodo[1])
      method='periodo'
    }

    this.subs.sink = this.homeservice.getClienteResume(this.authService.currentUserValue.nominativo,method,(method!='periodo')?[this.selectPeriodo[0],this.selectPeriodo[1]]:[this.selectPeriodo[2],this.selectPeriodo[3]]).subscribe({
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
    this.authService.logout().subscribe({
      next: (res) => {
      },
      error:(res)=>{
        this.router.navigate(['/monitoring/signin']);

      },
      complete:()=>{
        this.router.navigate(['/monitoring/signin']);

      }
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


}
