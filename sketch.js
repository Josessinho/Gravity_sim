/*
  Main file for the script.

  This is a script that simulates gravitational force with newtonian physics

  If you want to run this on p5js web editor, delete the lines where 
  elements are parented to html (if you have no idea what this means 
  keep reading the comments, I specified these lines below).
  Also add the line: <script src="entity.js"></script> under the line <script src="sketch.js"></script>
  on the html index file
  Created by Joseph H (Josessinho).
*/

var initial;               //Position vector of the mouse at the moment of a click
var insideCheck;           //Boolean variable to check if the mouse was pressed inside the canvas

var massSlider;            //Slider for the mass... ._.
var sliderMult;            //Value of slider exponentially increased for better range of size.

function setup() {         //this function executes once at the beginning.
  
  initial = createVector(0,0);
  
  frameRate(50);
  
  var canv = createCanvas(window.innerWidth*.95, window.innerHeight*.9);
  canv.parent("myCanvas");       //<----delete this line to run on web editor
  
  massSlider = createSlider(.5,6,.5,.1);
  massSlider.parent("mySlider"); //<----delete this one too
  
  universe = new Array();        //Array where the planets(entity objects) are gonna be stored
}

function draw() {                //This functions loops forever 
  background(0);
  
  sliderMult = massSlider.value()**3;
  
  for ( i = 0; i < universe.length; i++){    // --
    universe[i].update(universe);            //   \
  }                                          //    update() all the planets parameters and show()
  for (u = 0; u < universe.length; u++){     //    all the planets (see comments on entity.js for more info)
    universe[u].show();                      //   /
  }                                          // --
  
  textSize(15);                  //Display framerate at the bottom right corner
  text(frameRate(), width -100, height -10);
  
  if (mouseIsPressed) {          // Draws the line representing the velocity from the 
    if(insideCheck){             //position at the press and the current position of 
    stroke(255);                 //the pointer while the mouse is still pressed.
    line(initial.x,initial.y,mouseX,mouseY);
    }
  }

  //Display a preview of the planet:
  ellipse(30,height-30,10 * Math.cbrt((3*sliderMult)/(4*3.1416)),10 * Math.cbrt((3*sliderMult)/(4*3.1416)));

}

function mousePressed(){ 
  
  /*Function called when mouse is pressed, cheks if the mouse was pressed
  inside the canvas and asign the current x and y values of the mouse position
  to the "initial" vector variable*/

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    insideCheck = true;
      
    initial.x = mouseX;
    initial.y = mouseY;
  }
  else{
    insideCheck = false;
  }
}

function mouseReleased(){

  /*Function called when mouse button is released. If the mouse was pressed inside the
  canvas, creates a new Entity object (a planet)*/

  if (insideCheck){
    var newVelocity = createVector(mouseX,mouseY);
    
    newVelocity.sub(initial);
    newVelocity.mult(0.05);
    
    var newPlan = new Entity(universe.length, initial.x, initial.y,massSlider.value()**3);
    newPlan.velocity = newVelocity;
    
    universe.push(newPlan);
  }
}

function keyPressed() {      //check if a key is pressed and deletes last planet if the key is 'z'
  print(keyCode);
  if(keyCode == 90){
    universe.pop();
  }
}
