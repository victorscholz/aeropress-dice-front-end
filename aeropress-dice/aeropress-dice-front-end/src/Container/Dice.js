import React from "react";
import * as THREE from "three";
import * as CANNON from "cannon";

class Dice extends React.Component {
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

		// let textureLoader = new THREE.CubeTextureLoader()
		// 	.setPath("textures/")
		// 	.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

		const loader = new THREE.TextureLoader();
		const stir = [
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/stir/").load("stir2.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/stir/").load("stir1.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/stir/")
					.load("two-direction.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/stir/").load("no-stir.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/stir/").load("compass.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/").load("your-choice.jpeg"),
			}),
		];
		const ratio = [
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/ratio/").load("12-200.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/ratio/").load("15-200.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/ratio/").load("15-250.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/ratio/").load("24-200.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/ratio/").load("30-200.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/").load("your-choice.jpeg"),
			}),
		];
		const temp = [
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/temperature/").load("75C.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/temperature/").load("80C.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/temperature/").load("85C.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/temperature/").load("90C.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/temperature/").load("95C.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/").load("your-choice.jpeg"),
			}),
		];
		const bloom = [
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/bloom/")
					.load("inverted-no-bloom.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/bloom/")
					.load("inverted-30-60.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/bloom/")
					.load("standard-no-bloom.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/bloom/")
					.load("inverted-30-30.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/bloom/")
					.load("standard-30-30.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/bloom/")
					.load("standard-30-60.jpeg"),
			}),
		];
		const grind = [
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/grind/").load("fine-60.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/grind/").load("coarse-4.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader
					.setPath("textures/grind/")
					.load("very-fine-30.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/grind/").load("med-fine-90.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/grind/").load("medium-120.jpeg"),
			}),
			new THREE.MeshStandardMaterial({
				map: loader.setPath("textures/").load("your-choice.jpeg"),
			}),
		];

		// let material = new THREE.MeshStandardMaterial({
		// 	color: 0xffffff,
		// 	envMap: textureLoader,
		// });

		let boxGeometry = new THREE.BoxGeometry(5, 5, 5);
		// let StandardMaterial = new THREE.MeshStandardMaterial({
		// 	color: 0xffffff,
		// });

		let cube = new THREE.Mesh(boxGeometry, stir);
		cube.position.x = -25;
		cube.rotation.set(0.4, 0.2, 0);
		scene.add(cube);

		let cube2 = new THREE.Mesh(boxGeometry, ratio);
		cube2.rotation.set(0.4, 0.2, 0);
		scene.add(cube2);

		let cube3 = new THREE.Mesh(boxGeometry, temp);
		cube3.position.x = 25;
		cube3.rotation.set(0.4, 0.2, 0);
		scene.add(cube3);

		let cube4 = new THREE.Mesh(boxGeometry, bloom);
		cube4.position.y = 25;
		cube4.rotation.set(0.4, 0.2, 0);
		scene.add(cube4);

		let cube5 = new THREE.Mesh(boxGeometry, grind);
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
			cube2.rotation.y += 0.01;
			cube2.rotation.x += 0.01;
			cube3.rotation.y += 0.01;
			cube3.rotation.x += 0.01;
			cube4.rotation.y += 0.01;
			cube4.rotation.x += 0.01;
			cube5.rotation.y += 0.01;
			cube5.rotation.x += 0.01;
			// cube2.rotation.z = Math.abs(Math.sin(t));
			// cube3.position.y = -7 * Math.sin(t * 2);
			// cube4.rotation.x += 0.01;
			// cube5.position.x = +7 * Math.sin(t * 2);
			renderer.render(scene, camera);
		}
		render();
	}
	render() {
		return (
			<>
				<div ref={(ref) => (this.mount = ref)} />;
			</>
		);
	}
}

export default Dice;
