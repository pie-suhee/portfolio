// 1. 비디오 호버 함수
function initVideoHover() {
    const imgBoxes = document.querySelectorAll('.img_box');
    
    imgBoxes.forEach(imgBox => {
        const video = imgBox.querySelector('video');
        if (!video) return;

        imgBox.addEventListener('mouseenter', () => video.play());
        imgBox.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// 2. 높이 조절 호버 함수
function initHoverMotion() {
    const hoverSection = document.querySelector('.hover'); // 클래스명 .hover 확인
    if (!hoverSection) return;

    const item1 = document.querySelector('.item1');
    const item2 = document.querySelector('.item2');
    const item3 = document.querySelector('.item3');
    const item4 = document.querySelector('.item4');

    const animateHeights = (h2, h3, h4) => {
        gsap.to(item2, { height: h2, duration: 0.5, ease: 'power2.out' });
        gsap.to(item3, { height: h3, duration: 0.5, ease: 'power2.out' });
        gsap.to(item4, { height: h4, duration: 0.5, ease: 'power2.out' });
    };

    // 각 아이템이 존재하는지 확인 후 리스너 등록
    if(item1) item1.addEventListener('mouseenter', () => animateHeights('15%', '10%', '10%'));
    if(item2) item2.addEventListener('mouseenter', () => animateHeights('90%', '10%', '10%'));
    if(item3) item3.addEventListener('mouseenter', () => animateHeights('90%', '85%', '10%'));
    if(item4) item4.addEventListener('mouseenter', () => animateHeights('90%', '85%', '85%'));

    hoverSection.addEventListener('mouseleave', () => {
        gsap.to(item2, { height: '75%', duration: 0.5, ease: 'power2.inOut' });
        gsap.to(item3, { height: '50%', duration: 0.5, ease: 'power2.inOut' });
        gsap.to(item4, { height: '30%', duration: 0.5, ease: 'power2.inOut' });
    });
}

// 3. 타이핑효과
function typedMotion() {
    const typed = new Typed('#typed', {
        strings: ['Web Publisher.', 'Problem Solver.', 'Team Player.'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}

// 4. 정사각형 모션
function initCuboidAnimation() {
    const select = e => document.querySelector(e);
    const selectAll = e => document.querySelectorAll(e);
    
    const container = select('.box.motion');
    const cuboid = selectAll('.hi__cuboid');
    const hiWords = selectAll('.hi__word');
    
    // 요소가 없으면 실행하지 않음 (에러 방지)
    if (!container || cuboid.length === 0) return;

    let winW = window.innerWidth;
    let winH = window.innerHeight;

    function setWinDimensions() {
        winW = window.innerWidth;
        winH = window.innerHeight;
    }

    // 초기 세팅 및 애니메이션
    gsap.set(container, { autoAlpha: 1 });
    
    const introTl = gsap.timeline({ delay: 0.5 });
    introTl.from('.hi__location--lat', { x: 100, autoAlpha: 0, ease: 'power4', duration: 1 })
           .from('.hi__location--long', { x: -100, autoAlpha: 0, ease: 'power4', duration: 1 }, 0)
           .from(cuboid, { y: winH, duration: 3, stagger: 0.14, ease: 'elastic(0.4,0.3)' }, 0);
    
    gsap.to(cuboid, { rotateX: -360, duration: 8, repeat: -1, ease: 'none' });
    gsap.fromTo(cuboid, { rotateY: 8, rotate: -10 }, { 
        rotateY: -8, rotate: 10, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' 
    });

    // 포인터 추적 로직
    function followPointer(pX, pY) {
        let dX = 2 * (pX - winW / 2) / winW;
        let dY = -2 * (pY - winH / 2) / winH;
        let positiveX = Math.abs(dX);
        let positiveY = Math.abs(dY);
        let deltaS = 450 * positiveX;
        let deltaW = 600 * positiveY;

        gsap.to(hiWords, {
            fontStretch: `${(550 - deltaS)}%`,
            fontWeight: 800 - deltaW,
            duration: 2
        });
    }

    // 이벤트 리스너 (기존 window 등록 방식 유지하되 윈도우 크기 재설정 포함)
    window.addEventListener('resize', setWinDimensions);
    
    const handleMove = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        if (x && y) followPointer(x, y);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
}

// Barba 초기화
barba.init({
    transitions: [{
        name: 'opacity-transition',
        // 페이지를 떠날 때 애니메이션
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0,
                duration: 0.5
            });
        },
        // 새 페이지가 나타날 때 애니메이션
        enter(data) {
            window.scrollTo(0, 0);

            // 1. 새 페이지의 내부 요소들을 찾음
            const elements = data.next.container.querySelectorAll('h1, nav, #container');

            // 2. 타임라인 생성
            const tl = gsap.timeline();

            tl.from(data.next.container, { opacity: 0, duration: 0.5 })
            .from(elements, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2, // 0.2초 간격으로 하나씩 순서대로 나타남!
                ease: "back.out(1.7)" // 살짝 튕기는 느낌의 효과
            });
        },
        afterEnter() {
            initVideoHover();
            initHoverMotion();
            typedMotion();
            initCuboidAnimation();
        }
    }]
});

// 첫 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
    initVideoHover();
    initHoverMotion();
    typedMotion();
    initCuboidAnimation();
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}