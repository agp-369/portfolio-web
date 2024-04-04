function solve() {
    event.preventDefault(); // Prevent default form submission behavior

    let password = document.getElementById('password').value;
    let repassword = document.getElementById('repassword').value;
    let mobile = document.getElementById('mobile').value;
    let mail = document.getElementById('email').value;
    let pass = document.getElementById('error-password');
    let flag = true;  // Initialize flag to true
    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(mail)) {
        flag = false;  // Set flag to false if email validation fails
        document.getElementById('error-email').innerText = 'Please enter a valid email address.';
    } else {
        document.getElementById('error-email').innerText = '';
    }

    if (password !== repassword) {
        flag = false;  // Set flag to false if passwords do not match
        pass.innerText = "Passwords do not match. Please re-enter.";
    } else {
        pass.innerText = '';
    }

    let passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$/;

    if (!passwordRegex.test(password)) {
        flag = false;  // Set flag to false if password does not meet requirements
        pass.innerText = 'Password must be at least 8 characters' +
                        ' long and include at least one number,' +
                        ' one alphabet, and one symbol.';
    } else {
        pass.innerText = '';
    }

    let mobileRegex = /^\d{10}$/;

    if (!mobileRegex.test(mobile)) {
        flag = false;  // Set flag to false if mobile number does not meet requirements
        document.getElementById('error-mobile').innerText = 'Please enter a valid 10-digit mobile number.';
    } else {
        document.getElementById('error-mobile').innerText = '';
    }

    if (flag) { // Redirect only if all validations pass (flag is true)
        alert("Form submitted");

        // Generate Excel file
        generateExcel();
        
        // Redirect to login page
        window.location.href = "login.html";
    }
}

function generateExcel() {
    // Form data
    let formData = [
        ["First Name", "Last Name", "Email", "Date of Birth", "Password", "Mobile", "Gender", "Hobby"], // Column headers
        [document.getElementById('first').value, document.getElementById('last').value, document.getElementById('email').value, document.getElementById('dob').value, document.getElementById('password').value, document.getElementById('mobile').value, document.getElementById('gender').value, document.getElementById('hobby').value] // Form data
    ];

    // Convert form data to Excel workbook
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.aoa_to_sheet(formData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

    // Save Excel file
    XLSX.writeFile(workbook, "user_data.xlsx");
}
