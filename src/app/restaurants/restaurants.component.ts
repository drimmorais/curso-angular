import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations:[
    trigger('toggleSearch',[
      state('hidden', style({
        opacity:0,
        "max-heigth" : "0px"
      })),
      state('visible', style({
        opacity:1,
        "max-heigth" : "70px",
        "margin-top" : "20px",
        "margin-bottom" : "50px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
 
})
export class RestaurantsComponent implements OnInit {


  searchBarState = 'hidden'

  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService: RestaurantService,
     private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(searchTerm => 
      this.restaurantService
      .restaurants(searchTerm)
      .catch(error => Observable.from([])))
    .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
