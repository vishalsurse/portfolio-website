/* ─────────────────────────────────────────────────────────
   PORTFOLIO MAIN.JS
   - Hero: Three.js particle network + floating cubes
   - About: Rotating wireframe globe
   - Scroll: reveal animations + stat counter
   - Nav: scrolled class + hamburger
   - Contact: form feedback
───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── WAIT FOR THREE.JS ── */
  function waitForThree(cb) {
    if (typeof THREE !== 'undefined') { cb(); return; }
    const id = setInterval(() => {
      if (typeof THREE !== 'undefined') { clearInterval(id); cb(); }
    }, 50);
  }

  /* ────────────────────────────
     HERO 3D SCENE
  ──────────────────────────── */
  function initHero() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 28);

    /* ── Ambient + Directional ── */
    scene.add(new THREE.AmbientLight(0x112244, 2));
    const dirLight = new THREE.DirectionalLight(0x00d4ff, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    /* ── Particle field ── */
    const PARTICLE_COUNT = 1800;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── Floating wireframe cubes ── */
    const cubes = [];
    const cubeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.15 });
    const sizes = [2.5, 1.8, 1.2, 3.2, 1.5, 2.0, 0.9];
    sizes.forEach((s, i) => {
      const geo = new THREE.BoxGeometry(s, s, s);
      const mesh = new THREE.Mesh(geo, cubeMat.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 20 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const speed = 0.003 + Math.random() * 0.005;
      cubes.push({ mesh, speed, phase: Math.random() * Math.PI * 2 });
      scene.add(mesh);
    });

    /* ── Connection lines between nearby particles ── */
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.05 });
    const lineGroup = new THREE.Group();
    const sample = 60;
    for (let i = 0; i < sample; i++) {
      for (let j = i + 1; j < sample; j++) {
        const ax = positions[i*3], ay = positions[i*3+1], az = positions[i*3+2];
        const bx = positions[j*3], by = positions[j*3+1], bz = positions[j*3+2];
        const dist = Math.sqrt((ax-bx)**2+(ay-by)**2+(az-bz)**2);
        if (dist < 14) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(ax, ay, az),
            new THREE.Vector3(bx, by, bz),
          ]);
          lineGroup.add(new THREE.Line(geo, lineMat));
        }
      }
    }
    scene.add(lineGroup);

    /* ── Mouse parallax ── */
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── Resize ── */
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* ── Animate ── */
    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.008;

      particles.rotation.y = t * 0.04 + mouseX * 0.12;
      particles.rotation.x = mouseY * 0.06;

      cubes.forEach(({ mesh, speed, phase }) => {
        mesh.rotation.x += speed;
        mesh.rotation.y += speed * 0.7;
        mesh.position.y += Math.sin(t + phase) * 0.005;
      });

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ────────────────────────────
     GLOBE (ABOUT SECTION)
  ──────────────────────────── */
  function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const W = 320, H = 320;
    canvas.width = W;
    canvas.height = H;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3.2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pt = new THREE.PointLight(0x00d4ff, 2, 10);
    pt.position.set(3, 3, 3);
    scene.add(pt);

    /* Wireframe sphere */
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.18 })
    );
    scene.add(sphere);

    /* Solid inner sphere */
    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(0.92, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x0d1220, emissive: 0x071020, specular: 0x00d4ff, shininess: 40 })
    );
    scene.add(inner);

    /* Dots on surface */
    const dotPositions = [];
    for (let i = 0; i < 200; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.01;
      dotPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(dotPositions), 3));
    scene.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.04 })));

    /* Ring */
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.008, 8, 100),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    let t2 = 0;
    function animateGlobe() {
      requestAnimationFrame(animateGlobe);
      t2 += 0.008;
      sphere.rotation.y = t2 * 0.5;
      inner.rotation.y = t2 * 0.3;
      ring.rotation.z  = t2 * 0.2;
      renderer.render(scene, camera);
    }
    animateGlobe();
  }

  /* ────────────────────────────
     SCROLL REVEAL
  ──────────────────────────── */
  function initReveal() {
    const targets = document.querySelectorAll(
      '.skill-card, .project-card, .timeline-item, .about-text, .contact-link, .section-title, .about-visual'
    );
    targets.forEach(el => el.classList.add('reveal'));

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(el => obs.observe(el));
  }

  /* ────────────────────────────
     STAT COUNTER
  ──────────────────────────── */
  function initCounters() {
    const nums = document.querySelectorAll('.stat-n');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        let cur = 0;
        const step = Math.ceil(target / 40);
        const id = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur;
          if (cur >= target) clearInterval(id);
        }, 40);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(n => obs.observe(n));
  }

  /* ────────────────────────────
     NAVBAR
  ──────────────────────────── */
  function initNav() {
    const nav  = document.getElementById('navbar');
    const hbg  = document.getElementById('hamburger');
    const links = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    hbg && hbg.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'rgba(7,11,20,.97)';
      links.style.padding = '20px 24px';
      links.style.gap = '18px';
      links.style.borderBottom = '1px solid #1e2d45';
    });

    /* Close mobile menu on link click */
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 720) links.style.display = 'none';
      });
    });
  }

  /* ────────────────────────────
     CARD TILT ON HOVER
  ──────────────────────────── */
  function initTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ────────────────────────────
     CONTACT FORM
  ──────────────────────────── */
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ────────────────────────────
     BOOT
  ──────────────────────────── */
  waitForThree(() => {
    initHero();
    initGlobe();
  });

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCounters();
    initNav();
    initTilt();
    initForm();
  });

})();
