import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { TableService } from '../table.service';
import { Data } from '../data';

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
  @Input() itemsPerPage: number | undefined;
  @Input() totalPages: number = 0;
  @Input() serverConnected: boolean = false;
  @Input() selectAllData: boolean = true;
  @Input() tableData: any[] = [];
  @Input() data: any[] = [];
  @Input() actions: any[] = [];
  @Output() logTicket = new EventEmitter<Data>();
  @Input() actionOn: string = '';

  excludedActions: any[] = [];
  actionsSelected: any[] = [];
  commonActions: any;
  arrayCommonActions: any[] = [];
  selectedValues: any = [];
  paginatedData: any[] = [];
  initialTableData: any[] = [];
  draggedColumn: any = null;
  droppedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (!this.serverConnected) {
      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage!);
      this.updatePaginatedData();
    }
    this.initialTableData = [...this.tableData];
  }

  onLog(ticket: Data) {
    console.log('here');
    this.logTicket.emit(ticket);
  }

  updatePerPage() {
    for (let i = 0; i < this.links.length; i++) {
      this.tableService.getData(this.links[i].link, {page: this.currentPage, per_page: this.itemsPerPage }).subscribe((res)=>{
      console.log(res);
      this.serverConnected = true;
      this.data = res.data.data;
      this.currentPage = res.data.pagination.current_page;
      this.itemsPerPage = res.data.pagination.total_perpage;
      this.totalPages = res.data.pagination.total_page;
    })
  }
  }

  updatePaginatedData() {
    this.resetingData();
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage!);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage!;
    const endIndex = startIndex + this.itemsPerPage!;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  resetingData() {
    this.selectAllData = true;
    this.selectedValues = [];
    this.actionsSelected = [];
  }

  goToPage(page: number) {
    this.closeActionAll();
    this.resetingData();
    if (!this.serverConnected) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedData();
      }
    } else {
      for (let i = 0; i < this.links.length; i++) {
        this.tableService.getData(this.links[i].link, {page, per_page: this.itemsPerPage }).subscribe((res)=>{
        console.log(res);
        this.serverConnected = true;
        this.data = res.data.data;
        this.currentPage = res.data.pagination.current_page;
        this.itemsPerPage = res.data.pagination.total_perpage;
        this.totalPages = res.data.pagination.total_page;
      })
    } 
    }
  }

  nextPage() {
    this.closeActionAll();
    this.resetingData();
    if (!this.serverConnected) {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedData();
      }
    } else {
      for (let i = 0; i < this.links.length; i++) {
        this.tableService.getData(this.links[i].link, {page: this.currentPage + 1, per_page: this.itemsPerPage }).subscribe((res)=>{
        console.log(res);
        this.serverConnected = true;
        this.data = res.data.data;
        this.currentPage = res.data.pagination.current_page;
        this.itemsPerPage = res.data.pagination.total_perpage;
        this.totalPages = res.data.pagination.total_page;
      })
    }
    }
  }

  previousPage() {
    this.closeActionAll();
    this.resetingData();
    if (!this.serverConnected) {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedData();
      }
    } else {
      for (let i = 0; i < this.links.length; i++) {
        this.tableService.getData(this.links[i].link, {page: this.currentPage - 1, per_page: this.itemsPerPage }).subscribe((res)=>{
        console.log(res);
        this.serverConnected = true;
        this.data = res.data.data;
        this.currentPage = res.data.pagination.current_page;
        this.itemsPerPage = res.data.pagination.total_perpage;
        this.totalPages = res.data.pagination.total_page;
      })
    }
    }
  }

  refreshTable() {
    this.tableData = [...this.initialTableData];
    this.droppedColumns = [];
  }

  onDragStart(event: DragEvent, index: number, data : any) {
    if (data.draggable) {
      this.draggedColumn = this.tableData[index];
      event.dataTransfer?.setData('text', index.toString());
    }
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
    if (columnIndex !== null) {
      const columnName = this.droppedColumns.splice(+columnIndex!, 1)[0];
      const column = this.initialTableData.find(
        (col) => col.name === columnName
      );
      if (column) {
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
        this.selectedValues = this.data.map((_, index) => index);
        this.handleActions();
      } else {
        this.selectedValues = this.paginatedData.map((_, index) => index);
        this.handleActions();
      }
    } else {
      this.resetingData();
    }
  }

  private handleActions () {
    this.selectedValues.forEach((element: any) => {
      if (this.serverConnected) {
          const actionOn = this.data[element][this.actionOn];
          const actionOnKey = this.actionOn;
          this.actionsSelected.push({[actionOnKey]: actionOn, index: element})
          this.getActions(this.actionsSelected)
      } else {
          const actionOn = this.paginatedData[element][this.actionOn];
          console.log(actionOn);
          const actionOnKey = this.actionOn;
          this.actionsSelected.push({[actionOnKey]: actionOn, index: element})
          this.getActions(this.actionsSelected)
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
          if (this.data[element].done) {
            this.selectAllData = false;
            alert(
              'You already performed an action on Ticket Number'+
                this.data[element].ticketNo
            );
            hasDoneTicket = true;
          }
        } else {
          if (this.paginatedData[element].done) {
            this.selectAllData = false;
            alert(
              'You already performed an action on Ticket Number'+
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
          this.data.sort((a, b) => (a[property] < b[property] ? -1 : 1));
        } else {
          this.paginatedData.sort((a, b) =>
            a[property] < b[property] ? -1 : 1
          );
        }
      } else if (icon.className === 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        if (this.serverConnected) {
          this.data.sort((a, b) => (a[property] > b[property] ? -1 : 1));
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

  getActions(actionOn: any[]) {
    console.log(actionOn);
    const indexes = [...new Set(actionOn.map(item => item.index))];
    const groupedByIndex: { [key: number]: Set<number> } = {};
    actionOn.forEach(item => {
      if (!groupedByIndex[item.index]) {
        groupedByIndex[item.index] = new Set();
      }
      groupedByIndex[item.index].add(item[this.actionOn]);
    });
    this.commonActions = indexes.reduce((common: any, index) => {
      if (!groupedByIndex[index]) {
        return new Set();
      }
      if (common === null) {
        return new Set(groupedByIndex[index]);
      }
      return new Set([...common].filter(actionOn => groupedByIndex[index].has(actionOn)));
    }, null);
    console.log(this.commonActions);
    this.arrayCommonActions = Array.from(this.commonActions);
    console.log(this.arrayCommonActions);
  }

  selectMany(index: any, event: any, ticketActions?: any) {
    console.log(index, event.target.checked, ticketActions);
  this.closeActionAll();
  if (event.target.checked) {
    this.handleSelection(index, ticketActions);
  } else {
    this.handleDeselection(index);
    this.selectAllData = true;
  }
}

private handleSelection(index: any, ticketStatusKey?: any) {
  console.log(ticketStatusKey);
  this.selectedValues.push(index);
  if (ticketStatusKey) {
    const actionOnKey = this.actionOn;
    console.log(actionOnKey);
    this.actionsSelected.push({ [actionOnKey]: ticketStatusKey, index });
    console.log(this.actionsSelected);
  }
  this.getActions(this.actionsSelected);
}

private handleDeselection(index: any) {
  this.selectedValues = this.selectedValues.filter((i: any) => i !== index);
  this.actionsSelected = this.actionsSelected.filter(item => item.index !== index);
  console.log(this.actionsSelected);
  if (this.actionsSelected.length > 0) {
    this.getActions(this.actionsSelected);
  }
}

  ngOnInit() {
  //  for (let i = 0; i < this.links.length; i++) {
  //     this.tableService.getData(this.links[i].link).subscribe((res)=>{
  //       console.log(res);
  //       this.serverConnected = true;
  //       this.data = res.data.data;
  //       this.currentPage = res.data.pagination.current_page;
  //       this.itemsPerPage = res.data.pagination.total_perpage;
  //       this.totalPages = res.data.pagination.total_page;
  //     })
  //   }
  }
}