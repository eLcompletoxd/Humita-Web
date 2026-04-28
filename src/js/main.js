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
        home:     document.getElementById('view-home')
    };

    const navLinks = document.querySelectorAll('[data-view]');

    function switchView(viewKey) {
        const target = views[viewKey];
        // Si no existe la vista (como en 'download'), salimos de la función
        if (!target) return;

        const current = document.querySelector('.view.active');

        const activate = () => {
            // Ocultar todas las vistas
            Object.values(views).forEach(v => {
                if (v) v.classList.remove('active', 'leaving');
            });

            // Mostrar la vista objetivo
            target.classList.add('active');

            // Actualizar estado activo en los enlaces de navegación
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
            const viewKey = link.dataset.view;

            // EXCEPCIÓN DE DESCARGA:
            // Si el botón es para descargar, NO ejecutamos e.preventDefault()
            // Esto permite que el navegador inicie la descarga del .exe
            if (viewKey === 'download') {
                return; // Salimos de la función y dejamos que el navegador actúe
            }

            // Para el resto de vistas, sí bloqueamos el comportamiento por defecto
            e.preventDefault();
            if (viewKey) switchView(viewKey);
        });
    });

    // Logo de la marca vuelve al inicio
    const brandBox = document.querySelector('.brand-box');
    if (brandBox) {
        brandBox.addEventListener('click', () => {
            switchView('home');
        });
    }

    // ========================= 
    // FILTER BUTTONS
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

            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            if (!isOpen) item.classList.add('open');
        });
    });
});