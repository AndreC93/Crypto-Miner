# Crypto-Miner
A browser-based game, made with Javascript.

## Background
Crypto-Miner is a classic game of gathering money with the added twist of cryptocurrencies replacing gold.
You control a computer miner who sends out his magnet to grab the precious cryptos, if you time it correctly. 
The objective of this game is to collect all the coins for each round in order to progress.
With each completed round, you get back 15 seconds. You are in a race to see how many rounds you can complete before you run out of time!

## Functionality & MVP
With Crypto-Miner, users will be able to:
- [ ] Start, pause, and reset the game
- [ ] Release the magnet with DOWN key
   - [ ] The magnet will move back and forth, in a semi-circle
- [ ] Retract the magnet with UP key
- [ ] Mute the sound, using a button on the side
- [ ] Instructions panel on the side
- [ ] A production README


## Wireframes
This app will have a single screen with the game board, a title header, an instructions panel, buttons to Github, LinkedIn, and personal site, and a mute button. 
![wireframe](https://github.com/AndreC93/Crypto-Miner/blob/master/images/wireframe.png?raw=true)

## Technologies, Libraries, APIs
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

**Day 2:** Create the game logic using canvas and Javascript. Make sure magnet can move correctly and handle it grabbing crypto. Goals of the day:
* Have a working game that moves. 
* Find music for background.
* Incorporate mute button.
* Add timer and money counter to game.

**Day 3:** Finish any loose ends.
* Incorporate sprites in place of the shapes from canvas. 
* Finish polishing game logic. 
* Make a helpful message for when you retrieve a crypto. 

## Bonus features
Some additional features can be: 
* Buying of upgrades and score manipulators.
* Leaderboard of high scores. 