// Notificaciones estilo Windows XP con callback de cierre
function showNotification(title, message, autoClose = true, duration = 6000, onClose = null) {
    // Crear contenedor
    const notifyDiv = document.createElement('div');
    notifyDiv.className = 'windows-xp-notify';
    
    // Barra de título con botón cerrar
    const titleBar = document.createElement('div');
    titleBar.className = 'notify-title';
    titleBar.innerHTML = `<span>${escapeHtml(title)}</span><span class="notify-close">X</span>`;
    
    // Contenido
    const contentDiv = document.createElement('div');
    contentDiv.className = 'notify-content';
    contentDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    
    // Botón OK
    const okDiv = document.createElement('div');
    okDiv.className = 'notify-ok';
    const okBtn = document.createElement('button');
    okBtn.textContent = 'Aceptar';
    okDiv.appendChild(okBtn);
    contentDiv.appendChild(okDiv);
    
    notifyDiv.appendChild(titleBar);
    notifyDiv.appendChild(contentDiv);
    document.body.appendChild(notifyDiv);
    
    // Función para cerrar y ejecutar el callback
    const closeNotify = () => {
        if (notifyDiv && notifyDiv.parentNode) notifyDiv.remove();
        if (typeof onClose === 'function') onClose();
    };
    
    // Eventos de cierre
    const closeBtn = notifyDiv.querySelector('.notify-close');
    closeBtn.addEventListener('click', closeNotify);
    okBtn.addEventListener('click', closeNotify);
    
    // Auto cerrar
    let timeout = null;
    if (autoClose) {
        timeout = setTimeout(closeNotify, duration);
    }
    
    // Si el ratón entra, cancelamos el cierre automático; al salir lo reiniciamos
    notifyDiv.addEventListener('mouseenter', () => {
        if (timeout) clearTimeout(timeout);
    });
    notifyDiv.addEventListener('mouseleave', () => {
        if (autoClose) timeout = setTimeout(closeNotify, duration);
    });
}

// Función para evitar inyección HTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Notificación de bienvenida al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showNotification('Bienvenido', '¡Hola! Bienvenido a mi portafolio personal. Espero que disfrutes tu visita.', true, 6000);
});

// Manejador del formulario con limpieza al cerrar la notificación
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // No recargar la página
            
            // Recoger datos
            const nombreInput = document.getElementById('nombre');
            const nombre = nombreInput ? nombreInput.value : 'visitante';
            
            // Mostrar notificación de agradecimiento y, al cerrarla, limpiar el formulario
            showNotification('Mensaje enviado', `Gracias por tu mensaje, ${nombre}. Te contactaré pronto.`, true, 6000, () => {
                // Limpiar todos los campos del formulario
                form.reset();
            });
        });
    }
});