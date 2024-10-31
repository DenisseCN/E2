import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, AnimationController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  animations: [
    trigger('fadeInAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PreguntaPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public usuario: any; // Usuario autenticado desde Storage
  public respuesta: string = '';

  // Inyección de dependencias
  private authService = inject(AuthService);
  private animationController = inject(AnimationController);
  private alertController = inject(AlertController);
  private router = inject(Router);

  constructor() {}

  async ngOnInit() {
    // Recupera el usuario autenticado de Storage
    this.usuario = await this.authService.leerUsuarioAutenticado();
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcto'], {
        state: { usuario: this.usuario }
      });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  private animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(9000)
      .fromTo('transform', 'translateX(-50%)', 'translateX(100%)')
      .fromTo('opacity', 0.5, 1)
      .play();
  }
}
