// main_mod_v2.js - drawer + default mode, emoji, trainer skill integrated
$(function () {
  const words = ["CYBER", "INFRA", "FORENSIC", "HACKER"];
  const colors = ["#00ff88", "#00ffff", "#a44dff", "#ff33cc"];
  const $opening = $("#opening");
  const $heroDesc = $("#hero-desc");
  const $year = $("#year");
  const $cta = $(".cta");
  const $pfImg = $("#pf-img");
  const $pfOverlay = $("#pf-overlay");
  const $skills = $(".skills-list li");
  const $accentSelect = $("#accent-select");
  const $profileBlock = $("#profile-block");
  const $toggleProfileBtn = $("#toggle-profile");
  const $hackerBtn = $("#hacker-mode");
  const $switchModeBtn = $("#switch-mode");

  // initial
  $year.text(new Date().getFullYear());

  // typewriter opening
  (function typewriter() {
    let w = 0, l = 0, deleting = false;
    function step() {
      const current = words[w];
      const color = colors[w % colors.length];
      $opening.css({ color: color, textShadow: `0 0 10px ${color}, 0 0 20px ${color}` });
      if (!deleting) {
        $opening.text(current.substring(0, l + 1));
        l++;
        if (l === current.length) { deleting = true; setTimeout(step, 900); return; }
      } else {
        $opening.text(current.substring(0, l - 1));
        l--;
        if (l === 0) { deleting = false; w = (w + 1) % words.length; }
      }
      setTimeout(step, deleting ? 60 : 140);
    }
    step();
  })();

  // CTA scroll
  $cta.on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    if ($(target).length) $("html,body").animate({ scrollTop: $(target).offset().top - 20 }, 700);
  });

  // profile image click toggles overlay
  $pfImg.on("click", function () {
    $pfOverlay.fadeToggle(220);
    $(this).css("box-shadow", "0 0 30px rgba(0,255,136,0.6)");
    setTimeout(() => $(this).css("box-shadow", ""), 700);
  });

  // toggle profile
  $toggleProfileBtn.on("click", function () {
    if ($profileBlock.hasClass("hidden")) {
      $profileBlock.removeClass("hidden");
      $(this).text("Hide Profile 👤");
    } else {
      $profileBlock.addClass("hidden");
      $(this).text("Show Profile 👤");
    }
  });

  // hacker-mode toggle
  $hackerBtn.on("click", function () {
    $("body").toggleClass("hacker-active");
    const active = $("body").hasClass("hacker-active");
    $(this).text(active ? "Disable Hacker Vibe 💻" : "Activate Hacker Vibe 💻");
  });

  // accent select
  $accentSelect.on("change", function () {
    const val = $(this).val();
    const map = { cyan: "var(--neon-cyan)", green: "var(--neon-green)", pink: "var(--neon-pink)", purple: "var(--neon-purple)" };
    const accent = map[val] || "var(--neon-green)";
    $(".logo-box").css({ "box-shadow": `0 0 20px ${accent}` });
    $(".card h3").css({ color: accent, "text-shadow": `0 0 10px ${accent}` });
    $(".opening").css({ color: accent, "text-shadow": `0 0 10px ${accent}` });
    const $status = $("<div class='accent-status'>Accent: " + val + "</div>").css({ position: "fixed", bottom: "14px", right: "14px", padding: "8px 10px", "border-radius": "8px", background: "rgba(0,0,0,0.6)", color: "white", zIndex: 9999 });
    $("body").append($status);
    $status.fadeIn(120).delay(700).fadeOut(400, function () { $(this).remove(); });
  });

  // card toggle buttons (used in drawer mode)
  $(".toggle-section").on("click", function () {
    const target = $(this).data("target");
    const $parent = $(target).closest(".collapsible");
    if ($parent.length) {
      if ($parent.hasClass("expanded")) {
        $parent.removeClass("expanded");
        $(target).slideUp(240);
      } else {
        $parent.addClass("expanded");
        $(target).slideDown(240);
      }
    } else {
      $(target).slideToggle(220);
    }
  });

  // switch mode button: default <-> drawer
  $switchModeBtn.on("click", function () {
    if ($("body").hasClass("mode-default")) {
      $("body").removeClass("mode-default").addClass("mode-drawer");
      $(this).text("Switch to Default Mode 🟢");
      // collapse collapsible sections initially
      $(".collapsible").removeClass("expanded");
      // ensure section contents are hidden for drawer appearance
      $("#skills-list, #timeline-list").hide();
    } else {
      $("body").removeClass("mode-drawer").addClass("mode-default");
      $(this).text("Switch to Drawer Mode ⚙️");
      $(".collapsible").addClass("expanded");
      $("#skills-list, #timeline-list").show();
    }
  });

  // doubleclick hero-desc hide/show
  $heroDesc.on("dblclick", function () { $(this).fadeToggle(180); });

  // keyboard 't' toggles timeline list quickly
  $(document).on("keydown", function (e) {
    if (e.key === "t") { $("#timeline-list").slideToggle(200); }
  });

  // initial polish: ensure default mode shows everything
  $(".brand").css({ opacity: 0 }).animate({ opacity: 1 }, 700);
  // set default as expanded (show lists)
  $(".collapsible").addClass("expanded");
  $("#skills-list, #timeline-list").show();
});
