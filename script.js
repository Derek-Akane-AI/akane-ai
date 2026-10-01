/* =========================================================
   AKANE — Interactive Prototype
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- NAVIGATION ---------- */

  const navItems = document.querySelectorAll(".nav-item[data-section]");
  const sections = document.querySelectorAll(".section");

  navItems.forEach(item => {
    item.addEventListener("click", () => {

      const target = item.dataset.section;

      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");

      sections.forEach(section => {
        section.classList.remove("active-section");
      });

      const targetSection = document.getElementById(target);

      if (targetSection) {
        targetSection.classList.add("active-section");
      }
    });
  });


  /* ---------- LIVE DATE ---------- */
/* ---------- DYNAMIC TIME OF DAY ---------- */

const timeGreeting = document.getElementById("time-greeting");
const mainGreeting = document.getElementById("main-greeting");
const dayMessage = document.getElementById("day-message");

const currentHour = new Date().getHours();

let period = "evening";

if (currentHour >= 5 && currentHour < 12) {
  period = "morning";
}

else if (currentHour >= 12 && currentHour < 18) {
  period = "afternoon";
}

else {
  period = "evening";
}


if (period === "morning") {

  if (timeGreeting) {
    timeGreeting.textContent = "GOOD MORNING";
  }

  if (mainGreeting) {
    mainGreeting.textContent = "Good morning, Derek.";
  }

  if (dayMessage) {
    dayMessage.textContent =
      "Here's your day. Let's focus on what matters.";
  }

}


if (period === "afternoon") {

  if (timeGreeting) {
    timeGreeting.textContent = "GOOD AFTERNOON";
  }

  if (mainGreeting) {
    mainGreeting.textContent = "Good afternoon, Derek.";
  }

  if (dayMessage) {
    dayMessage.textContent =
      "Here's where your day stands and what's coming next.";
  }

}


if (period === "evening") {

  if (timeGreeting) {
    timeGreeting.textContent = "GOOD EVENING";
  }

  if (mainGreeting) {
    mainGreeting.textContent = "Good evening, Derek.";
  }

  if (dayMessage) {
    dayMessage.textContent =
      "Let's finish what matters and make room for your evening.";
  }

}
  const dateElement = document.getElementById("current-date");

  if (dateElement) {
    const now = new Date();

    dateElement.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }


  /* ---------- ASK AKANE ---------- */

  const form = document.getElementById("akane-form");
  const input = document.getElementById("akane-input");
  const response = document.getElementById("akane-response");

  function askAkane(message) {

    if (!message || !response) return;

    const text = message.toLowerCase();

    response.textContent = "Thinking...";

    setTimeout(() => {

      if (
        text.includes("what's next") ||
        text.includes("whats next") ||
        text.includes("what is next")
      ) {
        response.textContent =
          "Your workout is next at 5:30 PM. After that, you have groceries at 7:00 PM and the rest of your evening is open.";
      }

      else if (
        text.includes("unfinished") ||
        text.includes("haven't i finished") ||
        text.includes("havent i finished")
      ) {
        response.textContent =
          "You still have three work items and two personal tasks open. I would finish the project follow-up first because it is your only high-priority item.";
      }

      else if (
        text.includes("organize") ||
        text.includes("afternoon")
      ) {
        response.textContent =
          "I would finish your priority work task first, protect your 5:30 workout, and move anything non-essential until afterward. That keeps your evening lighter.";
      }

      else if (
        text.includes("tomorrow")
      ) {
        response.textContent =
          "I can help with that. I would start with tomorrow's first commitment, then place your priority work around it and leave room for personal time.";
      }

      else if (
        text.includes("email")
      ) {
        response.textContent =
          "You have three emails marked for attention. I would handle the two work replies first and leave the personal follow-up for later this evening.";
      }

      else if (
        text.includes("tired")
      ) {
        response.textContent =
          "Got it. Your afternoon is lighter than your morning. We can keep the important task and workout, then move one non-essential item if you want.";
      }

      else if (
        text.includes("stressed")
      ) {
        response.textContent =
          "You have a few things open, but only one is marked high priority. We can simplify the rest of today around that instead of trying to finish everything.";
      }

      else if (
        text.includes("read") ||
        text.includes("interesting") ||
        text.includes("discover")
      ) {
        response.textContent =
          "You have some open time tonight. I can surface something from your interests without adding another obligation to your day.";
      }

      else if (
        text.includes("gym") ||
        text.includes("workout")
      ) {
        response.textContent =
          "Your workout is scheduled for 5:30 PM. I can help protect that time by keeping non-essential tasks out of that window.";
      }

      else if (
        text.includes("groceries")
      ) {
        response.textContent =
          "Groceries are currently planned for 7:00 PM, after your workout. They are marked as flexible.";
      }

      else {
        response.textContent =
          "I can help organize that. In this prototype I'm using simulated responses, but the goal is for AKANE to understand your schedule, tasks, work and personal context together.";
      }

    }, 450);
  }


  if (form) {
    form.addEventListener("submit", event => {

      event.preventDefault();

      const message = input.value.trim();

      if (!message) return;

      askAkane(message);

      input.value = "";
    });
  }


  /* ---------- QUICK PROMPTS ---------- */

  document.querySelectorAll("[data-prompt]").forEach(button => {

    button.addEventListener("click", () => {
      askAkane(button.dataset.prompt);
    });

  });


  /* ---------- PULSE ACTIONS ---------- */

  document.querySelectorAll(".card-action").forEach(button => {

    button.addEventListener("click", () => {
      askAkane(button.dataset.message);
    });

  });


  /* ---------- MOOD CHECK-IN ---------- */

  const moods = document.querySelectorAll(".mood");

  moods.forEach(button => {

    button.addEventListener("click", () => {

      moods.forEach(mood => mood.classList.remove("selected"));

      button.classList.add("selected");

      const mood = button.dataset.mood;

      const moodResponses = {

        tired:
          "Got it. Your afternoon is lighter than your morning. We can keep the important things and move something non-essential if you'd like.",

        stressed:
          "You only have one high-priority item left. Let's keep the rest of today simple and avoid adding unnecessary pressure.",

        okay:
          "Got it. Your schedule looks manageable. I'll keep the current plan unless something changes.",

        good:
          "Nice. Your important work is nearly finished and you still have personal time later today.",

        great:
          "Great. You have a good balance left today. Let's keep your momentum without filling every free moment."

      };

      if (response) {
        response.textContent = moodResponses[mood];
      }
    });
  });


  /* ---------- AKANE MODES ---------- */

  const modes = document.querySelectorAll(".mode");

  modes.forEach(button => {

    button.addEventListener("click", () => {

      modes.forEach(mode => mode.classList.remove("active"));

      button.classList.add("active");

      const mode = button.dataset.mode;

      const modeMessages = {

        balanced:
          "Balanced mode active. I'll keep work, personal responsibilities and free time visible together.",

        work:
          "Work mode active. I'll prioritize tasks, meetings, deadlines and follow-ups.",

        focus:
          "Focus mode active. I'll reduce distractions and surface only what needs your attention.",

        relax:
          "Relax mode active. Non-essential work information can wait. Your personal time comes forward."

      };

      if (response) {
        response.textContent = modeMessages[mode];
      }
    });
  });


  /* ---------- TASK COMPLETION ---------- */

  const taskCheckboxes = document.querySelectorAll(
    '.task input[type="checkbox"]'
  );

  taskCheckboxes.forEach(checkbox => {

    checkbox.addEventListener("change", () => {

      if (!response) return;

      if (checkbox.checked) {
        response.textContent =
          "Done. I've marked that task complete.";
      }

      else {
        response.textContent =
          "I've moved that task back to your open items.";
      }

    });
  });


  /* ---------- REFRESH PULSE ---------- */

  const refreshPulse = document.getElementById("refresh-pulse");

  if (refreshPulse) {

    refreshPulse.addEventListener("click", () => {

      refreshPulse.textContent = "Refreshing...";

      if (response) {
        response.textContent =
          "I'm reviewing your current schedule, tasks and priorities...";
      }

      setTimeout(() => {

        refreshPulse.textContent = "Pulse Updated ✓";

        if (response) {
          response.textContent =
            "Your Pulse is up to date. Your priority task is still the main thing that needs attention.";
        }

        setTimeout(() => {
          refreshPulse.textContent = "Refresh Pulse";
        }, 1800);

      }, 700);

    });
  }


  /* ---------- ADD EVENT DEMO ---------- */

  const addEvent = document.getElementById("add-event");

  if (addEvent) {

    addEvent.addEventListener("click", () => {

      if (response) {
        response.textContent =
          "Event creation is simulated in this prototype. A future version will let you add an event conversationally or through your connected calendar.";
      }

      if (input) {
        input.focus();
        input.placeholder = "Try: Add dinner tomorrow at 7 PM...";
      }

    });
  }


  /* ---------- JOURNAL ---------- */

  const journalButton = document.querySelector(
    "#journal .primary-button"
  );

  const journalInput = document.querySelector(
    ".journal-input"
  );

  if (journalButton && journalInput) {

    journalButton.addEventListener("click", () => {

      if (!journalInput.value.trim()) {
        journalButton.textContent = "Write something first";
        return;
      }

      journalButton.textContent = "Journal Entry Saved ✓";

      setTimeout(() => {
        journalButton.textContent = "Save Journal Entry";
      }, 2000);

    });
  }


  /* ---------- INITIAL AKANE MESSAGE ---------- */

  if (response) {

    setTimeout(() => {
      response.textContent =
        "Your day is under control. You have one priority work task left, then your workout at 5:30 PM.";
    }, 700);

  }

});
