(function () {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('site-nav');
    var backdrop = document.getElementById('navBackdrop');
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', open);
        if (backdrop) backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    toggle.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('nav-open'));
    });

    if (backdrop) {
        backdrop.addEventListener('click', function () {
            setOpen(false);
        });
    }

    nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 1000) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
})();
