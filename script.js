document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const submitBtn = document.querySelector(".btn-submit");

  /*
  if (form && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Changement du texte pendant l'envoi
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = "<span>//</span>ENVOI EN COURS...";
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          submitBtn.innerHTML = "<span>//</span>MESSAGE ENVOYÉ !";
          submitBtn.style.background = "#00ff00"; // Vert pour indiquer le succès
          form.reset(); // Réinitialise les champs du formulaire
        } else {
          throw new Error("Erreur lors de l’envoi");
        }
      } catch (error) {
        submitBtn.innerHTML = "<span>//</span>ERREUR, RÉESSAYEZ";
        submitBtn.style.background = "#ff0000"; // Rouge en cas d'erreur
      } finally {
        // Remet le bouton dans son état initial après 4 secondes
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }
    */

  // Gestion de la modale des projets
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImg = document.getElementById("modal-img");
  const modalDesc = document.getElementById("modal-desc");
  const modalTags = document.getElementById("modal-tags");
  const modalLink = document.getElementById("modal-link");
  const closeBtn = document.querySelector(".modal-close");
  const backdrop = document.querySelector(".modal-backdrop");
  const cards = document.querySelectorAll(".project-card");

  if (modal) {
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.getAttribute("data-title");
        const desc = card.getAttribute("data-desc");
        const tags = card.getAttribute("data-tags");
        const link = card.getAttribute("data-link");
        const imgSrc = card.getAttribute("data-img");

        modalTitle.innerHTML = `<span>//</span>${title}`;

        // Gestion de l'affichage de l'image dans la modale
        if (imgSrc && modalImg) {
          modalImg.src = imgSrc;
          modalImg.alt = `Aperçu du projet ${title}`;
          modalImg.style.display = "block";
        } else if (modalImg) {
          modalImg.style.display = "none"; // Masque l'image si le projet n'en a pas
        }

        modalDesc.textContent = desc;
        modalTags.textContent = tags;
        modalLink.href = link;

        modal.classList.add("active");
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // Active nav & ScrollSpy dynamique
  const btnContainer = document.getElementById("menu");

  if (btnContainer) {
    const btns = btnContainer.getElementsByClassName("selection");

    // Gestion au clic
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = btnContainer.getElementsByClassName("active");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
      });
    }

    // Gestion dynamique au défilement (IntersectionObserver)
    const sections = document.querySelectorAll("main section[id]");

    const observerOptions = {
      root: null,
      // Déclenche le changement quand la section atteint le tiers supérieur de l'écran
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          // Parcourt tous les boutons du menu
          Array.from(btns).forEach((btn) => {
            btn.classList.remove("active");
            // Si le href du bouton correspond à l'ID de la section visible
            if (btn.getAttribute("href") === `#${id}`) {
              btn.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);

    // Observe chaque section de la page principale
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // Bannière de compétences dynamique et infinie en JS
  const skillsBanner = document.querySelector(".skills-banner");
  const skillsTrack = document.querySelector(".skills-track");

  if (skillsBanner && skillsTrack) {
    // Liste des compétences à afficher dans le bandeau
    const skills = [
      "HTML5",
      "CSS3",
      "Python",
      "Java",
      "Git",
      "Materialize CSS",
      "Bash Scripting",
      "Linux CLI",
      "GitHub",
      "Algorithmique",
    ];

    // Fonction pour créer un groupe de compétences
    const createSkillsGroup = () => {
      const group = document.createElement("div");
      group.className = "skills-group";
      skills.forEach((skill) => {
        const span = document.createElement("span");
        span.innerHTML = `<span class="dot"></span><span>//</span>${skill}`;
        group.appendChild(span);
      });
      return group;
    };

    // On génère 4 groupes d'affilée pour avoir assez de largeur et assurer une boucle fluide
    for (let i = 0; i < 4; i++) {
      skillsTrack.appendChild(createSkillsGroup());
    }

    let currentX = 0;
    const speed = 3; // Vitesse de défilement
    let isPaused = false;

    // Pause au survol de la souris
    skillsBanner.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    skillsBanner.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    function animateBanner() {
      if (!isPaused) {
        currentX -= speed;
        const halfWidth = skillsTrack.scrollWidth / 2;

        // Dès qu'on a dépassé la moitié, on remet à 0 en douceur
        if (Math.abs(currentX) >= halfWidth) {
          currentX = 0;
        }

        skillsTrack.style.transform = `translateX(${currentX}px)`;
      }
      requestAnimationFrame(animateBanner);
    }
    animateBanner();
  }
});

// --- Animation de frappe ---
const $ = (s, r = document) => [...r.querySelectorAll(s)],
  sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Préparation : texte complet réservé (invisible) pour éviter les sauts de mise en page
$(".tw").forEach((e) => {
  const t = e.textContent.trim();
  e.textContent = "";
  const sr = document.createElement("span");
  sr.className = "sr";
  sr.textContent = t;
  const w = document.createElement("span"),
    v = document.createElement("span"),
    c = document.createElement("i"),
    h = document.createElement("span");
  w.setAttribute("aria-hidden", "true");
  c.className = "cur";
  h.className = "h";
  h.textContent = t;
  w.append(v, c, h);
  e.append(sr, w);
  e._ = { t, v, c, h };
});

async function type(e) {
  const { t, v, c, h } = e._,
    keep = e.hasAttribute("data-keep");
  if (reduce || !e.offsetParent) {
    v.textContent = t;
    h.textContent = "";
    if (keep) {
      c.style.display = "inline-block";
      e.classList.add("done");
    } else c.remove();
    return;
  }
  const sp = +e.dataset.speed || 8,
    n = +e.dataset.n || 2;
  c.style.display = "inline-block";
  for (let i = n; ; i += n) {
    const k = Math.min(i, t.length);
    v.textContent = t.slice(0, k);
    h.textContent = t.slice(k);
    if (k >= t.length) break;
    await sleep(sp);
  }
  if (keep) e.classList.add("done");
  else c.remove(); // seul le nom garde un curseur clignotant
}

const sc = $("#scroll")[0],
  secs = $("section"),
  links = $("nav a");
const io = new IntersectionObserver(
  (es) =>
    es.forEach(async (en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      for (const e of $(".tw", en.target)) await type(e);
    }),
  { root: sc, threshold: 0.05 },
);

document.querySelectorAll("main section").forEach((s) => io.observe(s));