/*----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------burger-menu*/
const burger = document.querySelector(".burger__wrapper");

function burgerToggle () {
  const header = document.querySelector(".header__wrapper");
  const navigation = document.querySelector(".navigation__wrapper");

  burger.classList.toggle("active");
  header.classList.toggle("active");
  navigation.classList.toggle("active");
  document.body.classList.toggle("active");
}

if (burger) {
  burger.addEventListener("click", function () {
    burgerToggle ();
  });
}

const contact = document.querySelector(".navigation__link.contact");

if (burger && contact) {
  contact.addEventListener("click", function () {
    burgerToggle ();
  });
}
/*----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------header*/
const headerElement = document.querySelector(".header");

const scrollClass = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("scroll");
  } else {
    headerElement.classList.add("scroll");
  }
};

const headerObserver = new IntersectionObserver(scrollClass);
headerObserver.observe(headerElement);
/*----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------popup*/
const popupLinks = document.querySelectorAll(".popup__link"); /*add to clicable popup object in HTML*/
const body = document.querySelector("body");
const popupLock = document.querySelectorAll(".popup__lock"); /*add to fixed object in HTML but not for body*/
const timeout = 500;

let unlock = true;

function popupOpen (curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.active");
    if (popupActive) {
      popupClose (popupActive, false);
    } else {
      bodyLock ();
    }
    curentPopup.classList.add("active");
    curentPopup.addEventListener("click", function (event) {
      if (!event.target.closest(".popup__content")) {
        popupClose (event.target.closest(".popup"));
      }
    });
  }
}

function popupClose (popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("active");
    if (doUnlock) {
      bodyUnlock ();
    }
  }
}

function bodyLock () {
  const paddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (popupLock.length > 0) {
    for (let index = 0; index < popupLock.length; index++) {
      const element = popupLock[index];
      element.style.paddingRight = paddingValue;
    }
  }

  body.style.paddingRight = paddingValue;
  body.classList.add("active");

  unlock = false;
  setTimeout (function () {
    unlock = true;
  }, timeout);
}
function bodyUnlock () {
  setTimeout (function () {
    if (popupLock.length > 0) {
      for (let index = 0; index < popupLock.length; index++) {
        const element = popupLock[index];
        element.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("active");
  }, timeout);

  unlock = false;
  setTimeout (function () {
    unlock = true;
  }, timeout);
}

if (popupLinks.length > 0) { 
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (event) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen (curentPopup);
      event.preventDefault();
    });
  }
}

const popupClosures = document.querySelectorAll(".close");
if (popupClosures.length > 0) { 
  for (let index = 0; index < popupClosures.length; index++) {
    const popupClosure = popupClosures[index];
    popupClosure.addEventListener("click", function (event) {
      popupClose (popupClosure.closest(".popup"));
      event.preventDefault();
    });
  }
}

const popupActive = document.querySelector(".popup.active");
if (popupActive) {
  document.addEventListener("keydown", function (event) {
    if (event.key = "Escape") {
      popupClose (popupActive);
    }
  });
}
/*----------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------end*/