document,addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gamedisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')


    let birdleft = 220
    let birdbottom = 100
    let gravity = 2
    let isGameOver = false
    let gap=440


    function startgame()
    {
        birdbottom -= gravity
        bird.style.bottom = birdbottom +'px'
        bird.style.left = birdleft +'px'


    }


    let gametimerId = setInterval(startgame, 20)

    function control(e) {
        if(e.keyCode === 32)
        {
            jump()
        }
    }
    function jump() {
        if(birdbottom < 500) birdbottom += 50
        bird.style.bottom = birdbottom + 'px'
        console.log(birdbottom)
    }

    document.addEventListener('keyup', control)


function generateobstacles() {
    let obstacleleft = 500
    let randomheight = Math.random() * 60
    let obstaclebottom = randomheight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if (!isGameOver) {
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')
    }
    gamedisplay.appendChild(obstacle)
    gamedisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleleft + 'px'
    topObstacle.style.left = obstacleleft + 'px'
    obstacle.style.bottom = obstaclebottom + 'px'
    topObstacle.style.bottom = obstaclebottom + gap + 'px'

    function moveObstacle()
    {
        obstacleleft -= 2
        obstacle.style.left=obstacleleft+'px'
        topObstacle.style.left = obstacleleft + 'px'
        if(obstacleleft === -60)
        {
            clearInterval(timerId)
            gamedisplay.removeChild(obstacle)
            gamedisplay.removeChild(topObstacle)

        }

        if(
            obstacleleft > 200 && obstacleleft < 280 && birdleft === 220 &&
            birdbottom < obstaclebottom + 153 || birdbottom > obstaclebottom + gap - 200 ||
            birdbottom === 0)
        {
            gameover()
            clearInterval(timerId)
        }
    }

    let timerId = setInterval(moveObstacle , 20)
    if(!isGameOver) setTimeout(generateobstacles, 3000)
}

generateobstacles()

function gameover()
{
    clearInterval(gametimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('keyup',control) 
}

})