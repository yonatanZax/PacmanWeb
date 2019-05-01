class User {
    userName;
    password;
    fName;
    lName;
    email;
    birthday;

    constructor(values = {}) {
        this.userName = values.userName;
        this.password = values.password;
        this.fName = values.fName;
        this.lName = values.lName;
        this.email = values.email;
        this.birthday = values.birthday;
    }



}


function manageLogin() {

    var footer = document.getElementById("footer");
    var user_display = document.getElementById("userName_display");


    var uName = $('#userName_login').val();

    var pass = $('#password_login').val();

    var checkUserFromForm = new User({userName: uName, password: pass});

    var check = checkUser(checkUserFromForm);
    if (check) {
        session = user_db[uName];
        user_display.innerHTML = session.fName + " " + session.lName + " is logged";
        footer.innerHTML = "User logged in successfully";
        document.getElementById('loginDiv').style.display = 'none';

    } else {
        alert("Incorrect values");
    }

}

function manageRegister() {

    var uName = $('#userName_register').val();
    var pass = $('#password_register').val();
    var fName = $('#fName_register').val();
    var lName = $('#lName_register').val();
    var email = $('#email_register').val();


    var birthbay = $('#birthday_register').val();

    var newUserRegistration = new User({
        userName: uName, password: pass,
        fName: fName, lName: lName,
        email: email, birthday: birthbay
    });
    if (addUserToList(newUserRegistration)) {
        footer.innerHTML = "New user was created successfully";
        document.getElementById('registerDiv').style.display = 'none'
    } else {
        alert("Incorrect values - registration");
    }


}

function checkUser(userTocheck) {

    var userFromDB = user_db[userTocheck.userName];
    if (userFromDB != null && userFromDB.password == userTocheck.password)
        return true;

    return false;
}

function addUserToList(newUser) {
    var userFromDB = user_db[newUser.userName];
    if (userFromDB == undefined) {
        user_db[newUser.userName] = newUser;
        return true;
    }

    return false;
}

$(document).ready(function (event) {
    $("#registerBtn").click(

        function () {

            var user_display = document.getElementById("userName_display");

            var fNameValidation = $("#fName_register")[0].checkValidity();
            var lNameValidation = $("#lName_register")[0].checkValidity();


            var passwordValidation = $("#password_register")[0].checkValidity();

            //validate if the pattern match
            if (passwordValidation && fNameValidation && lNameValidation) {

                var uName = $('#userName_register').val();
                var pass = $('#password_register').val();
                var fName = $('#fName_register').val();
                var lName = $('#lName_register').val();
                var email = $('#email_register').val();


                var birthbay = $('#birthday_register').val();

                var newUserRegistration = new User({userName:uName,password:pass,
                    fName:fName, lName:lName,
                    email:email, birthday:birthbay
                });
                if(addUserToList(newUserRegistration)){
                    footer.innerHTML = "New user was created successfully";
                    document.getElementById('registerDiv').style.display='none';
                    user_display.innerHTML = "Please login";

                    session = null;
                }else{
                    alert("Incorrect values - registration");
                }


            }else {



                if (!passwordValidation) {
                    $("#password_register")[0].setCustomValidity("Please enter at least 8 characters.");
                    $('#password_register')[0].reportValidity();

                }

                if (!fNameValidation) {
                    $("#fName_register")[0].setCustomValidity("Numbers are not allowed");
                    $('#fName_register')[0].reportValidity();

                }

                if (!lNameValidation) {
                    $("#lName_register")[0].setCustomValidity("Numbers are not allowed");
                    $('#lName_register')[0].reportValidity();

                }







                event.preventDefault();
            }

        });
});











