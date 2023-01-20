import { Pipe, PipeTransform } from '@angular/core';
import { Bicicleta } from '../interfaces/bicicleta';

@Pipe({
  name: 'bicicletaFilter'
})
export class BicicletaFilterPipe implements PipeTransform {

  transform(bicicletas: Bicicleta[], filter: string): Bicicleta[] {
    if (filter) {
      const filtro = filter.toLocaleLowerCase();
      return bicicletas.filter(
        (bicicleta) =>
          bicicleta.name.toLocaleLowerCase().includes(filtro) ||
          bicicleta.description.toLocaleLowerCase().includes(filtro)
      );
    }
    return bicicletas;
  }
}
