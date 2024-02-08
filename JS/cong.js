// JS для добавления класса visible и запуска анимации
document.addEventListener("DOMContentLoaded", function() {
  var element = document.getElementById("congratulations");
  element.classList.add("visible");
});

document.addEventListener('mousemove', function(e) {
  const distortion = document.querySelector('.distortion');
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const offsetX = 0.5 - mouseX / width;
  const offsetY = 0.5 - mouseY / height;
  const transformValue = `
    translate(${offsetX * 30}px, ${offsetY * 20}px)
    scale(1.1)
  `; // Можно настроить смещение и масштаб искажения
  distortion.style.transform = transformValue;
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('nav-text') && event.target.textContent === 'BOOM') {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');
    document.body.appendChild(explosion);

    setTimeout(function() {
      explosion.remove();
    }, 500); // Удалить взрыв через 0.5 секунды
  }
});

