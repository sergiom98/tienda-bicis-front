import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bicicleta, Categoria } from 'src/app/interfaces/bicicleta';
import { BicicletaService } from 'src/app/services/bicicleta.service';
import Swal from 'sweetalert2';
import { ImagenService } from 'src/app/services/imagen.service';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 // bicicletas!: BicicletasResponse;
  // id = 1; // de momento

  bicicletas: Bicicleta[]=[];
  categorias: Categoria[];
  bicicleta: Bicicleta = {
    categoria: {
      id:0
    },
    description:"",
    image:"",
    image2: "",
    image3: "",
    name: "",
    price:0
  };
  categoria: Categoria = {
    id:0,
    name:""
  }
  fileName!: '';
  fileName2!: '';
  fileName3!: '';

  showButton = false;
  private scrollHeight = 300;
  bici: Bicicleta;

  constructor(public back:BicicletaService, private router: Router, public imagen:ImagenService,
    public form:FormService, public auth: AuthService,public modalService: NgbModal, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.obtenerBicicletas();
    this.obtenerCategorias();
  }

  @HostListener('window:scroll')
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }
  onScrollTop():void {
    this.document.documentElement.scrollTop = 0;
  }

  obtenerBicicletas() {
    this.back.getAllBicicletas().subscribe(bicicletas => {
      this.bicicletas = bicicletas;
    });
  }

  // obtenerBicicleta(id:number) {
  //   this.back.getBicicleta(id).subscribe(bici => {
  //     this.bici = bici;
  //     console.log(bici)
  //   });
  // }

  obtenerCategorias() {
    this.back.getAllCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }
  modificarCategoria(num:number) {
    this.back.putCategoria(num).subscribe(categoria => {
      this.categoria = categoria;
    });
  }

  modificarBicicleta(num:number) {
    this.back.putBicicleta(num).subscribe(bici => {
      this.bici = bici;
    });
  }

  obtenerBicicletasPorCategoria(num:number) {
      this.back.getBicicletasByCategoria(num).subscribe(bicicletas => {
        this.bicicletas = bicicletas;
      });
  }

  addBicicleta() {
    this.modalService.dismissAll();
    console.log(this.bicicleta);
    this.back.postBicicleta(this.bicicleta).subscribe(() => {
        Swal.fire(
          '¡Genial!',
          'La bicicleta se ha creado correctamente',
          'success'
        ).then(() => {
          this.router.navigate(['/admin']);
          this.obtenerBicicletas();
        });
      },
      (error) => console.error(error)
    );
  }

  borrarBicicleta(id?: number) {
    Swal.fire({
      title: '¿Seguro que quieres borrarlo?',
      text: 'Esta operación no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.back.delBicicleta(id).subscribe(() => {
          this.obtenerBicicletas();
        });
      }
    });
  }


  addCategoria() {
    this.modalService.dismissAll();
    console.log(this.categoria);
    this.back.postCategoria(this.categoria).subscribe(() => {
        Swal.fire(
          '¡Genial!',
          'La categoría se ha creado correctamente',
          'success'
        ).then(() => {
          this.router.navigate(['/admin']);
          this.obtenerBicicletas();
        });
      },
      (error) => console.error(error)
    );
  }


}
