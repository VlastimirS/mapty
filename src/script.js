import "./sass/main.scss"

const container = document.querySelectorAll(".observer")

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toogle("show", entry.isIntersecting)
  })
})

container.forEach((observer) => {
  observer.observe()
})
