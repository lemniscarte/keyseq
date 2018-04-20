// generic 'play step' function
const bang = function() {say('Step!')}; // test

// 'global' variables, setup data
const data = {
  steps: {},           // empty object for steps (list of objects?), feeds makeSequencer
  tempo: 90,          // tempo will feed calculateBpm
  playHead: 0,         // will move through every step[]
  playerInterval: ''   // empty string for interval, to be set inside startSequencer
};

// abbreviated for console.log()
const say = x => console.log(x);

// spin up the amount of steps in the sequence
const makeSequencer = stepAmount => {
  for (let i = 0; i < stepAmount; i++) {
    // dynamically assign bang() to property
    data.steps['step' + i] = bang;
  }
  // debugger
  // for (let j = 0; j < stepAmount; j++) {
  //   stepNumber = 0;
  //   data.steps['step' + j].stepId = j;
  //   stepNumber++;
  // }
  // return data.steps;
};

// calculate interval in milliseconds from given tempo (in data.tempo)
// feeds startSequencer (setInterval, more accurately)
const calculateBpm = bpm => {
  tickLength = 60000 / (bpm * 4);
  return tickLength;
};

// starts the sequencer, using the setInterval from the given BPM
// calls 'moveTick' every 'calculateBpm'
const startSequencer = () => {
  data.playerInterval = setInterval(moveTick, calculateBpm(data.tempo));
  return data.playerInterval;
};

// uses playHead to keep track of play head position
// calls callStep at (data.playhead) position
// implements .reset and .stop methods
const moveTick = () => {
  bang(); // call step's function (will be an object with methods?)
  say(data.playHead);
  if (data.playHead < Object.keys(data.steps).length) {
    data.playHead++;
  } else {
    data.playHead = 0;
  }
  moveTick.reset = () => {
    data.playHead = 0;
  };
  moveTick.stop = () => {
    clearInterval(player);
  };
};

// wrapper for reset (allowing for delayed onset)
var resetPlayhead = ms => {
  setTimeout(ms => {
    moveTick.reset();
  }, ms);
};

// wrapper for stop (allowing for delayed onset)
var stopPlayhead = ms => {
  setTimeout(ms => {
    moveTick.stop();
  }, ms);
};

makeSequencer(16);
startSequencer();
resetPlayhead(700);
// say(data.steps);