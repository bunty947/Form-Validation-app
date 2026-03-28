let form = document.querySelector("#form-container form");

let inp = document.querySelector("#email");
let emailError = document.querySelector("#email-error");

let pass = document.querySelector("#UserPass");
let passError = document.querySelector("#pass-error");

let togglePass = document.querySelector("#togglePass i");

let genSelect= document.querySelector("#gender");
let genError= document.querySelector("#gender-error");

let ageCheck= document.querySelector("#ageCheck");
let ageError= document.querySelector("#age-error");

form.addEventListener("submit", function (e) {

    let emailValue = inp.value.trim();
    let passValue = pass.value.trim();
let isValid = true;

    // ---------------- EMAIL VALIDATION ----------------

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "**Email cannot be blanked**";
        emailError.style.display = "block";
        inp.style.border = "2px solid red";
        isValid = false;
    }
    else if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email";
        emailError.style.display = "block";
        inp.classList.add("error");
        isValid = false;
    }
    else {
        emailError.style.display = "none";
        inp.style.border = "2px solid green";
    }

    // ---------------- PASSWORD VALIDATION ----------------

    let passPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,9}$/;

    if (passValue === "") {
        passError.textContent = "*The password field cannot be blank*";
        passError.style.display = "block";
        pass.style.border = "2px solid red";
        isValid = false;
    }
    else if (!passPattern.test(passValue)) {
        passError.textContent =
            "Password must be 6-9 characters, contain 1 uppercase and 1 number";
        passError.style.display = "block";
        pass.style.border = "2px solid red";
        isValid = false;
    }
    else {
        passError.style.display = "none";
        pass.style.border = "2px solid green";
    }


//--------------Gender Validation----------------

if(genSelect.value===""){
    genError.textContent="Please select your gender";
    genError.style.display = "block";
    isValid=false;
}else{
    genError.style.display="none";
    genSelect.style.border= "1px solid green";
}

//---------------Age Validation -------------------
if (!ageCheck.checked) { 
    ageError.textContent = "You must confirm you are above 18 years old";
    ageError.style.display = "block"; 
    isValid = false; 
} else { 
    ageError.style.display = "none"; 
}
   if(!isValid){
        e.preventDefault();
    }

});

// ---------------- REAL TIME EMAIL ----------------

inp.addEventListener("input", function () {

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(inp.value.trim())) {
        emailError.style.display = "none";
        inp.style.border = "2px solid green";
    } else {
        inp.style.border = "2px solid red";
    }

});


// ---------------- REAL TIME PASSWORD ----------------

pass.addEventListener("input", function () {

let passPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,9}$/;


    if (passPattern.test(pass.value.trim())) {
        passError.textContent="";  //clear message
        passError.style.display = "none";
        pass.style.border = "2px solid green";
    } else {
        passError.style.display="block"; //show error again
        pass.style.border = "2px solid red";
    }

});


// ---------------- TOGGLE PASSWORD ----------------

togglePass.addEventListener("click", function () {

    if (pass.type === "password") {
        pass.type = "text";
        togglePass.classList.remove("fa-eye");
        togglePass.classList.add("fa-eye-slash");
    } else {
        pass.type = "password";
        togglePass.classList.remove("fa-eye-slash");
        togglePass.classList.add("fa-eye");
    }

});
// ----------------Gender Selection-----------------------

genSelect.addEventListener("change",function(){
    if (genSelect.value==""){
        genSelect.style.display="block";
        genError.textContent="Please select your gender";

    }
    else{
        genError.style.display="none";    
    }
});
// -------------Checkbox checked -----------------------

ageCheck.addEventListener("change",function(event){
    if(event.target.checked){
        ageError.style.display="none";
        ageCheck.style.border= "1px solid green";
       
    } else{
        ageError.style.display="block";
    }
});




