import { CommonModule } from "@angular/common";
import { Input, ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderService } from "app/order/order.service";
import { ShoppingCartService } from "app/restaurant-detail/shopping/shopping.service";
import { RestaurantService } from "app/restaurants/restaurants.service";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";


@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [SnackbarComponent, InputComponent, RadioComponent, RatingComponent, CommonModule, FormsModule, ReactiveFormsModule]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantService, OrderService, NotificationService]
        }
    }
}