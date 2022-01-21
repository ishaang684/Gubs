// setting up game window
const canvas = document.getElementById('game-canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

// setting card size relative to screen size
const card_width = innerWidth / 17;
const card_height = card_width * 1.38;
const center_x = card_width / 2;
const center_y = card_height / 2;

// document.body.style.backgroundImage = 'url(Wood_Background.jpg)' 
document.body.style.backgroundColor = 'saddlebrown'


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

// card class
// holds a cards image and position
class Card
{
    isDragging = false;
    dx = 0;
    dy = 0;
    constructor(image, x = Math.random() * 10 + card_width, y = Math.random() * 10 + card_height)
    {
        this.x = x
        this.y = y
        this.image = image
        this.color = 'chocolate'
    }
    
    //draw card to the screen
    draw()
    {
        // c.beginPath()
        // c.rect(this.x, this.y, card_width, card_height);
        // c.fillStyle = this.color
        // c.fill()
        // c.stroke()

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
console.log(shuffledNums)

deck = []

//dragging and dropping code
addEventListener('mousedown', (event) => 
{
    for (let i = 0; i < 70; i++)
    {
        if (deck[i].collision(event.clientX, event.clientY))
        {
            deck[i].isDragging = true;
            deck[i].dx = event.clientX - deck[i].x
            deck[i].dy = event.clientY - deck[i].y
        }
    }
})
addEventListener('mousemove', (event) =>
{
    for (let i = 0; i < 70; i++)
    {
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
    else if (card === 27) {
        new_card = esteemedElder
    }
    else if (card === 28) {
        new_card = G
    }
    else if (card === 29) {
        new_card = U
    }
    else if (card === 30) {
        new_card = B
    }
    else if (card === 31) {
        new_card = dangerousAlchemy
    }
    else if (card === 32) {
        new_card = flashFlood
    }
    else if (card === 33) {
        new_card = gargokPlague
    }
    else if (card === 34) {
        new_card = rumourOfWasps
    }
    else if (card === 35) {
        new_card = travelingMerchant
    }
    else if (card === 36) {
        new_card = cyclone
    }
    else if (card === 37) {
        new_card = lightning
    }
    else if (card === 38) {
        new_card = smahlThief
    }
    else if (card === 39) {
        new_card = singleRing
    }
    else if (card === 40) {
        new_card = doubleRing
    }
    else if (card === 41) {
        new_card = tripleRing
    }
    else if (card === 42) {
        new_card = cricketSong
    }
    else if (card === 43) {
        new_card = scout
    }
    else if (card === 44) {
        new_card = blindfold
    }
    else if (card === 45) {
        new_card = retreat
    }
    else if (card === 46) {
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

// drawing cards to the screen
function animate()
{
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)

    
    c.beginPath()
    c.rect(card_width,card_height,card_width,card_height);
    c.fillStyle = 'chocolate'
    c.fill()
    c.stroke()


    for (let i = 0; i < 70; i++)
    {
        deck[i].draw()
    }
    //console.log(card)
}

animate()
