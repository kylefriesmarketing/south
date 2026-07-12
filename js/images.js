/* SOUTH — generated stills manifest; procedural SVG is the fallback. */
const IMAGES = (() => {
  const scenes = ['title','beset','crush','floecamp','march','boats','elephant',
    'caird','georgia','stromness','rescueart'];
  return { has:k=>scenes.includes(k), url:k=>`assets/scenes/${k}.jpg` };
})();
