import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {


  selectedAllData: boolean = true;
  serverConnected: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  
  

  constructor(private tableService: TableService) {} 
  ngOnInit() {
    // this.tableService.getData(this.links[0].link).subscribe((res)=>{
    //   console.log(res);
    //   this.serverConnected = true;
    //   this.tickets = res.data.data;
      
    //   this.currentPage = res.data.pagination.current_page;
    //   this.itemsPerPage = res.data.pagination.total_perpage;
    //   this.totalPages = res.data.pagination.total_page;

    // })
  }

  actions: any[] = [
    {
      name: 'Accept',
      icon: 'fa-solid fa-check',
      action: (i: any, data?: any, tickets ?: any) => {
        console.log(tickets)
        if (i.length > 0) {
          for (let index = 0; index < i.length; index++) {
            data[i[index]].status = 'Accepted';
            data[i[index]].done = true;
          }
        } else {
        data[i].status = 'Accepted';
        data[i].done = true;
        this.selectedAllData = false;
        }
      },
      color: 'green', 
      actionKey: 1,
    },
    {
      name: 'Reject',
      icon: 'fa-solid fa-xmark',
      action: (i: any, data?: any) => {
        if (i.length > 0) {
          for (let index = 0; index < i.length; index++) {
            data[i[index]].status = 'Rejected';
            data[i[index]].done = true;
          }
        } else {
        data[i].status = 'Rejected';
        data[i].done = true;
        this.selectedAllData = false;
        }
      },
      color: 'red',
      actionKey: 2,
      
      
    },
    {
      name: 'Delete',
      icon: 'fa-solid fa-trash',
      action: (i: any, data?: any) => {
        if (i.length > 0) {
          for (let index = 0; index < i.length; index++) {
            data[i[index]].done = true;
            console.log('deleted');
          }
        } else {
          data[i].done = true;
        console.log('deleted');
        
        this.selectedAllData = false;
        }
      },
      color: 'red',
      actionKey: 3,
    },
    {
      name: 'Edit',
      icon: 'fa-solid fa-pen',
      action: (i: any, data?: any) => {
      console.log('edit this row of index' + i);
      },
      color: 'red',
      actionKey: 4,
      actionUsage:'row'
    }
  ];

  

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
    }
    
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
      actions:[1]
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
      actions:[2,3,4]
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
      actions:[1,2,3,4]
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
      actions:[1,3]
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
      actions:[2,3]
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
      actions:[1,2,3]
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
      actions:[1,2,3]
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
      actions:[2,3]
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
      actions:[1,3]
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
      actions:[1,2,3]
    },
  ];

  links: any[] = [{
    link: 'http://localhost:3000/api/tickets',
  }];
}