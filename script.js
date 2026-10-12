document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.btn-submit');

    if (form && submitBtn) {
        form.addEventListener('submit', async (e) => {
        e.preventDefault();

            // Changement du texte pendant l'envoi
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>//</span>ENVOI EN COURS...';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                    'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<span>//</span>MESSAGE ENVOYÉ !';
                    submitBtn.style.background = '#008000'; // Vert pour indiquer le succès
                    form.reset(); // Réinitialise les champs du formulaire
                } else {
                    throw new Error('Erreur lors de l’envoi');
                }
            } catch (error) {
                submitBtn.innerHTML = '<span>//</span>ERREUR, RÉESSAYEZ';
                submitBtn.style.background = '#cc0000'; // Rouge en cas d'erreur
            } finally {
                // Remet le bouton dans son état initial après 4 secondes
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 4000);
            }
        });
    }

    // Gestion de la modale des projets
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');
    const closeBtn = document.querySelector('.modal-close');
    const backdrop = document.querySelector('.modal-backdrop');
    const cards = document.querySelectorAll('.project-card');

    if (modal) {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                const tags = card.getAttribute('data-tags');
                const link = card.getAttribute('data-link');

                modalTitle.innerHTML = `<span>//</span>${title}`;
                modalDesc.textContent = desc;
                modalTags.textContent = tags;
                modalLink.href = link;

                modal.classList.add('active');
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    //Active nav
    // Get the container element
    var btnContainer = document.getElementById("menu");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("selection");
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");

        // If there's no active class
        if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active";
    });
    }

    // --- Bannière de compétences dynamique et infinie en JS ---
    const skillsBanner = document.querySelector('.skills-banner');
    const skillsTrack = document.querySelector('.skills-track');

    if (skillsBanner && skillsTrack) {
        // Liste des compétences à afficher dans le bandeau
        const skills = [
            "HTML", "CSS", "Python", "Git", "Framework UI", 
            "Bash scripting", "Linux CLI", "GitHub", "JavaScript"
        ];

        // --- Bannière de compétences dynamique et infinie en JS ---
        const skillsBanner = document.querySelector('.skills-banner');
        const skillsTrack = document.querySelector('.skills-track');

        if (skillsBanner && skillsTrack) {
            // Liste des compétences à afficher dans le bandeau
            const skills = [
                "HTML", "CSS", "Python", "Git", "Framework UI", 
                "Bash scripting", "Linux CLI", "GitHub", "JavaScript"
            ];

            // Fonction pour créer un groupe de compétences
            const createSkillsGroup = () => {
                const group = document.createElement('div');
                group.className = 'skills-group';
                skills.forEach(skill => {
                    const span = document.createElement('span');
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
            skillsBanner.addEventListener('mouseenter', () => {
                isPaused = true;
            });

            skillsBanner.addEventListener('mouseleave', () => {
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

            // Lancement de l'animation
            requestAnimationFrame(animateBanner);
        }
    }
});

// S'exécute immédiatement si le DOM est prêt, sinon attend
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}