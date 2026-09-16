// Keep the contact links working while the remaining landing-page sections
// are being developed. Replace #contact with a form URL later if needed.
document.querySelectorAll('a[href="#contact"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const contactSection = document.querySelector("#contact");
    if (!contactSection) return;
    event.preventDefault();
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Switch the business-situation content when a visitor selects a tab.
const situationTabs = document.querySelectorAll(".situation-tab");
const situationPanels = document.querySelectorAll(".situation-panel");

situationTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedPanelId = tab.dataset.panel;

    situationTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });

    situationPanels.forEach((panel) => {
      const isSelected = panel.id === selectedPanelId;
      panel.hidden = !isSelected;
      panel.classList.toggle("is-active", isSelected);
    });
  });
});

// Customer feedback modal content.
const feedbackStories = {
  neos: {
    name: "NEOS Corporation",
    image: "assets/customer-neos.png",
    imageAlt: "NEOS Corporation representatives",
    summary: "NEOS Corporation uses SOCOCA to organize field records, improve information sharing, and reduce repetitive office work.",
    answers: [
      ["What challenge did you experience before using SOCOCA?", "Field photos, locations, and inspection notes were stored separately, making it difficult to confirm the latest information and prepare reports efficiently."],
      ["Why did you choose SOCOCA?", "The map-based interface makes information easy to understand, while text and photos can be registered directly from the field."],
      ["How is SOCOCA used in daily operations?", "Personnel review previous records on-site, register new photos and observations, and share updates with office staff in real time."],
      ["What improvements have you noticed?", "The team spends less time organizing data and preparing documents. Information is also easier to locate and hand over to other personnel."],
      ["What do users appreciate most?", "SOCOCA is simple to operate on a smartphone and provides one organized location for field history, photos, and map information."]
    ]
  },
  kyushu: {
    name: "Kyushu Electric Power Transmission and Distribution Co., Inc.",
    image: "assets/customer-kyushu.png",
    imageAlt: "Kyushu Electric Power Transmission and Distribution representative",
    summary: "SOCOCA supports efficient infrastructure information management and smoother communication between field and office teams.",
    answers: [
      ["What information needed to be managed?", "Teams needed to manage facility locations, inspection records, photographs, and work updates in a consistent and accessible format."],
      ["How does the map help your operation?", "Facilities and their related records can be found visually, allowing personnel to confirm the correct location and previous information quickly."],
      ["How is information shared?", "Updates registered in the field become available to authorized personnel, reducing delays and helping everyone work from the same information."],
      ["How has reporting changed?", "Photos and field notes are already organized with their locations, so report preparation and confirmation require fewer manual steps."],
      ["What is the overall benefit?", "SOCOCA improves visibility, reduces duplicate data entry, and supports more reliable infrastructure maintenance and operational decisions."]
    ]
  }
};

const feedbackModal = document.querySelector("#feedback-modal");
const feedbackModalTitle = document.querySelector("#feedback-modal-title");
const feedbackModalSummary = document.querySelector("#feedback-modal-summary");
const feedbackModalImage = document.querySelector("#feedback-modal-image");
const feedbackModalContent = document.querySelector("#feedback-modal-content");
let feedbackTrigger = null;

function openFeedbackModal(storyKey, trigger) {
  const story = feedbackStories[storyKey];
  if (!story || !feedbackModal) return;

  feedbackTrigger = trigger;
  feedbackModalTitle.textContent = story.name;
  feedbackModalSummary.textContent = story.summary;
  feedbackModalImage.src = story.image;
  feedbackModalImage.alt = story.imageAlt;
  feedbackModalContent.replaceChildren();

  story.answers.forEach(([question, answer]) => {
    const item = document.createElement("article");
    item.className = "feedback-answer";

    const heading = document.createElement("h3");
    heading.textContent = question;

    const paragraph = document.createElement("p");
    paragraph.textContent = answer;

    item.append(heading, paragraph);
    feedbackModalContent.append(item);
  });

  feedbackModal.classList.add("is-open");
  feedbackModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  feedbackModal.querySelector(".feedback-modal-close").focus();
}

function closeFeedbackModal() {
  if (!feedbackModal) return;
  feedbackModal.classList.remove("is-open");
  feedbackModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  feedbackTrigger?.focus();
}

document.querySelectorAll(".feedback-details-button").forEach((button) => {
  button.addEventListener("click", () => openFeedbackModal(button.dataset.feedback, button));
});

document.querySelectorAll("[data-modal-close]").forEach((control) => {
  control.addEventListener("click", closeFeedbackModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && feedbackModal?.classList.contains("is-open")) {
    closeFeedbackModal();
  }
});

// Show a floating button after scrolling and return smoothly to the page top.
const scrollTopButton = document.querySelector("#scroll-top-button");

if (scrollTopButton) {
  const updateScrollTopButton = () => {
    scrollTopButton.classList.toggle("is-visible", window.scrollY > 450);
  };

  window.addEventListener("scroll", updateScrollTopButton, { passive: true });
  updateScrollTopButton();

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
