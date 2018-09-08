let renderer = null;
let scene;
let camera;
var mainGroup;

let astros = {
	sun: {
        textureUrl: "../images/sunmap.jpg",
        position: [0, 0, 0],
        radius: 0.5,
        rotation: 0.01,
    },
}

function createBody(parentGroup, bodyJson) {
	createMaterial(bodyJson);
	let geometry = new THREE.SphereGeometry(1, 20, 20);
	var body = new THREE.Mesh(geometry, bodyJson.material);
	body.scale.set(bodyJson.radius, bodyJson.radius, bodyJson.radius);

	let group = new THREE.Object3D;
	group.position.set(...astros.sun.position);
	body.position.set(...astros.sun.position);
	group.add(body);
	parentGroup.add(group);
	return parentGroup;
}


function createScene(canvas) {
	// Setup renderer
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
	renderer.setSize(canvas.width, canvas.height);

	// Setup scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0.3, 0.3, 0.3);

	// Setup camera
    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 1, 4000);
    camera.position.z = 10;
    scene.add(camera);

    // Create main group
    mainGroup = new THREE.Object3D;

    // Configure light
    let light = new THREE.PointLight(0x0000ff, 1, 20);
    light.position.set(astros.sun.position);
    mainGroup.add(light)

    // Create geometry
	let geometry = new THREE.SphereGeometry(1, 20, 20);

	// Load Texture
	let textureMap = new THREE.TextureLoader().load(astros.sun.textureUrl);
	astros.sun.material = new THREE.MeshPhongMaterial({map: textureMap});

	// Create mesh object and put it in position
	var body = new THREE.Mesh(geometry, astros.sun.material);
	body.position.set(...astros.sun.position);

	// Add sun mesh to group
	mainGroup.add(body);
	console.log(mainGroup);

	// Add group to scene
    scene.add(mainGroup)

}

function run() {
	requestAnimationFrame(function() {
		run();
	})

	renderer.render(scene, camera);

	//animate();
}