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
        }
    }]
});

window.addEventListener('DOMContentLoaded', initVideoHover);

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}