import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css'
})
export class UpdateOrderComponent implements OnInit{

  order: any = null;
  clients: any[] = [];
  products: any[] = [];
  selectedClient: any = null;
  selectedProducts: any[] = [];
  total: number = 0 ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private clientService: ClientService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(
        (data) => {
          this.order = data;
          this.selectedProducts = this.order.products;
          this.total = this.order.total; // Cargar el total desde la base de datos
          this.clientService.getClients().subscribe(
            (clientsData) => {
              this.clients = clientsData;
              this.selectedClient = this.clients.find(client => client.name === this.order.client);
            },
            (error) => {
              console.error('Error fetching clients', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching order', error);
        }
      );
    }

    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  updateOrder(): void {
    if (this.order) {
      this.order.client = this.selectedClient.name;
      this.order.products = this.selectedProducts.map(product => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        totalPrice: product.totalPrice
      }));
      this.order.total = this.total; // Actualizar el total de la orden
      this.orderService.updateOrder(this.order.id, this.order).subscribe(
        (response) => {
          console.log('Order updated successfully', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error updating order', error);
        }
      );
    }
  }

  addProduct(name: string, price: number): void {
    const newProduct = {
      name: name,
      quantity: 1,
      price: Number(price),
      unitPrice: Number(price),
      totalPrice: Number(price) // Inicializar totalPrice
    };
    this.selectedProducts.push(newProduct);
    this.calculateTotal();
  }

  increaseQuantity(product: any): void {
    product.quantity++;
    product.totalPrice = product.unitPrice * product.quantity; // Actualizar totalPrice
    this.calculateTotal();
  }

  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
      product.totalPrice = product.unitPrice * product.quantity; // Actualizar totalPrice
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.selectedProducts.reduce((acc, product) => acc + Number(product.totalPrice), 0);
    if (this.order) {
      this.order.total = this.total; // Actualizar el total de la orden
    }
  }

}
