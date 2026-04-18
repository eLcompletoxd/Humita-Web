document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // ========================= 
    // SPA NAVIGATION
    // =========================
    const views = {
        store:    document.getElementById('view-store'),
        news:     document.getElementById('view-news'),
        staff:    document.getElementById('view-staff'),
        support:  document.getElementById('view-support'),
        socials:  document.getElementById('view-socials'),
        home:     document.getElementById('view-home'),
        download: document.getElementById('view-home'), // redirect to home for now
    };

    const navLinks = document.querySelectorAll('[data-view]');

    function switchView(viewKey) {
        const target = views[viewKey];
        if (!target) return;

        const current = document.querySelector('.view.active');

        const activate = () => {
            // Hide all
            Object.values(views).forEach(v => {
                if (v) v.classList.remove('active', 'leaving');
            });

            // Show target
            target.classList.add('active');

            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.dataset.view === viewKey);
            });

            window.scrollTo({ top: 0 });
            lucide.createIcons();
        };

        if (current && current !== target) {
            current.classList.add('leaving');
            current.addEventListener('animationend', activate, { once: true });
        } else {
            activate();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewKey = link.dataset.view;
            if (viewKey) switchView(viewKey);
        });
    });

    // Brand logo returns to home
    document.querySelector('.brand-box').addEventListener('click', () => {
        switchView('home');
    });

    // ========================= 
    // FILTER BUTTONS (shared)
    // =========================
    document.querySelectorAll('.store-filter-bar, .news-filter-bar').forEach(bar => {
        bar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // ========================= 
    // FAQ ACCORDION
    // =========================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // Open clicked if it was closed
            if (!isOpen) item.classList.add('open');
        });
    });
});
