import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // Obtiene el usuario autenticado desde AuthService
    this.usuario = await this.authService.leerUsuarioAutenticado();
  }

  navegarALogin() {
    this.router.navigate(['/ingreso']);
  }
}
