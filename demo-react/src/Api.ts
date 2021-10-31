import {CoffeeShop} from "./models";

export class Api {
  authToken: string;
  constructor(authToken: string) {
    this.authToken = authToken;
  }
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  BASE_URL = '/api/coffeeshops';

  createHeaders() {
    return this.authToken ? {
      ...this.headers,
      'Authorization': 'Bearer ' + this.authToken
    } : this.headers;
  }

  async getAll() {
    return await fetch(this.BASE_URL, {
      method: 'GET',
      headers: this.createHeaders()
    });
  }

  async getById(id: number) {
    return await fetch(`${this.BASE_URL}/${id}`, {
      method: 'GET',
      headers: this.createHeaders()
    });
  }

  async delete(id: number) {
    return await fetch(`${this.BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: this.createHeaders()
    });
  }

  async update(item: CoffeeShop) {
    return await fetch(`${this.BASE_URL}/${item.id}`, {
      method: 'PUT',
      headers: this.createHeaders(),
      body: JSON.stringify(item)
    });
  }

  async create(item: CoffeeShop) {
    return await fetch(this.BASE_URL, {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify(item)
    });
  }
}
