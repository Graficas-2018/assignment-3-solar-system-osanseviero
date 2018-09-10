/*
 * Configuration of solay system. In the high level, sun and planets are
 * configured. For planets, they can have moons and rings. Moons require the
 * position relative to the planet, the radius, and the number of days to
 * rotate on its own axis.
 * 
 * Planets rotate in their own axis and around the sun based on 
 * https://www.exploratorium.edu/ronh/age/. The orbitRadius is not accurate
 * so we can see the planets. The radius of all planets is in a proportion of
 * 1 to 10K kilometers. The sun was made noticeably smaller and Pluto was made
 * slighly bigger. Rings require an inner and outter radius.
 */

let astros = {
	sun: {
        textureUrl: "../images/sunmap.jpg",
        radius: 20.85,   // 20.85 * 10k km. Downscaled by 3 so other planets can be seen 
        rotationDays: 200
    },
    mercury: {
        textureUrl: "../images/mercurymap.jpg",
    	bumpMapUrl: "../images/mercurybump.jpg",
        radius: 0.2440, //.2440 * 10K km
        rotationDays: 58.6,
        orbitDays: 87.97,
        orbitRadius: 30
    },
    venus: {
        textureUrl: "../images/venusmap.jpg",
        bumpMapUrl: "../images/venusbump.jpg",
        radius: 0.6052, //.6052* 10K km
        rotationDays: 243,
        orbitDays: 224.7,
        orbitRadius: 40
    },
    earth: {
        textureUrl: "../images/earthmap.jpg",
        bumpMapUrl: "../images/earthbump1k.jpg",
        radius: 0.6371, //.6371* 10K km,
        rotationDays: 1,
        orbitDays: 365,
        orbitRadius: 60,
        moons: [
            [5, 0, 0, 0.1737, 5]
        ]
    },
    mars: {
        textureUrl: "../images/marsmap.jpg",
        bumpMapUrl: "../images/marsbump1k.jpg",
        radius: 0.3390, //.3390* 10K km
        rotationDays: 1.03,
        orbitDays: 686.2,
        orbitRadius: 75,
        moons: [
            [3, 0, 0, 0.1, 5],
            [-3, 0, 5, 0.1, 5],
        ]
    },
    jupiter: {
        textureUrl: "../images/jupitermap.jpg",
        radius: 6.99, //69K km
        rotationDays: 0.41,
        orbitDays: 4328.9,
        orbitRadius: 100,
        moons: [
            [2, 0, 0, 0.1, 10],
            [0, -2, -1, 0.1, 5],
            [0, 1, 1.4, 0.17, 15],
            [0.7, 1, 1.4, 0.2, 20],
            [0.7, -1.4, 1.4, 0.1, 0.5],
            [0.7, 0.4, -1, 0.05, 5],
            [-2, 0.4, 0, 0.1, 3],
        ],
    },
    saturn: {
        textureUrl: "../images/saturnmap.jpg",
        radius: 5.82, //58.2K km
        rotationDays: 0.45,
        orbitDays: 10752.9,
        orbitRadius: 150,
        moons: [
            [1.5, 0, 0, 0.01, 10],
            [-1.5, 0, 0, 0.01, 10],
            [1.5, 0, 1.5, 0.01, 10],
            [0.7, 0.7, 0.7, 0.01, 10],
            [-0.7, -0.7, -0.7, 0.1, 0.3],
            [-1, -1, 0, 0.01, 5],
            [0, 1.5, 1, 0.1, 10],
        ],
        ring: {
            textureUrl: "../images/saturnringcolor.jpg",
            insideRadius: 1.5,
            outsideRadius: 1.75,
            initialRotation: [180, 0, 0]
        }
    },
    uranus: {
        textureUrl: "../images/uranusmap.jpg",
        radius: 2.53, //25.3K km,
        rotationDays: 0.72,
        orbitDays: 30660,
        orbitRadius: 200,
        moons: [
            [1.5, 0, 0, 0.01, 5],
            [-1.5, 0, 0, 0.05, 10],
            [1.5, 0, 1.5, 0.05, 7],
            [0.7, 0.7, 0.7, 0.1, 33],
            [-0.7, -0.7, -0.7, 0.01, 8],
        ],
        ring: {
            textureUrl: "../images/uranusringcolor.jpg",
            insideRadius: 1.5,
            outsideRadius: 2,
            initialRotation: [25, 25, 0]
        }
    },
    neptune: {
        textureUrl: "../images/neptunemap.jpg",
        radius: 2.46, //24.6K km
        rotationDays: 0.67,
        orbitDays: 60148.35,
        orbitRadius: 250,
        moons: [
            [1.5, 0, 0, 0.1, 5],
            [-1.5, 0, 0, 0.1, 10],
            [1.5, 0, 1.5, 0.1, 2],
            [0.7, 0.7, 0.7, 0.13, 5],
            [-0.7, -0.7, -0.7, 0.05, 3],
        ]
    },
    pluto: {
        textureUrl: "../images/plutomap.jpg",
        bumpMapUrl: "../images/plutobump.jpg",
        radius: 0.2440, // Upscaled so it can be seen
        rotationDays: 6.39,
        orbitDays: 90735.35,
        orbitRadius: 280,
        moons: [
            [1.5, 0, 0, 0.1, 5],
            [-1.5, 0, 0, 0.05, 10],
        ]
    },
}