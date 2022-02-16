// setting up game window
const canvas = document.getElementById('game-canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

// setting card size relative to screen size
const card_width = innerWidth / 17;
const card_height = card_width * 1.38;
console.log(card_width)
console.log(card_height)
hoverColor = 'yellow'
clickedColor = 'lime'
backColor = 'saddlebrown'
enlargeSize = innerWidth / 6
outlineSize = 1

// document.body.style.backgroundImage = 'url(Wood_Background.jpg)' 
document.body.style.backgroundColor = backColor


// method for loading in images
function newImage(src)
{
    var img = new Image()
    img.src = 'Gub Pics/Final/' + src
    return img
}
const gub = newImage('Gub.png')
const ageOldCure = newImage('Age_Old_Cure.png')
const blindfold = newImage('Blindfold.png')
const cricketSong = newImage('Cricket_Song.png')
const cyclone = newImage('Cyclone.png')
const dangerousAlchemy = newImage('Dangerous Alchemy.png')
const doubleRing = newImage('Double_Ring.png')
const esteemedElder = newImage('Esteemed_Elder.png')
const feather = newImage('Feather.png')
const flashFlood = newImage('Flash_Flood.png')
const flopBoat = newImage('Flop_Boat.png')
const gargokPlague = newImage('Gargok_Plague.png')
const hakiFlute = newImage('Haki_Flute.png')
const G = newImage('Letter_G.png')
const U = newImage('Letter_U.png')
const B = newImage('Letter_B.png')
const lightning = newImage('Lightning.png')
const lure = newImage('Lure.png')
const mushroom = newImage('Mushroom.png')
const retreat = newImage('Retreat.png')
const rumourOfWasps= newImage('Rumour_of_Wasps.png')
const scout = newImage('Scout.png')
const singleRing = newImage('Single_Ring.png')
const smahlThief = newImage('Smahl_Thief.png')
const spear = newImage('Spear.png')
const sudSpout = newImage('Sud_Spout.png')
const superLure = newImage('Super_Lure.png')
const toadRider = newImage('Toad_Rider.png')
const travelingMerchant = newImage('Traveling_Merchant.png')
const tripleRing = newImage('Triple_Ring.png')
const velvetMoth = newImage('Velvet_Moth.png')
const gubCursor = newImage('Gub_Cursor.png')
const cardBack = newImage('Card_Back.jpg')

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
  }

// card class
// holds a cards image and position
class Card
{
    isHover = false;
    isDragging = false;
    dx = 0;
    dy = 0;
    constructor(image, x = card_width, y = card_height)
    {
        this.x = x
        this.y = y
        this.image = image
        this.color = 'chocolate'
    }
    
    //draw card to the screen
    draw()
    {
        if (this.isHover)
        {
            c.beginPath()
            // c.rect(this.x - 2, this.y - 2, card_width + 4, card_height + 4);
            // c.rect(this.x, this.y, card_width, card_height)
            roundedRect(c, this.x - (1 / outlineSize), this.y - (1 / outlineSize), card_width + 2 * (1 / outlineSize), card_height + 2 * (1 / outlineSize), 7)
            c.fillStyle = this.color
            c.strokeStyle = backColor
            c.fill()
            c.stroke()
        }

        c.drawImage(this.image, this.x, this.y, card_width, card_height)
    }

    // checks if bounding rectangle of a card is colliding with given point
    collision(x, y)
    {
        if (x >= this.x && x <= this.x + card_width && y >= this.y && y <= this.y + card_height)
        {
            return true
        }
        else
        {
            return false
        }
    }
}

//randomly initialize deck of 70 numbers
const nums = []
for (let i = 1; i <= 70; i++)
{
    nums.push(i)
}
const shuffledNums = nums.sort((a, b) => 0.5 - Math.random());

deck = []

//dragging and dropping code
othersDragging = 0
addEventListener('mousedown', (event) => 
{
    for (let i = deck.length-1; i >= 0; i--)
    {
        for (let j = 0; j < deck.length; j++)
            {
                if (deck[j].isDragging)
                {
                    othersDragging ++
                }
            }
        // if card is clicked and no other cards are being clicked
        if (deck[i].collision(event.clientX, event.clientY) && othersDragging == 0) 
        {
            // set card position to mouse position
            deck[i].isDragging = true;
            deck[i].dx = event.clientX - deck[i].x
            deck[i].dy = event.clientY - deck[i].y

            // switch card clicked with last card so card clicked is drawn to screen last
            temp = deck[deck.length-1]
            deck[deck.length-1] = deck[i]
            deck[i] = temp
            // temp = deck.splice(indexOf(deck[i]))
        }
        othersDragging = 0
    }
})

var mouseX, mouseY
addEventListener('mousemove', (event) =>
{
    mouseX = event.clientX
    mouseY = event.clientY
    for (let i = 0; i < 70; i++)
    {
        if (deck[i].collision(event.clientX, event.clientY))
        {
            deck[i].color = hoverColor
            deck[i].isHover = true
        }
        else
        {
            deck[i].isHover = false
        }
        if (deck[i].isDragging)
        { 
            deck[i].x = event.clientX - deck[i].dx
            deck[i].y = event.clientY - deck[i].dy
        }
    }
})
addEventListener('mouseup', (event) =>
{
    for (let i = 0; i < 70; i++)
    {
        deck[i].isDragging = false;
    }
})

// if double click, "draw" a card from the deck
var new_card
addEventListener('dblclick', (event) =>
{
    card = shuffledNums.pop()
    if (card <= 13)
    {
        new_card = gub
    } 
    else if (card >= 14 && card <= 20) {
        new_card = mushroom
    }
    else if (card >= 21 && card <= 24) {
        new_card = toadRider
    }
    else if (card >= 25 && card <= 26) {
        new_card = velvetMoth
    }
    else if (card == 27) {
        new_card = esteemedElder
    }
    else if (card == 28) {
        new_card = G
    }
    else if (card == 29) {
        new_card = U
    }
    else if (card == 30) {
        new_card = B
    }
    else if (card == 31) {
        new_card = dangerousAlchemy
    }
    else if (card == 32) {
        new_card = flashFlood
    }
    else if (card == 33) {
        new_card = gargokPlague
    }
    else if (card == 34) {
        new_card = rumourOfWasps
    }
    else if (card == 35) {
        new_card = travelingMerchant
    }
    else if (card == 36) {
        new_card = cyclone
    }
    else if (card == 37) {
        new_card = lightning
    }
    else if (card == 38) {
        new_card = smahlThief
    }
    else if (card == 39) {
        new_card = singleRing
    }
    else if (card == 40) {
        new_card = doubleRing
    }
    else if (card == 41) {
        new_card = tripleRing
    }
    else if (card == 42) {
        new_card = cricketSong
    }
    else if (card == 43) {
        new_card = scout
    }
    else if (card == 44) {
        new_card = blindfold
    }
    else if (card == 45) {
        new_card = retreat
    }
    else if (card == 46) {
        new_card = flopBoat
    }
    else if (card >= 47 && card <= 53) {
        new_card = lure
    }
    else if (card >= 54 && card <= 55) {
        new_card = superLure
    }
    else if (card >= 56 && card <= 59) {
        new_card = sudSpout
    }
    else if (card >= 60 && card <= 63) {
        new_card = spear
    }
    else if (card >= 64 && card <= 65) {
        new_card = ageOldCure
    }
    else if (card >= 66 && card <= 67) {
        new_card = feather
    }
    else if (card >= 68 && card <= 69) {
        new_card = hakiFlute
    }
    else if (card === 70)
    {
        new_card = spear
    }

    deck.push(new Card(new_card))
})

// drawing to the screen
function animate()
{
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)

    // c.beginPath()
    // c.rect(card_width,card_height,card_width,card_height);
    // c.fillStyle = 'chocolate'
    // c.strokeStyle = 'black'
    // c.fill()
    // c.stroke()
    c.drawImage(cardBack, card_width, card_height, card_width, card_height)


    for (let i = 0; i < deck.length; i++)
    {
        if (deck[i].isDragging)
        {
            deck[i].color = clickedColor
        }
        deck[i].draw()
        if (deck[i].isHover)
        {
            // draw card being hovered over proportional to screen in bottom right of screen
            c.drawImage(deck[i].image, innerWidth - G.height, innerHeight - G.height, 1 * G.width, 1 * G.height)
        }
    }
    c.drawImage(gubCursor, mouseX - 18, mouseY - 36, 36, 72)
    //console.log(card)
}

animate()
