import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ImagesLayoutComponent } from './components/shared/images-layout/images-layout.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { Route, RouterModule } from '@angular/router';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { ErrorComponent } from './components/shared/error/error.component';
import { CheckLoginGuard } from './guards/check-login.guard';
import { BicicletaFilterPipe } from './pipes/bicicleta-filter.pipe';

const APP_ROUTES: Route[] = [
  { path: '', component: PaginaPrincipalComponent },
  { path: 'bicicletas', component: ListaProductosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'bicicletas/:id', component: DetalleProductoComponent },
  { path: 'admin', component: AdminComponent, canActivate: [CheckLoginGuard]},
  { path: 'cart', component: CartComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ImagesLayoutComponent,
    ListaProductosComponent,
    DetalleProductoComponent,
    ContactoComponent,
    FooterComponent,
    PaginaPrincipalComponent,
    AdminComponent,
    CartComponent,
    ErrorComponent,
    BicicletaFilterPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
