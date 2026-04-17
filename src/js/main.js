document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    console.log("Humita Client Web & Lucide Icons Loaded.");
    
    // Lógica para botones
    const downloadBtns = document.querySelectorAll('.btn-red, .main-dl-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Iniciando flujo de descarga...");
        });
    });
});