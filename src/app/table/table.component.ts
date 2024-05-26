import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  constructor(
    private renderer: Renderer2,
    private tableService: TableService
  ) {}

  @Input() links: any[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 3;
  @Input() totalPages: number = 0;
  @Input() serverConnected: boolean = false;
  @Input() selectAllData: boolean = true;
  @Input() tableData: any[] = [];
  @Input() tickets: any[] = [];
  @Input() actions: any[] = [];

  excludedActions: any[] = [];
  actionsSelected: any[] = [];
  commonActions: any;
  arrayCommonActions: any[] = [];
  unUsedActions: any[]=[];
  sorted: boolean = false;
  selectedValues: any = [];
  paginatedData: any[] = [];
  initialTableData: any[] = [];
  draggedColumn: any = null;
  droppedColumns: string[] = [];
  


  ngOnChanges(changes: SimpleChanges) {
    if (!this.serverConnected) {
      this.totalPages = Math.ceil(this.tickets.length / this.itemsPerPage!);
      this.updatePaginatedData();
    }
    this.initialTableData = [...this.tableData];
    console.log(this.totalPages)
  }

  updatePerPage() {
    this.tableService.getData(this.links[0].link, {page: this.currentPage, per_page: this.itemsPerPage }).subscribe((res) => {
      this.tickets = res.data.data;
      this.currentPage = res.data.pagination.current_page;
      this.itemsPerPage = res.data.pagination.total_perpage;
      this.totalPages = res.data.pagination.total_page;
    })
  }

  updatePaginatedData() {
    this.totalPages = Math.ceil(this.tickets.length / this.itemsPerPage!);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage!;
    const endIndex = startIndex + this.itemsPerPage!;
    this.paginatedData = this.tickets.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.closeActionAll();
    this.actionsSelected = [];
    this.selectedValues = [];
    this.selectAllData = true;
    if (!this.serverConnected) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedData();
      }
    } else {
      this.tableService.getData(this.links[0].link, {page, per_page: this.itemsPerPage }).subscribe((res) => {
        this.tickets = res.data.data;
        this.currentPage = res.data.pagination.current_page;
        this.itemsPerPage = res.data.pagination.total_perpage;
        this.totalPages = res.data.pagination.total_page;
      })
    }
  }

  nextPage() {
    this.closeActionAll();
    this.actionsSelected = [];
    this.selectedValues = [];
    this.selectAllData = true;
    if (!this.serverConnected) {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedData();
      }
    } else {
      this.tableService.getData(this.links[0].link, {page: this.currentPage + 1, per_page: this.itemsPerPage }).subscribe((res) => {
        this.tickets = res.data.data;
        this.currentPage = res.data.pagination.current_page;
        this.itemsPerPage = res.data.pagination.total_perpage;
        this.totalPages = res.data.pagination.total_page;
      })
    }
  }

  previousPage() {
    this.closeActionAll();
    this.actionsSelected = [];
    this.selectedValues = [];
    this.selectAllData = true;
    if (!this.serverConnected) {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedData();
      }
    } else {
      this.tableService.getData(this.links[0].link, {page: this.currentPage - 1, per_page: this.itemsPerPage }).subscribe((res) => {
        this.tickets = res.data.data;
        this.currentPage = res.data.pagination.current_page;
        this.itemsPerPage = res.data.pagination.total_perpage;
        this.totalPages = res.data.pagination.total_page;
      }) 
    }
  }

  refreshTable() {
    this.tableData = [...this.initialTableData];
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
      this.tableData = this.tableData.filter((_, i) => i !== +index!);
    }
    this.draggedColumn = null;
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
      }
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  selectAll(event: any) {
    if (event.target.checked) {
      if (this.serverConnected) {
        this.selectedValues = this.tickets.map((_, index) => index);
        this.handleCommonActions();
      } else {
        this.selectedValues = this.paginatedData.map((_, index) => index);
        this.handleCommonActions();
      }
    } else {
      this.selectedValues = [];
    }
  }

  private handleCommonActions () {
    this.selectedValues.forEach((element: any) => {
      if (this.serverConnected) {
        const  actions = this.tickets[element].actions;
        actions.forEach((action: any) => {
          this.actionsSelected.push({action: action, index: element})
          this.getCommonActions(this.actionsSelected)
        })
      } else {
        const  actions = this.paginatedData[element].actions;
        actions.forEach((action: any) => {
          this.actionsSelected.push({action: action, index: element})
          this.getCommonActions(this.actionsSelected)
        })
      }
      })
      this.arrayCommonActions = Array.from(this.commonActions)
  }

  openActionAll() {
    const actionAll = document.querySelector('#actions-all');
    if (this.selectedValues.length > 0) {
      let hasDoneTicket = false;
      this.selectedValues.forEach((element: any) => {
        if (this.serverConnected) {
          if (this.tickets[element].done) {
            this.selectAllData = false;
            alert(
              'You already performed an action on Ticket Number' +
                this.tickets[element].ticketNo
            );
            hasDoneTicket = true;
          }
        } else {
          if (this.paginatedData[element].done) {
            this.selectAllData = false;
            alert(
              'You already performed an action on Ticket Number' +
                this.paginatedData[element].ticketNo
            );
            hasDoneTicket = true;
          }
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
        if (this.serverConnected) {
          this.tickets.sort((a, b) => (a[property] < b[property] ? -1 : 1));
        } else {
          this.paginatedData.sort((a, b) =>
            a[property] < b[property] ? -1 : 1
          );
        }
      } else if (icon.className === 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        if (this.serverConnected) {
          this.tickets.sort((a, b) => (a[property] > b[property] ? -1 : 1));
        } else {
          this.paginatedData.sort((a, b) =>
            a[property] > b[property] ? -1 : 1
          );
        }
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

  closeActionAll() {
    document.getElementById('actions-all')?.classList.remove('popup');
  }

  closeAction() {
    document.querySelectorAll('.actions').forEach((action) => {
      action.classList.remove('popup');
      action.classList.add('popdown');
    });
  }

  getCommonActions(status: any[]) {
    const indexes = [...new Set(status.map(item => item.index))];
    const groupedByIndex: { [key: number]: Set<number> } = {};
    status.forEach(item => {
      if (!groupedByIndex[item.index]) {
        groupedByIndex[item.index] = new Set();
      }
      groupedByIndex[item.index].add(item.status);
    });
    this.commonActions = indexes.reduce((common, index) => {
      if (!groupedByIndex[index]) {
        return new Set();
      }
      if (common === null) {
        return new Set(groupedByIndex[index]);
      }
      return new Set([...common].filter(status => groupedByIndex[index].has(status)));
    }, null);
    
    this.arrayCommonActions = Array.from(this.commonActions);
  }

  

  selectMany(index: any, event: any, ticketActions?: any) {
  this.closeActionAll();
  if (event.target.checked) {
    this.handleSelection(index, ticketActions);
  } else {
    this.handleDeselection(index);
  }
}

private handleSelection(index: any, ticketStatus?: any) {
  this.selectedValues.push(index);
  if (ticketStatus) {
    this.actionsSelected.push({ status: ticketStatus, index });
    console.log(this.actionsSelected);
  }
  this.getCommonActions(this.actionsSelected);
}

private handleDeselection(index: any) {
  this.selectedValues = this.selectedValues.filter((i: any) => i !== index);
  this.actionsSelected = this.actionsSelected.filter(item => item.index !== index);
  console.log(this.actionsSelected);
  if (this.actionsSelected.length > 0) {
    this.getCommonActions(this.actionsSelected);
  }
}

  ngOnInit() {
   
  }
}