import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  selectedAllData: boolean = true;

  actions: any[] = [
    {
      name: 'Accept',
      icon: 'fa-solid fa-check',
      action: (i: any, data?: any) => {
        data[i].status = 'Accepted';
        data[i].done = true;
        this.selectedAllData = false;
        this.closeAction();
      },
      color: 'green',
      actionAll: (selectedValues?: any, paginatedData?: any) => {
        selectedValues.forEach((element: any) => {
          console.log(element);
          paginatedData[element].status = 'Accepted';
          paginatedData[element].done = true;
          this.selectedAllData = false;
          this.closeActionAll();
        });
      },
    },
    {
      name: 'Reject',
      icon: 'fa-solid fa-xmark',
      action: (i: any, data?: any) => {
        data[i].status = 'Rejected';
        data[i].done = true;
        this.selectedAllData = false;
        this.closeAction();
      },
      color: 'red',
      actionAll: (selectedValues?: any, paginatedData?: any) => {
        selectedValues.forEach((element: any) => {
          console.log(element);
          paginatedData[element].status = 'Rejected';
          paginatedData[element].done = true;
          this.selectedAllData = false;
          this.closeActionAll();
        });
      },
    },
    {
      name: 'Delete',
      icon: 'fa-solid fa-trash',
      action: (i: any, data?: any) => {
        data.splice(i, 1);
        data[i].done = true;
        this.selectedAllData = false;
        this.closeAction();
      },
      color: 'red',
      actionAll: (selectedValues?: any, paginatedData?: any) => {
        selectedValues.forEach((element: any) => {
          console.log(element);
          paginatedData.splice(element, 1);
          paginatedData[element].done = true;
          this.selectedAllData = false;
          this.closeActionAll();
        });
      },
    },
  ];

  closeActionAll() {
    document.getElementById('actions-all')?.classList.remove('popup');
  }

  closeAction() {
    document.querySelectorAll('.actions').forEach((action) => {
      action.classList.remove('popup');
      action.classList.add('popdown');
    });
  }

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
      done: false,
    },
    {
      id: 2,
      ticketNo: 4,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-08'),
      time: '21:00:00',
      done: false,
    },
    {
      id: 3,
      ticketNo: 3,
      title: 'title3',
      description: 'description3',
      status: 'status2',
      date: new Date('2022-01-05'),
      time: '13:45:00',
      done: false,
    },
    {
      id: 4,
      ticketNo: 5,
      title: 'title4',
      description: 'description4',
      status: 'status2',
      date: new Date('2022-01-03'),
      time: '09:30:00',
      done: false,
    },
    {
      id: 5,
      ticketNo: 6,
      title: 'title5',
      description: 'description5',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 6,
      ticketNo: 8,
      title: 'title6',
      description: 'description6',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 7,
      ticketNo: 9,
      title: 'title7',
      description: 'description7',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 8,
      ticketNo: 7,
      title: 'title8',
      description: 'description8',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 9,
      ticketNo: 2,
      title: 'title9',
      description: 'description9',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 10,
      ticketNo: 10,
      title: 'title10',
      description: 'description10',
      status: 'status2',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
  ];
}