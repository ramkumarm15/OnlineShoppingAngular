import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/Service/auth.service';
import {Title} from '@angular/platform-browser';
import {UserService} from 'src/app/Service/user.service';
import {ProductService} from "../../Service/product.service";
import {Product} from "../../Model/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private documentTitle: Title,
    private user: UserService,
    private productService: ProductService,
    private router: Router
  ) {
  }

  private pageTitle = 'Home | User Registration';

  name: string = '';
  id: number = 0;
  data: any;
  products !: Product[]

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);

    if (this.auth.getUserToken() != null) {
      this.name = this.user.preferredUserName;
      this.id = this.user.id;
    }
    this.getProducts()
  }

  getProducts() {
    this.productService.getProduct().subscribe({
      next: (products: Product[]) => {
        console.log(products)
        this.products = products;
        this.changeFilter("orderAsc")
      }
    })
  }

  changeFilter(orderByFilter: string) {
    this.router.navigate([''], {
      queryParams: {orderBy: orderByFilter}
    })

    switch (orderByFilter) {
      case "orderAsc":
        this.orderByAsc()
        break;
      case "orderDesc":
        this.orderByDesc()
        break;
    }
  }

  orderByAsc(){
    this.products.sort(function (a:Product,b:Product){
      return (a.price - b.price)
    })
  }
  orderByDesc(){
    this.products.sort(function (a:Product,b:Product){
      return (b.price - a.price)
    })
  }
}
