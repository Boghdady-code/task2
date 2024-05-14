import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task2';
  sorted: boolean = false;
  
  

  tableData = [
    {
      name: 'Ticket No',
      sortable: true,
    },
    {
      name: 'Title',
      sortable: false,
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
      date: new Date('2022-01-01'),
      time:'10:00:00',
    },
    {
      id: 2,
      ticketNo: 4,
      title: 'title2',
      description: 'description2',
      status: 'status2',
      date: new Date('2022-01-08'),
      time:  '21:00:00',
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


 

  sort(data: any) {
    if (data.name == 'Ticket No' && data.sortable == true) {
      let icon = document.getElementById('0');
      if (icon?.className == 'fa-solid fa-sort') {
        icon.className = 'fa-solid fa-sort-down';
        icon.style.color = 'green';
        let ticketNoArray = this.tickets.map((ticket) => ticket.ticketNo);
        console.log(ticketNoArray);
        let result = ticketNoArray.sort((a, b) => (a < b ? -1 : 1));
        result.forEach((element, index) => {
          this.tickets[index].ticketNo = element;
        });
      } else if (icon?.className == 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        let ticketNoArray = this.tickets.map((ticket) => ticket.ticketNo);
        console.log(ticketNoArray);
        let result = ticketNoArray.sort((a, b) => (a > b ? -1 : 1));
        result.forEach((element, index) => {
          this.tickets[index].ticketNo = element;
        });
      }
    } else if (data.name == 'Status' && data.sortable == true) {
      let icon = document.getElementById('3');
      if (icon?.className == 'fa-solid fa-sort') {
        icon.className = 'fa-solid fa-sort-down';
        icon.style.color = 'green';
        let statusArray = this.tickets.map((ticket) => ticket.status);
        console.log(statusArray);
        let result = statusArray.sort((a, b) => a.localeCompare(b));
        result.forEach((element, index) => {
          this.tickets[index].status = element;
        });
      } else if (icon?.className == 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        let statusArray = this.tickets.map((ticket) => ticket.status);
        console.log(statusArray);
        let result = statusArray.sort((a, b) => b.localeCompare(a));
        result.forEach((element, index) => {
          this.tickets[index].status = element;
        });
      }
    } else if (data.name == 'Date' && data.sortable == true) {
      let icon = document.getElementById('4');
      if (icon?.className == 'fa-solid fa-sort') {
        icon.className = 'fa-solid fa-sort-down';
        icon.style.color = 'green';
        let dateArray = this.tickets.map((ticket) => ticket.date);
        console.log(dateArray);
        let result = dateArray.sort((a, b) => a.getTime() - b.getTime());
        result.forEach((element, index) => {
          this.tickets[index].date = element;
        });
      } else if (icon?.className == 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        let dateArray = this.tickets.map((ticket) => ticket.date);
        console.log(dateArray);
        let result = dateArray.sort((a, b) => b.getTime() - a.getTime());
        result.forEach((element, index) => {
          this.tickets[index].date = element;
        });
      }
    } else if (data.name == 'Time' && data.sortable == true) {
      let icon = document.getElementById('5');
      if (icon?.className == 'fa-solid fa-sort') {
        icon.className = 'fa-solid fa-sort-down';
        icon.style.color = 'green';
        let timeArray = this.tickets.map((ticket) => ticket.time);
        console.log(timeArray);
        let result = timeArray.sort((a, b) => {
          const timeA = new Date('1970-01-01 ' + a);
          const timeB = new Date('1970-01-01 ' + b);
          return timeA.getTime() - timeB.getTime();
        });
        result.forEach((element, index) => {
          this.tickets[index].time = element;
        });
      } else if (icon?.className == 'fa-solid fa-sort-down') {
        icon.className = 'fa-solid fa-sort';
        icon.style.color = 'black';
        let timeArray = this.tickets.map((ticket) => ticket.time);
        console.log(timeArray);
        let result = timeArray.sort((a, b) => {
          const timeA = new Date('1970-01-01 ' + a);
          const timeB = new Date('1970-01-01 ' + b);
          return timeB.getTime() - timeA.getTime();
        });
        result.forEach((element, index) => {
          this.tickets[index].time = element;
        });
      }
    }
  }

  openAction(index: number) {
    let action = document.getElementsByClassName('actions')[index];

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

  constructor() {}

  ngOnInit() {}
}
