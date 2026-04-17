const revealItems = document.querySelectorAll(".reveal-on-scroll");
const managedVideos = document.querySelectorAll("[data-managed-video]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sharedProjectMedia = [
  { type: "image", src: "img/xicara.jpg", label: "X\u00edcara", note: "Imagem de apoio usada para apresentar textura, atmosfera e dire\u00e7\u00e3o visual do projeto." },
  { type: "image", src: "img/pote.jpg", label: "Pote", note: "Recorte complementar para refor\u00e7ar mat\u00e9ria, composi\u00e7\u00e3o e presen\u00e7a de marca." },
  { type: "image", src: "img/colher.jpg", label: "Colher", note: "Fechamento do \u00e1lbum com foco em detalhe, ritmo e acabamento visual." },
  { type: "image", src: "img/frase.jpg", label: "Frase", note: "Pe\u00e7a textual do projeto usada para ampliar conceito, tom e mem\u00f3ria visual." },
];

if (prefersReducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const projects = {
  kizuna: {
    category: "Moda / v\u00ednculo / dire\u00e7\u00e3o",
    title: "Kizuna",
    description: "Um projeto sobre la\u00e7o, presen\u00e7a e identidade. A constru\u00e7\u00e3o visual partiu da ideia de v\u00ednculo e perman\u00eancia.",
    media: sharedProjectMedia,
  },
  akari: {
    category: "Luz / pele / mem\u00f3ria",
    title: "Akari",
    description: "Uma narrativa de marca guiada por textura, ilumina\u00e7\u00e3o e proximidade para refor\u00e7ar percep\u00e7\u00e3o e assinatura visual.",
    media: sharedProjectMedia,
  },
  ma: {
    category: "Pausa / tempo / presen\u00e7a",
    title: "Ma",
    description: "Uma campanha constru\u00edda a partir de respiro, ritmo e sil\u00eancio visual para criar impacto sem ru\u00eddo.",
    media: sharedProjectMedia,
  },
  hana: {
    category: "Delicadeza / gesto / detalhe",
    title: "Hana",
    description: "Uma dire\u00e7\u00e3o focada em delicadeza visual, textura e proximidade para fortalecer identidade.",
    media: sharedProjectMedia,
  },
  sora: {
    category: "Luz / respiro / percep\u00e7\u00e3o",
    title: "Sora",
    description: "Projeto constru\u00eddo com ar, luz e pausas visuais para uma presen\u00e7a mais limpa.",
    media: sharedProjectMedia,
  },
  ren: {
    category: "Ritmo / repeti\u00e7\u00e3o / assinatura",
    title: "Ren",
    description: "Uma campanha desenhada para sustentar reconhecimento visual com repeti\u00e7\u00e3o sofisticada.",
    media: sharedProjectMedia,
  },
  yugen: {
    category: "Profundidade / sil\u00eancio / est\u00e9tica",
    title: "Yugen",
    description: "Narrativa visual de profundidade, feita para marcas com repert\u00f3rio e sensibilidade.",
    media: sharedProjectMedia,
  },
  tsuki: {
    category: "Noite / intimidade / digital",
    title: "Tsuki",
    description: "Uma presen\u00e7a noturna e \u00edntima para expandir marca com mais densidade visual.",
    media: sharedProjectMedia,
  },
  ichi: {
    category: "Essencial / clareza / marca",
    title: "Ichi",
    description: "Projeto focado no essencial, para refor\u00e7ar autoridade sem ru\u00eddo excessivo.",
    media: sharedProjectMedia,
  },
  kumo: {
    category: "Fluxo / leveza / contempla\u00e7\u00e3o",
    title: "Kumo",
    description: "Um trabalho mais contemplativo, guiado por movimento suave e continuidade visual.",
    media: sharedProjectMedia,
  },
  mori: {
    category: "Mat\u00e9ria / textura / perman\u00eancia",
    title: "Mori",
    description: "Projeto pensado para criar densidade e perman\u00eancia atrav\u00e9s de textura e composi\u00e7\u00e3o.",
    media: sharedProjectMedia,
  },
  kai: {
    category: "Expans\u00e3o / presen\u00e7a / campanha",
    title: "Kai",
    description: "Campanha constru\u00edda para ampliar alcance mantendo linguagem e unidade visual.",
    media: sharedProjectMedia,
  },
};

const modal = document.querySelector("[data-project-modal]");
const modalTitle = document.querySelector("[data-project-title]");
const modalCategory = document.querySelector("[data-project-category]");
const modalDescription = document.querySelector("[data-project-description]");
const modalMedia = document.querySelector("[data-project-media]");
const modalThumbs = document.querySelector("[data-project-thumbs]");
const modalThumbNote = document.querySelector("[data-project-thumb-note]");
const modalCloseButtons = document.querySelectorAll("[data-project-close]");
const projectCards = document.querySelectorAll("[data-project-open]");
const prevButton = document.querySelector("[data-project-prev]");
const nextButton = document.querySelector("[data-project-next]");
const modalPanel = document.querySelector(".project-modal-panel");
const projectsMoreButton = document.querySelector("[data-projects-more]");
const budgetTrigger = document.querySelector("[data-budget-trigger]");
const budgetModal = document.querySelector("[data-budget-modal]");
const budgetPanel = document.querySelector(".budget-modal-panel");
const budgetCloseButtons = document.querySelectorAll("[data-budget-close]");
const budgetConfirm = document.querySelector("[data-budget-confirm]");
const focusCarousel = document.querySelector("[data-focus-carousel]");
const focusPrevButton = document.querySelector("[data-focus-prev]");
const focusNextButton = document.querySelector("[data-focus-next]");
const budgetWhatsappUrl = "https://wa.me/5547999988082?text=Ol%C3%A1!%20Quero%20conversar%20sobre%20um%20projeto%20e%20solicitar%20um%20or%C3%A7amento!";

let activeProjectKey = null;
let activeMediaIndex = 0;
let visibleProjects = 5;

const lockPage = (locked) => {
  document.body.style.overflow = locked ? "hidden" : "";
};

const playManagedVideo = (video) => {
  if (!video || document.hidden || prefersReducedMotion.matches) return;
  const playAttempt = video.play();
  if (playAttempt?.catch) {
    playAttempt.catch(() => {});
  }
};

const pauseManagedVideo = (video) => {
  if (!video) return;
  video.pause();
};

if (prefersReducedMotion.matches) {
  managedVideos.forEach((video) => {
    video.removeAttribute("autoplay");
    pauseManagedVideo(video);
  });
} else if (managedVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playManagedVideo(entry.target);
        } else {
          pauseManagedVideo(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  managedVideos.forEach((video) => {
    videoObserver.observe(video);
  });

  document.addEventListener("visibilitychange", () => {
    managedVideos.forEach((video) => {
      if (document.hidden) {
        pauseManagedVideo(video);
      } else if (video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().top < window.innerHeight) {
        playManagedVideo(video);
      }
    });
  });
}

const renderProjectMedia = () => {
  const project = projects[activeProjectKey];
  if (!project) return;

  const item = project.media[activeMediaIndex];
  modalMedia.innerHTML = "";

  if (item?.type === "video") {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.preload = "auto";
    video.autoplay = true;
    video.load();
    video.addEventListener("error", () => {
      modalMedia.innerHTML = '<p class="project-empty">N\u00e3o foi poss\u00edvel carregar esta m\u00eddia.</p>';
    });
    modalMedia.appendChild(video);
  } else if (item?.type === "image") {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.label;
    image.loading = "eager";
    modalMedia.appendChild(image);
  } else {
    const empty = document.createElement("p");
    empty.className = "project-empty";
    empty.textContent = "M\u00eddia indispon\u00edvel.";
    modalMedia.appendChild(empty);
  }

  modalThumbs.innerHTML = "";
  project.media.forEach((mediaItem, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `project-thumb${index === activeMediaIndex ? " is-active" : ""}`;
    button.textContent = mediaItem.label;
    button.addEventListener("click", () => {
      activeMediaIndex = index;
      renderProjectMedia();
    });
    modalThumbs.appendChild(button);
  });

  modalThumbNote.textContent = item.note ?? "";
};

const openProjectModal = (projectKey) => {
  const project = projects[projectKey];
  if (!project) return;

  activeProjectKey = projectKey;
  activeMediaIndex = 0;
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDescription.textContent = project.description;
  renderProjectMedia();
  modal.hidden = false;
  modal.classList.remove("is-closing");
  requestAnimationFrame(() => {
    modal.classList.add("is-open");
  });
  lockPage(true);
};

const closeProjectModal = () => {
  if (!modal || modal.hidden) return;

  modal.classList.remove("is-open");
  modal.hidden = true;
  modalMedia.innerHTML = "";
  modalThumbs.innerHTML = "";
  lockPage(false);
};

const openBudgetModal = () => {
  if (!budgetModal) return;

  budgetModal.hidden = false;
  requestAnimationFrame(() => {
    budgetModal.classList.add("is-open");
  });
  lockPage(true);
};

const closeBudgetModal = () => {
  if (!budgetModal || budgetModal.hidden) return;

  budgetModal.classList.remove("is-open");
  budgetModal.hidden = true;
  lockPage(false);
};

const getFocusCards = () => [...(focusCarousel?.querySelectorAll(".focus-card") ?? [])];
const isTouchFocusMode = () => window.matchMedia("(hover: none)").matches;

const getFocusTargetScrollLeft = (card) => {
  if (!focusCarousel || !card) return 0;
  return card.offsetLeft - (focusCarousel.clientWidth - card.clientWidth) / 2;
};

const closeFocusCards = () => {
  getFocusCards().forEach((card) => card.classList.remove("is-active"));
};

const toggleFocusCard = (card) => {
  if (!card || !isTouchFocusMode()) return;
  if (card.classList.contains("focus-card-static")) return;

  const willOpen = !card.classList.contains("is-active");
  closeFocusCards();

  if (willOpen) {
    card.classList.add("is-active");
  }
};

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    openProjectModal(card.dataset.projectOpen);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeProjectModal);
});

modalPanel?.addEventListener("click", (event) => {
  event.stopPropagation();
});

budgetTrigger?.addEventListener("click", (event) => {
  event.preventDefault();
  openBudgetModal();
});

budgetCloseButtons.forEach((button) => {
  button.addEventListener("click", closeBudgetModal);
});

budgetPanel?.addEventListener("click", (event) => {
  event.stopPropagation();
});

if (budgetConfirm) {
  budgetConfirm.setAttribute("href", budgetWhatsappUrl);
}

budgetConfirm?.addEventListener("click", (event) => {
  event.preventDefault();
  closeBudgetModal();
  window.open(budgetWhatsappUrl, "_blank", "noopener,noreferrer");
});

const scrollFocusCarousel = (direction) => {
  if (!focusCarousel) return;

  const cards = getFocusCards();
  if (!cards.length) return;

  const currentLeft = focusCarousel.scrollLeft;
  const currentIndex = cards.findIndex((card) => {
    const delta = Math.abs(getFocusTargetScrollLeft(card) - currentLeft);
    return delta < card.offsetWidth * 0.5;
  });

  const safeIndex = currentIndex >= 0 ? currentIndex : Math.round(currentLeft / (cards[0].offsetWidth || 1));
  const targetIndex = Math.max(0, Math.min(cards.length - 1, safeIndex + direction));
  const targetCard = cards[targetIndex];

  focusCarousel.scrollTo({
    left: getFocusTargetScrollLeft(targetCard),
    behavior: "smooth",
  });
};

focusPrevButton?.addEventListener("click", () => {
  scrollFocusCarousel(-1);
});

focusNextButton?.addEventListener("click", () => {
  scrollFocusCarousel(1);
});

const initializeFocusCarousel = () => {
  if (!focusCarousel) return;

  const cards = getFocusCards();
  if (!cards.length) return;

  const middleIndex = Math.floor(cards.length / 2);
  const middleCard = cards[middleIndex];

  focusCarousel.scrollLeft = getFocusTargetScrollLeft(middleCard);
};

getFocusCards().forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!isTouchFocusMode()) return;
    event.stopPropagation();
    toggleFocusCard(card);
  });
});

document.addEventListener("click", (event) => {
  if (!isTouchFocusMode()) return;
  if (event.target.closest(".focus-card")) return;
  closeFocusCards();
});

window.addEventListener("resize", () => {
  if (!isTouchFocusMode()) {
    closeFocusCards();
  }
});

window.addEventListener("load", initializeFocusCarousel);
let focusResizeFrame = 0;

window.addEventListener("resize", () => {
  if (focusResizeFrame) return;
  focusResizeFrame = window.requestAnimationFrame(() => {
    initializeFocusCarousel();
    focusResizeFrame = 0;
  });
});

prevButton?.addEventListener("click", () => {
  const total = projects[activeProjectKey]?.media.length ?? 0;
  if (!total) return;
  activeMediaIndex = (activeMediaIndex - 1 + total) % total;
  renderProjectMedia();
});

nextButton?.addEventListener("click", () => {
  const total = projects[activeProjectKey]?.media.length ?? 0;
  if (!total) return;
  activeMediaIndex = (activeMediaIndex + 1) % total;
  renderProjectMedia();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeProjectModal();
  }

  if (event.key === "Escape" && budgetModal && !budgetModal.hidden) {
    closeBudgetModal();
  }
});

const updateProjectsVisibility = () => {
  const cards = [...document.querySelectorAll(".project-tile")];
  cards.forEach((card, index) => {
    card.hidden = index >= visibleProjects;
  });

  if (projectsMoreButton) {
    projectsMoreButton.hidden = visibleProjects >= cards.length;
  }
};

projectsMoreButton?.addEventListener("click", () => {
  visibleProjects += 5;
  updateProjectsVisibility();
});

updateProjectsVisibility();
