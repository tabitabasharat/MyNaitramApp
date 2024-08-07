import event1 from "../../public/event1.png";
import event2 from "../../public/event2.png";
import event3 from "../../public/event3.png";
import event4 from "../../public/event4.png";
import event5 from "../../public/event5.png";
import event6 from "../../public/event6.png";
import event7 from "../../public/event7.png";
import event8 from "../../public/event8.png";
import event9 from "../../public/event9.png";
import event10 from "../../public/event10.png";
import event11 from "../../public/event1.png";
import event12 from "../../public/event12.png";

export const events = [
  {
    id: 2,
    img: "/event2.png",
    title: "NAITRAM Launch Party 2024",
  },
  {
    id: 3,
    img: "/event3.png",
    title: "Fashion Friday by Bushmills 2024",
  },
  {
    id: 4,
    img: "/event4.png",
    title: "PIZDEZ Womens Day Party 2024",
  },
  {
    id: 5,
    img: "/event5.png",
    title: "Deep Week with Hate Tuesday",
  },
  {
    id: 6,
    img: "/event6.png",
    title: "After Party for Ladies Night",
  },
  {
    id: 7,
    img: "/event7.png",
    title: "THE VAB with DJ CULOUGH",
  },
  {
    id: 8,
    img: "/event8.png",
    title: "Electro Music Festival DJ Jhoe",
  },
  {
    id: 9,
    img: "/event9.png",
    title: "N.425 Centered Show 2024",
  },
  {
    id: 10,
    img: "/event10.png",
    title: "NEON Glow Party DJ Azure 2024",
  },
  {
    id: 11,
    img: "/event11.png",
    title: "Love & Good Talkshow",
  },
  {
    id: 12,
    img: "/event12.png",
    title: "Bolivia Fiesta Grande 2024",
  },
  {
    id: 1,
    img: "/event1.png",
    title: "NAITRAM Launch Party 2024",
  },
  {
    id:13,
    img: "/new-event.svg",
    title: "JHOPE - JACK IN THE BOX 2024",
  },
  {
    id:14,
    img: "/new-event-2.svg",
    title: "Você não precisa saber",
  },
  {
    id:15,
    img: "/new-event-3.svg",
    title: "Havana Club Daiquiri",
  }
];

export const top5Events = [
  // {
  //   id: 1,
  //   img: '/event4.png',
  //   title: "PIZDEZ Women's Day Party 2024",
  //   location: 'DOMA PUB Main Floor, Light Street, London',
  //   date: 'Saturday March 5th, 5 PM - 12 AM',
  // },
  {
    id: 2,
    img: "/event2.png",
    title: "NAITRAM Launch Party 2024",
    location: "DOMA PUB Main Floor, Light Street, London",
    date: "Saturday March 5th, 5 PM - 12 AM",
  },
  // {
  //   id: 3,
  //   img: '/event3.png',
  //   title: 'Fashion Friday by Bushmills 2024',
  //   location: 'DOMA PUB Main Floor, Light Street, London',
  //   date: 'Saturday March 5th, 5 PM - 12 AM',
  // },
  // {
  //   id: 4,
  //   img: '/event5.png',
  //   title: 'Deep Week with Hate Tuesday',
  //   location: 'DOMA PUB Main Floor, Light Street, London',
  //   date: 'Saturday March 5th, 5 PM - 12 AM',
  // },
  // {
  //   id: 5,
  //   img: '/event6.png',
  //   title: 'After Party for Ladies Night',
  //   location: 'DOMA PUB Main Floor, Light Street, London',
  //   date: 'Saturday March 5th, 5 PM - 12 AM',
  // },
];

export const attendees = [
  { id: 1, img: "/person1.png", name: "Evelyn Lynn" },
  { id: 2, img: "/person2.jpg", name: "Oliver Smith" },
  { id: 3, img: "/person3.jpg", name: "Sophia Johnson" },
  { id: 4, img: "/person4.jpg", name: "Liam Brown" },
  { id: 5, img: "/person5.jpg", name: "Isabella Jones" },
  { id: 6, img: "/person6.jpg", name: "Noah Miller" },
  { id: 7, img: "/person7.jpg", name: "Mia Davis" },
  { id: 8, img: "/person8.jpg", name: "Lucas Garcia" },
  { id: 9, img: "/person9.jpg", name: "Amelia Martinez" },
  { id: 10, img: "/person10.jpg", name: "Ethan Hernandez" },
];

export const photorolls = [
  { id: 1, img: "/roll1.png" },
  { id: 2, img: "/roll2.png" },
  { id: 3, img: "/roll3.png" },
  { id: 4, img: "/roll4.png" },
  { id: 5, img: "/roll5.png" },
  { id: 6, img: "/roll6.png" },
  { id: 7, img: "/roll7.png" },
  { id: 8, img: "/roll8.png" },
];

export const posts = [
  { id: 1, title: "Star on Flame", img: "/post1.png" },
  { id: 2, title: "Crystalize Astronouts", img: "/post2.png" },
  { id: 3, title: "3D Illustration", img: "/post3.png" },
  { id: 4, title: "Abstract holi Powder", img: "/post4.png" },
  { id: 5, title: "3D Illustration", img: "/post5.png" },
  { id: 6, title: "Mecca Cube", img: "/post6.png" },
  { id: 7, title: "Crystalize Astronouts", img: "/post7.png" },
];

export const ticketsType = [
  {
    type: "entry-first",
    title: "Ladies",
    price: 10,
   
  },
  {
    type: "regular-first",

    title: "Gentlemen",
    price: 20,
   
  },
  {
    type: "premium-first",
    title: "VIP Entry",
    price: 40,
    included: ["Queue jump", "Free Food"],
  },
];
export const ticketsType2 = [
  {
    type: "entry-second",
    title: "About To Take Over",
    price: 500,
    included: ["6 guest entry", "1x spirit + 1x Champagne", "Food"],
  },
  {
    type: "regular-second",

    title: "Taking over",
    price: 750,
    included: [
      "8 Guest Entry",
      "2x Spirit + 1x Champagne",
      "Queue Jump",
      "Food",
    ],
  },
  {
    type: "premium-second",
    title: "Took Over",
    price: 1000,
    included: [
      "10 Guest Entry",
      "3x spirit + 2x Champagne",
      "Queue Jump",
      "Food",
    ],
  },
];
