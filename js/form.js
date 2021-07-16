/*----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------form*/
"use strict"

function formAddError (input) {
  input.parentElement.classList.add("error");
  input.classList.add("error");
}

function formRemoveError (input) {
  input.parentElement.classList.remove("error");
  input.classList.remove("error");
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function formValidate (form) {
  let error = 0;
  let formRequired = document.querySelectorAll(".required"); /*form*/
  
  for (let index = 0; index < formRequired.length; index++) {
    const input = formRequired[index];
    formRemoveError(input);

    if (input.getAttribute("type") === "email") {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      } 
    } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
      formAddError(input);
      error++;
    } else {
      if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
  }
  return error;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("message");
  if (form) {
    form.addEventListener("submit", formSend);
  }

  async function formSend (event) {
    event.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    //console.log(formData.get("form_name"));
    formData.append("form_file", inputFile.files[0]);

    if (error === 0) {
      form.classList.add("sending");
      
      let response = await fetch("sending.php", {
        method: "post",
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert (result.message);
        inputPreview.innerHTML = "";
        form.reset();
        form.classList.remove("sending");
      } else {
        alert("Error");
        form.classList.remove("sending");
      }
      
    } else {
      alert("Please, fill in required fields");
    }
  }

  const inputFile = document.getElementById("message_file");
  const inputPreview = document.getElementById("message_preview");

  if (inputFile) {
    inputFile.addEventListener("change", () => {
      uploadFile(inputFile.files[0]);
    });
  }

  function uploadFile (file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert ("Only image could be added");
      inputFile.value = "";
      return;
    }
    if (file.size > 2 * 1024 *1024) {
      alert ("Image should be less than 2Mb");
      return;
    }

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      inputPreview.innerHTML = `<img src="${event.target.result}" alt="File">`;
      inputPreview.style.marginLeft = "16px";
      inputPreview.style.width = "128px";
      inputPreview.style.height = "80px";
    };
    fileReader.onerror = function (event) {
      alert("Something went wrong")
    };
    fileReader.readAsDataURL(file);
  }
});
/*----------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------end*/