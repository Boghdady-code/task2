import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    
  }


actions: any[] = [

  { 
    name: 'Accept',
    icon: 'fa-solid fa-check',
    action: (i : any, data?: any) => {
      data[i].status = 'accepted';
    },
    color: 'green',
    actionAll: (selectedValues?: any, paginatedData?: any) => {
      selectedValues.forEach((element: any) => {
        console.log(element)
        paginatedData[element].status = 'Accepted';
        paginatedData[element].done = true
        this.closeAction();
      
      })
      
    }
  },
  { 
    name: 'Reject',
    icon: 'fa-solid fa-xmark',
    action: (i : any, data?: any) => {
      data[i].status = 'rejected';
      
    },
    color: 'red',
    actionAll: (selectedValues?: any, paginatedData?: any) => {
      selectedValues.forEach((element: any) => {
        console.log(element)
        paginatedData[element].status = 'Rejected';
        paginatedData[element].done = true
        this.closeAction();
      })
    }
  },
  { 
    name: 'Delete',
    icon: 'fa-solid fa-trash',
    action: (i : any , data?: any) => {
      data.splice(i, 1);
    },
    color: 'red',
    actionAll: (selectedValues?: any, paginatedData?: any) => {
      selectedValues.forEach((element: any) => {
        console.log(element)
        paginatedData.splice(element, 1)
        this.closeAction();
      })
    }
  },
]


closeAction() {
  document.getElementsByClassName('actions-all')[0].classList.remove('popup')
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
}
