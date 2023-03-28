import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  constructor(private router: Router) {}

  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], searchText: string): any[] {
    if (items.length === 0 || searchText === '') {
      return items;
    }
    const resultArray = [];

    console.log('Here is the router link:>>>', this.router.url);

    for (const item of items) {
      if (this.router.url.includes('actors')) {
        if (
          item.firstName
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item.lastName
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        ) {
          resultArray.push(item);
        }
      }
      if (this.router.url.includes('movies')) {
        if (
          item.movieTitle
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        ) {
          resultArray.push(item);
        }
      }
    }

    return resultArray;

    // if (!searchText) {
    //   return items;
    // }
    // searchText = searchText.toLocaleLowerCase();

    // return items.filter(it => {
    //   return it.toLocaleLowerCase().includes(searchText);
    // });
  }
}
