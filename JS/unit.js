// Если требуется изменение текста слогана после определенного времени
setTimeout(function() {
  document.getElementById('animated-slogan').innerHTML = 'Познание Земли. Рост будущего.';
}, 5000); // Через 5 секунд изменится текст слогана

function explore() {
  var researchInfo = document.getElementById("researchInfo");
  researchInfo.style.display = "block";
}

// JavaScript для реализации карусели


document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;

  function showSlide(index) {
    const newPosition = -index * 100 + '%';
    carousel.style.transform = 'translateX(' + newPosition + ')';
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    showSlide(currentIndex);
  }

  setInterval(nextSlide, 5000); // Переключение слайдов каждые 5 секунд
});

// Кнопка "вход"
function toggleModal() {
  const modal = document.getElementById('loginModal');
  modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}
function login(event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Example authentication logic
  if (username === 'secretpage' && password === 'boom') {
      // Redirect to another page
      window.open('congratulations.html', '_blank');
            // Close the login modal if needed
            const modal = document.getElementById('loginModal');
            modal.style.display = 'none';
        } else {
            alert('Упс... Неправильно(');
        }
}
// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('loginModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};








