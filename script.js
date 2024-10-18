let sunPosition = { x: 0, y: 0 };
let sunDiameter = 80;
let waveOffset = 0; // Offset for wave animation
let seasonIndex = 0; // To track current season
const seasons = ["spring", "autumn", "winter", "summer"]; // Array of seasons
let snowflakes = []; // Array to store snowflakes
let sunSpeed = 2; // Initial speed of the sun
const speedIncrement = 1; // Amount to increase speed with each click

function setup() {
    createCanvas(windowWidth, windowHeight);
    sunPosition.x = 0; // Start position for the sun
    sunPosition.y = height / 6; // Initial position for the sun (height)
    noStroke();

    // Create initial snowflakes
    for (let i = 0; i < 100; i++) {
        snowflakes.push({
            x: random(width),
            y: random(-height, 0),
            size: random(2, 5)
        });
    }
}

function draw() {
    // Set background color based on the current season
    background(135, 206, 250); // Light blue for day

    // Draw mountains behind everything
    drawMountains();

    // Update and draw the sun with a glow effect
    drawSun();

    // Draw seasonal effects
    drawSeasonalEffects();

    // Draw the river
    drawRiver(); 
}

function drawSun() {
    // Draw the glow effect using a smaller, blended ellipse
    fill(255, 204, 0, 80); // Soft yellow color with reduced opacity
    ellipse(sunPosition.x, sunPosition.y, sunDiameter * 1.5, sunDiameter * 1.5); // Smaller ellipse for glow

    // Draw the sun
    fill(255, 204, 0); // Soft yellow color for the sun
    let jitter = random(-1, 1);
    ellipse(sunPosition.x, sunPosition.y + jitter, sunDiameter + jitter, sunDiameter + jitter); // Jittering sun

    // Move the sun to the right
    sunPosition.x += sunSpeed; // Move from left to right

    // Reset sun position when it goes off screen and change season
    if (sunPosition.x > width) {
        sunPosition.x = -sunDiameter; // Reset to start from left
        seasonIndex = (seasonIndex + 1) % seasons.length; // Move to the next season
    }
}

function drawSeasonalEffects() {
    if (seasons[seasonIndex] === "winter") {
        // Draw snowflakes
        drawSnow();
    } else if (seasons[seasonIndex] === "autumn") {
        // Wind effect (change background or add effects)
        fill(255, 140, 0, 100); // Semi-transparent orange for wind
        rect(0, 0, width, height); // Overlay for wind
    } else if (seasons[seasonIndex] === "spring") {
        // Wind effect
        fill(144, 238, 144, 100); // Semi-transparent green for wind
        rect(0, 0, width, height); // Overlay for wind
    }
}

function drawSnow() {
    fill(255); // White color for snowflakes
    for (let flake of snowflakes) {
        ellipse(flake.x, flake.y, flake.size); // Draw each snowflake

        // Update snowflake position
        flake.y += flake.size; // Fall speed based on size

        // Reset snowflake to top if it falls off the screen
        if (flake.y > height) {
            flake.y = random(-100, 0); // Reset to a random position above
            flake.x = random(width); // Random horizontal position
        }
    }
}

function drawRiver() {
    let riverY = height / 1.5; // Set river's vertical position
    let waveFrequency = 0.05; // Control the wave frequency

    // Draw base of river
    for (let x = 0; x <= width; x += 10) {
        let y = riverY + 10 * sin((x * waveFrequency) + waveOffset); // Reduced wavy effect
        fill(0, 153, 255, 200); // Soft blue for the river
        beginShape();
        vertex(x, height);
        vertex(x, y);
        vertex(x + 10, y);
        vertex(x + 10, height);
        endShape(CLOSE);
    }

    // Draw subtle reflective wave effect
    for (let x = 0; x <= width; x += 15) {
        let waveY = riverY + 5 * sin((x * waveFrequency) + waveOffset + HALF_PI);
        fill(255, 255, 255, 100); // Light color for reflection
        ellipse(x, waveY + 2, 15, 5); // Reflective circles
    }

    // Update wave offset for animation
    waveOffset += 0.05; // Slow down wave motion
}

function drawMountains() {
    // Draw mountains in the background
    fill(100, 100, 100); // Dark gray for far mountains
    beginShape();
    vertex(0, height / 2);
    vertex(width * 0.25, height / 3);
    vertex(width * 0.5, height / 2);
    vertex(width * 0.75, height / 3.5);
    vertex(width, height / 2);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    fill(150, 150, 150); // Lighter gray for closer mountains
    beginShape();
    vertex(0, height / 1.8);
    vertex(width * 0.2, height / 2.5);
    vertex(width * 0.4, height / 2);
    vertex(width * 0.6, height / 2.8);
    vertex(width * 0.8, height / 2.2);
    vertex(width, height / 1.8);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function mousePressed() {
    // Check if mouse is clicked on the river (y-position for the river)
    let riverY = height / 1.5; // Set river's vertical position
    if (mouseY > riverY - 20 && mouseY < riverY + 20) {
        sunSpeed += speedIncrement; // Increase the speed of the sun
        console.log("Sun speed:", sunSpeed); // Debugging line to check speed
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
