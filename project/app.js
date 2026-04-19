/* ═══════════════════════════════════════════════════════
   Experience - Bladi | Main Application Logic
   ═══════════════════════════════════════════════════════ */

// ── Pack Details Data ────────────────────────────────
const PACK_DATA = {
  moussem: {
    emoji: '🎪',
    name: 'باك الموسم',
    price: 350,
    unit: 'للشخص',
    duration: 'يوم كامل (8 ساعات)',
    description: 'تجربة فريدة لحضور موسم محلي أصيل. ستعيش أجواء الاحتفالات التقليدية مع أهل المنطقة، من عرض الفنتازيا إلى الأكلات الشعبية والفنون التراثية.',
    activities: [
      { icon: '🐎', name: 'عرض الفنتازيا' },
      { icon: '🎶', name: 'موسيقى تقليدية حية' },
      { icon: '👘', name: 'ارتداء الزي التقليدي' },
      { icon: '🍖', name: 'وليمة شعبية أصيلة' },
      { icon: '📸', name: 'لحظات Instagramable' },
      { icon: '📜', name: 'شهادة + تذكار' }
    ]
  },
  mediouni: {
    emoji: '🌾',
    name: 'باك مديوني',
    price: 280,
    unit: 'للشخص',
    duration: 'يوم كامل (7 ساعات)',
    description: 'اكتشف الحياة الريفية الأصيلة في منطقة مديونة. من الفلاحة إلى نسيج الصوف مروراً بالتسوق في السوق المحلي وصنع منتجك بيديك.',
    activities: [
      { icon: '🌱', name: 'تجربة الفلاحة' },
      { icon: '🧵', name: 'نسيج الصوف (الزربية)' },
      { icon: '🛒', name: 'التسوق في السوق المحلي' },
      { icon: '🫖', name: 'شاي مع أهل المنطقة' },
      { icon: '🧶', name: 'صنع منتج DIY بيديك' },
      { icon: '📜', name: 'شهادة + تذكار' }
    ]
  },
  cooperative: {
    emoji: '🧶',
    name: 'باك التعاونيات',
    price: 320,
    unit: 'للشخص',
    duration: 'يوم كامل (6 ساعات)',
    description: 'ادخل عالم التعاونيات النسائية وتعلم الحرف اليدوية من حرفيات محترفات. ستصنع منتجاً تقليدياً من الألف إلى الياء وتأخذه معك كتذكار.',
    activities: [
      { icon: '🪡', name: 'حياكة وتطريز يدوي' },
      { icon: '✂️', name: 'خياطة تقليدية' },
      { icon: '🧵', name: 'نسيج على النول الخشبي' },
      { icon: '🎨', name: 'تلوين وزخرفة' },
      { icon: '🎁', name: 'خذ منتجك معك' },
      { icon: '📜', name: 'شهادة + تذكار' }
    ]
  },
  wladi: {
    emoji: '👶',
    name: 'باك ولادي',
    price: 200,
    unit: 'للطفل',
    duration: 'نصف يوم (4 ساعات)',
    description: 'باقة مخصصة للأطفال لربطهم بزمن الأجداد بطريقة مبسطة ومرحة. أنشطة ترفيهية وتعليمية تعرّفهم على الثقافة والتراث.',
    activities: [
      { icon: '🎨', name: 'ورشة رسم وتلوين' },
      { icon: '🏃', name: 'ألعاب تقليدية' },
      { icon: '🍞', name: 'صنع الخبز التقليدي' },
      { icon: '🐑', name: 'التعرف على الحيوانات' },
      { icon: '📖', name: 'قصص من التراث' },
      { icon: '🏆', name: 'شهادة بطل التجربة' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // ── Loading Screen ─────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1200);
  });

  // ── Navbar Scroll Effect ──────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── Mobile Menu ───────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Active Nav Link Highlight ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = navLinks.querySelectorAll('a:not(.navbar-cta)');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ── Scroll Reveal Animations ──────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ── Counter Animation for Hero Stats ──────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  let statsAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const counter = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(counter); }
        num.textContent = Math.floor(current) + '+';
      }, 16);
    });
    statsAnimated = true;
  };

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

  // ── About Section Slideshow ──────────────────────
  const aboutSlides = document.querySelectorAll('.about-slide');
  const aboutDots = document.querySelectorAll('.sdot');
  let aboutCurrent = 0;

  const goAboutSlide = (index) => {
    aboutSlides[aboutCurrent].classList.remove('active');
    aboutDots[aboutCurrent].classList.remove('active');
    aboutCurrent = (index + aboutSlides.length) % aboutSlides.length;
    aboutSlides[aboutCurrent].classList.add('active');
    aboutDots[aboutCurrent].classList.add('active');
  };

  aboutDots.forEach(dot => {
    dot.addEventListener('click', () => goAboutSlide(parseInt(dot.dataset.i)));
  });

  let aboutInterval = setInterval(() => goAboutSlide(aboutCurrent + 1), 3000);

  const resetAboutInterval = () => {
    clearInterval(aboutInterval);
    aboutInterval = setInterval(() => goAboutSlide(aboutCurrent + 1), 3000);
  };

  document.getElementById('slidePrev')?.addEventListener('click', () => {
    goAboutSlide(aboutCurrent + 1);
    resetAboutInterval();
  });
  document.getElementById('slideNext')?.addEventListener('click', () => {
    goAboutSlide(aboutCurrent - 1);
    resetAboutInterval();
  });

  // ── Back to Top Button ────────────────────────────
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ══════════════════════════════════════════════════
  // PACKS CAROUSEL
  // ══════════════════════════════════════════════════
  const pTrack = document.getElementById('packsTrack');
  const pPrevBtn = document.getElementById('prevPack');
  const pNextBtn = document.getElementById('nextPack');
  let pCurrentSlide = 0;
  let pCardsPerView = 3;

  const updatePCardsPerView = () => {
    if (window.innerWidth <= 768) pCardsPerView = 1;
    else if (window.innerWidth <= 1024) pCardsPerView = 2;
    else pCardsPerView = 3;
  };

  const getPMaxSlide = () => Math.max(0, (pTrack ? pTrack.children.length : 0) - pCardsPerView);

  const goTOPackSlide = (index) => {
    pCurrentSlide = Math.max(0, Math.min(index, getPMaxSlide()));
    if (!pTrack || !pTrack.children[0]) return;
    const cardWidth = pTrack.children[0].offsetWidth;
    // get gap value from computed style
    const gap = parseFloat(window.getComputedStyle(pTrack).gap) || 32;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const direction = isRtl ? 1 : -1;
    pTrack.style.transform = `translateX(${pCurrentSlide * (cardWidth + gap) * direction}px)`;

    // Apply 3D Effect to cards
    Array.from(pTrack.children).forEach((card, i) => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
      if (i >= pCurrentSlide && i < pCurrentSlide + pCardsPerView) {
        // Visible cards
        card.style.transform = 'perspective(1000px) rotateY(0deg) scale(1) translateZ(0)';
        card.style.opacity = '1';
        card.style.zIndex = '2';
      } else {
        // Hidden or side cards
        const offsetDir = i < pCurrentSlide ? 1 : -1;
        const rotate = isRtl ? 15 * offsetDir : -15 * offsetDir;
        card.style.transform = `perspective(1000px) rotateY(${rotate}deg) scale(0.85) translateZ(-100px)`;
        card.style.opacity = '0.6';
        card.style.zIndex = '1';
      }
    });
  };

  pPrevBtn?.addEventListener('click', () => goTOPackSlide(pCurrentSlide - 1));
  pNextBtn?.addEventListener('click', () => goTOPackSlide(pCurrentSlide + 1));

  window.addEventListener('resize', () => {
    updatePCardsPerView();
    goTOPackSlide(pCurrentSlide);
  });
  updatePCardsPerView();

  // ══════════════════════════════════════════════════
  // STORE FILTER TOGGLE
  // ══════════════════════════════════════════════════
  const filterToggleBtn = document.getElementById('filterToggle');
  const storeLayout = document.querySelector('.store-layout');

  if (filterToggleBtn && storeLayout) {
    filterToggleBtn.addEventListener('click', () => {
      storeLayout.classList.toggle('show-filters');
      const arrow = filterToggleBtn.querySelector('.arrow-icon');
      if (arrow) {
        arrow.style.transform = storeLayout.classList.contains('show-filters') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // ══════════════════════════════════════════════════
  // PACK DETAIL PANEL — show details when selecting
  // ══════════════════════════════════════════════════
  const detailPanel = document.getElementById('packDetailPanel');
  const packRadios = document.querySelectorAll('input[name="pack"]');

  const showPackDetails = (packKey) => {
    const data = PACK_DATA[packKey];
    if (!data || !detailPanel) return;

    const activitiesHTML = data.activities.map(a =>
      `<div class="activity-chip"><span class="chip-icon">${a.icon}</span> ${a.name}</div>`
    ).join('');

    detailPanel.innerHTML = `
      <div class="pack-detail-inner">
        <div class="pack-detail-header">
          <div class="detail-emoji">${data.emoji}</div>
          <div class="detail-title">
            <h4>${data.name}</h4>
            <div class="detail-price-tag">${data.price} درهم / ${data.unit}</div>
          </div>
        </div>
        <p class="pack-detail-desc">${data.description}</p>
        <div class="pack-detail-label">✦ الأنشطة المتضمنة في الباقة:</div>
        <div class="pack-activities-list">${activitiesHTML}</div>
        <div class="pack-detail-footer">
          <div class="detail-duration">⏱️ المدة: ${data.duration}</div>
          <div class="detail-total-price">${data.price} MAD</div>
        </div>
      </div>
    `;

    detailPanel.classList.add('visible');
  };

  packRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) showPackDetails(radio.value);
    });
  });

  // ══════════════════════════════════════════════════
  // BOOKING WIZARD (3 Steps)
  // ══════════════════════════════════════════════════
  let wizardStep = 1;
  const totalSteps = 3;
  const wizardBack = document.getElementById('wizardBack');
  const wizardNext = document.getElementById('wizardNext');
  const progressSteps = document.querySelectorAll('.progress-step');

  const bookingData = {
    pack: null,
    packName: '',
    packPrice: 0,
    name: '',
    phone: '',
    guests: 1,
    city: '',
    notes: ''
  };

  const showStep = (step) => {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`wizardStep${step}`);
    if (target) target.classList.add('active');

    progressSteps.forEach(ps => {
      const s = parseInt(ps.dataset.step);
      ps.classList.remove('active', 'completed');
      if (s === step) ps.classList.add('active');
      else if (s < step) ps.classList.add('completed');
    });

    wizardBack.style.visibility = step === 1 ? 'hidden' : 'visible';
    wizardNext.innerHTML = step === totalSteps
      ? '<span>✓ تأكيد الحجز</span>'
      : '<span>التالي ←</span>';
  };

  const validateStep = (step) => {
    if (step === 1) {
      const selected = document.querySelector('input[name="pack"]:checked');
      if (!selected) { alert('الرجاء اختيار باقة'); return false; }
      bookingData.pack = selected.value;
      bookingData.packName = selected.dataset.name;
      bookingData.packPrice = parseInt(selected.dataset.price);
      return true;
    }
    if (step === 2) {
      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      if (!name) { alert('الرجاء إدخال الاسم الكامل'); return false; }
      if (!phone) { alert('الرجاء إدخال رقم الهاتف'); return false; }
      bookingData.name = name;
      bookingData.phone = phone;
      bookingData.guests = parseInt(document.getElementById('guests').value) || 1;
      bookingData.city = document.getElementById('city').value;
      bookingData.notes = document.getElementById('notes').value.trim();
      return true;
    }
    return true;
  };

  const updateSummary = () => {
    document.getElementById('summaryPack').textContent = bookingData.packName || '—';

    const packData = PACK_DATA[bookingData.pack];
    if (packData) {
      const names = packData.activities.map(a => a.name).join('، ');
      document.getElementById('summaryActivities').textContent = names;
    }

    document.getElementById('summaryName').textContent = bookingData.name || '—';
    document.getElementById('summaryGuests').textContent = bookingData.guests;

    const total = bookingData.packPrice * bookingData.guests;
    document.getElementById('summaryTotal').textContent = `${total} MAD`;
  };

  wizardNext.addEventListener('click', () => {
    if (wizardStep < totalSteps) {
      if (validateStep(wizardStep)) {
        wizardStep++;
        if (wizardStep === totalSteps) updateSummary();
        showStep(wizardStep);
      }
    } else {
      document.getElementById('successModal').classList.add('active');
    }
  });

  wizardBack.addEventListener('click', () => {
    if (wizardStep > 1) { wizardStep--; showStep(wizardStep); }
  });

  // ══════════════════════════════════════════════════
  // SMOOTH SCROLL
  // ══════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ══════════════════════════════════════════════════
  // PARALLAX ON HERO
  // ══════════════════════════════════════════════════
  const heroBg = document.querySelector('.hero-bg-main');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // ══════════════════════════════════════════════════════
  // 3D TILT EFFECT ON PACK CARDS
  // ══════════════════════════════════════════════════════
  const packCards = document.querySelectorAll('.pack-card');

  packCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const maxRotation = 10; // Max rotation in degrees
      const scale = 1.05; // Hover scale

      const rotateX = -(y / (rect.height / 2)) * maxRotation;
      const rotateY = (x / (rect.width / 2)) * maxRotation;

      card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
      card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5 + 20}px 50px rgba(26, 46, 35, 0.3)`;
    });

    card.addEventListener('mouseleave', () => {
      // Reset safely
      card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease';
      card.style.boxShadow = '0 10px 40px rgba(26, 46, 35, 0.1)';
    });
  });

});

// ══════════════════════════════════════════════════
// GLOBAL FUNCTIONS
// ══════════════════════════════════════════════════

function selectPack(packValue) {
  const radio = document.querySelector(`input[name="pack"][value="${packValue}"]`);
  if (radio) {
    radio.checked = true;
    radio.dispatchEvent(new Event('change'));
  }
  const booking = document.getElementById('booking');
  if (booking) {
    const y = booking.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function closeModal() {
  document.getElementById('successModal').classList.remove('active');
  location.reload();
}

// ══════════════════════════════════════════════════
// FULL SITE MULTILINGUAL SUPPORT (AR / FR / EN)
// ══════════════════════════════════════════════════

const TRANSLATIONS = {
  ar: {
    'nav.home': 'الرئيسية',
    'nav.packs': 'الباقات',
    'nav.about': 'من نحن',
    'nav.store': 'المتجر',
    'nav.journey': 'الرحلة',
    'nav.testimonials': 'آراء الزبناء',
    'nav.book': 'احجز تجربتك',
    'hero.title': 'أي واحد يقدر يدير رحلات\nولكن ماشي أي واحد يقدر يخلق\n<span class="highlight">تجربة لا تُنسى</span>',
    'hero.desc': 'نحن لا نقدم مجرد نزهة، بل تجارب ثقافية غامرة تعيدك إلى الزمن الجميل. عِش يوماً كاملاً كأنك من أهل المنطقة.',
    'hero.btn_journey': '▶ شاهد الرحلة',
    'hero.scroll': 'اكتشف المزيد',
    'stats.success': 'تجربة ناجحة',
    'stats.regions': 'منطقة مغربية',
    'stats.satisfaction': '% رضا الزبناء',
    'stats.hosts': 'مضيف محلي',
    'about.tag': '✦ لماذا نحن مختلفون؟',
    'about.title': 'نحن لسنا مجرد منصة حجوزات<br>بل <span style="color:var(--color-terracotta)">بوابة للزمن الجميل</span>',
    'packs.badge': '🎒 باقاتنا الحصرية',
    'packs.title': 'اختر تجربتك المفضلة',
    'packs.subtitle': 'كل باقة مصممة بعناية لتمنحك تجربة ثقافية فريدة تجمع بين المتعة والتعلم والمغامرة',
    'journey.badge': '🗺️ رحلة التجربة',
    'journey.title': 'كيف تعيش التجربة معنا؟',
    'journey.subtitle': 'من لحظة الحجز إلى العودة بذكريات لا تُنسى – كل خطوة مصممة بعناية',
    'testi.badge': '💬 آراء زبنائنا',
    'testi.title': 'تجاربهم تتحدث عنّا',
    'testi.subtitle': 'اكتشف ما يقوله من عاشوا التجربة قبلك',
    // About extras
    'about.card_title': 'تجربة أصيلة', 'about.card_desc': '100% تراث محلي حقيقي',
    'about.p1': 'في عالم يسيطر عليه الذكاء الاصطناعي والتكنولوجيا، نقدم لك فرصة فريدة للعودة إلى جذورك. نربط الأجيال الصاعدة بثقافة الأجداد من خلال تجارب حية ولحظات لا تُنسى مصممة بعناية لتكون "Instagramable".',
    'about.p2': 'العميل هو بطل الرحلة – وكل تفصيلة مبنية على الجمالية والأصالة والتعلم التفاعلي.',
    'feat1.title': 'تجربة غامرة', 'feat1.desc': 'عِش يوماً كأهل المنطقة',
    'feat2.title': 'لحظات مميزة', 'feat2.desc': 'صور وذكريات لا تُنسى',
    'feat3.title': 'شهادة تذكارية', 'feat3.desc': 'تذكار + شهادة بالتجربة',
    'feat4.title': 'تعلم تفاعلي', 'feat4.desc': 'تعرف على ثقافات حقيقية',
    // Packs
    'curr': 'درهم', 'per.person': 'للشخص', 'per.child': 'للطفل', 'book.now': 'احجز الآن ←',
    'pack.moussem.name': 'باك الموسم', 'pack.moussem.tag1': '🎪 ثقافي', 'pack.moussem.tag2': '👨‍👩‍👧‍👦 عائلي', 'pack.moussem.tag3': '🔥 الأكثر طلباً',
    'pack.moussem.desc': 'تجربة فريدة لحضور موسم محلي أصيل مع ترحيب خاص واستكشاف التقاليد والفلكلور المحلي في أجواء احتفالية لا مثيل لها.',
    'pack.mediouni.name': 'باك مديوني', 'pack.mediouni.tag1': '🌾 فلاحة', 'pack.mediouni.tag2': '🧵 حرف يدوية',
    'pack.mediouni.desc': 'اكتشف حياة الفلاحة ونسيج الصوف وتسوق في السوق المحلي واصنع منتجك بيديك.',
    'pack.coop.name': 'باك التعاونيات', 'pack.coop.tag1': '🧶 تعاونيات',
    'pack.coop.desc': 'صنع منتج يدوي من الألف إلى الياء: حياكة، خياطة، تطريز مع حرفيات محترفات.',
    'pack.wladi.name': 'باك ولادي', 'pack.wladi.tag1': '👶 أطفال', 'pack.wladi.tag2': '🎨 تعليمي',
    'pack.wladi.desc': 'باقات مخصصة للأطفال تربطهم بزمن الأجداد بطريقة مبسطة ومرحة وتعليمية.',
    'pack.weding.name': 'باك عرسي', 'pack.weding.tag1': '🎊 حفل نسائي', 'pack.weding.tag2': '💍 عرس مغربي أصيل',
    'pack.weding.desc': 'باك عرسي (بلا عريس)، حفل مخصص للنساء يضم كل طقوس العرس المغربي: العونيات، الأكل التقليدي، نقش الحناء، العمارية وبرزة العروسة، بالإضافة للتصوير الاحترافي.',
    // Store
    'store.empty.title': 'المتجر فارغ حالياً', 'store.empty.desc': 'قريباً سيتم إضافة منتجات الصناعة التقليدية الأصيلة.',
    // Timeline
    'step1.title': 'اختر باقتك المفضلة', 'step1.desc': 'تصفح باقاتنا الأربع واختر ما يناسبك. خصص تجربتك بإضافة الأنشطة التي تثير فضولك.',
    'step2.title': 'الترحيب والاستقبال', 'step2.desc': 'نستقبلك مع أهل المنطقة بأصالة مغربية. شاي بالنعناع، ابتسامة صادقة، والهدوء الريفي.',
    'step3.title': 'عِش التجربة الغامرة', 'step3.desc': 'ارتدِ اللباس التقليدي، اعمل في الفلاحة، اصنع الزربية بيديك. كُن جزءاً من المنطقة ليوم كامل.',
    'step4.title': 'التذكار والشهادة', 'step4.desc': 'عُد بتذكار يدوي أصيل وشهادة "Experience Bladi" الحصرية. وذكريات تدوم للأبد.',
    // Testimonials
    'testi1.text': '"تجربة لا تُنسى حقاً! أطفالي تعلموا كيف يصنعون الخبز التقليدي وعاشوا يوماً كاملاً في الفلاحة. الحماس والفرح في عيونهم لا يُقدّر بثمن."',
    'testi1.name': 'سارة المنصوري', 'testi1.loc': 'الدار البيضاء • باك ولادي', 'testi1.avatar': 'سَ',
    'testi2.text': '"كنت أبحث عن شيء مختلف عن الرحلات التقليدية، وهذا بالضبط ما وجدته. التعاونية كانت مكاناً ساحراً وتعلمت كيف أنسج الزربية. شكراً Experience Bladi!"',
    'testi2.name': 'ياسين بنعمر', 'testi2.loc': 'الرباط • باك التعاونيات', 'testi2.avatar': 'يَ',
    'testi3.text': '"حضرت الموسم المحلي وكان شيئاً لم أتوقعه أبداً. الفنتازيا، اللباس التقليدي، الأجواء... كل شيء كان مثالياً. أنصح الجميع بهذه التجربة."',
    'testi3.name': 'فاطمة الزهراء', 'testi3.loc': 'مراكش • باك الموسم', 'testi3.avatar': 'فَ',
    'testi4.text': '"كمصور فوتوغرافي، هذه التجربة كانت كنزاً بصرياً. كل لحظة كانت تستحق التصوير. الألوان، الطبيعة، والناس البسطاء... سحر حقيقي."',
    'testi4.name': 'عمر حدّاد', 'testi4.loc': 'طنجة • باك مديوني', 'testi4.avatar': 'عَ',
    // Booking
    'book.badge': '📝 احجز تجربتك', 'book.title': 'ابدأ مغامرتك الآن', 'book.subtitle': 'اختر باقتك، خصص برنامجك، واحجز مكانك في 3 خطوات بسيطة',
    'wiz.step1': 'اختر الباقة', 'wiz.step2': 'معلوماتك', 'wiz.step3': 'الملخص',
    'wiz.s1.title': 'اختر باقتك المفضلة', 'wiz.s1.desc': 'اضغط على الباقة لمعرفة تفاصيلها الكاملة',
    'wiz.s2.title': 'معلوماتك الشخصية', 'wiz.s2.desc': 'أدخل بياناتك لإتمام الحجز',
    'wiz.s3.title': 'ملخص الحجز', 'wiz.s3.desc': 'راجع طلبك قبل التأكيد',
    'wiz.back': '→ الرجوع', 'wiz.next': 'التالي ←',
    'form.name': 'الاسم الكامل', 'form.name.ph': 'أدخل اسمك الكامل',
    'form.phone': 'رقم الهاتف', 'form.guests': 'عدد الأشخاص',
    'form.city': 'المدينة', 'form.city.ph': 'اختر مدينتك',
    'form.notes': 'ملاحظات إضافية (اختياري)', 'form.notes.ph': 'أي تفاصيل أو طلبات خاصة...',
    'city.casa': 'الدار البيضاء', 'city.rabat': 'الرباط', 'city.marrakech': 'مراكش', 'city.fes': 'فاس', 'city.tangier': 'طنجة', 'city.other': 'أخرى',
    'sum.pack': 'الباقة المختارة', 'sum.activities': 'الأنشطة المتضمنة', 'sum.name': 'الاسم', 'sum.guests': 'عدد الأشخاص', 'sum.total': 'المجموع الكلي',
    // Footer
    'footer.brand.desc': 'منصة التجارب الثقافية الغامرة في المغرب. نربط بين التراث والحداثة لنقدم لك لحظات لا تُنسى مع أهل المنطقة.',
    'footer.packs': 'الباقات', 'footer.links': 'روابط مفيدة', 'footer.contact': 'تواصل معنا',
    'footer.how': 'كيف تعمل', 'footer.host': 'لوحة المضيف',
    'footer.rights': '© 2026 Experience Bladi. جميع الحقوق محفوظة.', 'footer.made': 'صُنع بـ ❤️ في المغرب',
    'footer.contact.address': '📍 مديونة، الدار البيضاء', 'footer.contact.phone': '📞 +212 6XX-XXXXXX', 'footer.contact.email': '✉️ hello@experience-bladi.ma',
    'hero.btn_packs': '🎒 اكتشف الباقات',
    // Modal
    'modal.title': 'تم الحجز بنجاح! 🎉', 'modal.desc': 'شكراً لك! سنتواصل معك قريباً لتأكيد تفاصيل تجربتك. استعد لمغامرة لا تُنسى!', 'modal.btn': 'حسناً ✓',
    'review.badge': '💬 تقييم التجربة', 'review.title': 'شاركنا رأيك', 'review.subtitle': 'رأيك يهمنا لتحسين خدماتنا وتطوير التجربة',
    'review.name': 'الاسم', 'review.name.ph': 'أدخل اسمك', 'review.pack': 'الباقة المجربة', 'review.pack.ph': 'اختر الباقة',
    'review.rating': 'التقييم', 'review.text': 'تعليقك', 'review.text.ph': 'شاركنا رأيك وتجربتك...', 'review.submit': 'إرسال التقييم',
    'store.filter.toggle': 'تخصيص البحث والتصفيات', 'store.filter.title': 'تصفية المنتجات', 'store.filter.cats': 'الفئات',
    'store.filter.all': 'جميع المنتجات (30)', 'store.filter.bags': 'حقائب يدوية (sac) (12)', 'store.filter.beauty': 'منتجات التجميل (8)',
    'store.filter.spices': 'حبوب وتوابل (10)', 'store.filter.price': 'نطاق السعر (درهم)', 'store.filter.apply': 'تطبيق التصفية',
    'store.toolbar.results': 'عرض 1-9 من أصل 30 منتج', 'store.toolbar.sort': 'ترتيب حسب:', 'store.sort.best': 'الأكثر مبيعاً',
    'store.sort.new': 'المضاف حديثاً', 'store.sort.low': 'السعر: من الأقل', 'store.sort.high': 'السعر: من الأعلى'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.packs': 'Nos Packs',
    'nav.about': 'À Propos',
    'nav.store': 'Boutique',
    'nav.journey': 'Le Voyage',
    'nav.testimonials': 'Avis Clients',
    'nav.book': 'Réserver',
    'hero.title': 'N\'importe qui peut organiser un voyage\nmais peu savent créer\n<span class="highlight">une expérience inoubliable</span>',
    'hero.desc': 'Nous ne proposons pas de simples excursions, mais des expériences culturelles immersives qui vous ramènent au beau temps. Vivez une journée entière comme un habitant de la région.',
    'hero.btn_journey': '▶ Voir le Voyage',
    'hero.scroll': 'Découvrir plus',
    'stats.success': 'Expériences réussies',
    'stats.regions': 'Régions marocaines',
    'stats.satisfaction': '% de satisfaction',
    'stats.hosts': 'Hôtes locaux',
    'about.tag': '✦ Pourquoi sommes-nous différents ?',
    'about.title': 'Nous ne sommes pas une simple plateforme<br>mais <span style="color:var(--color-terracotta)">une porte vers le beau temps</span>',
    'packs.badge': '🎒 Nos Packs Exclusifs',
    'packs.title': 'Choisissez votre expérience',
    'packs.subtitle': 'Chaque pack est soigneusement conçu pour vous offrir une expérience culturelle unique mêlant plaisir, apprentissage et aventure',
    'journey.badge': '🗺️ Le Parcours',
    'journey.title': 'Comment vivez-vous l\'expérience avec nous ?',
    'journey.subtitle': 'De la réservation au retour avec des souvenirs inoubliables – chaque étape est soigneusement planifiée',
    'testi.badge': '💬 Avis de nos clients',
    'testi.title': 'Leurs expériences parlent pour nous',
    'testi.subtitle': 'Découvrez ce que disent ceux qui ont vécu l\'expérience avant vous',
    'about.card_title': 'Expérience Authentique', 'about.card_desc': '100% patrimoine local réel',
    'about.p1': 'Dans un monde dominé par l\'IA et la technologie, nous vous offrons une occasion unique de retourner à vos racines. Nous connectons les nouvelles générations à la culture ancestrale à travers des expériences vivantes et des moments inoubliables conçus pour être "Instagrammables".',
    'about.p2': 'Le client est le héros du voyage – chaque détail est construit sur l\'esthétique, l\'authenticité et l\'apprentissage interactif.',
    'feat1.title': 'Expérience Immersive', 'feat1.desc': 'Vivez une journée comme les habitants',
    'feat2.title': 'Moments Mémorables', 'feat2.desc': 'Photos et souvenirs inoubliables',
    'feat3.title': 'Certificat Souvenir', 'feat3.desc': 'Souvenir + certificat d\'expérience',
    'feat4.title': 'Apprentissage Interactif', 'feat4.desc': 'Découvrez de vraies cultures',
    'curr': 'DH', 'per.person': 'par personne', 'per.child': 'par enfant', 'book.now': 'Réserver →',
    'pack.moussem.name': 'Pack Moussem', 'pack.moussem.tag1': '🎪 Culturel', 'pack.moussem.tag2': '👨‍👩‍👧‍👦 Familial', 'pack.moussem.tag3': '🔥 Le plus demandé',
    'pack.moussem.desc': 'Une expérience unique pour assister à un moussem local authentique avec un accueil spécial et une exploration des traditions et du folklore local.',
    'pack.mediouni.name': 'Pack Mediouni', 'pack.mediouni.tag1': '🌾 Agriculture', 'pack.mediouni.tag2': '🧵 Artisanat',
    'pack.mediouni.desc': 'Découvrez la vie agricole, le tissage de la laine, le marché local et fabriquez votre produit à la main.',
    'pack.coop.name': 'Pack Coopératives', 'pack.coop.tag1': '🧶 Coopératives',
    'pack.coop.desc': 'Fabriquez un produit artisanal de A à Z : tissage, couture, broderie avec des artisanes expertes.',
    'pack.wladi.name': 'Pack Wladi', 'pack.wladi.tag1': '👶 Enfants', 'pack.wladi.tag2': '🎨 Éducatif',
    'pack.wladi.desc': 'Des packs dédiés aux enfants qui les connectent au temps des ancêtres d\'une manière simple, amusante et éducative.',
    'pack.weding.name': 'Pack Mariage', 'pack.weding.tag1': '🎊 Fête entre femmes', 'pack.weding.tag2': '💍 Mariage traditionnel',
    'pack.weding.desc': 'Un pack mariage (sans marié), une fête 100% féminine incluant tous les rituels du mariage marocain : Laawniyat, repas traditionnel, Henné, Amaria et trône de la mariée, avec séance photo.',
    'store.empty.title': 'Boutique vide pour l\'instant', 'store.empty.desc': 'Bientôt, des produits artisanaux authentiques seront ajoutés.',
    'step1.title': 'Choisissez votre pack', 'step1.desc': 'Parcourez nos quatre packs et choisissez celui qui vous convient. Personnalisez votre expérience en ajoutant les activités qui vous intéressent.',
    'step2.title': 'Accueil & Réception', 'step2.desc': 'Nous vous accueillons avec les habitants dans un esprit marocain authentique. Thé à la menthe, sourire sincère et calme rural.',
    'step3.title': 'Vivez l\'expérience immersive', 'step3.desc': 'Portez la tenue traditionnelle, travaillez aux champs, tissez le tapis de vos mains. Soyez partie de la région pour une journée entière.',
    'step4.title': 'Souvenir & Certificat', 'step4.desc': 'Repartez avec un souvenir artisanal authentique et un certificat exclusif "Experience Bladi". Des souvenirs qui durent pour toujours.',
    'testi1.text': '"Une expérience vraiment inoubliable ! Mes enfants ont appris à faire le pain traditionnel et ont vécu une journée entière dans l\'agriculture. L\'enthousiasme et la joie dans leurs yeux n\'ont pas de prix."',
    'testi1.name': 'Sara Al-Mansouri', 'testi1.loc': 'Casablanca • Pack Wladi', 'testi1.avatar': 'S',
    'testi2.text': '"Je cherchais quelque chose de différent des voyages traditionnels, et c\'est exactement ce que j\'ai trouvé. La coopérative était un endroit magique et j\'ai appris à tisser le tapis. Merci Experience Bladi!"',
    'testi2.name': 'Yassine Benamor', 'testi2.loc': 'Rabat • Pack Coopératives', 'testi2.avatar': 'Y',
    'testi3.text': '"J\'ai assisté au moussem local et c\'était quelque chose que je n\'avais jamais prévu. La fantasia, les costumes traditionnels, l\'atmosphère... Tout était parfait."',
    'testi3.name': 'Fatima Zahra', 'testi3.loc': 'Marrakech • Pack Moussem', 'testi3.avatar': 'F',
    'testi4.text': '"En tant que photographe, cette expérience était un trésor visuel. Chaque instant méritait d\'être photographié. Les couleurs, la nature, les gens simples... Une vraie magie."',
    'testi4.name': 'Omar Haddad', 'testi4.loc': 'Tanger • Pack Mediouni', 'testi4.avatar': 'O',
    'book.badge': '📝 Réserver', 'book.title': 'Commencez votre aventure', 'book.subtitle': 'Choisissez votre pack, personnalisez votre programme, et réservez en 3 étapes simples',
    'wiz.step1': 'Choisir le Pack', 'wiz.step2': 'Vos Infos', 'wiz.step3': 'Résumé',
    'wiz.s1.title': 'Choisissez votre pack favori', 'wiz.s1.desc': 'Cliquez sur un pack pour voir tous ses détails',
    'wiz.s2.title': 'Vos informations personnelles', 'wiz.s2.desc': 'Entrez vos données pour finaliser la réservation',
    'wiz.s3.title': 'Résumé de la réservation', 'wiz.s3.desc': 'Vérifiez votre commande avant de confirmer',
    'wiz.back': '→ Retour', 'wiz.next': 'Suivant ←',
    'form.name': 'Nom complet', 'form.name.ph': 'Entrez votre nom complet',
    'form.phone': 'Numéro de téléphone', 'form.guests': 'Nombre de personnes',
    'form.city': 'Ville', 'form.city.ph': 'Choisissez votre ville',
    'form.notes': 'Notes supplémentaires (optionnel)', 'form.notes.ph': 'Tout détail ou demande spéciale...',
    'city.casa': 'Casablanca', 'city.rabat': 'Rabat', 'city.marrakech': 'Marrakech', 'city.fes': 'Fès', 'city.tangier': 'Tanger', 'city.other': 'Autre',
    'sum.pack': 'Pack sélectionné', 'sum.activities': 'Activités incluses', 'sum.name': 'Nom', 'sum.guests': 'Nombre de personnes', 'sum.total': 'Total général',
    'footer.brand.desc': 'Plateforme d\'expériences culturelles immersives au Maroc. Nous relions le patrimoine et la modernité pour vous offrir des moments inoubliables avec les habitants.',
    'footer.packs': 'Nos Packs', 'footer.links': 'Liens Utiles', 'footer.contact': 'Nous Contacter',
    'footer.how': 'Comment ça marche', 'footer.host': 'Espace Hôte',
    'footer.rights': '© 2026 Experience Bladi. Tous droits réservés.', 'footer.made': 'Fait avec ❤️ au Maroc',
    'footer.contact.address': '📍 Mediouna, Casablanca', 'footer.contact.phone': '📞 +212 6XX-XXXXXX', 'footer.contact.email': '✉️ hello@experience-bladi.ma',
    'hero.btn_packs': '🎒 Découvrir les Packs',
    'modal.title': 'Réservation réussie ! 🎉', 'modal.desc': 'Merci ! Nous vous contacterons bientôt pour confirmer les détails de votre expérience. Préparez-vous pour une aventure inoubliable !', 'modal.btn': 'Parfait ✓',
    'review.badge': '💬 Votre avis', 'review.title': 'Partagez votre expérience', 'review.subtitle': 'Votre avis est important pour nous aider à améliorer nos services',
    'review.name': 'Nom', 'review.name.ph': 'Entrez votre nom', 'review.pack': 'Pack testé', 'review.pack.ph': 'Choisissez le pack',
    'review.rating': 'Évaluation', 'review.text': 'Votre commentaire', 'review.text.ph': 'Partagez votre avis et votre expérience...', 'review.submit': 'Envoyer l\'avis',
    'store.filter.toggle': 'Filtres et Recherche', 'store.filter.title': 'Filtrer les Produits', 'store.filter.cats': 'Catégories',
    'store.filter.all': 'Tous les produits (30)', 'store.filter.bags': 'Sacs à main (12)', 'store.filter.beauty': 'Produits de beauté (8)',
    'store.filter.spices': 'Céréales & Épices (10)', 'store.filter.price': 'Fourchette de prix (MAD)', 'store.filter.apply': 'Appliquer les filtres',
    'store.toolbar.results': 'Affichage de 1-9 sur 30 produits', 'store.toolbar.sort': 'Trier par :', 'store.sort.best': 'Meilleures ventes',
    'store.sort.new': 'Nouveautés', 'store.sort.low': 'Prix : Croissant', 'store.sort.high': 'Prix : Décroissant'
  },
  en: {
    'nav.home': 'Home',
    'nav.packs': 'Our Packs',
    'nav.about': 'About Us',
    'nav.store': 'Store',
    'nav.journey': 'The Journey',
    'nav.testimonials': 'Reviews',
    'nav.book': 'Book Now',
    'hero.title': 'Anyone can organize a trip\nbut not everyone can create\n<span class="highlight">an unforgettable experience</span>',
    'hero.desc': 'We don\'t offer simple tours, but immersive cultural experiences that take you back to the good old days. Live an entire day as if you were a local.',
    'hero.btn_journey': '▶ Watch the Journey',
    'hero.scroll': 'Discover More',
    'stats.success': 'Successful Experiences',
    'stats.regions': 'Moroccan Regions',
    'stats.satisfaction': '% Customer Satisfaction',
    'stats.hosts': 'Local Hosts',
    'about.tag': '✦ Why are we different?',
    'about.title': 'We are not just a booking platform<br>but <span style="color:var(--color-terracotta)">a gateway to the good old days</span>',
    'packs.badge': '🎒 Our Exclusive Packs',
    'packs.title': 'Choose your experience',
    'packs.subtitle': 'Each pack is carefully designed to offer you a unique cultural experience combining fun, learning and adventure',
    'journey.badge': '🗺️ The Journey',
    'journey.title': 'How do you experience it with us?',
    'journey.subtitle': 'From booking to returning with unforgettable memories – every step is carefully designed',
    'testi.badge': '💬 Our Clients\' Reviews',
    'testi.title': 'Their experiences speak for us',
    'testi.subtitle': 'Discover what those who experienced it before you have to say',
    'about.card_title': 'Authentic Experience', 'about.card_desc': '100% real local heritage',
    'about.p1': 'In a world dominated by AI and technology, we offer you a unique opportunity to return to your roots. We connect new generations to ancestral culture through living experiences and unforgettable moments designed to be "Instagrammable".',
    'about.p2': 'The customer is the hero of the journey – every detail is built on aesthetics, authenticity and interactive learning.',
    'feat1.title': 'Immersive Experience', 'feat1.desc': 'Live a day like the locals',
    'feat2.title': 'Memorable Moments', 'feat2.desc': 'Unforgettable photos and memories',
    'feat3.title': 'Commemorative Certificate', 'feat3.desc': 'Souvenir + experience certificate',
    'feat4.title': 'Interactive Learning', 'feat4.desc': 'Discover real cultures',
    'curr': 'MAD', 'per.person': 'per person', 'per.child': 'per child', 'book.now': 'Book Now →',
    'pack.moussem.name': 'Moussem Pack', 'pack.moussem.tag1': '🎪 Cultural', 'pack.moussem.tag2': '👨‍👩‍👧‍👦 Family', 'pack.moussem.tag3': '🔥 Most Popular',
    'pack.moussem.desc': 'A unique experience attending an authentic local moussem with special welcome and exploration of local traditions and folklore.',
    'pack.mediouni.name': 'Mediouni Pack', 'pack.mediouni.tag1': '🌾 Agriculture', 'pack.mediouni.tag2': '🧵 Handicrafts',
    'pack.mediouni.desc': 'Discover farming life, wool weaving, the local market and make your own product by hand.',
    'pack.coop.name': 'Cooperatives Pack', 'pack.coop.tag1': '🧶 Cooperatives',
    'pack.coop.desc': 'Create a handmade product from scratch: weaving, sewing, embroidery with expert craftswomen.',
    'pack.wladi.name': 'Wladi Pack', 'pack.wladi.tag1': '👶 Children', 'pack.wladi.tag2': '🎨 Educational',
    'pack.wladi.desc': 'Dedicated packs for children connecting them to ancestral times in a simplified, fun and educational way.',
    'pack.weding.name': 'Wedding Pack', 'pack.weding.tag1': '🎊 Women Only Party', 'pack.weding.tag2': '💍 Traditional Wedding',
    'pack.weding.desc': 'A wedding pack (without the groom), a women-only celebration featuring all Moroccan wedding rituals: Laawniyat music, traditional food, Henna, Amaria & bridal throne, plus professional photography.',
    'store.empty.title': 'Store Currently Empty', 'store.empty.desc': 'Authentic traditional craft products will be added soon.',
    'step1.title': 'Choose Your Pack', 'step1.desc': 'Browse our four packs and choose what suits you. Customize your experience by adding activities that spark your curiosity.',
    'step2.title': 'Welcome & Reception', 'step2.desc': 'We welcome you with the locals in an authentic Moroccan spirit. Mint tea, genuine smile, and rural tranquility.',
    'step3.title': 'Live the Immersive Experience', 'step3.desc': 'Wear traditional attire, work in the fields, weave the carpet with your own hands. Be part of the region for a full day.',
    'step4.title': 'Souvenir & Certificate', 'step4.desc': 'Return with an authentic handmade souvenir and exclusive "Experience Bladi" certificate. Memories that last forever.',
    'testi1.text': '"A truly unforgettable experience! My children learned how to make traditional bread and lived a full day on the farm. The enthusiasm and joy in their eyes is priceless."',
    'testi1.name': 'Sara Al-Mansouri', 'testi1.loc': 'Casablanca • Wladi Pack', 'testi1.avatar': 'S',
    'testi2.text': '"I was looking for something different from traditional trips, and this is exactly what I found. The cooperative was a magical place and I learned to weave the carpet. Thank you Experience Bladi!"',
    'testi2.name': 'Yassine Benamor', 'testi2.loc': 'Rabat • Cooperatives Pack', 'testi2.avatar': 'Y',
    'testi3.text': '"I attended the local moussem and it was something I never expected. The fantasia, the traditional costumes, the atmosphere... Everything was perfect. I recommend this experience to everyone."',
    'testi3.name': 'Fatima Zahra', 'testi3.loc': 'Marrakech • Moussem Pack', 'testi3.avatar': 'F',
    'testi4.text': '"As a photographer, this experience was a visual treasure. Every moment deserved to be captured. The colors, nature, and simple people... True magic."',
    'testi4.name': 'Omar Haddad', 'testi4.loc': 'Tangier • Mediouni Pack', 'testi4.avatar': 'O',
    'book.badge': '📝 Book Now', 'book.title': 'Start Your Adventure', 'book.subtitle': 'Choose your pack, customize your program, and book in 3 simple steps',
    'wiz.step1': 'Choose Pack', 'wiz.step2': 'Your Info', 'wiz.step3': 'Summary',
    'wiz.s1.title': 'Choose your favorite pack', 'wiz.s1.desc': 'Click on a pack to see its full details',
    'wiz.s2.title': 'Your personal information', 'wiz.s2.desc': 'Enter your details to complete the booking',
    'wiz.s3.title': 'Booking Summary', 'wiz.s3.desc': 'Review your order before confirming',
    'wiz.back': '→ Back', 'wiz.next': 'Next ←',
    'form.name': 'Full Name', 'form.name.ph': 'Enter your full name',
    'form.phone': 'Phone Number', 'form.guests': 'Number of Guests',
    'form.city': 'City', 'form.city.ph': 'Choose your city',
    'form.notes': 'Additional Notes (Optional)', 'form.notes.ph': 'Any details or special requests...',
    'city.casa': 'Casablanca', 'city.rabat': 'Rabat', 'city.marrakech': 'Marrakech', 'city.fes': 'Fes', 'city.tangier': 'Tangier', 'city.other': 'Other',
    'sum.pack': 'Selected Pack', 'sum.activities': 'Included Activities', 'sum.name': 'Name', 'sum.guests': 'Number of Guests', 'sum.total': 'Grand Total',
    'footer.brand.desc': 'Immersive cultural experiences platform in Morocco. We bridge heritage and modernity to offer you unforgettable moments with the locals.',
    'footer.packs': 'Our Packs', 'footer.links': 'Useful Links', 'footer.contact': 'Contact Us',
    'footer.how': 'How It Works', 'footer.host': 'Host Dashboard',
    'footer.rights': '© 2026 Experience Bladi. All rights reserved.', 'footer.made': 'Made with ❤️ in Morocco',
    'footer.contact.address': '📍 Mediouna, Casablanca', 'footer.contact.phone': '📞 +212 6XX-XXXXXX', 'footer.contact.email': '✉️ hello@experience-bladi.ma',
    'hero.btn_packs': '🎒 Discover Packs',
    'modal.title': 'Booking Successful! 🎉', 'modal.desc': 'Thank you! We will contact you soon to confirm your experience details. Get ready for an unforgettable adventure!', 'modal.btn': 'Great ✓',
    'review.badge': '💬 Your Review', 'review.title': 'Share Your Experience', 'review.subtitle': 'Your feedback is important to help us improve our services',
    'review.name': 'Name', 'review.name.ph': 'Enter your name', 'review.pack': 'Experienced Pack', 'review.pack.ph': 'Choose the pack',
    'review.rating': 'Rating', 'review.text': 'Your Comment', 'review.text.ph': 'Share your review and experience...', 'review.submit': 'Submit Review',
    'store.filter.toggle': 'Filters and Search', 'store.filter.title': 'Filter Products', 'store.filter.cats': 'Categories',
    'store.filter.all': 'All Products (30)', 'store.filter.bags': 'Handbags (12)', 'store.filter.beauty': 'Beauty Products (8)',
    'store.filter.spices': 'Spices & Grains (10)', 'store.filter.price': 'Price Range (MAD)', 'store.filter.apply': 'Apply Filters',
    'store.toolbar.results': 'Showing 1-9 of 30 products', 'store.toolbar.sort': 'Sort by:', 'store.sort.best': 'Best Sellers',
    'store.sort.new': 'New Arrivals', 'store.sort.low': 'Price: Low to High', 'store.sort.high': 'Price: High to Low'
  }
};

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS['ar'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Direction & lang attribute
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

function setLanguage(lang) {
  localStorage.setItem('bladi_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  applyTranslations(lang);
}

// Apply saved language on startup
(function () {
  const saved = localStorage.getItem('bladi_lang') || 'ar';
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === saved);
    });
    applyTranslations(saved);
  });
})();
