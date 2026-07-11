/* =====================================================================
   SOUTH — an endurance. data.js
   ALL content. You are the Boss. Twenty-seven men are watching your face
   to learn whether they are going to live. The win condition is history's:
   every single one of them.
   node: { region, title, text(str|fn(S,P)), choices:[ t, pre?, req?(S,P),
     hope?/unity?/strength?/stores? (deltas, 0-6 scales), men? (delta),
     month?, fx?(S,P), go|end ] }
   ===================================================================== */
const STORY = (() => {

const regions = {
  beset:{ name:'The Pack — Weddell Sea', ch:1 },
  crush:{ name:'The Crush', ch:2 },
  floecamp:{ name:'Ocean Camp', ch:3 },
  march:{ name:'The March', ch:4 },
  boats:{ name:'The Boats', ch:5 },
  elephant:{ name:'Elephant Island', ch:6 },
  caird:{ name:'The James Caird', ch:7 },
  georgia:{ name:'South Georgia', ch:8 },
  stromness:{ name:'Stromness', ch:9 },
};
const CHAPTERS=['Beset','The Crush','Ocean Camp','The March','The Boats','Elephant Island','The Caird','The Crossing','All Hands'];

/* the crew gallery — the men you are carrying */
const crew = {
  wild:{ name:'Frank Wild', role:'Second-in-command', note:'Steadiness made flesh. Held twenty-one men alive under two upturned boats for four and a half months, greeting every dawn with “Lash up and stow, boys — the Boss may come today.”' },
  worsley:{ name:'Frank Worsley', role:'Captain & navigator', note:'Navigated 800 miles of the worst ocean on earth in a 22-foot boat with four sun-sightings in sixteen days. The rescue lived or died inside his sextant.' },
  crean:{ name:'Tom Crean', role:'Second officer', note:'An Irish tower of a man who had already walked out of the Antarctic once to save another man’s life. Sang tunelessly at the tiller. Crossed South Georgia on screws pulled from the Caird.' },
  hurley:{ name:'Frank Hurley', role:'Photographer', note:'Dove into the flooded, dying ship to save his glass plates. The Boss made him choose: he smashed the four hundred he couldn’t carry so he’d never be tempted to go back.' },
  mcnish:{ name:'Harry McNish', role:'Carpenter', note:'“Chippy.” Defied the Boss once on the ice — and then built the boat that saved every life, caulking the seams with oil paint and seal blood.' },
  blackborow:{ name:'Perce Blackborow', role:'Stowaway', note:'Nineteen, smuggled aboard in a locker. The Boss roared that stowaways were eaten first. Given the honor of first man ashore on Elephant Island — carried, because his feet were already dead.' },
  green:{ name:'Charles Green', role:'Cook', note:'Kept a galley going on a moving ice floe, in an upturned boat, in the dark, out of seal blubber and stubbornness. Hot food is morale you can hold.' },
  vincent:{ name:'John Vincent', role:'Able seaman', note:'The strongest man aboard until the ice found what was under the strength. A reminder: bodies do not decide who endures. Something else does.' },
  mrsChippy:{ name:'Mrs. Chippy & the dogs', role:'The animals', note:'The carpenter’s cat and sixty-nine sledge dogs. What the ice made the Boss do about them was the price of every mouth he saved — and some of the men never forgave the arithmetic.' },
};

/* ======================================================================
   NODES
   ====================================================================== */
const nodes = {

/* ---------- CH 1: BESET ---------- */
n_beset:{ region:'beset', title:'A Thousand Miles of Lid',
  text:`January, 1915. The Endurance has been frozen into the Weddell Sea pack for three weeks, and you have stopped pretending otherwise in your log.\n\nShe is held — as the sailors put it — <em>like an almond in a slab of toffee</em>: ten feet of ice in every direction to every horizon, drifting wherever the sea under it pleases. The expedition you planned — the first crossing of the Antarctic continent — died quietly somewhere in the last hundred miles of closing pack. No one else knows that yet. Twenty-seven men still wake up believing they are here to be heroes.\n\nYou are the Boss. What they believe next is the only cargo that matters now.`,
  choices:[
    { t:'Tell them the truth, plainly, at dinner: the crossing is off. The expedition is now: everyone lives.',
      pre:'the truth, early, from your mouth', hope:-1, unity:2, go:'n_routine' },
    { t:'Keep the crossing alive on paper. Men with a mission don’t look at the ice.',
      unity:-1, hope:1, fx:S=>S.flags.pretended=1, go:'n_routine' },
    { t:'Say nothing yet. Watch the ice, watch the men, and wait for the season to decide.',
      hope:-1, go:'n_routine' },
  ]},
n_routine:{ region:'beset', title:'The Empire of Small Hours',
  text:`Months. The sun leaves in April and will not return until August, and an idle, frightened crew in polar dark is a slower shipwreck than any ice.\n\nSo you legislate the day: watches kept as if at sea, scientific readings taken as if they mattered, dog teams raced around the floe with book made and wagers shouted, Hurley’s slide shows, Hussey’s banjo — which you have publicly declared <em>vital mental medicine</em> — and dinner served at the same hour with the same absurd formality, every single night of the dark.\n\nSome of the scientists grumble that the routine is theater. Of course it is. Theater is a load-bearing structure.`,
  choices:[
    { t:'Hold the routine like a rail. Same hours, same rituals, no exceptions — least of all for you.',
      pre:'theater is load-bearing', hope:1, unity:1, month:3, go:'n_pressure' },
    { t:'Ease off. They’re grown men, not schoolboys; let the dark find its own shape.',
      unity:-2, month:3, go:'n_pressure' },
    { t:'Drill for the worst instead: boat stations, sledge loading, abandon-ship rehearsals until they hate you.',
      hope:-1, unity:1, strength:1, month:3, fx:S=>S.flags.drilled=1, go:'n_pressure' },
  ]},

/* ---------- CH 2: THE CRUSH ---------- */
n_pressure:{ region:'crush', title:'The Ice Begins to Speak',
  text:S=>`In the spring the pack wakes up hungry.\n\nPressure ridges walk toward the ship like slow surf; the floes grind and pile and the Endurance groans down her whole length at night — a sound the men describe, too accurately, as an animal in pain. Timbers thick as a man’s torso bow inward. ${S.flags.drilled?'The drills pay their first dividend: nobody has to be told where anything is.':'You wish now you had drilled them harder, sooner.'}\n\nOn the 24th of October the ice closes its hand. The sternpost tears, the water comes in faster than the pumps can argue, and the ship that was your expedition, your shelter, and your national legend begins — over three patient days — to die.`,
  choices:[
    { t:'Fight for her. Pumps in watches, timber shoring, every man at the breach until the ice relents.',
      strength:-2, hope:-1, end:S=>S.v.strength<=1?'e_crushdeath':null, go:'n_abandon' },
    { t:'Read the ice, not the ship. Move stores, boats, and sledges onto the floe NOW, in good order, while she holds.',
      pre:'lose the ship; keep the shape of the crew', unity:1, stores:1, go:'n_abandon' },
  ]},
n_abandon:{ region:'crush', title:'What a Life Weighs',
  text:`She is going. You give the order no one wants said aloud — <em>abandon ship</em> — and the ice hears it too, and takes her masts one by one over the following days while the men stand on the floe and watch in a silence you will remember at your own funeral.\n\nNow the arithmetic of ounces. Three lifeboats must someday carry everything. You order every man down to two pounds of personal gear — and then you stand on the ice, take out the Bible the Queen gave the expedition, tear out one page to keep, and lay the book down on the snow. So they see the Boss obey his own arithmetic.\n\nHurley is standing by the wreck with his cases of glass negatives. Hussey is holding the banjo. Both are looking at you.`,
  choices:[
    { t:'The plates and the banjo come. Pick the best plates, smash the rest — and declare music and memory rations of the soul.',
      pre:'morale weighs nothing in the boats', hope:2, stores:-1, fx:S=>S.flags.banjo=1, go:'n_oceancamp' },
    { t:'Neither. Two pounds means two pounds; sentiment sinks boats.',
      hope:-2, unity:1, stores:1, go:'n_oceancamp' },
    { t:'The plates only — history must know what happened here. The banjo stays on the ice.',
      hope:-1, fx:S=>S.flags.plates=1, go:'n_oceancamp' },
  ]},

/* ---------- CH 3: OCEAN CAMP ---------- */
n_oceancamp:{ region:'floecamp', title:'A Nation of Five Tents',
  text:S=>`You found a country on a raft of frozen sea, and name it Ocean Camp.\n\nPopulation twenty-eight. Industries: seal-hunting, blubber-rendering, waiting. ${S.flags.banjo?'National anthem: whatever Hussey plays after dinner, which the men shout requests at like a music hall.':'It is quieter than a camp of twenty-eight should be, and you know exactly which two pounds of quiet you ordered left behind.'} The floe drifts north a few miles a day, toward open water that is still hundreds of miles away, carrying your nation on its back.\n\nThe men have organized themselves around the fact of you. Every morning they read your face like a barometer. So every morning, whatever the night did to you, you set the needle at <em>fair</em>.`,
  choices:[
    { t:'Be the barometer. Optimism as discipline: worn daily, in public, without a crack.',
      pre:'optimism is moral courage', hope:2, month:1, go:'n_dogs' },
    { t:'Share the weight honestly with Wild and Worsley in private; carry it alone nowhere else.',
      pre:'a boss needs two men who see him plainly', hope:1, unity:1, month:1, go:'n_dogs' },
    { t:'Let them see the worry. Frightened men take fewer stupid risks.',
      hope:-2, month:1, go:'n_dogs' },
  ]},
n_dogs:{ region:'floecamp', title:'The Arithmetic With Fur On It',
  text:`The dogs. Sixty-nine of them when the ice took the ship — the expedition’s engine, the men’s pets, the floe’s only comedy. Each team eats a seal a week. The seals are getting scarcer as the floe drifts, and every pound of seal a dog eats is a pound the boats cannot carry and the men cannot eat in the hungry months you can see coming with your eyes shut.\n\nThere is no version of this where the dogs reach land. There is only the question of whether you spend stores pretending otherwise — and who pulls the trigger.`,
  choices:[
    { t:'Order it done now, cleanly. And do the first team yourself, so no man carries what the Boss wouldn’t.',
      pre:'the price is paid at the top', hope:-2, stores:2, unity:1, go:'n_march' },
    { t:'Keep the teams through the winter drift — the men need the dogs more than the calories yet.',
      hope:1, stores:-2, go:'n_march' },
    { t:'Delegate it to the drivers quietly, team by team, no announcement.',
      hope:-1, stores:2, unity:-1, go:'n_march' },
  ]},

/* ---------- CH 4: THE MARCH / PATIENCE ---------- */
n_march:{ region:'march', title:'The Carpenter Stops Pulling',
  text:`Twice you try to march the nation west toward land, man-hauling the boats over pressure ice — and the ice makes its point in miles per day you could crawl faster than. On the second march, in slush to the knees, the carpenter McNish straightens up out of his harness and says the thing half the crew is thinking:\n\n<em>The ship is gone. Ship’s articles ended when she sank. You can’t order me to haul a boat across the sea.</em>\n\nTwenty-seven cold, wet, frightened men are suddenly very interested in the snow at their feet. This moment has capsized better expeditions than yours. Mutiny is not a shout — it is one tired sentence, agreed with silently.`,
  choices:[
    { t:'Muster ALL hands and read the articles aloud: wages continue until safe harbor — the obligation is yours, and so is the command.',
      pre:'authority shown as duty, not anger', unity:2, hope:1, fx:S=>S.flags.articles=1, go:'n_patience' },
    { t:'Face him down alone, quietly, out of the wind: it ends now, Chippy, or it ends you.',
      unity:1, hope:-1, go:'n_patience' },
    { t:'Concede the point — abandon the march, blame the ice, and let the grievance stand unanswered.',
      unity:-2, go:'n_patience' },
  ]},
n_patience:{ region:'march', title:'Patience Camp',
  text:S=>`So you stop marching and let the sea do the walking. The new camp is named with a ship’s honesty: <em>Patience.</em>\n\nThe floe drifts north through the winter. The seals thin out. The blubber runs low enough that Green cooks penguin in penguin on penguin. ${S.flags.articles?'Since the muster, the grumbling has a ceiling on it — men complain about the food, the wet, the Boss, and then they turn to and do the work. Complaint with work attached is health.':'McNish’s sentence was never fully answered, and it sits in the camp like a crack in a floe — invisible until weight finds it.'}\n\nAnd under everything, night after night, the sound grows louder: open water, somewhere north, chewing the edge of the pack.`,
  choices:[
    { t:'Ration hard now — cache seal meat against the boat journey while there are seals to cache.',
      pre:'hungry now beats dead later', hope:-1, stores:2, month:2, go:'n_cracks' },
    { t:'Feed them well. Strong bodies and full bellies will row better than a full larder.',
      strength:1, stores:-1, month:2, go:'n_cracks' },
    { t:'Split the difference and keep everyone slightly hungry, slightly hopeful, slightly busy.',
      stores:1, month:2, go:'n_cracks' },
  ]},
n_cracks:{ region:'march', title:'The Floor Opens',
  text:`It happens at one in the morning, as these things do. A crack runs directly under the tents — a black lightning-bolt of sea where solid nation stood — and a man in his bag is suddenly in the water between two closing slabs of ice.\n\nYou are there before you are awake. The two halves of the floe breathe apart, together, apart —`,
  choices:[
    { t:'Down on your belly at the edge, arm into the black water — haul him out yourself before the slabs kiss.',
      pre:'the Boss goes first to the edge', strength:-1, hope:2, go:'n_boats' },
    { t:'Shout the drill: rope line, nearest men, count off — the SYSTEM saves him, not a hero.',
      unity:1, hope:1, go:'n_boats' },
  ]},

/* ---------- CH 5: THE BOATS ---------- */
n_boats:{ region:'boats', title:'Launch Into the Wound',
  text:`April, 1916. The floe that carried the nation fifteen hundred miles has shrunk beneath the tents like ice in a glass, and the swell is running under it now — the sea reaching up through the floor. It is time for the worst part: three open boats, five days, and water that kills a swimmer in minutes.\n\nThe men look almost relieved. Waiting is over; rowing they understand. You take the Caird, put Worsley’s sextant where you can see it, and study a horizon with two futures on it: Clarence and Elephant Island, close and hard and empty — or Deception Island, far and gentle, with a chapel and stores for shipwrecked whalers.`,
  choices:[
    { t:'Elephant Island. Nearest solid rock, ugliest odds of comfort — take the certain stone over the beautiful maybe.',
      pre:'take the rock you can reach', hope:-1, unity:1, go:'n_boatsea' },
    { t:'Deception Island. Farther is fine — it has food, shelter, and a chance of whalers. Aim the whole throw at rescue.',
      strength:-1, stores:-1, go:'n_boatsea' },
  ]},
n_boatsea:{ region:'boats', title:'Five Days in the Grey',
  text:`Nothing in the ice prepared them for the boats.\n\nSpray freezes on the oars, on the beards, in the wells; men bail in their sleep and sleep in the bailing; the killer whales rise alongside blowing like burst pipes, and the temperature of the water is a fact no one says aloud. Blackborow’s feet have gone the color of the sea. Some of the men are rowing with their eyes closed, which you allow, because the ones with their eyes open have started seeing land that isn’t there.\n\nOn the fourth night the cold reaches inside the boats and starts choosing.`,
  choices:[
    { t:'Raft the boats together at night, lash them gunwale to gunwale — share warmth, share watch, lose distance.',
      pre:'the nation stays one nation', unity:2, hope:1, strength:-1, go:'n_elephant' },
    { t:'Run through the darks separately under sail — distance is life, and the cold takes the slow.',
      strength:-2, fx:S=>{ S.flags.ranNights=1; if(S.v.strength<=2) S.men=Math.max(0,S.men-1); },
      end:S=>S.v.strength<=1?'e_boatslost':null, go:'n_elephant' },
    { t:'Hot milk round the boats every four hours — burn the last blubber keeping blood warm.',
      stores:-2, strength:1, hope:1, go:'n_elephant' },
  ]},
n_elephant:{ region:'elephant', title:'Stone',
  text:`Elephant Island comes up out of the murk like a fist — black cliffs, glacier snouts, a beach of frozen shingle no wider than a street. It is the first solid ground under the nation in four hundred and ninety-seven days.\n\nYou have Blackborow — nineteen, stowaway, feet dead to the ankles — lifted over the gunwale first, the first human being ever to sit on this beach, because a man who may lose his feet should get something history can’t take back. The others stagger ashore and behave like drunks: laughing, falling, filling their pockets with stones, pressing their faces to the ground.\n\nIt lasts a day. Then everyone does the arithmetic the beach makes plain: no ship comes here. No one looks here. The nation has landed on a stone shelf outside the world.`,
  choices:[
    { t:'Say it before they finish thinking it: a boat party goes for South Georgia. Eight hundred miles. You’ll lead it.',
      pre:'hope must have a schedule', hope:2, go:'n_decide' },
    { t:'Rest the nation a week first — bodies and boats both need rebuilding before anyone sails anywhere.',
      strength:2, month:1, hope:-1, go:'n_decide' },
  ]},

/* ---------- CH 6-7: THE CAIRD ---------- */
n_decide:{ region:'elephant', title:'The Two Crews',
  text:`Two lists, and every name on each is a bet with a man’s life for a stake.\n\nThe boat: Worsley, because the crossing is a navigation problem wearing a boat costume. Crean, because Crean. McNish — the man who defied you on the ice — because he built the boat and can rebuild it at sea. Vincent and McCarthy to pull. And you, because the men left behind will only sit quiet under one promise: <em>the Boss is coming back for us.</em>\n\nThe beach: twenty-two men, upturned boats for a roof, winter coming — and one man to hold them: Frank Wild, your second self. His orders are a single sentence you write carefully: keep them alive and keep them ready.`,
  choices:[
    { t:'Take McNish and Vincent — the difficult men come with YOU, not stay to test Wild.',
      pre:'carry your own problems', unity:2, go:'n_caird' },
    { t:'Leave the difficult men ashore with Wild and take only the safest hands.',
      unity:-1, strength:1, go:'n_caird' },
  ]},
n_caird:{ region:'caird', title:'Eight Hundred Miles of No',
  text:`The James Caird is twenty-two and a half feet of ship’s boat that McNish has decked over with sledge runners, packing-case lids, oil paint, lamp wick, and seal blood. Into her go six men and a promise.\n\nThe Southern Ocean in autumn is the worst water on the planet — the one latitude where the swell circles the earth unbroken, stacking waves the size of chapels. Your world becomes: four sleeping-bags of rotting reindeer hair, a Primus that must be held by two men to boil one pot, iced canvas, and Worsley flat on his back braced between thwarts, catching the sun in his sextant in the two-second window the swell allows — four sightings in sixteen days, each one carrying six lives on Elephant Island and twenty-two more behind them.`,
  choices:[
    { t:'Order strict watch rotation — four hours on, four off, no heroics, no man doing two men’s work.',
      pre:'endurance is a schedule', strength:1, unity:1, go:'n_wave' },
    { t:'Sail her hard yourself, take the tiller-hours no one wants — the Boss doesn’t ration himself.',
      hope:1, strength:-2, go:'n_wave' },
  ]},
n_wave:{ region:'caird', title:'The Sea That Wasn’t a Cloud',
  text:`On the eleventh night you are at the tiller and see, low astern, a line of white you take for a clearing sky.\n\nIt is not sky. It is the crest of a wave so large that in twenty-six years of every ocean on earth you have never met its family — a single moving ridge of the Southern Ocean with the Caird in its path like a cork in a stairwell. You have one breath’s worth of time and six lives in a boat already half ice.`,
  choices:[
    { t:'“HOLD ON — she’s got us!” Square her stern to it and take the mountain aboard.',
      pre:'meet it; don’t flinch from it', strength:-1, go:'n_georgia' },
    { t:'Throw the helm — try to shoulder her across the face of it.',
      strength:-2, stores:-1, fx:S=>S.flags.broached=1,
      end:S=>S.v.strength<=1?'e_cairdlost':null, go:'n_georgia' },
  ]},
n_georgia:{ region:'georgia', title:'The Wrong Side of Salvation',
  text:S=>`${S.flags.broached?'She broaches, buries a rail, and lives anyway — swamped to the thwarts, everything soaked that wasn’t already, two men bailing on their knees sobbing with effort':'The wave falls on the boat like a collapsing house and the Caird staggers, full to the gunwales — and floats'} — and you bail, all six of you, until the sea gives her back.\n\nOn the sixteenth day, Worsley’s arithmetic keeps its impossible promise: South Georgia rises out of the murk, dead ahead. And then the ocean plays its last card — a hurricane onto a lee shore that kills a full-sized steamer that same night, somewhere over the horizon — and when you finally claw into King Haakon Bay, alive by the width of a reef passage, you are on the island’s <em>uninhabited</em> side.\n\nThe whaling stations — men, ships, rescue for twenty-two castaways — are twenty-six miles away. Across an interior of glaciers and peaks that no human being has ever crossed.`,
  choices:[
    { t:'Rest two days, eat albatross chicks, dry out — then cross with Worsley and Crean, light and fast, boots screwed with the Caird’s own screws.',
      pre:'the last door is a mountain range', strength:1, go:'n_traverse' },
    { t:'Sail her the last stretch around the coast instead — the boat has one more miracle in her.',
      req:S=>S.v.strength>=3, strength:-2, hope:-1, go:'n_traverse',
      fx:S=>S.flags.triedSail=1 },
  ]},
n_traverse:{ region:'georgia', title:'Thirty-Six Hours',
  text:S=>`${S.flags.triedSail?'The coast says no in williwaws and reef-teeth, and you put back into the bay having spent strength you did not own. The mountains were always the door.\n\n':''}You go up with three days’ food, a carpenter’s adze for an axe, ninety feet of rope, and screws from the Caird driven through your boot-soles. No tent. No map — there is no map; no one has ever stood where you are standing.\n\nThree ridges. Three times you climb to a pass and look down at cliff and go back. The third time, night is coming, the fog is rising up the slopes behind you like a tide, and staying on the ridge means freezing on it. Below, the slope you cannot see the bottom of falls away into the dark.\n\nYou coil the rope into three mats. Crean and Worsley look at you the way twenty-seven men have been looking at you for five hundred days.`,
  choices:[
    { t:'“We’ll slide.” Lock together, kick off, and toboggan blind into the dark on ninety feet of coiled rope.',
      pre:'the unjustifiable, justified', hope:2, strength:-1, go:'n_thirdman' },
    { t:'Cut steps down the ice all night with the adze — slow, blind, freezing, but never falling.',
      strength:-2, hope:-1, end:S=>S.v.strength<=1?'e_mountains':null, go:'n_thirdman' },
  ]},
n_thirdman:{ region:'georgia', title:'The Fourth Presence',
  text:`You live. The slide spends a thousand feet of mountain in ninety seconds of screaming and drops the three of you into soft snow, laughing like schoolboys with death still ringing in your ears — and then you walk on through the night, because stopping is freezing.\n\nAnd somewhere in those last hours, all three of you notice the same thing and none of you says it aloud until years later: it seemed, the whole way, that you were <em>four.</em> One more walked with you — on the glacier, at your shoulder, unhurried — all the long night down to the whaling grounds.\n\nAt 6:30 in the morning, a sound no wilderness makes: a steam whistle, calling the whalers of Stromness to work. The first man-made sound in seventeen months. Crean and Worsley are weeping. Possibly you are too. There is no photograph.`,
  choices:[
    { t:'Walk down into Stromness — three burned, black, matted ghosts — and ask the station manager for help by name.',
      go:'n_rescue' },
  ]},

/* ---------- CH 9: ALL HANDS ---------- */
n_rescue:{ region:'stromness', title:'Three Ships, Four Months',
  text:S=>`The station manager, Sørlle, knows you — dined with you eighteen months ago — and looks at the three of you without a flicker of recognition until you say, quietly, <em>“My name is Shackleton.”</em> They say the hard men of Stromness turned away because they were crying.\n\nBut Elephant Island still holds twenty-two men under two upturned boats, and the pack has closed behind you like a door. A whaler is turned back by ice. A Uruguayan trawler is turned back by ice. A schooner from Punta Arenas — turned back. Every week you age a year; your hair goes grey in a season. ${S.v.hope>=4?'You write to a friend a sentence with no self-pity in it: “I have done it. Not a life lost, and we have been through Hell.” — and then you scratch out <em>done</em> and write <em>nearly done.</em>':'Some nights you sit with the charts and do not sleep at all.'}\n\nThe fourth ship is a little Chilean steam-tug called the <em>Yelcho</em>, lent with her crew, and the ice — for one morning — opens a lane.`,
  choices:[
    { t:'Go in with the Yelcho. Fast, shallow, reckless — take the one open morning the pack will ever give you.',
      end:S=>{ if(S.men>=27 && S.v.unity>=2 && S.v.hope>=2) return 'e_all';
               return 'e_most'; } },
    { t:'Wait for a stronger ship and a safer season — you did not come this far to sink the rescue itself.',
      hope:-2, month:1, fx:S=>S.flags.waited=(S.flags.waited||0)+1,
      end:S=>S.flags.waited>=2?'e_toolate':null, go:'n_rescue' },
  ]},

};

/* ======================================================================
   ENDINGS
   ====================================================================== */
const endings = {
  e_crushdeath:{ kind:'death', art:'crush', title:'Frozen to Her',
    text:`You fought for the ship past the hour the ice had already decided, and the ice does not negotiate with love. The Endurance took her nation down with her flag flying — which is the kind of sentence that looks fine on a memorial and means twenty-eight men did not have to die.\n\nThe pack closed over the wreck within the week. It keeps what it takes.` },
  e_dark:{ kind:'death', art:'floecamp', title:'The Barometer Fell',
    text:`No storm did it. No crack, no leopard seal, no hunger. The nation simply ran out of the one supply that was always yours to issue: the belief, renewed every morning on the Boss’s face, that this was survivable.\n\nDespair in a polar camp is not an emotion. It is a contagion with a fatality rate. Men stop mending clothes, then stop hunting, then stop eating, and the dark does the accounting. The ice never beat the nation. The nation stopped voting for itself.` },
  e_split:{ kind:'death', art:'march', title:'Two Nations',
    text:`It came apart the way floes do — along the crack everyone knew was there. One tired sentence too many left unanswered, and the camp divided into yours and not-yours: two fires, two stores-piles, two plans, on ice that barely fed one.\n\nNo party of castaways has ever survived as a house divided. The Antarctic requires a species that holds together, and it tested yours, and the test came back.` },
  e_frozen:{ kind:'death', art:'boats', title:'The Cold Chose',
    text:`You spent their bodies faster than the ice could pay them back — marches too hard, watches too long, boats run separately through the freezing darks — and the cold, which keeps perfect books, began collecting from the weakest first.\n\nA leader’s cruelest discovery, made too late: strength is stores. You rationed the pemmican to the ounce and spent the men like a rich man.` },
  e_hunger:{ kind:'death', art:'floecamp', title:'Penguin In Penguin On Penguin',
    text:`The seals left with the ice, the dogs were kept too long or the caches made too late, and the nation crossed the line every polar diary describes in the same shrinking handwriting: rations cut, then cut, then mostly water, then mostly waiting.\n\nHunger does not kill a camp dramatically. It lowers the temperature of every hope by one degree a week, until the boats are too heavy to launch with the strength that remains, and the beach becomes the whole world.` },
  e_boatslost:{ kind:'death', art:'boats', title:'The Grey Took Them',
    text:`The open water was always the narrowest door. Three overloaded boats in Antarctic swell, and somewhere in the freezing dark the lights of the others stopped answering — a nation that survived five hundred days on the ice, spent in five nights on the sea.\n\nThe Weddell keeps no wrecks and marks no graves. Twenty-eight names went onto a memorial wall in Burlington House, under a date and the word <em>presumed.</em>` },
  e_cairdlost:{ kind:'death', art:'caird', title:'The Loneliest Boat',
    text:`Eight hundred miles, and the ocean only needed one of them. The Caird was a ship’s boat with a carpenter’s genius and six men’s stubbornness caulking her seams, and the Southern Ocean is where statistics go to collect.\n\nShe carried more than six lives. On a shingle beach eight hundred miles behind her, twenty-two men under two upturned boats kept watch on the horizon, every day, in rotation, for a sail that was already at the bottom of the sea. Frank Wild kept them at it — “Lash up and stow, boys” — for as long as the food lasted, and that is where the story stops being writable.` },
  e_mountains:{ kind:'death', art:'georgia', title:'Twenty-Six Miles',
    text:`No one had ever crossed the interior of South Georgia. There was a reason. Three exhausted men with an adze, a rope, and screws in their boot-soles, on unmapped glacier in falling night — the margin was always the width of a decision, and one decision went the other way.\n\nThe whaling station kept its 6:30 whistle. The three bodies on the ridge were twenty-six miles from it, and the twenty-two men on Elephant Island were eight hundred more, waiting for a Boss who had already come as close as any man ever came.` },
  e_toolate:{ kind:'death', art:'elephant', title:'The Careful Rescue',
    text:`You waited for the strong ship, the safe season, the certain lane — every choice defensible, every delay reasonable, and the Antarctic winter arriving on schedule regardless. When the relief finally beat through to the beach, the boats were still there, upturned, snow to the gunwales.\n\nProvidence favors the bold for one reason only: in the cold, the careful are merely slower. You brought the rescue. You did not bring it in time. History will be kind to you and you will never once be kind to yourself.` },
  e_most:{ kind:'survive', art:'rescueart', title:S=>`${S&&S.men<27?'The Ones You Could':'Worn Through'}`,
    text:(S)=>`The Yelcho comes around the point with you at the rail, and the beach erupts — and you count them as they come off the stones, out loud, the way you have counted them for two years.\n\n${S&&S.men<27?`You bring home ${S.men} of the twenty-seven. History will call it a miracle, and history will be right, and you will spend the rest of your life at night with the arithmetic of the ones the ice kept. The Antarctic writes hard bargains. You signed the best one it offered.`:`All of them — alive, just. But the nation comes off that beach worn to wire and split at the seams you let open along the way: some of these men will never sail with you, speak of you, or forgive you. Everyone lived. Not everything survived.`}` },
  e_all:{ kind:'true', art:'rescueart', title:'All Safe, All Well',
    text:`The Yelcho comes around the point and the beach explodes — rags waving, the signal fire kicked to life so fast it nearly takes Wild’s tent with it. You are at the rail counting heads before the boat is in the shallows, out loud, losing count, starting over —\n\nTwo years. The ship crushed, the ice camps, the dogs, the boats, the beach, the Caird, the mountains, three failed rescues — and twenty-seven men climb into the boats, every one, including a nineteen-year-old stowaway minus five toes and plus one story no one will ever top at any table he sits at for the rest of his long life.\n\nYou did not cross the continent. You did not plant the flag. You performed instead the feat that outlived every flag of the age: you went into the worst place on earth with twenty-seven men, everything went wrong that could go wrong — and you brought back <em>all hands.</em>\n\n“Tell me — when was the war over?” you ask at Stromness. That is another story. Tonight: all safe. All well.` },
};

return { regions, CHAPTERS, crew, nodes, endings };
})();
