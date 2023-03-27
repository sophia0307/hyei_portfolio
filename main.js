'use strict';

// scroll Navbar -> scroll down 일때 navbar 배경 활성화
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});

// toggle button
const toggleBtn = document.querySelector('.navbar__toggle-btn');
const navMenu = document.querySelector('.navbar__menu');
toggleBtn.addEventListener('click',() => {
    navMenu.classList.toggle('active');
});

// handling scroll navbar menu
navMenu.addEventListener('click',(event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){ // link의 값이 null or undefind 이면 return
        return;
    }
    // console.log(target+link);
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior: "smooth"});

    // remove active
    const active = document.querySelector('.navbar__menu__item.active');
    active.classList.remove('active');
    event.target.classList.add('active');    
});

// 'contact me' button click시 -> contact section으로 이동
const contact = document.querySelector('.home__contact');
contact.addEventListener('click',(event)=>{
    // console.log(event.target.dataset.link);
    const contactLink = event.target.dataset.link;
    const contactMove = document.querySelector(contactLink);
    contactMove.scrollIntoView({behavior: "smooth"});

    // contact section으로 이동 했을 때 navbar menu 'contact'로 표시
    // const navbarMenu = document.querySelector('.navbar__menu__item.active');
    // const navbarContact = document.querySelector('.navbar__menu__item[data-link="#contact"]');
    // navbarMenu.classList.remove('active');
    // navbarContact.classList.add('active');
});

// IntersectionObserver API
// 1. 모든 섹션 요소들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = ['#home','#about','#skills','#project','#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))
console.log(sections);
console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}
const options = {
    root :null,
    rootmargin : '0px',
    threshold : 0.4, //0.3 
}

const callback = (entries, observer)=>{
    entries.forEach(entry => {
        // console.log(entry.target);
        if (!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index, entry.target.id);
            // let selectedIndex;
            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
            // selectedNavItem.classList.remove('active');
            // selectedNavItem = navItems[selectedIndex];
            // selectedNavItem.classList.add('active');
            // const navItem = navItems[selectedIndex];
            // navItem.classList.add('active');
        }
    });
};

const observer = new IntersectionObserver(callback, options);
sections.forEach((section) => {
    observer.observe(section);
});

window.addEventListener('wheel',() => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (
    Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItems.length -1;
    }   
    selectNavItem(navItems[selectedNavIndex]);
});

// const io = new IntersectionObserver((entries, observer)=>{
//     entries.forEach(entry => {
//         if (entry.isIntersecting){
//             // console.log('in : '+ entry.target);
//             console.log('in entry:',entry.target);
//             console.log('in observer:',observer);
//         }else{
//             // console.log('out : '+ entry.target);
//             console.log('out entry:',entry.target);
//             console.log('out observer:',observer);
//         }
       
//     });
// },options);







