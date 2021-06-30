/*----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------burger-menu*/
const burger = document.querySelector('.header_burger-wrap');

if (burger) {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.header_menu-wrap');
  burger.addEventListener('click', function() {
    document.body.classList.toggle('active');
    header.classList.toggle('active');
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  });
}
/*----------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------end*/