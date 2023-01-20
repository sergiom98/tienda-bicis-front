import { Injectable } from '@angular/core';
import { Bicicleta } from '../interfaces/bicicleta';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor() { }

  actualiza(fileInput: HTMLInputElement, objeto: Bicicleta | Usuario, tipo: string) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      if (tipo == "evento") (<Bicicleta>objeto).image = reader.result as string;
      else (<Usuario>objeto).avatar = reader.result as string;
    });
  }

  actualiza2(fileInput: HTMLInputElement, objeto: Bicicleta | Usuario, tipo: string) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      if (tipo == "evento") (<Bicicleta>objeto).image2 = reader.result as string;
      else (<Bicicleta>objeto).image2 = reader.result as string;
    });
  }

  actualiza3(fileInput: HTMLInputElement, objeto: Bicicleta | Usuario, tipo: string) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      if (tipo == "evento") (<Bicicleta>objeto).image3 = reader.result as string;
      else (<Bicicleta>objeto).image3 = reader.result as string;
    });
  }

}
