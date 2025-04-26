// ===== Organ Tooltip Interaction =====
const organs = document.querySelectorAll('.organ');
const hoverBox = document.getElementById('hover-box');
const title = document.getElementById('organ-title');
const description = document.getElementById('organ-description');

const organData = {
  brain: { name: 'Brain', desc: 'Advanced neurosurgical care and radiation therapy.', link: 'brain.html' },
  heart: { name: 'Heart', desc: 'Expert cardiac-oncology treatment for tumor management.', link: 'heart.html' },
  lungs: { name: 'Lungs', desc: 'Minimally invasive lung cancer therapies.', link: 'lungs.html' },
  stomach: { name: 'Stomach', desc: 'Gastrointestinal cancer diagnosis and surgery.', link: 'stomach.html' },
  intestines: { name: 'Intestines', desc: 'Colorectal cancer screenings and treatment.', link: 'intestines.html' }
};

organs.forEach(organ => {
  const key = [...organ.classList].find(cls => organData[cls]);
  
  if (!key) return;

  organ.addEventListener('mouseenter', () => {
    title.textContent = organData[key].name;
    description.textContent = organData[key].desc;
    hoverBox.style.opacity = 1;
    hoverBox.style.transform = 'translateX(-50%) scale(1)';
  });

  organ.addEventListener('mouseleave', () => {
    hoverBox.style.opacity = 0;
    hoverBox.style.transform = 'translateX(-50%) scale(0.9)';
  });

  organ.addEventListener('click', () => {
    gsap.to(".robot-container", {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = organData[key].link;
      }
    });
  });
});

// ===== Eye Tracking (Robot Eyes Follow Cursor) =====
document.addEventListener('mousemove', (e) => {
  const eyes = document.querySelectorAll('.eye');
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.pupil');
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const radius = 6;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ===== Entrance Animation =====
window.addEventListener('load', () => {
  const tl = gsap.timeline();
  tl.from(".robot", { opacity: 0, scale: 0.9, duration: 1, ease: "power2.out" })
    .from(".organ", { opacity: 0, y: -20, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.8")
    .from(".eye", { opacity: 0, scale: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8");
});

// ===== Mobile Navigation Toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});
// ===== Layered Parallax Movement =====
const layers = [
  { selector: '.background', factorDesktop: 10, factorMobile: 3 },
  { selector: '.bed', factorDesktop: 20, factorMobile: 5 },
  { selector: '.monitor', factorDesktop: 25, factorMobile: 8 },
  { selector: '.cabinet', factorDesktop: 30, factorMobile: 10 },
  { selector: '.robot-group', factorDesktop: 15, factorMobile: 5 }
];

function handleParallax(x) {
  layers.forEach(layer => {
    gsap.to(layer.selector, {
      x: x * layer.factorDesktop,
      duration: 0.6,
      ease: "power3.out"
    });
  });
}

function handleScrollParallax() {
  const scrollX = window.scrollY; // Only X needed now for mobile
  layers.forEach(layer => {
    gsap.to(layer.selector, {
      x: scrollX * (layer.factorMobile / 10),
      duration: 0.6,
      ease: "power3.out"
    });
  });
}

// Desktop = Mouse move Left-Right ONLY
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    handleParallax(x);
  });
} 
// Mobile = Scroll Left-Right Movement
else {
  window.addEventListener('scroll', () => {
    handleScrollParallax();
  });
}
