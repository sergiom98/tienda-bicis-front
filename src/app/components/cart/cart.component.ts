import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bicicleta } from 'src/app/interfaces/bicicleta';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // @Input() valor : Bicicleta;
  // @Output() comprarBici: EventEmitter<any>=new EventEmitter();
  public product : any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.product = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(item : any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
  // comprar(){
  //   this.comprarBici.emit(this.valor);
  // }


}
