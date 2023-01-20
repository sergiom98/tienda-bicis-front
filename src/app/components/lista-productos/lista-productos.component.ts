import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Bicicleta, BicicletasResponse } from 'src/app/interfaces/bicicleta';
import { BicicletaService } from 'src/app/services/bicicleta.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  // bicicletas!: BicicletasResponse;
  // id = 1; // de momento

  bicicletas: Bicicleta[]=[];
  bicicleta: Bicicleta={
    image:"",
    image2:"",
    image3:"",
    price:0,
    name: "",
    id: 0,
    description:"",
    categoria: {
      id:0
    }
  };
  showButton = false;
  private scrollHeight = 300;
  constructor(public back:BicicletaService, private cartService:CartService,
    @Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll')
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop():void {
    this.document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.obtenerBicicletas();
  }



  obtenerBicicletas() {
    this.back.getAllBicicletas().subscribe(bicicletas => {
      this.bicicletas = bicicletas;
    });
  }

  obtenerBicicletasPorCategoria(num:number) {
      this.back.getBicicletasByCategoria(num).subscribe(bicicletas => {
        this.bicicletas = bicicletas;
      });
    }

}

