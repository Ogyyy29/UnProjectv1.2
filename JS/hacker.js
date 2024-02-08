const outputElement = document.getElementById('output');

const text = [
  "Accessing mainframe...",
  "Bypassing firewall...",
  "Cracking encryption...",
  "Downloading data...",
  "Uploading virus...",
  "Executing code...",
  "Hack https://vk.com/nikita.obelchikov...",
  "Uploading virus...",
  "Finding Passwords...",
  "Finding Passwords...",
  "Finding Passwords...",
  "Finding Passwords...",
  "Good luck...password found...",
  "Loading messanges...",
  "Loading messanges...",
  "Loading messanges...",
  "Messages loaded...",
  "Uploading photos to Pornhub...",
  "Uploading photos to Pornhub...",
  "Uploading photos to Pornhub...",
  "Photos uploaded to Pornhub...",
  "Hacking Nikita Obelchinov's device...",
  "Hacking Nikita Obelchinov's device...",
  "Hacking Nikita Obelchinov's device...",
  "Hacking Nikita Obelchinov's device...",
  "Hacking Nikita Obelchinov's device...",
  "Hacking Nikita Obelchinov's device...",
  "Nudes found...",
  "Brazzers subscription completed...",
  "The program can't handle ittTTTttttT...",
  "Слишком много голых фото...",
  "Слишком много голых фото...",
  "Система не выдерживает...",
  "Сбой в системЕеЕЕЕЕЕЕ................",
  "..................",
  "..................",
  "Система была отключена..................",
  "Система была отключена..................",
  "Система была отключена..................",
  "..................",
  "..................",
  "..................",
];

function simulateHacking(index) {
  if (index >= text.length) {
    return;
  }

  setTimeout(() => {
    outputElement.textContent += text[index] + '\n';
    outputElement.scrollTop = outputElement.scrollHeight;
    simulateHacking(index + 1);
  }, Math.random() * 1500 + 500); // Random delay between 500ms and 2000ms
}

simulateHacking(0);