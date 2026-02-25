// oneScan-qr-accordion 시작
const accordionBtn = document.querySelector('#checkedHowtouse');
const accordionCont = document.querySelector('.accordion-cont');

accordionBtn.addEventListener('change', function() {
    const contentHeight = accordionCont.scrollHeight;

    if (this.checked) {
        // 1. 펼칠 때
        gsap.to(accordionCont, {
            duration: 0.5,
            height: contentHeight,
            opacity: 1,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(accordionCont, { height: "auto" });
            }
        });
        
        // 추가: 헤더에 클래스를 넣고 싶다면
        document.querySelector('.accordion-head').classList.remove('on');
        document.querySelector('.accordion-head').classList.add('off');
    } else {
        // 2. 닫을 때: max-height를 0으로
        gsap.fromTo(accordionCont, 
            { height: accordionCont.scrollHeight }, 
            { height: 0, duration: 0.5, opacity: 0, ease: "power2.inOut" }
        );
        
        document.querySelector('.accordion-head').classList.remove('off');
        document.querySelector('.accordion-head').classList.add('on');
    }
});
// oneScan-qr-accordion 끝

// oneScan-slide-banner 시작
const swiperMainBanner = new Swiper('.mainbanner_swiper', {
  loop: true,
  pagination: {
    el: '.mainbanner_swiper_pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.mainbanner_swiper-button-next',
    prevEl: '.mainbanner_swiper-button-prev',
  },
});
// oneScan-slide-banner 끝

// oneScan-coupon-tab 시작
const tabButtons = document.querySelectorAll('.coupon-tab-button');
const tabPanes = document.querySelectorAll('.coupon-tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        appier('identify',{'type':'기존회원'});
        if(targetTab == 'coupon-tab1'){
            appier('event', 'coupon_list_tab_click', {'user_type': 'Active','list_type':'wait','store_code': ''});
        }else{
            appier('event', 'coupon_list_tab_click', {'user_type': 'Active','list_type':'down','store_code': ''});
        }
        
    });
});

let swiperCouponList1 = new Swiper(".swiper-coupon-list1", {
    spaceBetween: 30,
    centeredSlides: true,
    navigation: {
    nextEl: ".coupon_list1_swiper-button-next",
    prevEl: ".coupon_list1_swiper-button-prev",
    },
    pagination: {
    el: ".coupon_list1_swiper_pagination",
    clickable: true
    }
});

let swiperCouponList2_settings = {
    spaceBetween: 10,
    slidesPerView: 1,
    grid: {
    rows: 3,
    },
    pagination: {
    el: ".coupon_list2_swiper_pagination",
    clickable: true,
    },
    watchOverflow : false
};

let swiperCouponList2 = new Swiper('.swiper-coupon-list2', swiperCouponList2_settings);    
// oneScan-coupon-tab 끝