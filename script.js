// ===== MENU HAMBURGUER =====
(function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  function closeMenu() {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
    }
  }

  function toggleMenu() {
    if (!navLinks || !menuToggle) return;
    const isExpanded = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', toggleMenu);

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ===== MODAL DE CRÉDITOS =====
  const modal = document.getElementById('creditsModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.querySelector('.close-modal');

  function openModal() {
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    const focusable = modal.querySelector('.close-modal');
    if (focusable) focusable.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModalFunc() {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (openModalBtn) openModalBtn.focus();
  }

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalFunc);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModalFunc();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModalFunc();
      }
    });
  }

  // ===== GRÁFICOS COM CHART.JS =====
  window.addEventListener('load', function() {
    // Gráfico de Barras - Autonomia
    const ctxBar = document.getElementById('chartBar')?.getContext('2d');
    if (ctxBar) {
      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'Deslocamentos independentes (%)',
            data: [32, 38, 45, 54, 63, 74],
            backgroundColor: '#2dd4bf',
            borderColor: '#1a9b8a',
            borderWidth: 1,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { callbacks: { label: (ctx) => `${ctx.raw}% dos usuários` } }
          },
          scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentual (%)' } } }
        }
      });
    }

    // Gráfico de Rosca (Doughnut) - Adoção por região
    const ctxDoughnut = document.getElementById('chartDoughnut')?.getContext('2d');
    if (ctxDoughnut) {
      new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'],
          datasets: [{
            data: [68, 52, 41, 38, 29],
            backgroundColor: ['#ff6b4a', '#2dd4bf', '#0a192f', '#5b6e8c', '#cbd5e1'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}% de adoção` } } }
        }
      });
    }

    // Gráfico de Linha - Redução de barreiras
    const ctxLine = document.getElementById('chartLine')?.getContext('2d');
    if (ctxLine) {
      new Chart(ctxLine, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'Índice de eliminação de barreiras',
            data: [100, 112, 128, 147, 169, 198],
            borderColor: '#ff6b4a',
            backgroundColor: 'rgba(255, 107, 74, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ff6b4a',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { tooltip: { callbacks: { label: (ctx) => `Índice: ${ctx.raw} (base 100 em 2020)` } } },
          scales: { y: { title: { display: true, text: 'Índice de progresso' }, min: 80 } }
        }
      });
    }

    // NOVO GRÁFICO MULTILINHA - Dados da tabela fornecida
    const ctxMulti = document.getElementById('chartMultiLine')?.getContext('2d');
    if (ctxMulti) {
      new Chart(ctxMulti, {
        type: 'line',
        data: {
          labels: ['t1', 't2', 't3', 't4', 't5'],
          datasets: [
            {
              label: 'Posição 0.5',
              data: [0.88, 0.94, 0.89, 0.80, 0.46],
              borderColor: '#ff6b4a',
              backgroundColor: 'transparent',
              tension: 0.2,
              pointBackgroundColor: '#ff6b4a',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Posição 1.0',
              data: [1.37, 1.41, 1.23, 1.15, 1.23],
              borderColor: '#2dd4bf',
              backgroundColor: 'transparent',
              tension: 0.2,
              pointBackgroundColor: '#2dd4bf',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Posição 1.5',
              data: [1.91, 1.60, 1.68, 1.54, 1.25],
              borderColor: '#0a192f',
              backgroundColor: 'transparent',
              tension: 0.2,
              pointBackgroundColor: '#0a192f',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Posição 2.0',
              data: [2.69, 1.80, 1.69, 1.82, 1.90],
              borderColor: '#8b5cf6',
              backgroundColor: 'transparent',
              tension: 0.2,
              pointBackgroundColor: '#8b5cf6',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Posição 2.5',
              data: [2.13, 2.19, 2.22, 2.10, 2.16],
              borderColor: '#f59e0b',
              backgroundColor: 'transparent',
              tension: 0.2,
              pointBackgroundColor: '#f59e0b',
              pointRadius: 5,
              pointHoverRadius: 7
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            y: { title: { display: true, text: 'Valores medidos' }, beginAtZero: true, max: 3.0 },
            x: { title: { display: true, text: 'Medições temporais (t1 a t5)' } }
          }
        }
      });
    }
  });

  // ===== ANIMAÇÃO FADE-IN AO SCROLL =====
  const fadeElements = document.querySelectorAll('.section-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // ===== NAVEGAÇÃO SUAVE =====
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 768) {
          const closeMenuFn = () => {
            const nav = document.getElementById('navLinks');
            const toggle = document.getElementById('menuToggle');
            if (nav && nav.classList.contains('active')) {
              nav.classList.remove('active');
              if (toggle) toggle.setAttribute('aria-expanded', 'false');
              document.body.classList.remove('menu-open');
            }
          };
          closeMenuFn();
        }
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
  
  // ===== SUBMISSÃO DO FORMULÁRIO =====
  const submitBtn = document.getElementById('submitSurveyBtn');
  const feedbackDiv = document.getElementById('surveyFeedback');
  
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
      let allAnswered = true;
      
      for (let q of questions) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (!selected) {
          allAnswered = false;
          break;
        }
      }
      
      if (allAnswered) {
        feedbackDiv.textContent = 'Respostas registradas. Agradecemos sua contribuição para a pesquisa.';
        feedbackDiv.classList.add('success');
        const form = document.getElementById('accessibilitySurvey');
        if (form) form.reset();
        setTimeout(() => {
          feedbackDiv.classList.remove('success');
        }, 4000);
      } else {
        feedbackDiv.textContent = 'Por favor, responda todas as 10 perguntas antes de enviar.';
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.backgroundColor = 'rgba(255, 107, 74, 0.15)';
        feedbackDiv.style.color = '#c2410c';
        setTimeout(() => {
          feedbackDiv.style.display = 'none';
          feedbackDiv.style.backgroundColor = '';
          feedbackDiv.style.color = '';
        }, 3500);
      }
    });
  }
})();
