(function () {
    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function skipAutoReveal() {
        var b = document.body;
        return b.classList.contains('page-tags') || b.classList.contains('page-contact');
    }

    /**
     * Adds data-aos to common layout blocks so scroll / load reveals work site-wide.
     * Skips elements that already have data-aos.
     */
    function applyAutoReveal() {
        if (prefersReducedMotion() || skipAutoReveal()) return;

        var selector = [
            '.portfolio_main .video-portfolio-banner',
            '.portfolio_main .video-portfolio > ul > li',
            '.gallery-main .swiper-slide .gallery_box',
            '.illustartion-portfolio .illustartion-main',
            '.filim-portfolio-banner',
            '.filim-portfolio-single',
            '.filim-portfolio-content',
            '.filim-portfolio-third',
            '.illustartion-main ul li',
            '.portfolio-right',
        ].join(', ');

        var nodes;
        try {
            nodes = document.querySelectorAll(selector);
        } catch (e) {
            return;
        }

        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (!el || el.getAttribute('data-aos')) continue;
            if (el.closest('.header, .header-inner, nav')) continue;
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', String(Math.min(i * 70, 650)));
        }
    }

    function boot() {
        if (typeof AOS === 'undefined') return;

        applyAutoReveal();

        var reduced = prefersReducedMotion();

        AOS.init({
            duration: 1250,
            easing: 'ease-out-sine',
            once: true,
            offset: 72,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: reduced
        });

        function refresh() {
            if (reduced || typeof AOS.refresh !== 'function') return;
            AOS.refresh();
        }

        window.addEventListener('load', function () {
            refresh();
            requestAnimationFrame(refresh);
        });

        setTimeout(refresh, 250);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
