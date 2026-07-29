const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.12});
  els.forEach(el=>io.observe(el));

  // scroll progress bar
  const progressBar = document.getElementById('progress-bar');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  // nav active-section highlighting
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = '#' + entry.target.id;
      const link = document.querySelector(`.nav-links a[href="${id}"]`);
      if(!link) return;
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
  sections.forEach(s=>navObserver.observe(s));

  // work section page counter (01 / 04)
  const spreads = document.querySelectorAll('#work .spread');
  const pageCounter = document.getElementById('pageCounter');
  const workSection = document.getElementById('work');
  const counterNum = pageCounter.querySelector('.n');
  const spreadObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const idx = Array.from(spreads).indexOf(entry.target);
        counterNum.textContent = String(idx + 1).padStart(2,'0');
      }
    });
  }, {threshold:0.5});
  spreads.forEach(s=>spreadObserver.observe(s));

  const workVisibility = new IntersectionObserver((entries)=>{
    entries.forEach(entry=> pageCounter.classList.toggle('show', entry.isIntersecting));
  }, {threshold:0.05});
  workVisibility.observe(workSection);

  // card-fan: click to pin a card to the front (nice on touch, fun on desktop)
  document.querySelectorAll('.card-fan .card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const wasPinned = card.classList.contains('pinned');
      card.parentElement.querySelectorAll('.card').forEach(c=>c.classList.remove('pinned'));
      if(!wasPinned) card.classList.add('pinned');
    });
  });

  // Na Navee gallery: click a thumb to crossfade the main photo
  const naveeMain = document.getElementById('naveeMain');
  const naveeCounter = document.getElementById('naveeCounterNum');
  const naveeThumbs = document.querySelectorAll('.navee-thumbs button');
  naveeThumbs.forEach((btn, i)=>{
    btn.addEventListener('click', ()=>{
      if(btn.classList.contains('active')) return;
      naveeThumbs.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      naveeMain.classList.add('fade');
      setTimeout(()=>{
        naveeMain.src = btn.dataset.src;
        naveeMain.alt = btn.dataset.alt;
        naveeCounter.textContent = i + 1;
        naveeMain.classList.remove('fade');
      }, 220);
    });
  });
