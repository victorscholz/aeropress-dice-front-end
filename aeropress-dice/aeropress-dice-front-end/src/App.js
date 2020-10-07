import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
// import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	componentDidMount() {
		let WIDTH = window.innerWidth;
		let HEIGHT = window.innerHeight;

		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(WIDTH, HEIGHT);
		renderer.setClearColor(0x808a9b, 1);
		document.body.appendChild(renderer.domElement);

		let scene = new THREE.Scene();
		// scene.background = new THREE.CubeTextureLoader()
		// 	.setPath("textures/")
		// 	.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

		let camera = new THREE.PerspectiveCamera(
			70,
			WIDTH / HEIGHT,
			0.1,
			10000
		);
		camera.position.z = 50;
		scene.add(camera);

		let textureLoader = new THREE.CubeTextureLoader()
			.setPath("textures/")
			.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

		const loader = new THREE.TextureLoader();
		const materials = [
			new THREE.MeshBasicMaterial({
				map: loader.setPath("textures/").load("stir.jpeg"),
			}),
			new THREE.MeshBasicMaterial({
				map: loader.setPath("textures/").load("stir1.jpeg"),
			}),
			new THREE.MeshBasicMaterial({
				map: loader.setPath("textures/").load("two-direction.jpeg"),
			}),
			new THREE.MeshBasicMaterial({
				map: loader.setPath("textures/").load("no-stir.jpeg"),
			}),
			new THREE.MeshBasicMaterial({
				map: loader.setPath("textures/").load("compass.jpeg"),
			}),
			new THREE.MeshBasicMaterial({
				map: loader.setPath("textures/").load("your-choice.jpeg"),
			}),
		];

		let material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			envMap: textureLoader,
		});

		let boxGeometry = new THREE.BoxGeometry(7, 7, 7);
		// let basicMaterial = new THREE.MeshStandardMaterial({
		// 	color: 0xffffff,
		// });

		let cube = new THREE.Mesh(boxGeometry, materials);
		cube.position.x = -25;
		cube.rotation.set(0.4, 0.2, 0);
		scene.add(cube);

		let cube2 = new THREE.Mesh(boxGeometry, material);
		cube2.rotation.set(0.4, 0.2, 0);
		scene.add(cube2);

		let cube3 = new THREE.Mesh(boxGeometry, material);
		cube3.position.x = 25;
		cube3.rotation.set(0.4, 0.2, 0);
		scene.add(cube3);

		let cube4 = new THREE.Mesh(boxGeometry, material);
		cube4.position.y = 25;
		cube4.rotation.set(0.4, 0.2, 0);
		scene.add(cube4);

		let cube5 = new THREE.Mesh(boxGeometry, material);
		cube5.position.y = -25;
		cube5.rotation.set(0.4, 0.2, 0);
		scene.add(cube5);

		let light = new THREE.PointLight(0xffffff);
		light.position.set(-10, 15, 50);
		scene.add(light);

		let t = 0;
		function render() {
			t += 0.01;
			requestAnimationFrame(render);
			cube.rotation.y += 0.01;
			cube.rotation.x += 0.01;
			cube2.rotation.z = Math.abs(Math.sin(t));
			cube3.position.y = -7 * Math.sin(t * 2);
			cube4.rotation.x += 0.01;
			cube5.position.x = +7 * Math.sin(t * 2);
			renderer.render(scene, camera);
		}
		render();
	}
	render() {
		return <div ref={(ref) => (this.mount = ref)} />;
	}
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
