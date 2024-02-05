import "./style.css";
import { Particle } from "./particle";

// Colors
const colorPalette = {
  LinkWater: "#DDE6ED",
  DarkBlueGrey: "#27374D",
};

// Elements
const canvas: HTMLCanvasElement = document.getElementById(
  "mainCanvas"
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;
const scoreElement: HTMLElement = document.getElementById(
  "score"
) as HTMLElement;

// Define colors and constants
const SQUARE_SIZE = 26;
const numSquaresX = canvas.width / SQUARE_SIZE;
const numSquaresY = canvas.height / SQUARE_SIZE;
const HALF_SQUARE_SIZE = SQUARE_SIZE / 2;
const NUM_PARTICLES = 10;
const LIGHT_COLOR = colorPalette.LinkWater;
const DARK_COLOR = colorPalette.DarkBlueGrey;
const LIGHT_BALL_COLOR = colorPalette.DarkBlueGrey;
const DARK_BALL_COLOR = colorPalette.LinkWater;

let squares: string[][] = [];
let particles: Particle[] = [];

for (let i = 0; i < numSquaresX; i++) {
  squares[i] = [];
  for (let j = 0; j < numSquaresY; j++) {
    squares[i][j] = i < numSquaresX / 2 ? LIGHT_COLOR : DARK_COLOR;
  }
}

let x1 = canvas.width / 4;
let y1 = canvas.height / 2;
let dx1 = 12.5;
let dy1 = -12.5;

let x2 = (canvas.width / 4) * 3;
let y2 = canvas.height / 2;
let dx2 = -12.5;
let dy2 = 12.5;

let iteration = 0;

const generateExplosion = (i: number, j: number, color: string): void => {
  const centerX = (i + 0.5) * SQUARE_SIZE;
  const centerY = (j + 0.5) * SQUARE_SIZE;
  for (let p = 0; p < NUM_PARTICLES; p++) {
    particles.push(new Particle(centerX, centerY, color));
  }
};

// Function to draw a ball
const drawBall = (x: number, y: number, color: string): void => {
  context.beginPath();
  context.arc(x, y, HALF_SQUARE_SIZE, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
};

// Function to draw squares for the background
const drawSquares = (): void => {
  for (let i = 0; i < numSquaresX; i++) {
    const x = i * SQUARE_SIZE;
    for (let j = 0; j < numSquaresY; j++) {
      const y = j * SQUARE_SIZE;
      context.fillStyle = squares[i][j];
      context.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
    }
  }
};

// Function to update the square color on collision and bounce the ball
const updateSquareAndBounce = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  color: string
): { dx: number; dy: number } => {
  let updatedDx = dx;
  let updatedDy = dy;

  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
    let checkX = x + Math.cos(angle) * (SQUARE_SIZE / 2);
    let checkY = y + Math.sin(angle) * (SQUARE_SIZE / 2);

    let i = Math.floor(checkX / SQUARE_SIZE);
    let j = Math.floor(checkY / SQUARE_SIZE);

    if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
      if (squares[i][j] !== color) {
        squares[i][j] = color;
        generateExplosion(i, j, squares[i][j]);

        if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
          updatedDx = -updatedDx;
        } else {
          updatedDy = -updatedDy;
        }
      }
    }
  }

  return { dx: updatedDx, dy: updatedDy };
};

// Function to update and display the score
const updateScoreElement = (): void => {
  let lightScore = 0;
  let darkScore = 0;

  for (let i = 0; i < numSquaresX; i++) {
    for (let j = 0; j < numSquaresY; j++) {
      const squareColor = squares[i][j];

      if (squareColor === LIGHT_COLOR) {
        lightScore++;
      } else if (squareColor === DARK_COLOR) {
        darkScore++;
      }
    }
  }

  const scoreText = `Light ${lightScore} | Dark ${darkScore}`;
  scoreElement.textContent = scoreText;
};

// Function to check and handle boundary collision
const isBallCollidingWithSquare = (
  x: number,
  y: number,
  dx: number,
  dy: number
): { dx: number; dy: number } => {
  dx =
    x + dx > canvas.width - HALF_SQUARE_SIZE || x + dx < HALF_SQUARE_SIZE
      ? -dx
      : dx;

  dy =
    y + dy > canvas.height - HALF_SQUARE_SIZE || y + dy < HALF_SQUARE_SIZE
      ? -dy
      : dy;

  return { dx, dy };
};

 // Clears squares directly adjacent to the ball
 const clearAroundBall = (x: number, y: number): void => {
  let i = Math.floor(x / SQUARE_SIZE);
  let j = Math.floor(y / SQUARE_SIZE);

  if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
    squares[i][j] = LIGHT_COLOR;
  }
}

// Main drawing function
const draw = (): void => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSquares();

  particles = particles.filter((particle) => particle.isAlive());
  particles.forEach((particle) => {
    particle.update();
    particle.draw(context);
  });

  drawBall(x1, y1, LIGHT_BALL_COLOR);
  let bounce1 = updateSquareAndBounce(x1, y1, dx1, dy1, LIGHT_COLOR);
  dx1 = bounce1.dx;
  dy1 = bounce1.dy;

  drawBall(x2, y2, DARK_BALL_COLOR);
  let bounce2 = updateSquareAndBounce(x2, y2, dx2, dy2, DARK_COLOR);
  dx2 = bounce2.dx;
  dy2 = bounce2.dy;

  let boundary1 = isBallCollidingWithSquare(x1, y1, dx1, dy1);
  dx1 = boundary1.dx;
  dy1 = boundary1.dy;

  let boundary2 = isBallCollidingWithSquare(x2, y2, dx2, dy2);
  dx2 = boundary2.dx;
  dy2 = boundary2.dy;

  x1 += dx1;
  y1 += dy1;
  x2 += dx2;
  y2 += dy2;

   // Check for collision
   if (Math.abs(x1 - x2) < SQUARE_SIZE && Math.abs(y1 - y2) < SQUARE_SIZE) {
    clearAroundBall(x1, y1);
    clearAroundBall(x2, y2);
  }

  iteration++;
  if (iteration % 1_000 === 0) console.log("iteration", iteration);

  updateScoreElement();

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
