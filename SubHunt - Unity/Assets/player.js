/*
 * player.js
 * Scripting to allow player control of destroyer.
 */

#pragma strict

class player extends boat {

	//methods

	/*
	  * Get player input control
	  */
	function GetInput() {
		//Up/down: change forward/backward force
		if (Input.GetKey(KeyCode.UpArrow)) {
			IncrementForce(this.DELTA_FORCE_PER_SECOND);
		}
		else if (Input.GetKey(KeyCode.DownArrow)) {
			IncrementForce(-this.DELTA_FORCE_PER_SECOND);
		}

		//Left/right: apply torque to boat, depends on boat speed
		this.torque = 0;
		if (Input.GetKey(KeyCode.LeftArrow)){
			SetTorque(-this.RUDDER_TORQUE);
		}
		else if (Input.GetKey(KeyCode.RightArrow)){
			SetTorque(this.RUDDER_TORQUE);
		}
	}

	/*
	 * Initialization
	 */
	function Start () {
		MAX_FORWARD_FORCE = 50000.0;
		MIN_FORWARD_FORCE = -5000.0;
		DELTA_FORCE_PER_SECOND = 1000.0;
		RUDDER_TORQUE = 1.0;
		length = 117.0;
	
		enginePoint = "player-engine-point";
		utilScript = GameObject.Find("ScriptHolder").GetComponent(util);
		
		Time.timeScale = 5.0;
	}

	function Update () {
	}

	/*
	 * Frame update at fixed intervals
	 */
	function FixedUpdate() {
		GetInput();

		ApplyForces();
		//print(Direction() + ": " + Right());

		AdjustEngineVolume();
	}
	
	/*
	  * Collision handler: death by torpedo
	  */
	function OnCollisionEnter(collision : Collision) {
		if (collision.gameObject.name == "torpedo(Clone)") {
			print("TORPEDO HIT");
		}
	}

}
