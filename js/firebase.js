//initialize firebase
var config = {
    apiKey: "AIzaSyAVDb4B-boNA3rd4K9JCk0oZFs7xHiqfl4",
    authDomain: "usersignuplogin-9fb53.firebaseapp.com",
    databaseURL: "https://usersignuplogin-9fb53.firebaseio.com",
    projectId: "usersignuplogin-9fb53",
    storageBucket: "usersignuplogin-9fb53.appspot.com",
    messagingSenderId: "574425608417"
  };
  firebase.initializeApp(config);

// references message collection
var messagesRef = firebase.database().ref('messages');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
//get values
var firstName = getInputVal('registerFirstName');
var lastName = getInputVal('registerLastName');
var email = getInputVal('registerEmail');
var password = getInputVal('registerPassword');
var confirmPassword = getInputVal('registerConfirmPassword');
//save messages
saveMessage(firstName, lastName, email, password,confirmPassword);
// console.log(firstName);
// console.log(lastName );
// console.log(email);
// console.log(password);
// console.log(confirmPassword);

//show alert
document.querySelector('.alert').style.display = 'block'

//hide alert after 3 seconds
setTimeout(function(){
 document.querySelector('.alert').style.display = 'none'; 
}, 3000);

document.querySelector('#registerModal').style.display = 'block'

//clear form
document.getElementById('contactForm').reset();
}

//funtion to get values from
function getInputVal(id) {
  return document.getElementById(id).value;
}

//save messages to firebase
function saveMessage(firstName, lastName, email, password, confirmPassword){
  var newMessageRef = messagesRef.push();
   newMessageRef.set({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  });
}

 $('#doLogin').on('click', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      console.log(data.email,data.password);
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          window.alert("Authenticated successfully");
          auth = authData;
          setTimeout(function () {
            $('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');
            contactsRef.child(auth.uid)
              .on("child_added", function(snap) {
                console.log("added", snap.key(), snap.val());
              });
          })
        })
        .catch(function(error) {
          window.alert("Login Failed!");
        });
    }
    document.getElementById('loginForm').reset();
  });
