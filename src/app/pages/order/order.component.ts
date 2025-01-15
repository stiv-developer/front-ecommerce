import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  products: any[] = [];
  clients: any[] = [];

  selectedProducts: any[] = [];
  selectedClient: any = null;
  total: number = 0;

  constructor(private productService: ProductService,
              private clientService: ClientService,
              private orderService: OrderService
  ) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error)
      }
    );

    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching products', error)
      }
    )
  }

  addProduct(name: string, price: number) {
    const newProduct = {
      name: name,
      quantity: 1,
      price: Number(price),
      unitPrice: Number(price),
      totalPrice: Number(price)
    };
    this.selectedProducts.push(newProduct);
    this.calculateTotal();
  }

  increaseQuantity(product: any) {
    product.quantity++;
    product.price = product.unitPrice * product.quantity;
    this.calculateTotal();
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      product.price = product.unitPrice * product.quantity;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.selectedProducts.reduce((acc, product) => acc + product.price, 0)
  }

  registerOrder() {
    if (!this.selectedClient) {
      console.error('No client selected');
      return;
    }

    const order = {
      idClient: this.selectedClient.id,
      client: this.selectedClient.name,
      nroOrder: Math.floor(Math.random() * 1000).toString(), // Generar un número de orden aleatorio
      products: this.selectedProducts.map(product => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        totalPrice: product.totalPrice
      })),
      total: this.total
    };

    this.orderService.registerOrder(order).subscribe(
      (response) => {
        console.log('Order registered successfully', response);
      },
      (error) => {
        console.error('Error registering order', error);
      }
    );
  }

}
