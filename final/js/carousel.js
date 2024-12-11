document.addEventListener("DOMContentLoaded", () => {
    // Select carousel elements
    const carouselContainer = document.querySelector(".carousel-container");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    const totalSlides = document.querySelectorAll(".carousel-slide").length;

    // Debugging: Log elements
    console.log("Carousel Container:", carouselContainer);
    console.log("Previous Button:", prevButton);
    console.log("Next Button:", nextButton);
    console.log("Total Slides:", totalSlides);

    let currentIndex = 0;

    // Update the carousel position
    function updateCarousel() {
        const offset = -currentIndex * 100; // Calculate the translateX offset
        carouselContainer.style.transform = `translateX(${offset}%)`;
        carouselContainer.style.transition = "transform 0.5s ease-in-out";
        console.log(`Slide Changed: Index ${currentIndex}, Offset ${offset}%`);
    }

    // Event listener for the previous button
    prevButton.addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
        updateCarousel();
    });

    // Event listener for the next button
    nextButton.addEventListener("click", () => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });
});
