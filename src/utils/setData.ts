import { CATALOG_DATA } from "../constants"
import { catalogMockData } from "../mockData/catalogMockData"

export function setInitDatainlocalStorage(){
    localStorage.setItem(CATALOG_DATA,JSON.stringify(catalogMockData))
}