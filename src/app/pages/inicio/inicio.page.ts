import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, IonHeader, 
    HeaderComponent, CodigoqrComponent, MiclaseComponent, ForoComponent, 
    MisdatosComponent, FooterComponent]
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
