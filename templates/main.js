const ruffle = window.RufflePlayer.newest();
const player = ruffle.createPlayer();
const container = document.querySelector("body");
container.appendChild(player);
player.ruffle().load($ruffle);
