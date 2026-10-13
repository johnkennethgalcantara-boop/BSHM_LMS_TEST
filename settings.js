/* ACES Polytechnic College – Settings (frontend only, mock behavior) */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Tabs: one category visible at a time */
  const tabs = $$(".tabs button");
  function show(key) {
    tabs.forEach((t) => {
      const on = t.dataset.t === key;
      t.classList.toggle("on", on);
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
    });
    $$(".panel").forEach((p) => { p.hidden = p.id !== "p-" + key; });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(t.dataset.t));
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); show(n.dataset.t); }
    });
  });
  show("account");

  /* Toggle switches */
  $$(".sw").forEach((s) => s.addEventListener("click", () => {
    const on = s.getAttribute("aria-checked") !== "true";
    s.setAttribute("aria-checked", on);
    if (s.id === "compact") document.body.classList.toggle("compact", on);
  }));

  /* Show/hide password */
  $$(".eye").forEach((b) => b.addEventListener("click", () => {
    const i = b.previousElementSibling;
    i.type = i.type === "password" ? "text" : "password";
  }));

  /* Change password (mock validation only, nothing is sent anywhere) */
  $("#pwf").addEventListener("submit", (e) => {
    e.preventDefault();
    const [a, b, c] = ["#pw0", "#pw1", "#pw2"].map((s) => $(s).value);
    const m = $("#msg");
    const say = (t, ok) => { m.textContent = t; m.className = "msg " + (ok ? "ok" : "err"); };
    if (!a || !b || !c) return say("Please fill in all password fields.");
    if (b.length < 8) return say("New password must be at least 8 characters.");
    if (b !== c) return say("New password and confirmation do not match.");
    if (b === a) return say("New password must be different from the current one.");
    say("Password updated.", true);
    e.target.reset();
  });

  /* Sidebar toggle / drawer: handled once by shell.js */
})();

