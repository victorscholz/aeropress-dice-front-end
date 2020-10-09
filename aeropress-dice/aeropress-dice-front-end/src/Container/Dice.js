import { TextureLoader } from "three";
import React, { useState, Suspense, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox } from "use-cannon";
import { useSpring, a } from "@react-spring/three";
import { OrbitControls, Text, HTML } from "drei";
// import { useStore, useScore } from "../store";

export default function Dice() {
	function Plane(props) {
		const [ref] = usePlane(() => ({
			rotation: [-Math.PI / 2, 0, 0],
			...props,
		}));
		return (
			<mesh
				ref={ref}
				receiveShadow
				position={[0, -1, 0]}
				rotation={[-0.5 * Math.PI, 0, 0]}
			>
				<planeBufferGeometry attach="geometry" args={[100, 100]} />
				<shadowMaterial attach="material" color="black" />
			</mesh>
		);
	}

	function Cube(props) {
		////////////////////////////////////////////////////////////////////////////////////////////////////
		/* file paths to custom textures
		"textures/stir/stir2.jpeg"
		"textures/stir/stir1.jpeg"
		"textures/stir/two-direction.jpeg"
		"textures/stir/no-stir.jpeg"
		"textures/stir/compass.jpeg"
		"textures/your-choice.jpeg"
		"textures/ratio/12-200.jpeg"
		"textures/ratio/15-200.jpeg"
		"textures/ratio/15-250.jpeg"
		"textures/ratio/24-200.jpeg"
		"textures/ratio/30-200.jpeg"
		"textures/your-choice.jpeg"
		"textures/temperature/75C.jpeg"
		"textures/temperature/80C.jpeg"
		"textures/temperature/85C.jpeg"
		"textures/temperature/90C.jpeg"
		"textures/temperature/95C.jpeg"
		"textures/your-choice.jpeg"
		"textures/bloom/inverted-no-bloom.jpeg"
		"textures/bloom/inverted-30-60.jpeg"
		"textures/bloom/standard-no-bloom.jpeg"
		"textures/bloom/inverted-30-30.jpeg"
		"textures/bloom/standard-30-30.jpeg"
		"textures/bloom/standard-30-60.jpeg"
		"textures/grind/fine-60.jpeg"
		"textures/grind/coarse-4.jpeg"
		"textures/grind/very-fine-30.jpeg"
		"textures/grind/med-fine-90.jpeg"
		"textures/grind/medium-120.jpeg"
		"textures/your-choice.jpeg"
		*/
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		const stir1 = React.useMemo(
			() => new TextureLoader().load("textures/stir/stir1.jpeg"),
			[]
		);
		const stir2 = React.useMemo(
			() => new TextureLoader().load("textures/stir/stir2.jpeg"),
			[]
		);
		const stir3 = React.useMemo(
			() => new TextureLoader().load("textures/stir/two-direction.jpeg"),
			[]
		);
		const stir4 = React.useMemo(
			() => new TextureLoader().load("textures/stir/no-stir.jpeg"),
			[]
		);
		const stir5 = React.useMemo(
			() => new TextureLoader().load("textures/stir/compass.jpeg"),
			[]
		);
		const stir6 = React.useMemo(
			() => new TextureLoader().load("textures/your-choice.jpeg"),
			[]
		);

		const [hovered, hover, setHover] = useState(false);
		const [active, setActive] = useState(false);

		const [ref, api] = useBox(() => ({
			// mass: 0.1,
			// position: [0, 5, 0],
			// rotation: [0.4, 0.2, 0.5],
			// allowSleep: false,
			// sleepSpeedLimit: 1,
			// args: [0.3, 0.3, 0.3],
			// material: {
			// 	friction: 1,
			// 	restitution: 1,
			// },
			mass: 0.1,
			position: [0, 0.2, 0],
			allowSleep: false,
			sleepSpeedLimit: 1,
			args: [0.22, 0.22, 0.22],
			material: {
				friction: 1,
				restitution: 1,
			},
			onCollide: (e) => {
				// roll(e.contact.impactVelocity);
			},
			...props,
		}));

		const prop = useSpring({
			position: hover ? [2.1, 0.1, 2.8] : [2.1, 0, 2.8],
		});

		useEffect(() => {
			document.body.style.cursor = hover ? "pointer" : "auto";
		}, [hover]);

		const rerollDice = () => {
			api.velocity.set(-5, -0.5, 0);
			api.angularVelocity.set(
				Math.floor(Math.random() * 10),
				Math.floor(Math.random() * 10),
				Math.floor(Math.random() * 10)
			);
			api.rotation.set(0, 0.2, 0.4);
			api.position.set(2, 1, 0);
		};

		return (
			<group
				onPointerOver={(e) => {
					e.stopPropagation() && setHover(true);
				}}
				onPointerOut={(e) => {
					e.stopPropagation() && setHover(false);
				}}
				onClick={(e) => {
					rerollDice() && setActive(!active);
				}}
				position={prop.position}
				castShadow
				receiveShadow
				scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
				ref={ref}
				dispose={null}
				{...props}
			>
				<group castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
					<group
						castShadow
						receiveShadow
						rotation={[Math.PI / 2, 0, 0]}
					>
						<group castShadow receiveShadow position={[2.34, 0, 0]}>
							<group
								castShadow
								receiveShadow
								position={[-2.33, -0.01, 0]}
								scale={[0.41, 0.41, 0.41]}
							>
								<mesh
									receiveShadow
									castShadow
									// scale={[0.3, 0.3, 0.3]}
									// ref={mesh}
									// onClick={(e) => setActive(!active)}
								>
									<boxBufferGeometry
										attach="geometry"
										args={[0.75, 0.75, 0.75]}
									/>
									<meshPhysicalMaterial
										attachArray="material"
										map={stir1}
										color={hovered ? "silver" : "white"}
									/>
									<meshPhysicalMaterial
										map={stir2}
										attachArray="material"
										color={hovered ? "silver" : "white"}
									/>
									<meshPhysicalMaterial
										map={stir3}
										attachArray="material"
										color={hovered ? "silver" : "white"}
									/>
									<meshPhysicalMaterial
										map={stir4}
										attachArray="material"
										color={hovered ? "silver" : "white"}
									/>
									<meshPhysicalMaterial
										map={stir5}
										attachArray="material"
										color={hovered ? "silver" : "white"}
									/>
									<meshPhysicalMaterial
										map={stir6}
										attachArray="material"
										color={hovered ? "silver" : "white"}
									/>
								</mesh>
							</group>
						</group>
					</group>
				</group>
			</group>
		);
	}

	// const dices = useStore((state) => state.dices);

	return (
		<>
			<Canvas
				// style={{ zIndex: 1 }}
				camera={{ position: [0, 20, 10], fov: 25 }}
				colorManagement
				// sRGB
				shadowMap
				gl={{ alpha: false }}
			>
				<color attach="background" args={["lightblue"]} />
				<hemisphereLight intensity={0.2} />
				{/* <spotLight
				position={[10, 10, 10]}
				angle={0.3}
				penumbra={1}
				intensity={2}
				castShadow
			/>  */}
				<directionalLight
					position={[-8, 20, 10]}
					shadow-camera-right={6}
					castShadow
				/>
				{/* <directionalLight
					position={[0, 10, 8]}
					castShadow
					penumbra={1}
					intensity={0.5}
				/> */}
				<OrbitControls />
				<Physics>
					<Suspense fallback={<HTML>Loading...</HTML>}>
						<Plane />
						{/* {dices.map((dice) => (
							<Dice key={dice.id} dice={dice} />
						))} */}
						<Cube position={[2, 0.25, 4]} />
						<Cube position={[1, 0.25, 4]} />
						<Cube position={[0, 0.25, 4]} />
						<Cube position={[-1, 0.25, 4]} />
						<Cube position={[-2, 0.25, 4]} />
					</Suspense>
				</Physics>
			</Canvas>
		</>
	);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useRef } from "react";
// import { Canvas, useFrame } from "react-three-fiber";

// function Box() {
// 	const mesh = useRef();
// 	useFrame(() => {
// 		mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
// 	});

// 	return (
// 		<mesh ref={mesh}>
// 			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
// 			<meshStandardMaterial attach="material" />
// 		</mesh>
// 	);
// }

// export default function Dice() {
// 	return (
// 		<Canvas colorManagement>
// 			<ambientLight intensity={0.2} />
// 			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
// 			<pointLight position={[-10, -10, -10]} />
// 			<Box />
// 		</Canvas>
// 	);
// }

// class Dice extends React.Component {
// 	componentDidMount() {
// 		let WIDTH = window.innerWidth;
// 		let HEIGHT = window.innerHeight;

// 		let renderer = new THREE.WebGLRenderer({ antialias: true });
// 		renderer.setSize(WIDTH, HEIGHT);
// 		renderer.setClearColor(0x808a9b, 1);
// 		document.body.appendChild(renderer.domElement);

// 		let scene = new THREE.Scene();

// 		// scene.background = new THREE.CubeTextureLoader()
// 		// 	.setPath("textures/")
// 		// 	.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

// 		let camera = new THREE.PerspectiveCamera(
// 			70,
// 			WIDTH / HEIGHT,
// 			0.1,
// 			10000
// 		);
// 		camera.position.z = 50;
// 		scene.add(camera);

// 		// let textureLoader = new THREE.CubeTextureLoader()
// 		// 	.setPath("textures/")
// 		// 	.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

// 		const loader = new THREE.TextureLoader();
// 		const stir = [
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/stir/").load("stir2.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/stir/").load("stir1.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/stir/")
// 					.load("two-direction.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/stir/").load("no-stir.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/stir/").load("compass.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/").load("your-choice.jpeg"),
// 			}),
// 		];
// 		const ratio = [
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/ratio/").load("12-200.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/ratio/").load("15-200.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/ratio/").load("15-250.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/ratio/").load("24-200.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/ratio/").load("30-200.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/").load("your-choice.jpeg"),
// 			}),
// 		];
// 		const temp = [
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/temperature/").load("75C.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/temperature/").load("80C.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/temperature/").load("85C.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/temperature/").load("90C.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/temperature/").load("95C.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/").load("your-choice.jpeg"),
// 			}),
// 		];
// 		const bloom = [
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/bloom/")
// 					.load("inverted-no-bloom.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/bloom/")
// 					.load("inverted-30-60.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/bloom/")
// 					.load("standard-no-bloom.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/bloom/")
// 					.load("inverted-30-30.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/bloom/")
// 					.load("standard-30-30.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/bloom/")
// 					.load("standard-30-60.jpeg"),
// 			}),
// 		];
// 		const grind = [
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/grind/").load("fine-60.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/grind/").load("coarse-4.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader
// 					.setPath("textures/grind/")
// 					.load("very-fine-30.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/grind/").load("med-fine-90.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/grind/").load("medium-120.jpeg"),
// 			}),
// 			new THREE.MeshStandardMaterial({
// 				map: loader.setPath("textures/").load("your-choice.jpeg"),
// 			}),
// 		];

// 		// let material = new THREE.MeshStandardMaterial({
// 		// 	color: 0xffffff,
// 		// 	envMap: textureLoader,
// 		// });

// 		let boxGeometry = new THREE.BoxGeometry(5, 5, 5);
// 		// let StandardMaterial = new THREE.MeshStandardMaterial({
// 		// 	color: 0xffffff,
// 		// });

// 		let cube = new THREE.Mesh(boxGeometry, stir);
// 		cube.position.x = -25;
// 		cube.rotation.set(0.4, 0.2, 0);
// 		scene.add(cube);

// 		let cube2 = new THREE.Mesh(boxGeometry, ratio);
// 		cube2.rotation.set(0.4, 0.2, 0);
// 		scene.add(cube2);

// 		let cube3 = new THREE.Mesh(boxGeometry, temp);
// 		cube3.position.x = 25;
// 		cube3.rotation.set(0.4, 0.2, 0);
// 		scene.add(cube3);

// 		let cube4 = new THREE.Mesh(boxGeometry, bloom);
// 		cube4.position.y = 25;
// 		cube4.rotation.set(0.4, 0.2, 0);
// 		scene.add(cube4);

// 		let cube5 = new THREE.Mesh(boxGeometry, grind);
// 		cube5.position.y = -25;
// 		cube5.rotation.set(0.4, 0.2, 0);
// 		scene.add(cube5);

// 		let ambient = new THREE.AmbientLight("#ffffff", 0.3);
// 		scene.add(ambient);

// 		let light = new THREE.SpotLight(0xefdfd5, 1.3);
// 		light.position.set(-10, 15, 50);
// 		light.castShadow = true;
// 		scene.add(light);

// 		let floorMaterial = new THREE.MeshPhongMaterial({
// 			color: "#00aa00",
// 			side: THREE.DoubleSide,
// 		});
// 		let floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
// 		let floor = new THREE.Mesh(floorGeometry, floorMaterial);
// 		floor.receiveShadow = true;
// 		floor.rotation.x = Math.PI / 2;
// 		scene.add(floor);

// 		let t = 0;
// 		function render() {
// 			t += 0.01;
// 			requestAnimationFrame(render);
// 			cube.rotation.y += 0.01;
// 			cube.rotation.x += 0.01;
// 			cube2.rotation.y += 0.01;
// 			cube2.rotation.x += 0.01;
// 			cube3.rotation.y += 0.01;
// 			cube3.rotation.x += 0.01;
// 			cube4.rotation.y += 0.01;
// 			cube4.rotation.x += 0.01;
// 			cube5.rotation.y += 0.01;
// 			cube5.rotation.x += 0.01;
// 			// cube2.rotation.z = Math.abs(Math.sin(t));
// 			// cube3.position.y = -7 * Math.sin(t * 2);
// 			// cube4.rotation.x += 0.01;
// 			// cube5.position.x = +7 * Math.sin(t * 2);
// 			renderer.render(scene, camera);
// 		}
// 		render();
// 	}

// 	render() {
// 		return (
// 			<>
// 				<div ref={(ref) => (this.mount = ref)} />;
// 			</>
// 		);
// 	}
// }

// export default Dice;
