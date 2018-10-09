class Highscores {
  constructor() {
    this.highscoresHTML = $j('#highscores');
    this.highScoresFromDB = [];
    this.highscoreToggle = this.highscoreToggle.bind(this);
    this.addListenerOnButton();
    this.getScores = this.fetchScores();
    this.makeHighscoresList();
    this.updateScore = this.updateScore.bind(this);
    this.addListenerOnFetch();
    setTimeout(this.updateScore, 3000);
  }

  highscoreToggle() {
    if (this.highscoresHTML.attr('style') === 'display: block;') {
      this.highscoresHTML.attr('style', 'display: none;')
    } else {
      this.highscoresHTML.attr('style', 'display: block;')
    }
  }

  addListenerOnButton() {
    $j('#highscore-button').on('click', this.highscoreToggle);
  }

  fetchScores() {
    return firebase.database().ref('scores/')
      .orderByChild("round").limitToLast(5);
  }

  makeHighscoresList(newScore) {
    if (!this.highscoresHTML) return;
    this.highscoresHTML.html('<h3>High Scores</h3 >');

    if (newScore) this.highScoresFromDB.push(newScore);

    this.sortByRoundAndMoney();
    
    for (let i = 0; i < 5; i++) {
      const score = this.highScoresFromDB[i];
      if (!score) break;
      this.highscoresHTML.html(
        this.highscoresHTML.html() + 
        `<li><div class='score' ><h4><i class="fas fa-star shiny"></i>${i + 1}. ` + 
        score[1]
      );
    }
  };

  sortByRoundAndMoney() {
    this.highScoresFromDB = this.sortByMoney(this.sortByRound());
    this.keepOnlyFiveHighscores();
  }

  sortByRound() {
    const sortedByRound = {};
    const scores = this.highScoresFromDB;
    if (!scores.length) return false;

    for (let i = 0; i < scores.length; i++) {
      const score = scores[i];
      if (!sortedByRound[score[0]]) sortedByRound[score[0]] = [];
      sortedByRound[score[0]].push(score);
    }
    
    return sortedByRound;
  }

  sortByMoney(sortedByRounds) {
    let sorted = [];
    if (!sortedByRounds) return [];
    const rounds = Object.keys(sortedByRounds).sort().reverse();

    for (let i = 0; i < rounds.length; i++) {
      if (sorted.length >= 5) break;
      sortedByRounds[rounds[i]].sort( (score1, score2) => score2[2] - score1[2] );
      sorted = sorted.concat(sortedByRounds[rounds[i]]);
    }
    
    return sorted;
  }

  keepOnlyFiveHighscores() {
    this.highScoresFromDB = this.highScoresFromDB.filter( (score, i) => i < 5);
  }
  
  addListenerOnFetch() {
    this.getScores.on('child_added', (snapshot) => {
      const childScore = snapshot.val();
      const htmlScore = `${childScore.name.slice(0, 10)}</h4><h5>Rounds: ${childScore.round} Money: $${childScore.money}</h5></div></li>`;
      if (this.highScoresFromDB.length < 5) {
        this.highScoresFromDB.push([childScore.round, htmlScore, childScore.money]);
        if (this.highScoresFromDB.length === 5) {
          this.highScoresFromDB = this.highScoresFromDB.reverse();
          this.makeHighscoresList();
        }
      } else {
        this.makeHighscoresList([childScore.round, htmlScore, childScore.money]);
      }
    });
  }

  updateScore() {
    if (this.highScoresFromDB.length < 5) {
      this.getScores = this.fetchScores();

      setTimeout(this.updateScore, 3000);
    } else {
      setTimeout(this.updateScore, 60000);
    }
  };
}

export default Highscores;