import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetFilters, updateFilteredProducts } from '../../store/actions/product.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchText: string = '';

  constructor(private router: Router, private store: Store) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onSearch() {
    this.store.dispatch(updateFilteredProducts({ searchText: this.searchText }));
  }

  reset() {
    this.store.dispatch(resetFilters());
    this.searchText = '';
    this.store.dispatch(updateFilteredProducts({ searchText: this.searchText }));
    this.router.navigate(['/']);
  }
}
