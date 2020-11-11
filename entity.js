/*
  This Javascript class is used to create Entity objects that represent planets
  
  Created by Joseph H (Josessinho).

*/


class Entity{
  

  constructor(id_,x,y,mas){
    
    this.trailCount = 0;

    this.K = 5;                              //Gravitational constant. Increase for a stronger force between masses.
    
    this.position = createVector(x,y);       //Position defined as a vector
    this.velocity = createVector(0,0);       //Velocity defined as a vector
    this.acceleration = createVector(0,0);   //Acceleration defined as a vector
    this.force = createVector(0,0);          //Current force being applied to the mass
    this.id = id_;                           //Used to identify planets
    this.mass = mas                          //Mass of the planet
    this.diam = 10 * Math.cbrt((3*this.mass)/(4*3.1416));          //Diameter proportional to the mass for visualization purposes
    this.trails = new Array(100);
  }
  
  update(neighborhood_){                      //calculates forces and updates velocity and acceleration
    this.calcForce(neighborhood_);
    this.acceleration = this.force.mult(1/this.mass);
    this.velocity.add(this.acceleration);
  }

  show(){                                     //calculates position and draws the object as well as the trails
    this.position.add(this.velocity);
    ellipse(this.position.x,this.position.y,this.diam,this.diam);
    this.drawTrails();
  }
  
  /*
      The following function calculates the force induced in the current planet by all planets in the
    neighborhood object array parameter and adds them up to the force variable
  */

  calcForce(neighborhood){
    let newForce = createVector(0,0);
    let finalForce = createVector(0,0);
    
    for (var i = 0; i < neighborhood.length; i++){
      if (neighborhood[i].id !== this.id){
        var distance = this.position.dist(neighborhood[i].position)
        if (distance !== 0){
          var magnit = (this.K * this.mass * neighborhood[i].mass)/(distance ** 2) //Calculate the magnitud of the force
          newForce = neighborhood[i].position.copy();
          newForce.sub(this.position);         //set the direction of the vector to the other planet
          newForce.setMag(magnit);             //set the magnitud of the force vector
          finalForce.add(newForce);
        }
      }
    }
    this.force = finalForce;
  }
  
  drawTrails(){                                //Draws trails behind the planets
    if (this.trailCount >= 2){
      this.trails.unshift([this.position.x,this.position.y]);
      this.trails.pop();
      this.trailCount = 0;
    }
    for (var i = this.trails.length-1; i > 0; i--){
      if (this.trails[i] != undefined){
        stroke((255*(this.trails.length-i))/this.trails.length);
        line(this.trails[i][0],this.trails[i][1],this.trails[i-1][0],this.trails[i-1][1]);
      }
    }
    this.trailCount++;
  }
}
