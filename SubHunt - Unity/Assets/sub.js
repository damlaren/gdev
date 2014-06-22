/*
 * sub.js
 * Scripting for adversary submarine
 */

#pragma strict

class sub extends boat {

	//methods
	
	var prefab : torpedo;

	/*
	  * Get/Set input
	  * TODO: AI for the sub will basically make high-level decisions about what to do, then feed these in as input
	  */
	function GetInput() {
		//For now just run around in circles
		//this.forwardForce = 0;
		//this.torque = 0;
		IncrementForce(this.DELTA_FORCE_PER_SECOND);
		SetTorque(this.RUDDER_TORQUE);
	}
	
	/*
	  * Fire a torpedo by instantiating a prefab.
	  * Fire it from a point at the front of the sub.
	  * Params:
	  * - gyroAngle: Initial angle offset for firing torpedo, degrees
	  */
	function FireTorpedo(gyroAngle : float) {
		var firingPosition = transform.position + (this.length + prefab.length) * Direction(); //TODO not sure why halflength isn't enough
		
		firingPosition.z = 0; //always set torpedo's depth to surface even if sub is submerged
		var clone : torpedo = Instantiate(prefab, firingPosition, transform.rotation);
		
		//Apply gyro rotation.
		//The more realistic way to do this would be to have the torpedo change direction after launch,
		//but this is probably good enough.
		//clone.transform.RotateAround(firingPosition, Vector3(0, 0, -1), gyroAngle);
		clone.firingPosition = firingPosition;
	}

	/*
	 * Initialization
	 */
	function Start () {
		this.MAX_FORWARD_FORCE = 8500.0;
		this.MIN_FORWARD_FORCE = -850.0;
		this.DELTA_FORCE_PER_SECOND = 850.0;
		this.RUDDER_TORQUE = 1.5;
		this.length = 67.0;
	
		enginePoint = "sub-engine-point";
		utilScript = GameObject.Find("ScriptHolder").GetComponent(util);
		
		//FireTorpedo(0.0);
	}

	function Update () {
	}

	/*
	 * Frame update at fixed intervals
	 */
	function FixedUpdate() {
		GetInput();

		ApplyForces();
		
		if (Random.Range(0, 1.0) > 0.99) {
			FireTorpedo(0.0);
		}

		AdjustEngineVolume();
	}
	
	/*
	  * Sub collision handler: death by ramming.
	  * And later, maybe other things.
	  */
	function OnCollisionEnter(collision : Collision) {
		if (collision.gameObject.name == "player") {
			print("RAMMING SPEED");
		}
	}
}
