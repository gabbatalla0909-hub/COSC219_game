import { Trail, BikeTrail } from "./trail.js";

/*
  COSC 219 — Lab 6 · registry.js
  A class that owns a collection of Trails.
*/

// import the two classes from ./trail.js — note the .js is required


export class TrailRegistry {

  /* The array is PRIVATE. Nothing outside may push to it, sort it or
     empty it — this class decides what happens to the collection. */
  #trails = [];


  /* Accept an optional array of Trails and add each one. */
  constructor(trails = []) {
   const registry = this;
   const add = registry.add.bind(registry);
   trails.forEach(add);
  }


  /* get size — how many trails. */
  get size() {
   const registry = this;
   return registry.#trails.length;
  }


  /* get all — a COPY of the array.

     Returning the private array itself would let a caller do
     registry.all.push("junk") and walk straight past every check in
     this class. One of the tests does exactly that.
     ---------------------------------------------------------------- */
  get all() {
   const registry = this;
   return [...registry.#trails];
  }


  /* add(trail) — reject anything that is not a Trail.

     Throw a TypeError if it is not, otherwise store it and return `this`.
     Use `instanceof`. Remember a BikeTrail IS a Trail.
     ---------------------------------------------------------------- */
  add(trail) {
   if (!(trail instanceof Trail)) {
     throw new TypeError("not a Trail");
   }
   this.#trails.push(trail);
   return this;
  }


  /* find(name) — the matching Trail, ignoring case, or undefined. */
  find(name) {
   const registry = this;
   return registry.#trails.find(trail => trail.name.toLowerCase() === name.toLowerCase());
  }


  /* byRating(rating) — every trail with that rating. */
  byRating(rating) {
   const registry = this;
   return registry.#trails.filter(trail => trail.rating === rating);
  }


  /* get openTrails — every trail that is not closed. */
  get openTrails() {
   const registry = this;
   return registry.#trails.filter(trail => !trail.isClosed);
  }


  /* get totalDistance — all the km added up, to one decimal place. */
  get totalDistance() {
   const registry = this;
   const total = registry.#trails.reduce((sum, trail) => sum + trail.km, 0);
   return Math.round(total * 10) / 10;
  }


  /* get steepest — the trail with the largest steepness.
     undefined when there are none. */
  get steepest() {
   const registry = this;
   return registry.#trails.reduce((steepest, trail) => {
     if (!steepest || trail.steepness > steepest.steepness) {
       return trail;
     }
     return steepest;
   }, undefined);
  }


  /* describeAll() — an array of every trail's describe() string. */
  describeAll() {
   const registry = this;
   return registry.#trails.map(trail => trail.describe());
  }


  /* static fromData(rows) — build a registry from plain objects.

     A row with a `surface` property becomes a BikeTrail; anything else
     becomes a Trail. Default a missing gain to 0.
     ---------------------------------------------------------------- */
  static fromData(rows) {
   const registry = new TrailRegistry();
   rows.forEach(row => {
     const gain = row.gain ?? 0;
     const trail = row.surface
     ? new BikeTrail(row.name, row.km, row.rating, gain, row.surface)
     : new Trail(row.name, row.km, row.rating, gain);

     registry.add(trail);
   });
   return registry;
  }
}
