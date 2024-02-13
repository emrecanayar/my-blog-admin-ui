import { Filter } from "./Filter";
import { Sort } from "./Sort";

export interface DynamicQuery {
    sort?: Sort[];
    filter?: Filter;
  }
  