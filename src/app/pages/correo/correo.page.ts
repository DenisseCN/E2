import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, AnimationController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
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
export class CorreoPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public correo: string = '';

  // Inyección de dependencias
  private animationController = inject(AnimationController);
  private alertController = inject(AlertController);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {}

  public async ingresarValidarRespuestaSecreta(): Promise<void> {
    // Crear usuario para simulación de búsqueda
    const usuario = new Usuario();
    const usuarioEncontrado = await usuario.buscarUsuarioPorCuenta(this.correo);

    if (!usuarioEncontrado) {
      // Redirigir a la página de "incorrecto" si no se encuentra el usuario
      await this.router.navigate(['/incorrecto']);
    } else {
      // Navegar a la página de pregunta con el usuario encontrado
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      await this.router.navigate(['/pregunta'], navigationExtras); 
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
