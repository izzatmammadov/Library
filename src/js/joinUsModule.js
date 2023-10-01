    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
    import {
      getDatabase,
      ref,
      set,
      push,
    } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBjUeKUH3MpDlxQgfX6FM6lZMXNsvR_Ouk",
      authDomain: "ourproject-e7f72.firebaseapp.com",
      databaseURL: "https://ourproject-e7f72-default-rtdb.firebaseio.com",
      projectId: "ourproject-e7f72",
      storageBucket: "ourproject-e7f72.appspot.com",
      messagingSenderId: "202148445701",
      appId: "1:202148445701:web:45845c3f69709c9ec5e66c"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const users = ref(db, "users");



    const joinUsFullnameInput = document.querySelector("#joinUsFullname");
    const joinUsEmailInput = document.querySelector("#joinUsEmail");
    const joinBtn = document.querySelector("#join");
    
    joinBtn.addEventListener("click", function () {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (
        joinUsFullnameInput.value.trim() === "" ||
        !emailPattern.test(joinUsEmailInput.value)
      ) {
        modalErrorMessage.style.display = "block";
        setTimeout(() => {
          modalErrorMessage.style.display = "none";
        }, 1500);
        return;
      }
       
      

      const joinUser = {
        fullname: joinUsFullname.value,
        email: joinUsEmail.value,
      };
      push(users,joinUser)

      joinUsFullname.value = "";
      joinUsEmail.value = "";

      // console.log(joinUser); //for add firebase
    });