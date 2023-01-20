export interface Bicicleta {
  image: string;
  image2: string;
  image3: string;
  price: number;
  name: string;
  id?: number;
  description?: string;
  categoria?: Categoria;
}

export interface Categoria {
  id?: number;
  name?: string;
}

export interface BicicletasResponse {
  bicicletas: Bicicleta;
}
