import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bicicleta } from 'src/app/interfaces/bicicleta';
import { BicicletaService } from 'src/app/services/bicicleta.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  http: any;
  public productList : any;

  constructor(public route:ActivatedRoute, public back:BicicletaService, private cartService:CartService) { }
  id: number;
  bicicletas:any;
  cesta: Bicicleta[] = [];

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params)=>{
    //   const id = parseInt(params.id);
    //   console.log(id);
    this.idBiciActual();
    this.obtenerBicicleta();
    this.crearObjetoCarro();
  }

  crearObjetoCarro() {
    this.cartService.getProducts()
    .subscribe(res => {
      this.productList = res;
       this.productList.forEach((a:any) => {
         Object.assign(a,{quantity:1,total:a.price});
       });
    });
  }
  obtenerBicicleta() {
    this.back.getBicicleta(this.id).subscribe(bicicletas => {
      this.bicicletas = bicicletas;
      console.log(bicicletas);
    });
  }
  addtoCart(item: any) {
    this.cartService.addtoCart(item);
  }
  idBiciActual() {
    this.id = + this.route.snapshot.params.id;
    console.log(this.id);
  }

  // recuperarCurso(){
  //   this.cesta= JSON.parse(localStorage.getItem('cesta')!);
  // }

  // recibir(objeto:Bicicleta){
  //   this.cesta.push(objeto);
  //   localStorage.setItem("cesta", JSON.stringify(this.cesta));
  // }

}
