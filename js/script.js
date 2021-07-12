/*----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------burger-menu*/
const burger = document.querySelector('.burger__wrapper');

if (burger) {
  const header = document.querySelector('.header__wrapper');
  const navigation = document.querySelector('.navigation__wrapper');
  burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    header.classList.toggle('active');
    navigation.classList.toggle('active');
    document.body.classList.toggle('active');
  });
}
/*----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------header*/
const headerElement = document.querySelector('.header');

const scrollClass = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove('scroll');
  } else {
    headerElement.classList.add('scroll');
  }
};

const headerObserver = new IntersectionObserver(scrollClass);
headerObserver.observe(headerElement);
/*----------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------end*/