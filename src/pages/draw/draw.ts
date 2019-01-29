import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import * as p5 from 'p5/lib/p5.min';

@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html',
})
export class DrawPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {
    //this.chaosGame();
    this.colorLerp();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrawPage');
  }


  chaosGame() {
    let points = [];
    let x, y;
    let previous;
    let distance = 0.5;
    let n = 5;
    let sketch = p => {
      p.setup = () => {
        var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.parent('myContainer');
        points = [];
        for (let i = 0; i < n; i++) {
          let angle = i * p.TWO_PI / n;
          let v = p5.Vector.fromAngle(angle);
          v.mult(300);
          v.add(p.width / 2, p.height / 2);
          points.push(v);
        }
        p.background(0);
        p.reset();
      };

      p.reset = () => {
        p.current = p.createVector(p.random(p.width), p.random(p.height));

        for (let p of points) {
          // point(p.x, p.y);
        }
      };
      p.draw = () => {
        if (p.frameCount % 400 === 0) {
          // reset();
        }
        if (p.frameCount < 1000) {
          p.strokeWeight(0.1);
          for (let i = 0; i < 1000; i++) {
            p.stroke(p.random(255), p.random(255), p.random(255), 50);
            let next = p.random(points);
            if (next !== previous) {
              p.current.x = p.lerp(next.x, p.current.x, distance);
              p.current.y = p.lerp(next.y, p.current.y, distance);
              p.point(p.current.x, p.current.y);
            }

            previous = next;

          }
        }

      };
    };

    let myp5 = new p5(sketch);
  }

  colorLerp() {
    let from;
    let to;
    let c1;
    let c2;
    let sketch = p => {
      p.setup = () => {
        var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.parent('myContainer');
        p.background(255);
        p.noStroke();
      };

      p.draw = () => {
        p.background(255);
        from = p.color(255, 0, 0, 0.2 * 255);
        to = p.color(0, 0, 255, 0.2 * 255);
        c1 = p.lerpColor(from, to, 0.33);
        c2 = p.lerpColor(from, to, 0.66);
        for (let i = 0; i < 15; i++) {
          p.fill(from);
          p.quad(
            p.random(-40, 220), p.random(p.height),
            p.random(-40, 220), p.random(p.height),
            p.random(-40, 220), p.random(p.height),
            p.random(-40, 220), p.random(p.height)
          );
          p.fill(c1);
          p.quad(
            p.random(140, 380), p.random(p.height),
            p.random(140, 380), p.random(p.height),
            p.random(140, 380), p.random(p.height),
            p.random(140, 380), p.random(p.height)
          );
          p.fill(c2);
          p.quad(
            p.random(320, 580), p.random(p.height),
            p.random(320, 580), p.random(p.height),
            p.random(320, 580), p.random(p.height),
            p.random(320, 580), p.random(p.height)
          );
          p.fill(to);
          p.quad(
            p.random(500, 760), p.random(p.height),
            p.random(500, 760), p.random(p.height),
            p.random(500, 760), p.random(p.height),
            p.random(500, 760), p.random(p.height)
          );
        }
        p.frameRate(5);
      };
    };

    let myp5 = new p5(sketch);
  }
}
