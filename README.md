# Crypto-Miner
A browser-based game, made with Javascript.

## Background
Crypto-Miner is a classic game of gathering money with the added twist of cryptocurrencies replacing gold.
You control a miner who sends out his claw to grab the precious cryptos, if you time it correctly. 
The objective of this game is to meet money goals for each level in order to progress.
An extra level of complexity is added by the volative nature of cryptocurrencies' worth; will you sell them as soon as the round is over, or will you wait it out in hopes of it's price going up?

## Functionality & MVP
With Crypto-Miner, users will be able to:
- [ ] Start, pause, and reset the game
- [ ] Release the claw with DOWN key
   - [ ] The claw will move back and forth, in a semi-circle
- [ ] Sell Cryptocurrencies in-between rounds
- [ ] Mute the sound, using a button on the side
- [ ] Instructions panel on the side
- [ ] A production README


## Wireframes
This app will have a single screen with the game board, a title header, an instructions panel, buttons to Github, LinkedIn, and personal site, and a mute button. 
![wireframe](https://github.com/AndreC93/Crypto-Miner/blob/master/wireframe.png?raw=true)

## Technologies, Libraries, APIs
How will you architect the game? Will it use vanilla JS, HTML, and CSS or will you use a library like React? Will you use any other libraries or API's? Summarize the technical challenges you anticipate and how you plan to solve them.

This project will be implemented with the following technolgies: 
* `JavaScript` for handling of game logic
* `jQuestion` for manipulation of DOM elements
* `Canvas` for drawing of game features

## Timeline
**Day 1:** Setup any necessary Node packages. Lay groundwork for the next two days. Goals of the day: 
* Make skeleton for script file and source images to be used later.  
* Learn the basics of Canvas.
* Setup webpack.
* Style page to hold the game frame.

**Day 2:** Create the game logic using canvas and Javascript. Make sure claw can move correctly and handle it grabbing crypto. Goals of the day:
* Have a working game that moves. 
* Find music for background.
* Incorporate mute button.
* Add timer and cryto counter to game.

**Day 3:** Finish any loose ends.
* Incorporate sprites in place of the shapes from canvas. 
* Finish polishing game logic. 
* Make a store screen for in-between rounds, to sell cryptocurrencies. 

## Bonus features
Some additional features can be: 
* Buying of upgrades and score manipulators.
* Leaderboard of high scores. 