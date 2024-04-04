// login.js
(function(){
  const fonts = ["cursive","sans-serif","serif","monospace"];
  let captchaValue = "";
  function generateCaptcha(){
      let value = btoa(Math.random()*1000000000);
      value = value.substr(0,5+Math.random()*5);
      captchaValue = value;
  }
  function setCaptcha(){
      let html = captchaValue.split("").map((char)=>{
          const rotate = -20 + Math.trunc(Math.random()*30);
          const font = Math.trunc(Math.random()*fonts.length);
          return `<span
              style="
                  transform:rotate(${rotate}deg);
                  font-family:${fonts[font]}
              "
          >${char}</span>`;
      }).join("");
      document.querySelector(".login-form .captcha .preview").innerHTML = html;
  }
  function initCaptcha(){
      document.querySelector(".login-form .captcha .captcha-refresh").addEventListener("click",function(){
          generateCaptcha();
          setCaptcha();
      });
      generateCaptcha();
      setCaptcha();
  }
  initCaptcha();

  document.querySelector(".login-form #login-btn").addEventListener("click",function(){
      let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;
      let hobby = document.getElementById("hobby").value; // Retrieve hobby value from input field
      if(inputCaptchaValue === captchaValue && hobby){ // Check if captcha and hobby are valid
          // Redirect to the new page
          window.location.href = "quize.html";
      } else {
          swal("Invalid captcha or missing hobby"); // Show error message
      }
  });
})();
// login.js

(function(){
  // Other code for captcha generation and initialization (if any) goes here...

  document.querySelector(".login-form #login-btn").addEventListener("click",function(){
      let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;
      let hobby = document.getElementById("hobby").value; // Retrieve hobby value from input field
      // Validate captcha and hobby
      if(inputCaptchaValue === captchaValue && hobby){ // Check if captcha and hobby are valid
          // Perform login authentication
          const storedUsername = getCookie("username"); // Get stored username from cookie
          // Get username and password from login form
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;
          // Compare with stored registration data
          if (username === storedUsername ) {
              // Redirect to the new page upon successful login
              window.location.href = "quize.html";
          } else {
              // Display error message for invalid credentials
              swal("Invalid username or password");
          }
      } else {
          // Display error message for invalid captcha or missing hobby
          swal("Invalid captcha or missing hobby");
      }
  });

  // Function to retrieve a cookie by name (if you are using cookies for storing registration data)
  function getCookie(name) {
      var cookieName = name + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var cookieArray = decodedCookie.split(';');
      for(var i = 0; i < cookieArray.length; i++) {
          var cookie = cookieArray[i];
          while (cookie.charAt(0) == ' ') {
              cookie = cookie.substring(1);
          }
          if (cookie.indexOf(cookieName) == 0) {
              return cookie.substring(cookieName.length, cookie.length);
          }
      }
      return "";
  }

})();

