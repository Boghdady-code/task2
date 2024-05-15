import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  sorted: boolean = false;
  @ViewChild('ticketNo') ticketNo!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('status') status!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  @ViewChild('time') time!: ElementRef;

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

  tickets : any[] = [
    {
      id: 1,
      ticketNo: 1,
      title: 'title1',
      description: 'description1',
      status: 'status1',
      date: new Date('2022-01-01'),
      time: '10:00:00',
    },
    {
      id: 2,
      ticketNo: 4,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-08'),
      time: '21:00:00',
    },
    {
      id: 3,
      ticketNo: 3,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-05'),
      time: '13:45:00',
    },
    {
      id: 4,
      ticketNo: 5,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-03'),
      time: '09:30:00',
    },
    {
      id: 5,
      ticketNo: 2,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
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

      if (column.name == 'Ticket No') {
        this.removeKeyFromObjects(this.tickets, 'ticketNo');
        this.ticketNo.nativeElement.remove();
      } else if (column.name == 'Status') {
        this.removeKeyFromObjects(this.tickets, 'status');
        this.status.nativeElement.remove();
      } else if (column.name == 'Date') {
        this.removeKeyFromObjects(this.tickets, 'date');
        this.date.nativeElement.remove();
      } else if (column.name == 'Time') {
        this.removeKeyFromObjects(this.tickets, 'time');
        this.time.nativeElement.remove();
      } else if (column.name == 'Title') {
        this.removeKeyFromObjects(this.tickets, 'title');
        this.title.nativeElement.remove();
      } else if (column.name == 'Description') {
        this.removeKeyFromObjects(this.tickets, 'description');
        this.description.nativeElement.remove();
      }

      this.tableData = this.tableData.filter((_, i) => i !== +index!);
    }
    this.draggedColumn = null;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  openActionAll() {

    let action = document.getElementsByClassName('actions-all')[0];
    if (action.classList.contains('popup')) {
      action.classList.remove('popup');
      action.classList.add('popdown');
    } else if (action.classList.contains('popdown')) {
      action.classList.remove('popdown');
      action.classList.add('popup');
    } else if (
      action.classList.contains('popup') == false &&
      action.classList.contains('popdown') == false
    ) {
      action.classList.add('popup');
    }
  }

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
            this.tickets.sort((a, b) => (a[property] < b[property] ? -1 : 1));
        } else if (icon.className === 'fa-solid fa-sort-down') {
            icon.className = 'fa-solid fa-sort';
            icon.style.color = 'black';
            this.tickets.sort((a, b) => (a[property] > b[property] ? -1 : 1));
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

  deleteAction(index: number) {
    this.tickets.splice(index, 1);
    this.openAction(index);
  }

  rejectAction(index: number) {
    this.tickets[index].status = 'Rejected';
    this.openAction(index);
  }

  acceptAction(index: number) {
    this.tickets[index].status = 'Accepted';
    this.openAction(index);
  }

  removeKeyFromObjects(ticketArray: any[], keyToRemove: string) {
    return ticketArray.forEach((ticket) => {
      let modifiedTicket = { ...ticket };
      delete modifiedTicket[keyToRemove];
      console.log(modifiedTicket);
    })
  }


 
  constructor() {}

  ngOnInit() {
    
    
  }
}
