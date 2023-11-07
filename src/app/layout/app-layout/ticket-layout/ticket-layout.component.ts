import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {Direction} from "@angular/cdk/bidi";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UnsubscribeOnDestroyAdapter} from "../../../utils/UnsubscribeOnDestroyAdapter";
import {ClienteTicket} from "@core/model/Cliente";
import {InConfiguration} from "@core/model/config.interface";
import {DirectionService} from "@core/services/direction.service";
import {ConfigService} from "@config";
import {TicketService} from "@core/services/ticketing/ticket.service";
import {TicketReq} from "@core/model/ticketing/TicketReq";
import Swal from 'sweetalert2';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {
  AdvanceTicketChiusoComponent
} from "../../../utils/components/modals/advance-ticket-chiuso/advance-ticket-chiuso.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginTicketComponent} from "../../../utils/components/modals/login-ticket/login-ticket.component";


@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: []
})
export class TicketLayoutComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  public Editor: any = ClassicEditor;
  public cliente!: ClienteTicket;
  logoUrl!: SafeUrl;
  isLoading:boolean=false;
  isImageLoading:boolean=false;
  authenticated:boolean=true;


  public ticketForm!:UntypedFormGroup;

  OpenModal(){
    this.authenticated=false;
    const dialogRef = this.dialog.open(LoginTicketComponent, {
      data: this.cliente.id,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authenticated=true;
      this.isLoading=true
      var ticket = new TicketReq(this.ticketForm.value)
      this.initForm();
      this.subs.sink = this.ticketingservice
        .InsertTicket(ticket)
        .subscribe({
          next: (res) => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Richiesta inviata con Successo',
                text: "a breve riceverà una mail di conferma",
                footer: '',
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Qualcosa è andato storto contattare admin!',
              footer: '' +
                '',
            });
          },
          complete:()=>{
            this.initForm();
            this.isLoading=false;
          }
        });
    });
  }

  direction!: Direction;
  public config!: InConfiguration;
  constructor(
    private directoryService: DirectionService,
    private configService: ConfigService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private route:ActivatedRoute,
    private ticketingservice:TicketService,
    private router:Router,
    private fb:UntypedFormBuilder,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {

    super();


    this.subs.sink = this.ticketingservice.ClienteExist(this.route.snapshot.paramMap.get("id")).subscribe({
      next:(res:ClienteTicket)=>{
        this.cliente=res;
        console.log(res);
      },
      error: () => {
        this.router.navigate(['/clienteNotFound']);
      },
      complete:()=>{
        this.initForm();

      }
    })



    this.subs.sink=this.ticketingservice.getLogoCliente(this.route.snapshot.paramMap.get("id")).subscribe({
      next:(data) => {
        this.isImageLoading=true
        const blob = new Blob([data], { type: 'image/png' });
        this.logoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      },
      error:()=>{

      },
      complete:()=>{
        this.isImageLoading=false
      }
    });



    this.config = this.configService.configData;
    this.directoryService.currentData.subscribe((currentData) => {
      if (currentData) {
        this.direction = currentData === 'ltr' ? 'ltr' : 'rtl';
      } else {
        if (localStorage.getItem('isRtl')) {
          if (localStorage.getItem('isRtl') === 'true') {
            this.direction = 'rtl';
          } else if (localStorage.getItem('isRtl') === 'false') {
            this.direction = 'ltr';
          }
        } else {
          if (this.config) {
            if (this.config.layout.rtl) {
              this.direction = 'rtl';
              localStorage.setItem('isRtl', 'true');
            } else {
              this.direction = 'ltr';
              localStorage.setItem('isRtl', 'false');
            }
          }
        }
      }
    });
  }
  ngAfterViewInit(): void {
    //------------ set varient start----------------
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('theme') as string
      );
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
      localStorage.setItem('theme', this.config.layout.variant);
    }

    //------------ set varient end----------------

    //------------ set theme start----------------

    if (localStorage.getItem('choose_skin')) {
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color
      );

      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_skin') as string
      );
      localStorage.setItem(
        'choose_skin_active',
        (localStorage.getItem('choose_skin') as string).substring(6)
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color
      );

      localStorage.setItem(
        'choose_skin',
        'theme-' + this.config.layout.theme_color
      );
      localStorage.setItem(
        'choose_skin_active',
        this.config.layout.theme_color
      );



    }

    //------------ set theme end----------------

    //------------ set RTL start----------------

    if (localStorage.getItem('isRtl')) {
      if (localStorage.getItem('isRtl') === 'true') {
        this.setRTLSettings();
      } else if (localStorage.getItem('isRtl') === 'false') {
        this.setLTRSettings();
      }
    } else {
      if (this.config.layout.rtl) {
        this.setRTLSettings();
      } else {
        this.setLTRSettings();
      }
    }
    //------------ set RTL end----------------


    //------------ set logo color start----------------

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    //------------ set logo color end----------------

  }

  setRTLSettings() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.renderer.addClass(this.document.body, 'rtl');

    localStorage.setItem('isRtl', 'true');
  }
  setLTRSettings() {
    document.getElementsByTagName('html')[0].removeAttribute('dir');
    this.renderer.removeClass(this.document.body, 'rtl');

    localStorage.setItem('isRtl', 'false');
  }


  get f() {
    return this.ticketForm.controls;
  }

  initForm(){
    this.ticketForm=this.fb.group({
      nominativo:['',Validators.required],
      codice: [this.route.snapshot.paramMap.get("id"), Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(4)]],
      descrizione: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]]
    });
  }

  ngOnInit(): void {
    localStorage.clear()
  }

  onSubmit() {
    if (this.ticketForm.invalid) {
      return;
    } else {
      this.OpenModal();

    }
  }

  redirectToSamePage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }



}
