export class Particle {
    private x: number;
    private y: number;
    private color: string;
    private lifeSpan: number;
    private velocity: Velocity;
    private size: number;
  
    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.lifeSpan = 200;
      this.velocity = this.randomVelocity();
      this.size = Math.random() * 3 + 1;
    }
  
    private randomVelocity(): Velocity {
      return {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      };
    }
  
    public update(): void {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.lifeSpan -= 1;
      this.size *= 0.96;
    }
  
    public draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  
    public isAlive(): boolean {
      return this.lifeSpan > 0;
    }
  }
  
  interface Velocity {
    x: number;
    y: number;
  }
  