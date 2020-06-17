const headerEl = document.querySelector("header");
const scrollToTopEl = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;

    if(window.pageYOffset - height > 100) {
        if(!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky")
        }
    }else {
        headerEl.classList.remove("sticky");
    }

    if(window.pageYOffset > 2000) {
        scrollToTopEl.style.display = "block";
    }else{
        scrollToTopEl.style.display = "none";
    }
});


const glide = new Glide(".glide");
const captionEl = document.querySelectorAll(".slide-caption");

/**
 * 轮播图 start
 */
//监听加载事件和轮播事件
glide.on(["mount.after", "run.after"], () => {
    const caption = captionEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0,1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, { start : 300 }),
        translateY: [anime.stagger([40,10],0)]  
    });
});

//监听轮播事件，每次轮播开始前将文字透明度设为0
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();

/**
 * 轮播图 end
 */

//  “成功案例” 布局
const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});

// 给父容器注册监听事件即可，不必给每个按钮注册监听事件。因为javascript的事件会向上传递
const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", e => {
    // 获取哪个按钮被点击
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");

    if(filterOption) {
        //将当前active的按钮取消active class
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        //将当前点击的按钮加上active class
        target.classList.add("active");

        isotope.arrange({filter: filterOption});
    }

});

const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".feature", {...staggeringOption, interval: 350});
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350});
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .data-num",
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 2000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
    }
});

// data section的视差效果
window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if(bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
    }
});

//滚动效果
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: "header",
    offset: 80
});
document.addEventListener("scrollStart", () => {
    if(headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});

// 展开和收起header
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
});


