const firebaseConfig = {
    apiKey: "AIzaSyA_rWHPIhF6G4R3or0LIBPmuMxu0WPMfeI",
    authDomain: "chuggwebsite.firebaseapp.com",
    databaseURL: "https://chuggwebsite-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chuggwebsite",
    storageBucket: "chuggwebsite.appspot.com",
    messagingSenderId: "439420564270",
    appId: "1:439420564270:web:9718338edec76f723c40bf",
    measurementId: "G-S903DX3Z35"
  };


  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
  
    saveMessages(name, emailid, msgContent);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };