/*
 * boat.js
 * Functions that can be shared by boats
 */
#pragma strict

class boat extends MonoBehaviour {

	//constants
	//Notes for a realistic simulation: the DDG can accelerate to full speed 30 knots in about 90 seconds, and come to a dead stop within 600 yards
	var MAX_FORWARD_FORCE : float = 1.0; //max/min force driving ship forward
	var MIN_FORWARD_FORCE : float = -0.1;
	var DELTA_FORCE_PER_SECOND : float = 0.1; //How much force can change per second
	var RUDDER_TORQUE : float = 0.5; //torque applied with rudder

	//script knowitalls
	var utilScript : util;

	//boat variables
	var forwardForce : float; //Force pushing the boat forward/backward
	var torque : float;
	var length : float; //Length of the boat; should correspond to scale
	
	//sound variables
	var enginePoint = "";

	/*
	 * Returns direction boat is facing, Vector3
	 */
	function Direction() {
		return transform.forward;
	}
	
	/*
	 * Returns direction of vector pointing to right
	 */
	function Right() {
		return transform.right;
		//return Vector3.Cross(Vector3(0, 0, -1), Direction());
	}

	/*
	 * Returns speed of boat
	 */
	function Speed() {
		return Vector3.Dot(this.rigidbody.velocity, Direction());
	}

	/*
	 * Returns bearing angle from north, CW, degrees
	 */
	function Bearing() {
		return transform.eulerAngles.z;
	}
	
	/*
	  * Get elapsed game-time. This is sped up from the observed frame rate by some constant factor.
	  */
	function DeltaTime() {
		return Time.deltaTime * 1.0;
	}
	
	/*
	 * Return half the length of the boat.
	 */
	function HalfLength() {
		return this.length * 0.5;
	}
	
	/*
	 * Set torque, but based on speed
	 */
	function SetTorque(t : float) {
		this.torque = t * utilScript.signedSqrt(Speed());
	}

	/*
	 * Increment or decrement force by a consistent amount, depending on time
	 */
	function IncrementForce(deltaForcePerSecond : float) {
		this.forwardForce += deltaForcePerSecond * DeltaTime();
		this.forwardForce = Mathf.Clamp(this.forwardForce, this.MIN_FORWARD_FORCE, this.MAX_FORWARD_FORCE);
	}
	
	/*
	 * Apply forward force and torque to the boat.
	 */
	function ApplyForces() {
		var right = Right();
		rigidbody.AddForce(Direction() * this.forwardForce);
		
		//Don't allow boats to move backwards
		//if ((this.Speed() <= 0) && (this.forwardForce < 0)) {
		//	rigidbody.velocity = Vector3.zero;
		//	this.forwardForce = 0;
		//}
		
		transform.RotateAround(transform.position - this.HalfLength() * Direction(), Vector3(0, 0, -1), this.torque * DeltaTime());
		//transform.Rotate(Vector3(0, 0, this.torque));
	}
	
	/*
	 * Adjust volume of ship's engines depending on how fast it's going.
	 */
	function AdjustEngineVolume() {
		//adjust volume of engine in response to 
		if (this.enginePoint != "") {
			var engineObject = GameObject.Find(enginePoint);
			var audiosource = engineObject.GetComponent(AudioSource);

			var MAX_VOLUME : float = 0.02; //tweaked based on what sounds good
			var t = Mathf.Abs(this.forwardForce) / MAX_FORWARD_FORCE;
			audiosource.volume = MAX_VOLUME * t * t;
		}
	}
}
