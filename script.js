/* ARGIE & GENESIS WEDDING RSVP */

const SUPABASE_URL =
  "https://gwfzegtjngpbprfowoyl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Ny9NjHihg2asLHqWkq1NhA_JEvQpQIK";

let supabaseClient;

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // RSVP form
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");
  const errorBox = document.getElementById("errorMessage");
  const attendeeSection = document.getElementById("attendeeSection");
  const guestSelect = document.getElementById("guests");
  const namesContainer = document.getElementById("attendeeNames");

  function renderNames() {
    const previous = [...namesContainer.querySelectorAll("input")]
      .map(input => input.value);

    namesContainer.replaceChildren();

    for (let i = 0; i < Number(guestSelect.value); i++) {
      const label = document.createElement("label");
      label.htmlFor = `attendee-${i}`;
      label.textContent = `Attendee ${i + 1} full name *`;

      const input = document.createElement("input");
      input.id = label.htmlFor;
      input.name = "attendeeName";
      input.type = "text";
      input.required = true;
      input.maxLength = 120;

      input.value = previous[i] ?? (
        i === 0
          ? document.getElementById("fullName").value
          : ""
      );

      namesContainer.append(label, input);
    }
  }

  function updateAttendance() {
    const attending =
      form.querySelector('input[name="attendance"]:checked')
        ?.value === "yes";

    attendeeSection.hidden = !attending;
    attendeeSection.disabled = !attending;

    if (attending && !namesContainer.children.length) {
      renderNames();
    }
  }

  form.querySelectorAll('input[name="attendance"]').forEach(input => {
    input.addEventListener("change", updateAttendance);
  });

  guestSelect.addEventListener("change", renderNames);
  updateAttendance();

  function showError(message) {
    errorBox.querySelector("span").textContent = message;
    errorBox.classList.add("show");
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (submitBtn.disabled) return;

    success.classList.remove("show");
    errorBox.classList.remove("show");

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const attendance = String(data.get("attendance") || "");
    const message = String(data.get("message") || "").trim();

    if (!fullName) {
      return showError("Please enter your full name.");
    }

    if (!["yes", "no"].includes(attendance)) {
      return showError("Please select whether you will attend.");
    }

    const attending = attendance === "yes";
    const guests = attending ? Number(data.get("guests")) : 0;

    if (
      attending &&
      (!Number.isInteger(guests) || guests < 1 || guests > 10)
    ) {
      return showError("Please select a valid number of attendees.");
    }

    const attendeeNames = attending
      ? data.getAll("attendeeName").map(name => String(name).trim())
      : [];

    if (
      attending &&
      (
        attendeeNames.length !== guests ||
        attendeeNames.some(name => !name || name.length > 120)
      )
    ) {
      return showError("Please enter the full name of every attendee.");
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "SENDING...";

    try {
      if (!window.supabase) {
        throw new Error(
          "Supabase library did not load. Check your internet connection."
        );
      }

      supabaseClient ??= window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
      );

      const { error } = await supabaseClient
        .from("rsvps")
        .insert({
          full_name: fullName,
          email: email || null,
          attendance,
          guests,
          attendee_names: attendeeNames,
          message: message || null
        });

      if (error) throw error;

      form.reset();
      namesContainer.replaceChildren();
      updateAttendance();

      success.classList.add("show");

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      success.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center"
      });
    } catch (err) {
      console.error(
        "RSVP submission error:",
        err.code || "",
        err.message || "Unknown error"
      );

      showError("We couldn't save your RSVP. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "SUBMIT RSVP";
    }
  });
});