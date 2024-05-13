import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task2';

  selectedData: any[] = [];
  sorted: boolean = false;

  tableData = [
    {
      name: 'Ticket No',
      sortable: true,
    },
    {
      name: 'Title',
      sortable: true,
    },
    {
      name: 'Description',
      sortable: false,
    },
    {
      name: 'Status',
      sortable: true,
    },
    {
      name: 'Date',
      sortable: true,
    },
    {
      name: 'Time',
      sortable: true,
    },
  ];

  tickets = [
    {
      id: 1,
      ticketNo: 1,
      title: 'title1',
      description: 'description1',
      status: 'status1',
      date: 'date1',
      time: 'time1',
    },
    {
      id: 2,
      ticketNo: 4,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: 'date2',
      time: 'time2',
    },
    {
      id: 3,
      ticketNo: 2,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: 'date2',
      time: 'time2',
    },
    {
      id: 4,
      ticketNo: 2,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: 'date2',
      time: 'time2',
    },
    {
      id: 5,
      ticketNo: 2,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: 'date2',
      time: 'time2',
    },
  ];

  sendData(ticket: any) {
    this.selectedData.push(ticket);
    console.log(this.selectedData);
  }

  sortByAscending(data: any) {
    if (data.name == 'Ticket No' && data.sortable == true) {
      this.tickets.sort((a, b) => (a.ticketNo < b.ticketNo ? 1 : -1));
      this.sorted = true;
    }
  }

  sortByDescending(data: any) {
    if (data.name == 'Ticket No' && data.sortable == true) {
      this.tickets.sort((a, b) => (a.ticketNo > b.ticketNo ? 1 : -1));
      this.sorted = false;
    }
  }

  constructor() {}

  ngOnInit() {}
}
