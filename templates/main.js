const ruffle = window.RufflePlayer.newest();
const player = ruffle.createPlayer();
const container = document.querySelector("body");
player.style.width = "100%";
player.style.height = "100%";
container.appendChild(player);
player.ruffle().load($ruffle);
