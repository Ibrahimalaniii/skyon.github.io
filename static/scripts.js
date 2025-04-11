// Scroll til kontaktskjema og highlight meny
function scrollToForm() {
  document.getElementById("kontakt").scrollIntoView({ behavior: "smooth" });

  const navbar = document.querySelector(".navbar");
  navbar.classList.add("highlight-nav");

  setTimeout(() => {
    navbar.classList.remove("highlight-nav");
  }, 3000);
}

// Når alt er klart
document.addEventListener("DOMContentLoaded", () => {
  setupForm();
  setupSlider();
  setupObserver();
});

// Kontakt-skjema via Flask
function setupForm() {
  const form = document.getElementById("kontaktSkjema");
  const statusText = document.getElementById("bekreftelse");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      navn: form.navn.value,
      epost: form.epost.value,
      melding: form.melding.value
    };

    fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          statusText.textContent = "Takk for din henvendelse!";
          form.reset();
        } else {
          statusText.textContent = "Noe gikk galt. Prøv igjen senere.";
        }
      })
      .catch((err) => {
        console.error(err);
        statusText.textContent = "Feil i nettverk.";
      });

    setTimeout(() => {
      statusText.textContent = "";
    }, 5000);
  });
}

// Kopier e-post til utklippstavle
function copyToClipboard(email) {
  navigator.clipboard.writeText(email).then(() => {
    alert("E-postadresse kopiert!");
  });
}

// Team-slider
function setupSlider() {
  const track = document.getElementById("teamTrack");
  if (!track) return;

  const members = track.children;
  const memberWidth = 350 + 32;
  const membersPerSlide = 2;
  let currentIndex = 1;

  const first = members[0].cloneNode(true);
  const last = members[members.length - 1].cloneNode(true);

  track.insertBefore(last, members[0]);
  track.appendChild(first);

  track.style.transform = `translateX(-${memberWidth * membersPerSlide}px)`;

  window.nextSlide = function () {
    const totalMembers = document.querySelectorAll(".team-member").length;
    const maxIndex = Math.ceil(totalMembers / membersPerSlide);

    currentIndex++;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * memberWidth * membersPerSlide}px)`;

    if (currentIndex >= maxIndex) {
      setTimeout(() => {
        track.style.transition = "none";
        currentIndex = 1;
        track.style.transform = `translateX(-${memberWidth * membersPerSlide}px)`;
      }, 500);
    }
  };

  window.prevSlide = function () {
    currentIndex--;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * memberWidth * membersPerSlide}px)`;

    if (currentIndex <= 0) {
      const totalMembers = document.querySelectorAll(".team-member").length;
      const maxIndex = Math.ceil(totalMembers / membersPerSlide);
      setTimeout(() => {
        track.style.transition = "none";
        currentIndex = maxIndex - 1;
        track.style.transform = `translateX(-${currentIndex * memberWidth * membersPerSlide}px)`;
      }, 500);
    }
  };
}

// Scroll-effekt for seksjoner
function setupObserver() {
  const fadeSections = document.querySelectorAll('.fade-section');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeSections.forEach(section => observer.observe(section));
}

// Hover-info på navbar
function showHoverBox(event, section) {
  const hoverBox = document.getElementById("hover-box");
  const hoverContent = document.getElementById("hover-content");

  const contentMap = {
    omoss: `<h3>Om Oss</h3><p>Vi er fremtidsrettede utviklere som bygger tech som faktisk funker.</p>`,
    produkter: `<h3>Produkter</h3><p>Chatboter og AI-integrasjoner for byggebransjen. Smart, effektivt, enkelt.</p>`,
    referanser: `<h3>Referanser</h3><p>Vi har samarbeidet med både små aktører og store entreprenører. Bevis finnes.</p>`,
    kontakt: `<h3>Kontakt</h3><p>Send oss en melding, vi svarer før du rekker å skrive “hei”.</p>`
  };

  hoverContent.innerHTML = contentMap[section] || "<p>Info kommer snart.</p>";

  const rect = event.target.getBoundingClientRect();
  hoverBox.style.left = `${rect.left + rect.width / 2}px`;
  hoverBox.style.top = `${rect.bottom + window.scrollY + 10}px`;
  hoverBox.style.transform = "translateX(-50%) translateY(0)";
  hoverBox.classList.add("show");
  hoverBox.classList.remove("hidden");
}

function hideHoverBox() {
  const hoverBox = document.getElementById("hover-box");
  hoverBox.classList.remove("show");
  setTimeout(() => hoverBox.classList.add("hidden"), 200);
}

// Transparent navbar on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});