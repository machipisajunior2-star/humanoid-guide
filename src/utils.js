    export function configeAnimation(c, c2, canvas1, canvas2, themeColor) {
      function resizeCanvas() {
        canvas1.width = window.innerWidth / 2;
        canvas1.height = window.innerHeight / 3;
        canvas2.width = window.innerWidth / 2;
        canvas2.height = window.innerHeight / 3;
      }

      resizeCanvas();

      window.addEventListener("resize", function () {
        resizeCanvas();
      });

      window.addEventListener("orientationchange", function () {
        resizeCanvas();
      });

      let cods = [];
      const num = ["0", "1"];
      for (let i = 0; i < 29; i++) {
        num.push(" ");
      }

      function Cod(num) {
        this.y = 0;
        this.x = 5;
        this.space = 9;
        this.num = num;
        this.color = themeColor;

        this.update = function (i) {
          if (this.y >= canvas1.height || this.y >= canvas2.height) {
            cods.splice(i, 1);
          } else {
            this.draw();
          }
        };
        this.draw = function () {
          this.x = 5;
          this.num.forEach((num) => {
            c.fillStyle = this.color === "#000000" ? "black" : "#FF4C00";
            c.fillText(num, this.x, this.y + this.space);
            c.font = "normal 9px DOTMATRI";
            c2.fillStyle = this.color === "#000000" ? "black" : "#FF4C00";
            c2.fillText(num, this.x, this.y + this.space);
            c2.font = "normal 9px DOTMATRI";
            this.x += 5;
          });
          this.y = this.y + this.space;
        };
      }

      function createCod() {
        let numArr = [];
        for (let i = 0; i < canvas1.width / 5; i++) {
          const digit = num[Math.round(Math.random() * 30)];
          if (cods.length !== 0) {
            if (cods[cods.length - 1].num[i] !== " " && digit !== " ") {
              numArr.push(digit);
            } else if (cods[cods.length - 1].num[i] === " " && digit === " ") {
              numArr.push(" ");
            } else if (cods[cods.length - 1].num[i] === " " && digit !== " ") {
              numArr.push(digit);
            } else if (cods[cods.length - 1].num[i] !== " " && digit === " ") {
              numArr.push(num[Math.round(Math.random())]);
            }
          }

          if (cods.length === 0) numArr.push(digit);
        }
        cods.push(new Cod(numArr));
      }

      function animate() {
        setTimeout(() => {
          requestAnimationFrame(animate);
        }, 60);
        c.clearRect(0, 0, canvas1.width, canvas1.height);
        c2.clearRect(0, 0, canvas2.width, canvas2.height);

        createCod();

        cods.forEach((cod, i) => {
          cod.update(i);
        });
      }

      animate();
    }