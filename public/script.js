const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if(bar){
    bar.addEventListener("click", ()=>{
        nav.classList.add("active");
    })
}

if(close){
    close.addEventListener("click", ()=>{
        nav.classList.remove("active");
    })
}


// Login page

// Predefined user credentials
const users = [
    { email: "user1@example.com", password: "password123" },
    { email: "user2@example.com", password: "mypassword" },
    { email: "admin@example.com", password: "admin123" }
];

// Add event listener to the login form
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the email and password match any user
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Successful login
        window.location.href = "/public/index.html";
        const loginHeading = document.getElementById("loginHeading");
        loginHeading.innerHTML = '<h1><i class="fa-solid fa-user"></i></h1>';
    } else {
        // Failed login
        alert("Invalid email or password. Please try again.");
    }
});

