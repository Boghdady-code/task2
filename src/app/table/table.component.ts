import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  sorted: boolean = false;
  selectedValues: any = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  

  initialTableData: any[] = [];
  draggedColumn: any = null;
  droppedColumns: string[] = [];

  
  @Input() selectAllData: boolean = true;
  @Input() tableData: any[] = [];
  @Input() tickets: any[] = [];
  @Input() actions: any[] = [];




  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.tickets.slice(startIndex, endIndex);
  }


  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  refreshTable() {
    this.tableData = [...this.initialTableData];

    this.droppedColumns.forEach((column) => {
      this.tableData.forEach((ticket) => {
        if (ticket.name == column) {
          const columnDataName = ticket.sortBy;
          this.showColumn(columnDataName);
        }
      });
    });
    this.droppedColumns = [];
  }

  onDragStart(event: DragEvent, index: number) {
    this.draggedColumn = this.tableData[index];
    event.dataTransfer?.setData('text', index.toString());
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const index = event.dataTransfer?.getData('text');
    if (index !== null) {
      const column = this.tableData[+index!];
      this.droppedColumns.push(column.name);
      this.hideColumn(column.sortBy);
      this.tableData = this.tableData.filter((_, i) => i !== +index!);
    }
    this.draggedColumn = null;
  }

  hideColumn(columnDataName: string) {
    console.log(`Hiding elements with class: ${columnDataName}`);
    const targetElements = document.getElementsByClassName(columnDataName);
    Array.from(targetElements).forEach((element) => {
      element.classList.add('d-none');
    });
  }

  showColumn(columnDataName: string) {
    console.log(`Showing elements with class: ${columnDataName}`); 

    const targetElements = document.getElementsByClassName(columnDataName);
    Array.from(targetElements).forEach((element) => {
      element.classList.remove('d-none');
    });
  }

  onDropToTable(event: DragEvent, i: number) {
    event.preventDefault();
    const columnIndex = event.dataTransfer?.getData('text');
    console.log(columnIndex);
    if (columnIndex !== null) {
      const columnName = this.droppedColumns.splice(+columnIndex!, 1)[0];
      console.log(columnName);
      const column = this.initialTableData.find(
        (col) => col.name === columnName
      );
      if (column) {
        console.log(i);
        console.log(column);
        this.tableData.splice(i, 0, column);
        this.showColumn(column.sortBy);
      }
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  selectAll(event: any) {
    if (event.target.checked) {
      this.selectedValues = this.paginatedData.map((_, index) => index);
    } else {
      this.selectedValues = [];
    }
  }

  openActionAll() {
    const actionAll = document.querySelector('#actions-all');
    if (this.selectedValues.length > 0) {
      let hasDoneTicket = false;
      this.selectedValues.forEach((element: any) => {
        if (this.paginatedData[element].done) {
          this.selectAllData = false;
          alert(
            'You already performed an action on Ticket Number ' +
              this.paginatedData[element].ticketNo
          );
          hasDoneTicket = true;
        }
      });

      if (!hasDoneTicket && actionAll) {
        if (actionAll.classList.contains('popup')) {
          this.renderer.removeClass(actionAll, 'popup');
          this.renderer.addClass(actionAll, 'popdown');
        } else {
          this.renderer.removeClass(actionAll, 'popdown');
          this.renderer.addClass(actionAll, 'popup');
        }
      }
    }
  }

  sort(data: any, i: any) {
    if (data.sortable) {
      const icon = document.getElementById(i);
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
    } else {
      this.selectedValues = this.selectedValues.filter((i: any) => i !== index);
    }
  }


  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.totalPages = Math.ceil(this.tickets.length / this.itemsPerPage);
    this.updatePaginatedData();
    this.initialTableData = [...this.tableData];
  }
}