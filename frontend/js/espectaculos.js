document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('eventos-lista');

    fetch('http://localhost:3000/api/espectaculos ')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar los espectáculos');
      return res.json();
    })
    .then(eventos => {
      if (!Array.isArray(eventos) || eventos.length === 0) {
        lista.innerHTML = '<p>No hay espectáculos programados.</p>';
        return;
      }

      lista.innerHTML = eventos.map(e => `
        <div class="event-card">
          ${e.flyer_url ? `<a href="${e.flyer_url}" target="_blank"><img src="${e.flyer_url}" alt="Flyer de ${e.artista}" onerror="this.style.display='none'"></a>` : '<div class="no-image">🎭 Sin imagen disponible</div>'}
          <h3>🎵 ${e.artista}</h3>

          <div class="event-info">
            <p><strong>📅 Fecha:</strong> ${new Date(e.fecha).toLocaleDateString('es-ES', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>🏛️ Lugar:</strong> ${e.lugar}</p>
            <p><strong>🎪 Modalidad:</strong> ${e.modalidad}</p>
            ${e.precio ? `<p><strong>💰 Precio: $</strong> ${e.precio}</p>` : ''}
          </div>

          
          ${e.link_entradas ? `<a href="${e.link_entradas}" target="_blank" class="event-link">🎫 Comprar Entradas</a>` : '<div class="event-link no-link">⏰ Entradas próximamente</div>'}
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      lista.innerHTML = '<p>No se pudieron cargar los espectáculos.</p>';
    });
});