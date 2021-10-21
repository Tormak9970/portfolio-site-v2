class Point{
    x:number;
    y:number;
    constructor(x: number, y: number){
      this.x = x;
      this.y = y;
    }
  
    draw(ctx: CanvasRenderingContext2D){ roundRect(ctx, this.x, this.y, 30, 30, 7.5, true, true); }
  
    drawHeld(ctx: CanvasRenderingContext2D, id: number){
      if (id == 1 || id == 3 || id == 4){
        roundRect(ctx, this.x - 60, this.y + 60, 30, 30, 7.5, true, true);
      } else if (id == 5) {
        roundRect(ctx, this.x - 75, this.y + 75, 30, 30, 7.5, true, true);
      } else {
        roundRect(ctx, this.x - 75, this.y + 60, 30, 30, 7.5, true, true);
      }
    }
  
    moveLeft(dx){ this.x -= dx; }
    moveRight(dx){ this.x += dx; }
    moveDown(dy){ this.y += dy; }
  
    rotateLeft(center: Point){
      let returned = rotate(center.x, center.y, this.x, this.y, 270);
      this.x = returned[0];
      this.y = returned[1];
    }
  
    rotateRight(center: Point){
      let returned = rotate(center.x, center.y, this.x, this.y, 90);
      this.x = returned[0];
      this.y = returned[1];
    }
  }
  
  function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }
  
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number|{tl: number, tr: number, br: number, bl: number}, fill: boolean, stroke: boolean) {
    if (typeof stroke === 'undefined') { stroke = true; }
    if (typeof radius === 'undefined') { radius = 5; }
    if (typeof radius === 'number') { radius = {tl: radius, tr: radius, br: radius, bl: radius}; } else {
      let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (let side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    // ctx.beginPath();
    // ctx.moveTo(x + radius.tl, y);
    // ctx.lineTo(x + width - radius.tr, y);
    // ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    // ctx.lineTo(x + width, y + height - radius.br);
    // ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    // ctx.lineTo(x + radius.bl, y + height);
    // ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    // ctx.lineTo(x, y + radius.tl);
    // ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    // ctx.closePath();
    //if (fill) { ctx.fillRect(x, y, width, height); }
    if (stroke) { ctx.strokeRect(x+2, y+2, width-4, height-4); }
  
  }
  
  export { Point };