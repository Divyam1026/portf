/* ─────────────────────────────────────────
   main.js  —  Divyam Manchanda Portfolio
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. NAV — active link on scroll
  ══════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 160) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  });

  /* ══════════════════════════════════════
     2. NAV LOGO — glitch data-text
  ══════════════════════════════════════ */
  const logo = document.querySelector('.nav-logo');
  if (logo) logo.setAttribute('data-text', logo.textContent);

  /* ══════════════════════════════════════
     3. SPOTLIGHT CURSOR
  ══════════════════════════════════════ */
  const canvas = document.getElementById('spotlight');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let mx = -999, my = -999, inside = false;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      inside = true;
      canvas.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      inside = false;
      canvas.style.opacity = '0';
    });

    function drawSpotlight() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (inside) {
        const r = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        r.addColorStop(0,   'rgba(0,212,170,0.04)');
        r.addColorStop(0.5, 'rgba(0,212,170,0.012)');
        r.addColorStop(1,   'transparent');
        ctx.fillStyle = r;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      requestAnimationFrame(drawSpotlight);
    }
    drawSpotlight();
  }

  /* ══════════════════════════════════════
     4. 3D CARD TILT
  ══════════════════════════════════════ */
  document.querySelectorAll('.skill-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * 5;
      const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) * -5;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * -2.5;
      card.style.transform = `translateY(-3px) perspective(800px) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ══════════════════════════════════════
     5. TAG RIPPLE ON CLICK
  ══════════════════════════════════════ */
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes ripple-anim { to { transform:scale(2.5); opacity:0; } }`;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.tag, .tag-accent').forEach(tag => {
    tag.style.position = 'relative';
    tag.style.overflow  = 'hidden';
    tag.addEventListener('click', e => {
      const sp = document.createElement('span');
      sp.style.cssText = `
        position:absolute; border-radius:50%;
        width:60px; height:60px;
        background:rgba(0,212,170,0.22);
        transform:scale(0);
        animation:ripple-anim 0.45s ease-out forwards;
        left:${e.offsetX - 30}px; top:${e.offsetY - 30}px;
        pointer-events:none;
      `;
      tag.appendChild(sp);
      setTimeout(() => sp.remove(), 450);
    });
  });

  /* ══════════════════════════════════════
     6. SCROLL REVEAL
  ══════════════════════════════════════ */
  const revealCSS = document.createElement('style');
  revealCSS.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                  transform 0.65s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal.reveal-left  { transform: translateX(-40px); }
    .reveal.reveal-right { transform: translateX(40px); }
    .reveal.reveal-scale { transform: scale(0.92) translateY(20px); }
    .reveal.visible      { opacity: 1; transform: none; }
  `;
  document.head.appendChild(revealCSS);

  /* Section headers — slide up */
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
  });

  /* About — text from left, terminal from right */
  document.querySelectorAll('.about-text').forEach(el => {
    el.classList.add('reveal', 'reveal-left');
  });
  document.querySelectorAll('.terminal-box').forEach(el => {
    el.classList.add('reveal', 'reveal-right');
    el.style.transitionDelay = '0.1s';
  });

  /* Skill cards — staggered scale-up */
  document.querySelectorAll('.skill-card').forEach((el, i) => {
    el.classList.add('reveal', 'reveal-scale');
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  /* Project cards — staggered slide-up */
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  /* Cert cards — staggered scale-up */
  document.querySelectorAll('.cert-card').forEach((el, i) => {
    el.classList.add('reveal', 'reveal-scale');
    el.style.transitionDelay = (i * 0.09) + 's';
  });

  /* Contact items — staggered from left */
  document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.classList.add('reveal', 'reveal-left');
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  /* Contact form — from right */
  document.querySelectorAll('.contact-form').forEach(el => {
    el.classList.add('reveal', 'reveal-right');
    el.style.transitionDelay = '0.15s';
  });

  /* Contact info paragraph */
  document.querySelectorAll('.contact-info > p').forEach(el => {
    el.classList.add('reveal');
  });

  /* IntersectionObserver — re-triggers on scroll up too */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════════════
     7. INTERACTIVE TERMINAL
  ══════════════════════════════════════ */
  const out      = document.getElementById('term-output');
  const inp      = document.getElementById('term-input');
  const closeBtn = document.getElementById('term-close');

  if (!out || !inp) return;

  let cmdHistory = [], histIdx = -1;

  /* ── Commands ── */
  const COMMANDS = {
    help: () => [
      '<span class="dim">Available commands:</span>',
      '  <span class="key">whoami</span>        — show identity',
      '  <span class="key">skills</span>        — list technical skills',
      '  <span class="key">projects</span>      — show project list',
      '  <span class="key">certs</span>         — certifications',
      '  <span class="key">contact</span>       — get in touch',
      '  <span class="key">cat flag.txt</span>  — 🚩 find the flag',
      '  <span class="key">nmap localhost</span> — scan yourself',
      '  <span class="key">echo &lt;text&gt;</span>   — print something',
      '  <span class="key">clear</span>         — clear terminal',
      '  <span class="key">date</span>          — current date/time',
      '  <span class="key">uname -a</span>      — system info',
    ],

    whoami: () => [
      '<span class="key">{</span>',
      '  <span class="key">"name"</span>       : <span class="val">"Divyam Manchanda"</span>,',
      '  <span class="key">"role"</span>       : <span class="val">"Cybersecurity Student & Researcher"</span>,',
      '  <span class="key">"education"</span>  : <span class="val">"B.Tech CSE Hons. Cybersecurity & Blockchain"</span>,',
      '  <span class="key">"university"</span> : <span class="val">"Lovely Professional University"</span>,',
      '  <span class="key">"cgpa"</span>       : <span class="val">"7.5"</span>,',
      '  <span class="key">"location"</span>   : <span class="val">"Punjab, India"</span>,',
      '  <span class="key">"experience"</span> : <span class="val">"DRDO Cybersecurity Trainee"</span>,',
      '  <span class="key">"available"</span>  : <span class="ok">true</span>,',
      '  <span class="key">"motto"</span>      : <span class="val">"Hack to protect."</span>',
      '<span class="key">}</span>',
    ],

    skills: () => [
      '<span class="dim">Technical skills:</span>',
      '  <span class="ok">●</span> <span class="key">Languages</span>  C · C++ · Python · HTML · CSS · JavaScript',
      '  <span class="ok">●</span> <span class="key">Frameworks</span> OWASP Top 10 · Mitre ATT&CK · Cyber Kill Chain',
      '  <span class="ok">●</span> <span class="key">Tools</span>      Nmap · Wireshark · Burp Suite · Metasploit · AWS',
      '  <span class="ok">●</span> <span class="key">Tech</span>       VAPT · Cloud Security · Digital Forensics',
      '  <span class="ok">●</span> <span class="key">Cloud</span>      AWS · Serverless · SNS · S3 · Misconfig Hunting',
      '  <span class="ok">●</span> <span class="key">Soft</span>       Leadership · Communication · Project Management',
    ],

    projects: () => [
      '<span class="dim">Projects:</span>',
      '  <span class="val">[1]</span> AWS Cloud Security Scanner           <span class="err">advanced</span>   Jan 2026',
      '  <span class="val">[2]</span> Deepfake Detector (PyTorch + Flask)  <span class="hint">intermediate</span> Apr 2025',
      '  <span class="val">[3]</span> Remote Access Backdoor (Python)     <span class="err">advanced</span>   Feb 2025',
      '  <span class="val">[4]</span> Web Security Testing @ DRDO         <span class="hint">internship</span>  Jun-Jul 2025',
      '<span class="dim">Scroll to #projects for full details.</span>',
    ],

    certs: () => [
      '<span class="dim">Certifications:</span>',
      '  <span class="ok">✓</span> CNSP — The SecOps Group                <span class="val">Jan 2026</span>',
      '  <span class="ok">✓</span> eJPT v2 — INE / eLearnSecurity         <span class="val">Sep 2025</span>',
      '  <span class="ok">✓</span> Oracle Certified Foundations Associate <span class="val">Sep 2025</span>',
      '  <span class="ok">✓</span> Certified Cloud Associate — INE        <span class="val">Sep 2025</span>',
      '  <span class="ok">✓</span> CompTIA Network+                       <span class="val">Jul 2025</span>',
    ],

    contact: () => [
      '<span class="dim">Contact info:</span>',
      '  <span class="key">Email</span>    <span class="val">divyammanchanda2610@gmail.com</span>',
      '  <span class="key">GitHub</span>   <span class="val">github.com/divyam-26</span>',
      '  <span class="key">LinkedIn</span> <span class="val">linkedin.com/in/divyam26</span>',
      '  <span class="key">Phone</span>    <span class="val">+91 87089 51566</span>',
    ],

    'cat flag.txt': () => [
      '<span class="ok">flag{y0u_f0und_the_easter_egg_good_enum!}</span>',
      '<span class="dim">Nice work. Enumeration pays off. 🚩</span>',
    ],

    'nmap localhost': () => [
      '<span class="dim">Starting Nmap 7.94 ( https://nmap.org )</span>',
      '<span class="dim">Nmap scan report for localhost (127.0.0.1)</span>',
      'PORT     STATE  SERVICE',
      '<span class="ok">22/tcp   open   ssh</span>',
      '<span class="ok">80/tcp   open   http</span>',
      '<span class="val">443/tcp  open   https</span>',
      '<span class="err">8080/tcp open   http-proxy</span>',
      '<span class="dim">Nmap done: 1 IP address (1 host up) scanned.</span>',
    ],

    date: () => [
      '<span class="val">' + new Date().toString() + '</span>',
    ],

    'uname -a': () => [
      '<span class="dim">Linux divyam-portfolio 6.1.0-kali #1 SMP Debian x86_64 GNU/Linux</span>',
      '<span class="dim">Kernel: 6.1.0-kali | Arch: x86_64 | Shell: bash 5.2</span>',
    ],
  };

  /* ── Helpers ── */
  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function printLine(html) {
    const d = document.createElement('div');
    d.className = 'line';
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }

  function printPromptEcho(cmdText) {
    printLine('<span class="prompt">divyam@portfolio:~$</span> <span class="cmd-echo">' + escHtml(cmdText) + '</span>');
  }

  function typeWriter(lines, delay) {
    lines.forEach((l, i) => {
      setTimeout(() => {
        printLine(l);
      }, i * delay);
    });
  }

  /* ── Run a command ── */
  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    cmdHistory.unshift(raw.trim());
    histIdx = -1;

    if (cmd === 'clear') {
      out.innerHTML = '';
      return;
    }

    const echoMatch = cmd.match(/^echo (.+)/);
    if (echoMatch) {
      printPromptEcho(raw.trim());
      printLine('<span class="val">' + escHtml(echoMatch[1]) + '</span>');
      return;
    }

    if (COMMANDS[cmd]) {
      printPromptEcho(raw.trim());
      typeWriter(COMMANDS[cmd](), 35);
    } else {
      printPromptEcho(raw.trim());
      printLine('<span class="err">bash: ' + escHtml(cmd) + ': command not found</span>');
      printLine('<span class="dim">Type <span style="color:var(--accent)">help</span> for available commands.</span>');
    }
  }

  /* ── Boot message ── */
  typeWriter([
    '<span class="dim">Kali GNU/Linux — divyam@portfolio</span>',
    '<span class="dim">Welcome to Divyam\'s portfolio. Type <span style="color:var(--accent)">help</span> to see commands.</span>',
    '',
  ], 45);

  /* ══════════════════════════════════════
     8. WEB AUDIO — keyboard sounds
  ══════════════════════════════════════ */
  const AC = new (window.AudioContext || window.webkitAudioContext)();

  function resumeAC() {
    if (AC.state === 'suspended') AC.resume();
  }

  function playKeyClick() {
    const buf = AC.createBuffer(1, AC.sampleRate * 0.04, AC.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 6);
    }
    const src    = AC.createBufferSource();
    src.buffer   = buf;
    const filter = AC.createBiquadFilter();
    filter.type  = 'highshelf';
    filter.frequency.value = 4000;
    filter.gain.value      = 8;
    const gain   = AC.createGain();
    gain.gain.setValueAtTime(0.18, AC.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + 0.04);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(AC.destination);
    src.start();
  }

  function playEnter() {
    const osc    = AC.createOscillator();
    const gain   = AC.createGain();
    const filter = AC.createBiquadFilter();
    osc.type     = 'sine';
    osc.frequency.setValueAtTime(180, AC.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, AC.currentTime + 0.12);
    filter.type  = 'lowpass';
    filter.frequency.value = 600;
    gain.gain.setValueAtTime(0.28, AC.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + 0.13);
    osc.connect(filter); filter.connect(gain); gain.connect(AC.destination);
    osc.start(); osc.stop(AC.currentTime + 0.13);

    const buf  = AC.createBuffer(1, AC.sampleRate * 0.05, AC.sampleRate);
    const d    = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
    const ns   = AC.createBufferSource();
    ns.buffer  = buf;
    const ng   = AC.createGain();
    ng.gain.setValueAtTime(0.12, AC.currentTime);
    ng.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + 0.05);
    ns.connect(ng); ng.connect(AC.destination); ns.start();
  }

  function playBackspace() {
    const osc  = AC.createOscillator();
    const gain = AC.createGain();
    osc.type   = 'triangle';
    osc.frequency.setValueAtTime(300, AC.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, AC.currentTime + 0.06);
    gain.gain.setValueAtTime(0.1, AC.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + 0.07);
    osc.connect(gain); gain.connect(AC.destination);
    osc.start(); osc.stop(AC.currentTime + 0.07);
  }

  /* ── Keyboard handler ── */
  inp.addEventListener('keydown', e => {
    resumeAC();

    if (e.key === 'Enter') {
      playEnter();
      run(inp.value);
      inp.value = '';

    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      playBackspace();

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playKeyClick();
      if (histIdx < cmdHistory.length - 1) histIdx++;
      inp.value = cmdHistory[histIdx] || '';

    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      playKeyClick();
      if (histIdx > 0) histIdx--;
      else { histIdx = -1; inp.value = ''; return; }
      inp.value = cmdHistory[histIdx] || '';

    } else if (e.key === 'Tab') {
      e.preventDefault();
      playKeyClick();
      const partial = inp.value.trim().toLowerCase();
      const match   = Object.keys(COMMANDS).find(k => k.startsWith(partial));
      if (match) inp.value = match;

    } else if (e.key.length === 1) {
      playKeyClick();
    }
  });

  /* ── Click terminal to focus input ── */
  document.getElementById('live-terminal').addEventListener('click', () => inp.focus());

  /* ── Red dot clears terminal ── */
  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    out.innerHTML = '';
  });

}); /* end DOMContentLoaded */
