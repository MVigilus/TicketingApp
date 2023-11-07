import {Component, OnInit} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "../../utils/UnsubscribeOnDestroyAdapter";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import {AdminService} from "@core/services/admin.service";
import Swal from "sweetalert2";
import {TicketResumeOperatore} from "@core/model/ticketing/ticketResumeOperatore";
import {getYears} from "../../utils/functions";

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  series2?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  xaxis?: ApexXAxis;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  grid?: ApexGrid;
  markers?: ApexMarkers;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  public AndamentoOperatoreOptions: Partial<ChartOptions>;
  public AndamentoStatoOptions: Partial<ChartOptions>;

  public ticketResumeOperatore: TicketResumeOperatore = {} as TicketResumeOperatore;

  public clienti: string[] = [];
  public operatoriNames: string[] = [];

  public selectPeriodo: string[] = ['all', 'all']

  constructor(private adminSerivice: AdminService) {
    super();
    this.AndamentoOperatoreOptions = this.getChartBarOption();
    this.AndamentoStatoOptions = this.getChartBarOption();


    this.AndamentoStatoOptions.xaxis!.categories = ['Aperti', 'In Lavorazione', 'Chiusi']
    this.AndamentoOperatoreOptions.xaxis!.categories = ['In Lavorazione', 'Chiusi'];

    this.AndamentoStatoOptions.series = []
    this.AndamentoStatoOptions.series = []

  }

  public getChartBarOption(): Partial<ChartOptions> {
    return {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 3,
        colors: ['transparent'],
      },
      xaxis: {
        labels: {
          style: {
            colors: '#9aa0ac',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Numero',
        },
      },
      responsive: [
        {
          breakpoint: 16 * 25,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            legend: {
              position: 'bottom',
            },
            dataLabels: {
              offsetX: 12,
              offsetY: 0,
            },
          },
        },
      ],

      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    }
  }



  UpdateChart() {



    if (this.selectPeriodo[0] != "all" || this.selectPeriodo[1] != "all") {

      this.subs.sink = this.adminSerivice.getAdminResumeParam(Number((this.selectPeriodo[0] != "all" ? this.selectPeriodo[0] : 0)), Number((this.selectPeriodo[1] != "all" ? this.selectPeriodo[1] : 0))).subscribe({
        next: res => {
          this.clienti = res.codiciCliente;
          this.operatoriNames = res.codiciOperatore;
          this.ticketResumeOperatore = res.ticketResumeOperatore;


          this.AndamentoStatoOptions.series = res.andamentoCliente
          this.AndamentoOperatoreOptions.series = res.andamentoOperatore
          console.log(this.ticketResumeOperatore)


        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Errore nel caricamento dei dati contattare amministratore!',
            footer: '' +
              '',
          });
        },
      })

    } else {
      this.subs.sink = this.adminSerivice.getAdminResume().subscribe({
        next: res => {
          console.log(res);
          this.clienti = res.codiciCliente;
          this.operatoriNames = res.codiciOperatore;
          this.ticketResumeOperatore = res.ticketResumeOperatore;


          this.AndamentoStatoOptions.series = res.andamentoCliente
          this.AndamentoOperatoreOptions.series = res.andamentoOperatore
          console.log(this.ticketResumeOperatore)


        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Errore nel caricamento dei dati contattare amministratore!',
            footer: '' +
              '',
          });
        },
      })
    }


  }

  ngOnInit(): void {
    this.UpdateChart();
  }

  protected readonly getYears = getYears;
}
