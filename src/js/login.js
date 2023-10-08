// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjUeKUH3MpDlxQgfX6FM6lZMXNsvR_Ouk",
  authDomain: "ourproject-e7f72.firebaseapp.com",
  databaseURL: "https://ourproject-e7f72-default-rtdb.firebaseio.com",
  projectId: "ourproject-e7f72",
  storageBucket: "ourproject-e7f72.appspot.com",
  messagingSenderId: "202148445701",
  appId: "1:202148445701:web:45845c3f69709c9ec5e66c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const loginRef = ref(db, "adminLogin");
// const loginData = {
//   userName: "team1",
//   userPassword: "adminadmin",
// };
// set(loginRef, loginData);
// {userName: 'team1', userPassword: 'adminadmin'}
let admin_data=JSON.parse(localStorage.getItem("adminData")) ?? {};
loginJoinBtn.addEventListener("click",function(){
    onValue(loginRef, (snapshot) => {
        const data = snapshot.val();
if(loginUsername.value==data.userName && loginPassword.value==data.userPassword){
   admin_data={
    adminName: data.userName,
    adminPassword: data.userPassword
   }
   loginUsername.value=""
   loginPassword.value=""

   localStorage.setItem("adminData", JSON.stringify(admin_data));
firstLogin.classList.add("d-none");
secondPanel.classList.remove("d-none");

}
else{
    setTimeout(function(){
  alert.classList.remove("alertActive");

    },2000)
  alert.classList.add("alertActive");
}
      });

});


if(localStorage.getItem("adminData")){
    firstLogin.classList.add("d-none");
secondPanel.classList.remove("d-none");

}
logOutBtn1.addEventListener("click",function(){
    secondPanel.classList.add("d-none");
    firstLogin.classList.remove("d-none");
    localStorage.removeItem("adminData");
});
logOutBtn2.addEventListener("click",function(){
  secondPanel.classList.add("d-none");
  firstLogin.classList.remove("d-none");
  localStorage.removeItem("adminData");
});