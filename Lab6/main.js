/*
  COSC 219 — Lab 6 · main.js
  The only file that touches the page. Modules only work over http://,
  so open index.html with Live Server.
*/

// import TRAIL_DATA from ./data.js and TrailRegistry from ./registry.js
import { TRAIL_DATA } from "./data.js";
import { TrailRegistry } from "./registry.js";

const registry = new TrailRegistry(TRAIL_DATA);
registry.find("Bear Creek").close();

const summary = document.querySelector("#summary");
const list = document.querySelector("#trails-list");

summary.textContent = `${registry.size} trails, ${registry.all.filter(trail => !trail.isClosed).length} open,`+
` ${registry.all.reduce((total, trail) => total + trail.km, 0).toFixed(1)} km total. Steepest: ${registry.all.reduce((steepest, trail) => trail.steepness > steepest.steepness ? trail : steepest).name}.`;

registry.describeAll().forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
});
/* Build a registry from the data, close Bear Creek, then:
    
     · put one <li> per trail into #trails, using describeAll()
     · write a line into #summary in this exact shape:

       6 trails, 5 open, 46.7 km total. Steepest: Pincushion Peak.
*/
