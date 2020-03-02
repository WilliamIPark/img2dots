import './styles.css';
import p5 from 'p5';
import imgSrc from './assets/1.png';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from './constants';

let size_off_x = 0.0;
let size_off_y = 0.0;

const p5Instance = new p5(s => {
  let img;
  let currentFrame = 0;
  let frameCount = 0;
  s.preload = () => {
    img = s.loadImage(imgSrc);
  };

  s.setup = () => {
    s.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    img.loadPixels();
    s.frameRate(60);
    img.delay(100);
    frameCount = img.numFrames() - 1;
  };

  s.draw = () => {
    if (currentFrame < frameCount) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
    s.image(img, 0, 0);
    s.push();
    s.background(0);
    s.translate(15, 15);
    imageToGrid(img, 12, 10, 6, 20);
    s.pop();
  };

  function isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
  }

  function imageToGrid(image, proximity, reduce, size, cutoff = 60) {
    const { width, height, pixels, gifProperties } = image;
    s.push();
    s.fill('white');
    size_off_x += 0.2;
    size_off_y += 0.2;
    for (let x = 0; x < width / reduce; x++) {
      for (let y = 0; y < height / reduce; y++) {
        const pixel =
          gifProperties?.frames[currentFrame]?.data[
            ((y + 1) * width + x) * 4 * reduce
          ];
        if (
          ((isEven(x) && isEven(y)) || (!isEven(x) && !isEven(y))) &&
          pixel > cutoff
        ) {
          s.circle(
            proximity * x + s.sin(x + y + size_off_x) * 0.2,
            proximity * y + s.sin(x + y + size_off_y) * 0.2,
            (size * pixel) / 100,
          );
        }
      }
    }
    s.pop();
  }
});

export default p5Instance;
