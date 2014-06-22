/*
 * torpedo.js
 * Scripting for instance of a torpedo that can be launched by sub (or player?)
 * I guess a torpedo is also a sort of boat.
 */

#pragma strict

class torpedo extends boat {

	/* TODOs:
	  * 2. engine sounds / "torpedo in the water"
	  * 3. and of course, collisions btw surface ships and torpedoes = kaboom
	  */

	//vars

	var firingPosition : Vector3;

	var MAX_DISTANCE : float; //max distance torpedo can travel before expiration

	//methods

	/*
	  * Return distance this torpedo has travelled since firing
	  */
	function DistanceTravelled() {
		return Vector3.Distance(this.firingPosition, transform.position);
	}

	/*
	  * Torpedos only move in one direction: forward
	  */
	function GetInput() {
		IncrementForce(this.DELTA_FORCE_PER_SECOND);
		SetTorque(0);
	}

	/*
	 * Initialization
	 */
	function Start () {
		this.MAX_FORWARD_FORCE = 15.00;
		this.MIN_FORWARD_FORCE = 0.0;
		this.DELTA_FORCE_PER_SECOND = 15.00; //instant acceleration
		this.RUDDER_TORQUE = 0.0;
		this.length = 20.0;
		this.MAX_DISTANCE = 5000.0;
	
		enginePoint = "";
		utilScript = GameObject.Find("ScriptHolder").GetComponent(util);
	}

	function Update () {
	}

	/*
	 * Frame update at fixed intervals
	 */
	function FixedUpdate() {
		GetInput();

		ApplyForces();
		
		//Destroy torpedo after it hits limit of its range
		if (DistanceTravelled() >= this.MAX_DISTANCE) {
			Destroy(gameObject);
		}

		AdjustEngineVolume();
	}
}
