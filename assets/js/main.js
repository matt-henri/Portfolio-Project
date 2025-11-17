/*=============== SUPPRESS SCROLLREVEAL WARNING ===============*/
window.console.warn = () => {};

/*=============== HOME SPLIT TEXT ===============*/
const { animate, splitText, stagger } = anime;

const { chars: chars1 } = splitText('.home__profession-1', {  chars: true })
const { chars: chars2 } = splitText('.home__profession-2', {  chars: true })

animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});

animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});

/*=============== SWIPER PROJECTS ===============*/

const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteration: false,
  }
});

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector)

    tabContents.forEach((content) => content.classList.remove('work-active'))
    tabs.forEach((t) => t.classList.remove('work-active'))

    tab.classList.add('work-active')
    targetContent.classList.add('work-active')
  })
})

/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
  // clipboard API copy text
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = 'Email Copiado <i class="ri-check-line"></i>'

    // Restore the original text
    setTimeout(() => {
      copyBtn.innerHTML = 'Copiar E-mail <i class="ri-mail-line"></i>'
    }, 2000)
  })
})

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()

 // Each year it is updated to the year
 textYear.textContent = currentYear   

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id,
          top = section.offsetTop - 50, 
          height = section.offsetHeight,
          link = document.querySelector(' .nav__menu a[href*=' + id + ']')

    if(!link) return

    link.classList.toggle('active-link' , scrollY > top && scrollY <= top + height)
  })
}

window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
})

sr.reveal('.home__image, .projects__container, .work__container, .contact__container')
sr.reveal('.home__data', {delay: 900, origin: 'bottom'})
sr.reveal('.home__info', {delay: 1200, origin: 'bottom'})
sr.reveal('.home__social', {delay: 1500})
sr.reveal('.about__data', {origin: 'left'})
sr.reveal('.about__image', {origin: 'right'})
sr.reveal('.services__card', {interval: 100})
sr.reveal('.certificates__card', {interval: 100})

/*=============== CERTIFICATES MODAL ===============*/
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('certificatesModal');
  
  // Verificar se o modal existe antes de continuar
  if (!modal) return;

  const modalImage = document.getElementById('modalImage');
  const closeButton = document.querySelector('.certificates__modal-close');
  const certificateButtons = document.querySelectorAll('.certificates__button');
  const certificateImages = document.querySelectorAll('.certificates__img');

  // Abrir modal ao clicar no botão de ampliar
  certificateButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const imageSrc = certificateImages[index].getAttribute('data-full');
      modalImage.src = imageSrc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Abrir modal ao clicar direto na imagem
  certificateImages.forEach((img) => {
    img.addEventListener('click', function() {
      const imageSrc = this.getAttribute('data-full');
      modalImage.src = imageSrc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Função para fechar modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Fechar modal ao clicar no botão close
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Fechar modal ao clicar fora da imagem
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar modal com tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});