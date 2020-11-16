import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router'
import { RestaurantService } from 'app/restaurants/restaurants.service';



@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
