let firebaseConfig = {
  apiKey: "AIzaSyCXASI6b49kj_UJadQrYwX5OfBJQc5noME",
  authDomain: "nithinloverboy-4ac96.firebaseapp.com",
  databaseURL: "https://nithinloverboy-4ac96-default-rtdb.firebaseio.com",
  projectId: "nithinloverboy-4ac96",
  storageBucket: "nithinloverboy-4ac96.appspot.com",
  messagingSenderId: "237388255563",
  appId: "1:237388255563:web:0807e6095cd38b0d92d8ce",
  measurementId: "G-SB61BTDP9W"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  try {
    // Validate input fields
    if (
      validate_email(email) == false ||
      validate_password(password) == false
    ) {
      alert("Email or Password is Outta Line!!");
      return;
    }
    //await auth.signInWithEmailAndPassword(email, password);
    const usersRef = database.ref("users/" + email.split("@")[0]);
    usersRef.on(
      "value",
      async (snapshot) => {
        if (
          !snapshot.val() ||
          snapshot.val().email !== email ||
          snapshot.val().password !== password ||
          snapshot.val().role !== "admin"
        ) {
          alert("wrong credentials");
          return;
        }
        let allUsersRef = database.ref("users");
        allUsersRef.on(
          "value",
          async (users_snapshot) => {
            const users=users_snapshot.val();
            const userKeys=Object.keys( users_snapshot.val()) || [];

            const total=userKeys.reduce((acc,user_key)=>{
              return acc+users[user_key].ticketCount;
            },0)
            alert("total tickets : "+total);
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          },
          {
            onlyOnce: true,
          }
        );
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.name);
      },
      {
        onlyOnce: true,
      }
    );
  } catch (err) {
    alert(err);
  }
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

