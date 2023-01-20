import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bicicleta, BicicletasResponse, Categoria} from '../interfaces/bicicleta';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class BicicletaService {
  buscar="";
  constructor(private http: HttpClient) { }
  getAllBicicletas(){
    return this.http.get<Bicicleta[]>('http://localhost:8080/bicicletas');
  }
  getAllCategorias() {
    return this.http.get<Categoria[]>('http://localhost:8080/categorias');
  }
  putCategoria(id: number) {
    return this.http.put<Categoria>('http://localhost:8080/categorias', id);
  }
  putBicicleta(id: number) {
    return this.http.put<Bicicleta>('http://localhost:8080/bicicletas', id);
  }
  getBicicleta(id:number) {
    return this.http.get(`http://localhost:8080/bicicletas/${id}/`);
  }
  getBicicletasByCategoria(num : number) {
    return this.http.get<Bicicleta[]>(`http://localhost:8080/bicicletas?categoria=${num}`);
  }
  postBicicleta(bicicleta: Bicicleta) {
    return this.http.post("http://localhost:8080/bicicletas", bicicleta);
  }
  postCategoria(categoria: Categoria) {
    return this.http.post("http://localhost:8080/categorias", categoria);
  }
  delBicicleta(id?: number) {
    return this.http.delete(`http://localhost:8080/bicicletas/${id}/`);
  }
  postUsuario(usuario: Usuario) {
    return this.http.post("http://localhost:8080/auth/registro", usuario);
  }
  postLogin(usuario: Usuario): Observable<Login> {
    return this.http.post<Login>("http://localhost:8080/auth/login", usuario);
  }
  // getAllBicicletas(): Observable<BicicletasResponse> {
  //   return this.http.get<BicicletasResponse>('http://localhost:8080/bicicletas');
  // }

  // getBicicleta(id:number) {
  //   return this.tiendaB.find(item => id === item.id);
  // }
}
