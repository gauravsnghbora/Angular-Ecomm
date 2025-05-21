import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetFilters, updateFilterCriteria, updateFilteredProducts } from '../../store/actions/product.actions';
import { selectFilterCriteria } from 'src/app/store/selectors/product.selectors';
import { FilterCriteria } from 'src/app/models/filter-criteria.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchText: string = '';
  filterCriteria!: FilterCriteria;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.select(selectFilterCriteria).subscribe((filterCriteria: FilterCriteria) => 
          this.filterCriteria = filterCriteria
          );
  }

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

onCategorySelection(category: string) {
    const filterCriteria: FilterCriteria = {
      ...this.filterCriteria,
      category,
    };
    this.store.dispatch(updateFilterCriteria({filterCriteria}));
  }

}
