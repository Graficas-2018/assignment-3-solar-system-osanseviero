/* Solar system scene creator
*/

let camera;
let mainGroup;
let renderer = null;
let scene;
let speed = 10;
let backgroundSphere;

/*
 * Calculate how many radians to rotate the astro body in each animate call.
 * The function uses Earth days to know how long to rotate. It assumes 60
 * frames per second, which is not accurate. A maximum speed is assigned so
 * moons are visible in planets that rotate really fast. A 10x speed is used.
 */
function getRadiansForRotation(days) {
    // Frames per second is not accurate
    framesPerSec = 60;

    // Get rotational speed using 10x speed.
    rotationalSpeed = (2 * Math.PI) / (days/10);
    return Math.min((rotationalSpeed)/framesPerSec, 0.1);
}

/*
 * Animates the planets and moons.
 *
 * Planets rotate around the sun. The positions are calculated directly
 * according to the orbit radius. The speed is proportional to the actual
 * number of days it takes to rotate around the sun. For example, Mars will
 * take almost double time than the Earth and Mercury will take 4 times less.
 *
 * Rotation in the same axis is also calculated based on the real number of
 * hours every planet takes, but a maximum was setted up so planets don't
 * rotate too fast and we can see the moons.
 */
function animate(element) {
    // Rotate objects with names (planets and sun)
    if(astros[element.name]) {
        // Check that there's a number of rotation days
        if(astros[element.name].rotationDays) {
            element.rotation.y += getRadiansForRotation(astros[element.name].rotationDays);
            // Only rotate planets around sun
            if(element.name !== "sun") {
                let date = Date.now() * 0.1;
                let orbitDays = astros[element.name].orbitDays;
                let orbitRadius = astros[element.name].orbitRadius;

                // Set position based on the number of days and radiu
                element.position.set(
                    Math.cos(date/orbitDays) * orbitRadius,
                    0,
                    Math.sin(date/orbitDays) * orbitRadius
                );

                // Rotate moons and rings.
                for(let child in element.children) {
                    // Check if it's a moon
                    if(astros[element.name].moons[child]) {
                        let rotationDays = [4];
                        element.children[child].rotation.y += getRadiansForRotation(rotationDays);
                    }
                    else {
                        element.children[child].rotation.z += Math.PI/128;
                    }
                }
            }
        }
    }
    // Rotate children (for main group)
    for(let child of element.children){
        animate(child);
    }
}

/*
 * Creates a big astro body (planets and sun).
 */
function createBody(astro, name) {
    // Create geometry
    let geometry = new THREE.SphereGeometry(1, 30, 30);

    // Load texture
    let textureMap = new THREE.TextureLoader().load(astro.textureUrl);
    astro.material = new THREE.MeshBasicMaterial({map: textureMap});

    // Create mesh object and put it in position
    let body = new THREE.Mesh(geometry, astro.material);
    body.scale.set(astro.radius, astro.radius, astro.radius);
    body.name = name;

    // Add moons
    if(astro.moons) {
        for(let moon in astro.moons) {
            let config = astro.moons[moon];

            // Create object based on configuration
            let new_moon = createMoon(config[3]);

            // Set position relative to planet
            new_moon.position.set(config[0], config[1], config[2]);
            body.add(new_moon);
        }
    }

    // Add rings
    if(astro.ring) {
        let ring = createRing(astro.ring);
        ring.rotation.x += astro.ring.initialRotation[0];
        ring.rotation.y += astro.ring.initialRotation[1];
        ring.rotation.z += astro.ring.initialRotation[2];
        body.add(ring)
    }

    // Add orbit indicator to planets
    if(astro.orbitRadius) {
        let lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
        let lineGeometry = new THREE.CircleGeometry(astro.orbitRadius, 64);
        lineGeometry.vertices.shift();
        let orbit = new THREE.LineLoop(lineGeometry, lineMaterial);
        orbit.rotation.x = Math.PI / 2;
        mainGroup.add(orbit);
    }
    mainGroup.add(body);
}

/*
 * Creates a moon object based on its radius. All moons use same map.
 */
function createMoon(radius) {
    // Create geometry
    let geometry = new THREE.SphereGeometry(1, 20, 20);

    // Create material
    let textureMap = new THREE.TextureLoader().load("../images/moonmap.jpg");
    let material = new THREE.MeshBasicMaterial({map: textureMap});

    let body = new THREE.Mesh(geometry, material);
    body.scale.set(radius, radius, radius);
    return body;
}

/*
 * Creates a ring. The rings have an inside and outside radius.
 * Different planets have different ring configurations.
 */
function createRing(ringConfig) {
    // Create geometry
    let geometry = new THREE.RingGeometry(ringConfig.insideRadius, ringConfig.outsideRadius, 30);

    // Create material
    let textureMap = new THREE.TextureLoader().load(ringConfig.textureUrl);
    let material = new THREE.MeshBasicMaterial({map: textureMap, side: THREE.DoubleSide});

    let body = new THREE.Mesh(geometry, material);
    return body;
}

/*
 * Loads an OBJ with an asteroid and calls a callback function. Since we're
 * using multiple asteroids, we can just load the asteroid object once and
 * create clones. The asteroids parameter is the number of asteroids, so use
 * carefully since it consumes more resources.
 */
function loadAsteroidObj(callback, innerDistance, outerDistance, asteroids) {
    var loader = new THREE.OBJLoader();
    loader.load(
        // resource URL
        "models/asteroidOBJ.obj",
        function(object) {
            callback(innerDistance, outerDistance, asteroids, object)
        }
    );
}

/*
 * Creates the asteroid field from an inside distance to an outside distance.
 */
function createAsteroidField(innerDistance, outerDistance, asteroids, object) {
    for(let i=0; i < asteroids; i++) {
        // Create new asteroid
        let asteroid =  object.children[0].clone();

        // Calculate a random position between inner distance and outer distance
        let distance = Math.random() * (outerDistance - innerDistance) + innerDistance;

        // Calculate position in x and y. y position is random
        asteroid.position.x = Math.cos(i) * distance;
        asteroid.position.y = Math.random() * 2 -1;
        asteroid.position.z = Math.sin(i) * distance;

        // Make small scale so objects are visible
        asteroid.scale.set(0.0005, 0.0005, 0.0005);
        mainGroup.children[1].add(asteroid);
    }
}

/*
 * Creates a sphere background so it can be moved.
 */
function setupBackground() {
    // Setup background
    backgroundSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1500,100,100),
        new THREE.MeshBasicMaterial({
            map: (new THREE.TextureLoader).load("../images/spacemap.jpg"),
            side: THREE.DoubleSide
        })
    );
    mainGroup.add(backgroundSphere);
}

/*
 * Creates the scene
 */
function createScene(canvas) {
    // Setup renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);

    // Setup scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.3, 0.3, 0.3);

    // Setup camera
    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 1, 4000);
    camera.position.z = 150;
    scene.add(camera);

    // Create main group
    mainGroup = new THREE.Object3D;

    // Configure light based on the sun
    let light = new THREE.PointLight(0x0000ff, 1, 20);
    light.position.set(astros.sun.position);
    mainGroup.add(light)

    // Create bodies.
    for(var astro in astros) {
        let body = createBody(astros[astro], astro);
    }

    // Create background
    setupBackground();

    // Load asteroid object
    loadAsteroidObj(createAsteroidField, 3.8, 4.4, 250); // Main belt
    loadAsteroidObj(createAsteroidField, 13, 20, 250);   // kuiper belt

    // Add group to scene
    scene.add(mainGroup);
}

function run() {
    requestAnimationFrame(function() {
        run();
    })
    animate(mainGroup);
    renderer.render(scene, camera);
}