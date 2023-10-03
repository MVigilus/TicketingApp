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
    'nominativo',
    'cliente',
    'email',
    'telefono',
    'status',
    'date',
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
      options: ['Filtra per ...', 'APERTO', 'In Lavorazione', 'CHIUSO'],
      defaultValue: 'Filtra per ...'
    });

  }

  loadDataTabble() {
    this.subs.sink = this.homeservice.getOperatoreResume(this.authService.currentUserValue.clienti).subscribe({
      next: (res) => {
        if (res) {
          console.log(res)
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
        if (!res.success) {
          this.router.navigate(['/authentication/signin']);
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

  UpdateStatus(id: number) {

    this.subs.sink = this.homeservice.updateStatusTicket(id).subscribe({
      next: (res: any) => {
        if (res) {
          this.loadDataTabble()
          Swal.fire({
            icon: 'success',
            title: 'Operazione effettuata con successo',
            text: res.message,
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
    });
  }

}
