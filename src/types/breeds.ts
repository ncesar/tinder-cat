import { CatBreed } from "./cat";

export interface Breed {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: CatBreed[];
}