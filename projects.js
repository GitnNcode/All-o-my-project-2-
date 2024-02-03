const track = document.querySelector('.carousel_track')
const slides = Array.from(track.children)
const nextButton = document.querySelector(".carousel_button-right")
const prevButton = document.querySelector(".carousel_button-left")
const dotsNav = document.querySelector(".carousel_nav")
const dots = Array.from(dotsNav.children)

const slideSize = slides[0].getBoundingClientRect()
const slideWidth = slideSize.width*1.5
const spacing = 20

for(i in slides){
    slides[i].style.left = (slideWidth*i) + "px";
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left +")"
    currentSlide.classList.remove("current-slide")
    targetSlide.classList.add("current-slide")
    //document.write(targetSlide.style.left)
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide")
    targetDot.classList.add("current-slide")
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add("is-hidden")
        nextButton.classList.remove("is-hidden")
    }else if (targetIndex === slides.length - 1){
        prevButton.classList.remove("is-hidden")
        nextButton.classList.add("is-hidden")
    }else{
        prevButton.classList.remove("is-hidden")
        nextButton.classList.remove("is-hidden")
    }
}

prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide")
    const prevSlide = currentSlide.previousElementSibling
    console.log(currentSlide,prevSlide)
    moveToSlide(track, currentSlide, prevSlide)

    const currentDot = dotsNav.querySelector(".current-slide")
    const prevDot = currentDot.previousElementSibling
    updateDots(currentDot, prevDot)

    const prevIndex = slides.findIndex(slide => slide === prevSlide)
    hideShowArrows(slides, prevButton, nextButton, prevIndex)
})


nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide")
    const nextSlide = currentSlide.nextElementSibling
    moveToSlide(track, currentSlide, nextSlide)

    const currentDot = dotsNav.querySelector(".current-slide")
    const nextDot = currentDot.nextElementSibling
    updateDots(currentDot, nextDot)

    const nextIndex = slides.findIndex(slide => slide === nextSlide)
    hideShowArrows(slides, prevButton, nextButton, nextIndex)
})

dotsNav.addEventListener("click", e =>{
    const targetDot = e.target.closest("button")

    if(!targetDot) return

    const currentSlide = track.querySelector(".current-slide")
    const currentDot = dotsNav.querySelector(".current-slide")
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot)

    hideShowArrows(slides, prevButton, nextButton, targetIndex)
})