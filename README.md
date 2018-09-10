# Assignment 3 SolarSystem

Assignment No 3 for the computer graphics course. Using three.js, create a solar system

Rubric:

- Create 8 planets (and pluto), with their respective moons, the sun, and the asteroid field.
- The planets and moons can be created as spheres.
- EXTRA: For the asteroids, and some of the moons, investigate how to load the geometry from an obj or json file.
- Planets and moons must have their own rotation.
- The moons have to rotate around the planets, and the planets have to rotate around the sun.
- Planets, and their orbits, must have scale that showcases the differences between the planets.
- Draw the orbit that each planet follows.
- Each element must have its own materials, with textures, and normal or bump maps.
- Most textures can be found here: http://planetpixelemporium.com/
- The rotation of the system has to be controlled with the left mouse button, while the panning has to be controlled with the right mouse button. Scale of the scene can be controlled as in the examples.

Checklist
- Planets created with their own textures, rotation speeds, and sizes.
- Variable size moons in the corresponding planets.
- Rings with own rotation for Saturn and Uranus.
- Planets rotate around sun and moons around planets.
- Add rotating background.
- Add handling rotation and translation in x and y axis, plus scaling with slider.
- Load obj file for asteroid fields. Use callback to only load it once and then create clones.
- Add orbit indicator showing path.
- Add correct light.
- Change time with scrolling