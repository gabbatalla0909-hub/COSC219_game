/*
  COSC 219 — Lab 7 · app.js
  The only file that touches the page. Open index.html with Live Server.
*/

// import from ./storage.js, ./render.js and ./trails.js


/* Load the saved trails into a `let` — the array is replaced, not edited,
   every time something changes. */


/* update() — redraw the list, rewrite the summary, and save.
   Call it whenever the data changes, and once at the very bottom of this
   file so the page is not blank on load. */


/* The add form.

   A submit reloads the page by default, throwing away everything in
   memory. Stop that first, then validate, then add.

   When the input is invalid: put a message in #error, focus the name
   field, and return without changing anything.
   When it is valid: clear #error, add the trail, reset the form. */


/* The list.

   ONE listener on #trail-list — not one per button. The buttons are
   destroyed and rebuilt on every render, so a listener on a button would
   not survive the first redraw.

   Use findAction(event.target) to work out what was clicked.

   Clear #error here too — once the user clicks something in the list they
   have moved on from the form, and a stale validation message left on
   screen is just noise. */


/* The Clear all button: empty the array, clear storage, update. */
const form = document.querySelector("#add-trail");
const list = document.querySelector("#trail-list");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const km = parseFloat(form.elements.km.value);
 
  if (isNaN(km) || km <= 0) {
    error.textContent = "Distance must be a positive number";
    form.elements.km.focus();
    return;
  }
  error.textContent = "";
  trails.push({ id: Date.now().toString(), name, km, isOpen: true });
  form.reset();
  update();
});

list.addEventListener("click", (event) => {
  error.textContent = "";
  const action = findAction(event.target);
  if (!action) return;
  const id = action.closest(".trail").dataset.id;
  if (action.dataset.action === "toggle") {
    const trail = trails.find(t => t.id === id);
    trail.isOpen = !trail.isOpen;
  } else if (action.dataset.action === "delete") {
    const index = trails.findIndex(t => t.id === id);
    trails.splice(index, 1);
  }
  update();
});

document.querySelector("#clear-all").addEventListener("click", () => {
  trails.length = 0;
  update();
});

update();
