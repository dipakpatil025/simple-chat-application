// // // // dipak()
// // // console.log(x);
// // // var x = 25;
//
// // // // console.log(dipak);
// // // function dipak()  {
// // //     console.log(x," : dipak");
// // // }
// // // const fun = ()=>{
// // //     return ("dad");
// // // }
// // // console.log(fun);
//
// // var x = 10;
//
// // function a() {
// //     console.log(x);
// //     x = 11;
// // }
// // function b() {
// //     let x = 110;
// //     console.log(x);
// // }
//
// // a();
// // b();
//
//
// // console.log(['1','2','30'].map((e)=>parseInt(e)));
//
// // const users = [
//
// //     { firstName: "akshay", lastName:"saini", age: 26},
// //     { firstName: "donald", lastName: "trump", age: 75},
// //     { firstName: "elon", lastName: "musk", age: 50 } ,
// //     { firstName: "deepika",  lastName:"padukone", age:26 } ,
// // ]
// // // console.log(users.map((e)=>{
// //     //     return e.firstName + ' ' +e.lastName;
// //     // }));
//
// // console.log(users.reduce((acc,crr)  =>{
// //     if (acc[crr.age]) {
// //         acc[crr.age]++;
// //     }
// //     else{
// //             acc[crr.age] = 1;
// //     }
// //         return acc;
// //     },{}));
//
// // console.log(users);
// // const data = users.filter((e)=>e.age>30).map(e=>e.firstName)
// // console.log(data);
// //
// // const people = [
// //     { name: "Alice", age: 21 },
// //     { name: "Max", age: 20 },
// //     { name: "Jane", age: 20 },
// //   ];
// //
// // function makeGroup(objectArray, property) {
// //     return objectArray.reduce((acc, obj) => {
// //         const key = obj[property];
// //         const curGroup = acc[key] ?? [];
// //         // console.log("curGroup",curGroup);
// //         return { ...acc, [key]: [...curGroup, obj] };
// //     }, {});
// // }
//
// //sample demo data javascript object contains name, age , city for students
// const students = [
//     { name: "Alice", age: 21, city: "Delhi", pincode: 1245 },
//     { name: "Max", age: 20, city: "Delhi", pincode: 1245 },
//     { name: "Jane", age: 25, city: "Mumbai", pincode: 1245 },
//     { name: "John", age: 21, city: "Mumbai", pincode: 1245 },
//     { name: "Bob", age: 21, city: "Delhi", pincode: 1245 },
//     { name: "Alice", age: 20, city: "Mumbai", pincode: 1245 },
//     { name: "Max", age: 20, city: "Delhi", pincode: 1245 },
//     { name: "Jane", age: 21, city: "Mumbai", pincode: 1245 },
//     { name: "John", age: 21, city: "Delhi", pincode: 1245 },
//     { name: "Bob", age: 23, city: "Mumbai", pincode: 1245 },
//     { name: "Alice", age: 21, city: "Delhi", pincode: 1245 },
// ]
//
//
// // const group = makeGroup(students,'age')
// // console.log(group);
//
// // const flattened = [
// //     [0, 1],
// //     [2, 3],
// //     [4, 5],
// // ].reduce((acc,crr)=>{
// //     return crr.concat(acc);
// // },[]);
// // console.log(flattened);
// //
//
// // const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
// // const data = names.reduce((acc,crr)=>{
// //     const currCout = acc[crr] ?? 0;
// //     return {...acc,[crr] : currCout + 1};
// // },{});
//
//
// // const data = students.reduce((acc,crr)=>{
// //
// //     const cityCount = acc[crr.city] ?? 0;
// //
// //     return {...acc,[crr.city] : cityCount + 1};
// // },);
// // console.log(data['Delhi']);
// // console.log(students[0].age);
// //
// // const myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
// // const data = myArray.reduce((acc,crr)=>{
// //     return !acc.includes(crr)?acc.concat(crr): acc;
// // },[]);
// // ;
//
// // const arrayLike = {
// //     length: 3,
// //     0: 2,
// //     1: 3,
// //     2: 4,
// // };
// // console.log(Array.prototype.reduce.call(arrayLike,
// //     (x, y) => {
// //         return x + y
// //     }, 0));
// // // 9
// // a = 10
// // b = '10'
// // if (a === b) {
// //     console.log("true");
// // }
// // else {
// //     console.log("false");
// // }
//
// if ([] == false) {
//     console.log("true");
// }




var firebaseConfig = {
    apiKey: "AIzaSyAU4avoehtoJwtj0qGIHD5TBI6CMHrXY54",
    authDomain: "chat-application-7cc47.firebaseapp.com",
    databaseURL: "https://chat-application-7cc47-default-rtdb.firebaseio.com",
    projectId: "chat-application-7cc47",
    storageBucket: "chat-application-7cc47.appspot.com",
    messagingSenderId: "533368280304",
    appId: "1:533368280304:web:568f76bc1f9aca55ac1e35",
    measurementId: "G-VBN0W4D7RT"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const username = prompt("Please Tell Us Your Name");
document.getElementById("message-form").addEventListener("submit", sendMessage);
function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
        username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});
