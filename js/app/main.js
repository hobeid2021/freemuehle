// The main logic for your project goes in this file.

/**
 * The {@link Player} object; an {@link Actor} controlled by user input.
 */
var player;
var board;

// Creates three arrays
// first index is square level
// Second index is column
// Third index is row
board = {
  0: Array.from({length:3}, _ => new Array(3).fill(0)),
  1: Array.from({length:3}, _ => new Array(3).fill(0)),
  2: Array.from({length:3}, _ => new Array(3).fill(0)),
};
console.log(board);

var colours = {
  beige: ['#f5f5dc'],
  brown: ['#e6b65f'],
};
/**
 * Keys used for various directions.
 *
 * The property names of this object indicate actions, and the values are lists
 * of keyboard keys or key combinations that will invoke these actions. Valid
 * keys include anything that {@link jQuery.hotkeys} accepts. The up, down,
 * left, and right properties are required if the `keys` variable exists; if
 * you don't want to use them, just set them to an empty array. {@link Actor}s
 * can have their own {@link Actor#keys keys} which will override the global
 * set.
 */


var keys = {
  up: ['up', 'w'],
  down: ['down', 's'],
  left: ['left', 'a'],
  right: ['right', 'd'],
};


/**
 * An array of image file paths to pre-load.
 */
var preloadables = [];

/**
 * A magic-named function where all updates should occur.
 */
function update() {
  player.update();
}

/**
 * A magic-named function where all drawing should occur.
 */



// Draw board to board layer, which will be used as BG
margin = 50
margin_delta = 5;
muehle_dot_radius = 6
function draw_board(ctx) {
  ctx.fillStyle = colours.brown;
  ctx.fillRect(0, 0, world.width, world.height);
  board_canvas.context.webkitImageSmoothingEnabled = false;
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;

  // Draw lines between concentric squares
  // Horizontal lines
  ctx.beginPath();
  ctx.moveTo(margin, world.height/2);
  ctx.lineTo(margin * 3,world.height/2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(world.width - 3*margin, world.height/2);
  ctx.lineTo(world.width - margin, world.height/2);
  ctx.stroke();
  // Vertical lines
  ctx.beginPath();
  ctx.moveTo(world.width/2, margin);
  ctx.lineTo(world.width/2, margin * 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(world.height/2,world.width - 3*margin);
  ctx.lineTo(world.height/2,world.width - margin);
  ctx.stroke();

  // Draw grid with dots 
  for (var i = 1; i < 4; ++i) {
    //margin += margin_delta;
    squareWidth = world.width-(2*margin*i);
    x_inc = (world.width-(2*margin*i))/2;
    for (var j = 0; j < 3; ++j) {   
      ctx.circle(margin*i + (j*x_inc), margin*i, muehle_dot_radius, 'black');
    }
    y_inc = x_inc;
    x_inc *= 2;
    for (var j = 0; j < 2; ++j) {   
      ctx.circle(margin*i + (j*x_inc), margin*i + y_inc, muehle_dot_radius, 'black');
    }
    x_inc /= 2;
    y_inc += x_inc;
    for (var j = 0; j < 3; ++j) {   
      ctx.circle(margin*i + (j*x_inc), margin*i + y_inc, muehle_dot_radius, 'black');
    }
    ctx.strokeRect(margin*i, margin*i, squareWidth, squareWidth);
  }

  
  // Change board values for debug
  board[0][2][0] = 1;
  // Draw pieces
  for (var i = 0; i < 3; ++i) {
    x_inc = (world.width-(2*margin*i))/2.5
    y_inc = (world.width-(2*margin*i))/2.5;

    for (var j = 0; j < 3; ++j) {
      for (var k = 0; k < 3; ++k) {
        if (board[i][j][k] != 0) {
          ctx.circle(margin + k*x_inc, margin + (j*y_inc), muehle_dot_radius + 5, 'white');
        }
      }
    }
    margin += 50
  }
}
function draw() {
  // Draw a background. This is just for illustration so we can see scrolling.
  context.clear(colours.beige);
  board_canvas.draw();
	player.draw();
}

/**
 * A magic-named function for one-time setup.
 *
 * @param {Boolean} first
 *   true if the app is being set up for the first time; false if the app has
 *   been reset and is starting over.
 */
function setup(first) {
  // Change the size of the playable area. Do this before placing items!
  world.resize(500, 500);
  // Switch from side view to top-down.
  Actor.prototype.GRAVITY = false;

  // Initialize the player.
  player = new Player();
  board_canvas = new Layer({
    relative: 'world',
  });
  draw_board(board_canvas.context);
}
// bb = new Box(0, 0, world.width, world.height, colours.brown);
