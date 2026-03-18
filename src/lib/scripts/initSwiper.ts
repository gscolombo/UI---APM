export default async function initSwiper() {
    let swiper;

    const Swiper = (await import("swiper")).default;
    const { Autoplay, Navigation, Pagination } = await import("swiper/modules");

    Swiper.use([Autoplay, Navigation, Pagination]);

    swiper = new Swiper(".swiper", {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 16,
        loop: true,

        navigation: {
            addIcons: true,
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        autoplay: {
            delay: 3000,
            disableOnInteraction: document.body.clientWidth <= 720,
            pauseOnMouseEnter: true,
        },

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            dynamicMainBullets: 6,
        },

        breakpoints: {
            720: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 5,
            },
            1600: {
                slidesPerView: 6,
            },
        },
    });
}