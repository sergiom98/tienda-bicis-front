import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from 'src/app/interfaces/login';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { BicicletaService } from 'src/app/services/bicicleta.service';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { ImagenService } from 'src/app/services/imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  emailconfirm = '';
  usuario: Usuario = {
    correo: '',
    nombre: '',
    password: '',
  };
  public totalItem : number = 0;

  constructor(public back: BicicletaService,
    public auth: AuthService,
    public imagen: ImagenService,
    public form: FormService,
    public modalService: NgbModal,
    private cartService:CartService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.totalItem = res.length;
      console.log(this.totalItem);
    })
  }


  registrarse() {
    console.log(this.usuario);
    this.modalService.dismissAll();
    this.back.postUsuario(this.usuario).subscribe(
      () => {
        Swal.fire('¡Enhorabuena!', 'Usuario creado con éxito', 'success');
      },
      (error) => {
        Swal.fire('Ha habido algún error', error, 'warning');
        console.log(error);
      }
    );
  }

  login() {
    console.log(this.usuario);
    this.modalService.dismissAll();
    this.back.postLogin(this.usuario).subscribe(
      (resp: Login) => {
        this.auth.login(resp.accessToken);
        Swal.fire(
          '¡Enhorabuena!',
          '<p>Has iniciado sesión con éxito.</p>',
          'success'
        );
        this.router.navigate(["/"]);
      },
      (error) => {
        Swal.fire(
          'Ha habido algún error para iniciar sesión',
          error.error.message,
          'warning'
        );
      }
    );
  }

  // cambiarTema(styleName: string) {
  //   const head = this.document.getElementsByTagName('head')[0];
  //   let themeLink = this.document.getElementById(
  //     'custom-theme-css'
  //   ) as HTMLLinkElement;
  //   if (themeLink) {
  //     themeLink.href = `${styleName}.scss`;
  //   } else {
  //     const style = this.document.createElement('link');
  //     style.id = 'custom-theme-scss';
  //     style.rel = 'stylesheet';
  //     style.href = `${styleName}.scss`;
  //     head.appendChild(style);
  //   }
  // }

}
