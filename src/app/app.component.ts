import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  sorted: boolean = false;
  selectedValues: any = [];
  paginatedData: any[] = [];
  totalRecords: number | undefined;
  rows: number = 3;


  tableData: any[] = [
    {
      name: 'Ticket No',
      sortable: true,
      sortBy: 'ticketNo',
    },
    {
      name: 'Title',
      sortable: false,
      sortBy: 'title',
    },
    {
      name: 'Description',
      sortable: false,
      sortBy: 'description',
    },
    {
      name: 'Status',
      sortable: true,
      sortBy: 'status',
    },
    {
      name: 'Date',
      sortable: true,
      sortBy: 'date',
    },
    {
      name: 'Time',
      sortable: true,
      sortBy: 'time',
    },
    
  ];

  tickets: any[] = [
    {
      id: 1,
      ticketNo: 1,
      title: 'title1',
      description: 'description1',
      status: 'status1',
      date: new Date('2022-01-01'),
      time: '10:00:00',
      done:false
    },
    {
      id: 2,
      ticketNo: 4,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-08'),
      time: '21:00:00',
      done:false
    },
    {
      id: 3,
      ticketNo: 3,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-05'),
      time: '13:45:00',
      done:false
    },
    {
      id: 4,
      ticketNo: 5,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-03'),
      time: '09:30:00',
      done:false
    },
    {
      id: 5,
      ticketNo: 2,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done:false
    },
  ];

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

  deleteAction(index: number) {
    this.paginatedData.splice(index, 1);
    this.openAction(index);
  }

  rejectAction(index: number) {
    this.paginatedData[index].status = 'Rejected';
    this.openAction(index);
    this.paginatedData[index].done = true
    console.log(this.tickets[index].done)
  }

  acceptAction(index: number) {
    this.paginatedData[index].status = 'Accepted';
    this.openAction(index);
    this.paginatedData[index].done = true
    console.log(this.tickets[index].done)
  }


  deleteAll(){
    this.selectedValues.forEach((element: any) => {
      console.log(element)
      console.log(this.tickets[element])
    this.paginatedData.splice(element, 1)
    this.closeAction();
    })
  }

  acceptAll() {
    this.selectedValues.forEach((element: any) => {
      console.log(element)
      this.paginatedData[element].status = 'Accepted';
      this.paginatedData[element].done = true
      this.closeAction();
    })
  }

  rejectAll() {
    this.selectedValues.forEach((element: any) => {
      console.log(element)
      this.paginatedData[element].status = 'Rejected';
      this.paginatedData[element].done = true
      this.closeAction();
      
    })
  }

  closeAction() {
    document.getElementsByClassName('actions-all')[0].classList.remove('popup')
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
