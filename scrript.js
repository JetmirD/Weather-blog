// Import PIXI.js library
import * as PIXI from 'pixi.js';

// Create a PIXI application
const app = new PIXI.Application({ width: 800, height: 600 });

// Add the PIXI application canvas to the HTML body
document.body.appendChild(app.view);

// Create a PIXI sprite
const sprite = PIXI.Sprite.from('path/to/your/image.png');
sprite.anchor.set(0.5); // Set the anchor point to the center of the sprite
sprite.x = app.screen.width / 2; // Set the initial x position
sprite.y = app.screen.height / 2; // Set the initial y position

// Add the sprite to the PIXI stage
app.stage.addChild(sprite);

// Animate the sprite
app.ticker.add(() => {
  sprite.rotation += 0.01; // Rotate the sprite
});
