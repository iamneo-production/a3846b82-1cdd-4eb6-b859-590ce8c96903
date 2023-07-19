import { Pipe, PipeTransform } from '@angular/core';


// Custom filter pipe
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filters: any): any {
    return items.filter(item => {
      // Check each property against its corresponding filter value
      for (const key in filters) {
        if (filters[key] && item[key]) {
          // Case-insensitive filtering
          if (typeof item[key] === 'string') {
            if (item[key].toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
              return false;
            }
          } else {
            if (item[key] !== filters[key]) {
              return false;
            }
          }
        }
      }
      return true;
    });
  }
}



