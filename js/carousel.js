class Carousel {

  constructor (el, options) {
    if(!el){
      throw new Error("el is required.");
    }
    this.el = el; 
    this.imageCont = el.querySelector(".image-cont");
    this.images = this.imageCont.children;

    this.options = options || {};

    this.width = this.options.width || this.images[0].width;
    this.height = this.options.height || this.images[0].height;
 

    this.init();    
  }

  init () {
    this.el.style.width = this.width + "px";
    this.el.style.height = this.height + "px";
    this.el.style.overflow = "hidden";
    this.el.style.border = "1px solid black";
    
    this.imageCont.style.width = this.images.length * this.width + "px";
    this.imageCont.style.lineHeight = "0";

    for(let image of this.images){
      image.style.display = "block";
      image.style.float = "left";
      image.style.width = this.width + "px";
      image.style.height = this.height + "px";
    }

    this.currentIndex = 0;

    this.changer = setInterval(() => { this.next(); }, this.options.delay || 2000);
  }

  animateTo (n){
    let currentMargin = this.currentIndex * this.width;
    let endMargin = n * this.width;
    let diffMargin = endMargin - currentMargin;
    let speed = 0.01;
    let progress = 0;
    
    this.animator = setInterval(() => {
      this.imageCont.style.marginLeft = -(currentMargin + diffMargin * progress) + "px";
      progress += speed;
      if(progress >= 1){
        this.imageCont.style.marginLeft = -endMargin + "px";
        clearInterval(this.animator);
      }
    }, 100 * speed);
    
  }

  prev () {
    let prevIndex  = (this.currentIndex - 1) % this.images.length;
    this.animateTo(prevIndex);
    this.currentIndex = prevIndex;
  }

  next () {
    let nextIndex = (this.currentIndex + 1) % this.images.length;
    this.animateTo(nextIndex);
    this.currentIndex = nextIndex;
  }



}