import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  

  selectedAllData: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  
  constructor(private tableService: TableService) {} 

  ngOnInit() {
  }
  actions: any[] = [
    {
      name: 'Check Stocks',
      icon: "fa-solid fa-spinner",
      action: (i: any, data?: any, tickets ?: any) => {
        
        if (i.length > 0) {
          for (let index = 0; index < i.length; index++) {
            data[i[index]].status = 'Checking Stocks';
            data[i[index]].done = true;
          }
        } else {
        data[i].status = 'Checking Stocks';
        data[i].done = true;
        this.selectedAllData = false;
        }
      },
      color: 'green',
      actionStatus:['Pending'],
    },
    {
      name: 'Delivered',
      icon: "fa-solid fa-circle-check",
      action: (i: any, data?: any, tickets ?: any) => {
        if (i.length > 0) {
          for (let index = 0; index < i.length; index++) {
            data[i[index]].status = 'Delivered';
            data[i[index]].done = true;
          }
        } else {
        data[i].status = 'Delivered';
        data[i].done = true;
        this.selectedAllData = false;
        }
      },
      color: 'red',
      actionStatus: ['Delivering', 'Pending'],
    },
    {
      name: 'Closed',
      icon: "fa-solid fa-xmark",
      color: 'red',
      action: (i: any, data?: any, tickets ?: any) => {
        if (i.length > 0) {
          for (let index = 0; index < i.length; index++) {
            data[i[index]].status = 'Closed';
            data[i[index]].done = true;
          }
        } else {
        data[i].status = 'Closed';
        data[i].done = true;
        this.selectedAllData = false;
        }
      },
      actionStatus:['Delivered'],
    },
    {
      name: 'Edit',
      icon: 'fa-solid fa-pen',
      color: 'red',
      action: (i: any, data?: any, tickets ?: any) => {
        data[i].status = 'Edited';
        data[i].done = true;
        this.selectedAllData = false;
      },
      actionStatus:['Pending', 'Delivered', 'Checking Stocks', 'Delievering'],
      usage:'row'
    },
    {
      name:'Shipping',
      icon: 'fa-solid fa-truck',
      color: 'red',
      action: (i: any, data?: any, tickets ?: any) => {
        data[i].status = 'Delivered';
        data[i].done = true;
        this.selectedAllData = false;
      },
      actionStatus:['Checking Stocks'],
    }
  ];

  tableData: any[] = [
    {
      name: 'Ticket No',
      sortable: true,
      sortBy: 'ticketNo',
      draggable: true,
    },
    {
      name: 'Title',
      sortable: false,
      sortBy: 'title',
      draggable: true,
    },
    {
      name: 'Description',
      sortable: false,
      sortBy: 'description',
      draggable: false,
    },
    {
      name: 'Status',
      sortable: true,
      sortBy: 'status',
      draggable: false,
    },
    {
      name: 'Date',
      sortable: true,
      sortBy: 'date',
      draggable: true,
    },
    {
      name: 'Time',
      sortable: true,
      sortBy: 'time',
      draggable: false,
    }
  ];

  tickets: any[] = [
    {
      id: 1,
      ticketNo: 1,
      title: 'title1',
      description: 'description1',
      status: 'Pending',
      date: new Date('2022-01-01'),
      time: '10:00:00',
      done: false,
    },
    {
      id: 2,
      ticketNo: 4,
      title: 'title2',
      description: 'description2',
      status: 'Pending',
      date: new Date('2022-01-08'),
      time: '21:00:00',
      done: false,
    },
    {
      id: 3,
      ticketNo: 3,
      title: 'title3',
      description: 'description3',
      status: 'Delivered',
      date: new Date('2022-01-05'),
      time: '13:45:00',
      done: false,
    },
    {
      id: 4,
      ticketNo: 5,
      title: 'title4',
      description: 'description4',
      status: 'Checking Stocks',
      date: new Date('2022-01-03'),
      time: '09:30:00',
      done: false,
    },
    {
      id: 5,
      ticketNo: 6,
      title: 'title5',
      description: 'description5',
      status: 'Delivered',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 6,
      ticketNo: 8,
      title: 'title6',
      description: 'description6',
      status: 'Delivering',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 7,
      ticketNo: 9,
      title: 'title7',
      description: 'description7',
      status: 'Pending',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 8,
      ticketNo: 7,
      title: 'title8',
      description: 'description8',
      status: 'Delivered',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 9,
      ticketNo: 2,
      title: 'title9',
      description: 'description9',
      status: 'Pending',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
    {
      id: 10,
      ticketNo: 10,
      title: 'title10',
      description: 'description10',
      status: 'Checking Stocks',
      date: new Date('2022-01-02'),
      time: '15:00:00',
      done: false,
    },
  ];

  links: any[] = [{
    link: 'http://localhost:3000/api/tickets',
  }];
}
