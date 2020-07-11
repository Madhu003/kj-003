import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor() { }

  getAllTags() {
    return [
      { name: 'Gold' },
      { name: 'Silver' },
      { name: 'Order-645' },
      { name: 'Bill-555' },
      { name: 'Rings' }
    ];
  }
}
