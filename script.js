document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initCharts();
  initSkillBars();
  initContactForm();
});

/* ===== Sticky nav + active link ===== */
function initNavigation() {
  const nav = document.getElementById('nav');
  const links = nav.querySelectorAll('a');
  const sections = document.querySelectorAll('.section[id], .charts-section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

/* ===== Fade-in on scroll ===== */
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section, .charts-section');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ===== Chart.js charts ===== */
function initCharts() {
  const chartColors = {
    primary: 'rgba(13, 148, 136, 0.75)',
    primaryLight: 'rgba(20, 184, 166, 0.2)',
    palette: [
      'rgba(13, 148, 136, 0.85)',
      'rgba(15, 118, 110, 0.85)',
      'rgba(45, 212, 191, 0.85)',
      'rgba(94, 234, 212, 0.85)',
      'rgba(5, 150, 105, 0.85)',
      'rgba(16, 185, 129, 0.85)',
    ],
  };

  const defaultFont = {
    family: "'Inter', sans-serif",
    size: 11,
  };

  Chart.defaults.font = defaultFont;
  Chart.defaults.color = '#4b5563';

  /* Radar chart — skill profile */
  new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: [
        'Bioestatística',
        'Análise de Dados',
        'Vigilância',
        'GIS',
        'Comunicação',
        'Gestão de Surtos',
      ],
      datasets: [{
        label: 'Proficiência',
        data: [88, 92, 85, 75, 80, 90],
        backgroundColor: chartColors.primaryLight,
        borderColor: chartColors.primary,
        borderWidth: 2,
        pointBackgroundColor: '#0d9488',
        pointRadius: 4,
        pointHoverRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 20, display: false },
          grid: { color: 'rgba(0,0,0,0.06)' },
          angleLines: { color: 'rgba(0,0,0,0.06)' },
          pointLabels: { font: { size: 10 } },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });

  /* Bar chart — software tools */
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: ['R', 'Python', 'Stata', 'Power BI', 'SQL', 'ArcGIS'],
      datasets: [{
        label: 'Nível (%)',
        data: [90, 85, 78, 82, 70, 68],
        backgroundColor: chartColors.palette,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { callback: v => v + '%' },
        },
        y: {
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });

  /* Doughnut chart — areas of expertise */
  new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
      labels: [
        'Doenças Infecciosas',
        'Doenças Crônicas',
        'Saúde Materno-Infantil',
        'Ambiental',
        'Nutrição',
      ],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: chartColors.palette,
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 12,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { size: 10 },
          },
        },
      },
    },
  });
}

/* ===== Animated skill bars ===== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-item');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const value = item.dataset.value;
          const fill = item.querySelector('.skill-bar-fill');

          item.classList.add('animated');
          setTimeout(() => {
            fill.style.width = value + '%';
          }, 150);

          observer.unobserve(item);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((bar, i) => {
    bar.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(bar);
  });
}

/* ===== Contact form ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', e => {
    e.preventDefault();

    feedback.hidden = false;
    feedback.className = 'form-feedback success';
    feedback.textContent = 'Mensagem enviada com sucesso! (demonstração — nenhum e-mail foi enviado)';

    form.reset();

    setTimeout(() => {
      feedback.hidden = true;
    }, 5000);
  });
}
