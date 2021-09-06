const InsectGame = {
  screens: document.querySelectorAll('.screen'),
  choose_insect_btns: document.querySelectorAll('.choose-insect-btn'),
  start_btn: document.getElementById('start-btn'),
  game_container: document.getElementById('game-container'),
  timeEl: document.getElementById('time'),
  scoreEl: document.getElementById('score'),
  messageEl: document.getElementById('message'),

  seconds: 0,
  score: 0,
  selected_insect: {},

  startGame: () => setInterval(InsectGame.increaseTime, 1000),
  changeScene: scene => InsectGame.screens[scene].classList.add('up'),

  getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
  
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
  
    return { x, y }
  },

  increaseTime() {
    let m = Math.floor(InsectGame.seconds / 60)
    let s = InsectGame.seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    InsectGame.timeEl.innerHTML = `Time: ${m}:${s}`
    InsectGame.seconds++
  },

  increaseScore() {
    InsectGame.score++
    if(InsectGame.score > 19) {
      InsectGame.messageEl.classList.add('visible')
    }
    InsectGame.scoreEl.innerHTML = `Score: ${InsectGame.score}`
  },

  catchInsect(insect) {
    InsectGame.increaseScore()
    insect.classList.add('caught')
    setTimeout(() => insect.remove(), 2000)
    InsectGame.addInsects()
  },

  addInsects() {
    setTimeout(InsectGame.createInsect, 1000)
    setTimeout(InsectGame.createInsect, 1500)
  },

  selectInsect(btn) {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img')
      const src = img.getAttribute('src')
      const alt = img.getAttribute('alt')
  
      selected_insect = { src, alt }
      InsectGame.changeScene(1)
      setTimeout(InsectGame.createInsect, 1000)
      InsectGame.startGame()
    })
  },

  createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = InsectGame.getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`
  
    insect.addEventListener('click', () => InsectGame.catchInsect(insect))
    
    InsectGame.game_container.appendChild(insect)
  },

  start() {
    InsectGame.start_btn.addEventListener('click', () => InsectGame.changeScene(0))
    InsectGame.choose_insect_btns.forEach(btn => InsectGame.selectInsect(btn))
  }
}

InsectGame.start()