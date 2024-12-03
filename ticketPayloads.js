tickets :[
    
    {
    // common fields
    selectedEventTicketType: 'Festivals / Multi-Day Tickets / Season Passes' || 'RSVP Ticketing' ||'Private Event Ticketing' || 'Passworded /   Discounted Voucher Event' || 'Custom Ticketing',
    ticketFreePaid : "Paid" || "Free",
    ticketName: string,
    ticketPrice: ticketFreePaid == 'Paid' ? ticketPrice : '0',
    noOfTickets: noOfTickets,
    ticketStartDT: "2024-11-14T06:10:41.407Z",
    ticketEndDT: "2024-11-14T06:10:41.407Z",
    eventStartDT: "2024-11-14T06:10:41.407Z",
    eventEndDT:  "2024-11-14T06:10:41.407Z",
    whatsIncluded: ["Merchandise Stalls", "Security and First Aid",...], // array of strings
  //  1.fields for 'Festivals / Multi-Day Tickets / Season Passes'
    festivalEventDates:[{eventStartDateTime: '', eventEndDateTime: ''},{eventStartDateTime: '', eventEndDateTime: ''},...], // array of objects
   // 2. fields for 'RSVP Ticketing'
      rsvpDeadline: "2024-11-14T06:10:41.407Z", //  date time string e.g "2024-11-14T06:10:41.407Z"
      rsvpCapacity: '100',
      rsvpName: true || false,  //boolean
      rsvpMail:true || false,  //boolean
      rsvpNumber:true || false,  //boolean
      rsvpAdditionalFields: ['', '',...] // array of strings
     // 3. fields for 'Private Event Ticketing'
    privateEventAdditionalFields: ['usama@gmail.com','ali@gmail.com',...], // array of valid emails
    // 4.fields for 'Passworded / Discounted Voucher Event'
     privateEventAdditionalFields: ['usama@gmail.com','ali@gmail.com',...], // array of valid emails
     passwordFields: ['','',...], // array of passwords
     autoPasswordFields: ['','',...], // array of auto generated passwords
  }

]