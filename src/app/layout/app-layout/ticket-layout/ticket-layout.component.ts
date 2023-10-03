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


@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: []
})
export class TicketLayoutComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  public Editor: any = ClassicEditor;
  public cliente!: ClienteTicket;

  public ticketForm!:UntypedFormGroup;

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
    private fb:UntypedFormBuilder
  ) {

    super();


    this.subs.sink = this.ticketingservice.ClienteExist(this.route.snapshot.paramMap.get("id")).subscribe({
      next:(res:ClienteTicket)=>{
        this.cliente=res;
      },
      error: () => {
        this.router.navigate(['/clienteNotFound']);
      }
    })



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

  ngOnInit(): void {
    localStorage.clear()
    this.ticketForm=this.fb.group({
      nominativo:['',Validators.required],
      codice: [this.route.snapshot.paramMap.get("id"), Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^(\\((00|\\+)39\\)|(00|\\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\\d{7}$")]],
      descrizione: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]]
    });


  }

  onSubmit() {
    if (this.ticketForm.invalid) {
      return;
    } else {
      var ticket = new TicketReq(this.ticketForm.value)
      this.subs.sink = this.ticketingservice
        .InsertTicket(ticket)
        .subscribe({
          next: (res) => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Ticket Inviato con successo',
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

  protected readonly JSON = JSON;
}
