import Menu from "./Menu.js";
import * as THREE from "three";
import C from "cannon";
import React from "react";

// ...

class Scene extends React.Component {
	// ...
	setup() {
		// Init Physics world
		this.world = new C.World();
		this.world.gravity.set(0, -50, 0);
		// Set Three components
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog(0x202533, -1, 100);

		this.clock = new THREE.Clock();

		// Set options of our scene
		this.setCamera();
		this.setLights();
		this.setRender();

		this.addObjects();

		this.renderer.setAnimationLoop(() => {
			this.draw();
		});
	}

	setCamera() {
		const aspect = window.innerWidth / window.innerHeight;
		const distance = 15;

		this.camera = new THREE.OrthographicCamera(
			-distance * aspect,
			distance * aspect,
			distance,
			-distance,
			-1,
			100
		);

		this.camera.position.set(-10, 10, 10);
		this.camera.lookAt(new THREE.Vector3());
	}

	addObjects() {
		// We now need to pass the world of physic as an argument
		this.menu = new Menu(this.scene, this.world, this.camera);
	}

	draw() {
		// Create our method to update the physic
		this.updatePhysics();

		this.renderer.render(this.scene, this.camera);
	}

	updatePhysics() {
		// We need this to synchronize three meshes and Cannon.js rigid bodies
		this.menu.update();

		// As simple as that!
		this.world.step(1 / 60);
	}

	// ...
}

export default Scene;
