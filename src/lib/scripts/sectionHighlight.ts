export default function sectionHighlight() {
    if (document) {
        const sections = Array.from(document.getElementsByTagName('section'));
        const navbar = document.querySelector('nav');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (sections.length && navbar) {
            // Highlight current visible section
            let last_y = 0;
            let ticking = false;
            let visibleSection = 0;
            const offsets = sections
                .map((section) => section.offsetTop)
                .map((o) => o * 0.9);
            const navbarButtons = navbar.querySelectorAll('.buttons a');

            let mobileMenuButtons: NodeListOf<HTMLAnchorElement>;
            if (mobileMenu) {
                mobileMenuButtons = mobileMenu.querySelectorAll('a');
                mobileMenuButtons[visibleSection].classList.add('active');
            }

            navbarButtons[visibleSection].classList.add('active');

            window.addEventListener(
                'scroll',
                () => {
                    last_y = window.scrollY;

                    // Throttling to reduce scroll position checks to every 200 millseconds
                    if (!ticking) {
                        setTimeout(() => {
                            ticking = false;

                            // Loop through each offset to find where the
                            // window was scrolled to
                            offsets.forEach((offset, i, a) => {
                                if (
                                    (last_y >= offset && last_y < a[i + 1]) ||
                                    last_y >= a.at(-1)!
                                ) {
                                    if (i != visibleSection) {
                                        navbarButtons[visibleSection].classList.remove('active');
                                        navbarButtons[i].classList.add('active');

                                        if (mobileMenu) {
                                            mobileMenuButtons[visibleSection].classList.remove(
                                                'active',
                                            );
                                            mobileMenuButtons[i].classList.add('active');
                                        }

                                        visibleSection = i;
                                        return;
                                    }
                                }
                            });
                        }, 200);
                    }

                    ticking = true;
                },
                { passive: window.innerWidth <= 768 },
            );
        }
    }
}