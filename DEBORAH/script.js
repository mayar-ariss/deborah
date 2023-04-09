const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const selectedImageContainer = document.getElementById("selected-image-container");
const selectedImage = document.getElementById("selectedImage");
const pin1 = document.getElementById("pin1");
const pin2 = document.getElementById("pin2");
let isDragging = false;

// Define an array of image filenames
const imageFilenames = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg"];

// Load two random images
loadRandomImages();

// Add event listeners for image clicks
image1.addEventListener("click", () => {
  image1.classList.add("selected");
  image2.classList.remove("selected");
  selectedImage.setAttribute("src", image1.src);
});

image2.addEventListener("click", () => {
  image2.classList.add("selected");
  image1.classList.remove("selected");
  selectedImage.setAttribute("src", image2.src);
});

// Add event listeners for mouse down and touch start events on pins
pin1.addEventListener("mousedown", startDragging);
pin1.addEventListener("touchstart", startDragging);
pin2.addEventListener("mousedown", startDragging);
pin2.addEventListener("touchstart", startDragging);

// Add event listeners for mouse move and touch move events on document
document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag);

// Add event listeners for mouse up and touch end events on document
document.addEventListener("mouseup", stopDragging);
document.addEventListener("touchend", stopDragging);

function startDragging(event) {
    isDragging = true;
    pin = event.currentTarget;
    event.preventDefault();
  }
  
function drag(event) {
    if (isDragging) {
      const boundingRect = selectedImage.getBoundingClientRect();
      let x, y;
  
      if (event.type === "touchmove") {
        x = event.touches[0].clientX - boundingRect.left;
        y = event.touches[0].clientY - boundingRect.top;
      } else {
        x = event.clientX - boundingRect.left;
        y = event.clientY - boundingRect.top;
      }
  
      const pin = event.target;
      const offsetX = pin.offsetWidth / 2;
      const offsetY = pin.offsetHeight / 2;
      const maxX = boundingRect.width - offsetX;
      const maxY = boundingRect.height - offsetY;
      const minX = -offsetX;
      const minY = -offsetY;
      const clampedX = Math.min(Math.max(x - offsetX, minX), maxX);
      const clampedY = Math.min(Math.max(y - offsetY, minY), maxY);
      
      // Use requestAnimationFrame to update pin position
      requestAnimationFrame(() => {
        pin.style.left = `${clampedX}px`;
        pin.style.top = `${clampedY}px`;
      });
    }
  }
  
function stopDragging() {
  isDragging = false;
}

function loadRandomImages() {
  // Shuffle the image filenames array
  shuffleArray(imageFilenames);

  // Set the source of image1 to the first element of the shuffled array
  image1.src = './images/' + imageFilenames[0];

  // Set the source of image2 to the second element of the shuffled array
  image2.src = './images/' + imageFilenames[1];
}

// Shuffle an array using the Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
