import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  sorted: boolean = false;
  selectedValues: any = [];
  paginatedData: any[] = [];
  totalRecords: number | undefined;
  rows: number = 3;


  @Input() tableData: any[] = []
  @Input() tickets: any[] = []
  @Input() actions: any[] = []



  draggedColumn: any = null;
  droppedColumns: string[] = [];

  onDragStart(event: DragEvent, index: number) {
    this.draggedColumn = index;
    event.dataTransfer?.setData('text', index.toString());
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const index = event.dataTransfer?.getData('text');
    if (index !== null) {
      console.log(index);
      const column = this.tableData[+index!];
      this.droppedColumns.push(column.name);
      this.droppedColumns.forEach((column) => {
        if (this.tableData.find((c) => c.name === column)) {
          let sortBy = this.tableData.find((c) => c.name === column)?.sortBy;
          console.log(sortBy);
          this.paginatedData.map((ticket) => {
            if (ticket[sortBy]) {
              delete ticket[sortBy];
              let targetColumn = document.getElementsByClassName(sortBy)[0];
              targetColumn.remove()
            }
          });
        }
      });
      this.tableData = this.tableData.filter((_, i) => i !== +index!);
      console.log(this.droppedColumns);
      console.log(this.draggedColumn);
    }
    this.draggedColumn = null;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }


selectAll(event:any){
  if (event.target.checked) {
    this.selectedValues = [];
    for (let index = 0; index < this.paginatedData.length; index++) {
      this.selectedValues.push(index);
    }
  } else {
    this.selectedValues = [];
  }
  
}

  openActionAll() {
  if (this.selectedValues.length > 0) {
  this.selectedValues.forEach((element: any) => {
  if (this.paginatedData[element].done == false) {
      const allActions = document.querySelector('.actions-all');
      
        if (allActions!.classList.contains('popup')) {
          allActions!.classList.remove('popup');
          allActions!.classList.add('popdown');
        } else if (allActions!.classList.contains('popdown')) {
          allActions!.classList.remove('popdown');
          allActions!.classList.add('popup');
        } else {
          allActions!.classList.add('popup');
        }
    } else {
    alert('You already Performed an Action to Ticket Number' + this.tickets[element].ticketNo)
    }
  })
  }}

  sort(data: any, i: any) {
    console.log(data);
    if (data.sortable) {
      let icon;
      icon = document.getElementById(i);
      this.sortByProperty(icon, data.sortBy);
    }
  }

  sortByProperty(icon: any, property: string) {
    if (icon) {
      if (icon.className === 'fa-solid fa-sort') {
        icon.className = 'fa-solid fa-sort-down';
        icon.style.color = 'green';
        this.paginatedData.sort((a, b) => (a[property] < b[property] ? -1 : 1));
      } else if (icon.className === 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        this.paginatedData.sort((a, b) => (a[property] > b[property] ? -1 : 1));
      }
    }
  }

  openAction(index: number) {
    const allActions = document.querySelectorAll('.actions');
    allActions.forEach((action, i) => {
      if (i !== index) {
        if (action.classList.contains('popup')) {
          action.classList.remove('popup');
          action.classList.add('popdown');
        }
      }
    });
    const clickedAction = allActions[index];
    if (clickedAction.classList.contains('popup')) {
      clickedAction.classList.remove('popup');
      clickedAction.classList.add('popdown');
    } else {
      clickedAction.classList.remove('popdown');
      clickedAction.classList.add('popup');
    }
  }

  selectMany(index: any, event: any) {
    if (event.target.checked) {
      this.selectedValues.push(index);
      console.log(this.selectedValues);
    } else {
      this.selectedValues.splice(this.selectedValues.indexOf(index), 1);
      console.log(this.selectedValues);
    }
  }

  loadData() {
    
    this.totalRecords = this.tickets.length;
    this.paginate({ first: 0, rows: this.rows });
  }

  paginate(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedData = this.tickets.slice(start, end);
    console.log(event);
  }

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

}
