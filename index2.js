//function which will start the couning
const pokerHands = (x) => {
  let deck = createDeck();

  let straightFlush = 0; //5 same suit, seqential rank
  let flush = 0; //5 same suit, different numer
  let fourOfAKind = 0; // 4 same number, different suit
  let fullHouse = 0; //3 same number  and 2 same number, diferent suit
  let threeOfAKind = 0; //3 same cards numbers, different suit
  let straight = 0; // seqential rank, different suit

  for (let i = 0; i < x; i++) {
    let hand = drawCards(deck); // draw 5

    let sameSuit = isSameSuit(hand);
    let inSequence = isInSequence(hand);
    let sameNumber = isSameNumber(hand);

    if (sameSuit) {
      if (inSequence) {
        straightFlush++;
      } else {
        flush++;
      }
    } else {
      if (inSequence) {
        straight++;
      } else if (sameNumber == "three") {
        threeOfAKind++;
      } else if (sameNumber == "four") {
        fourOfAKind++;
      } else if (sameNumber == "full") {
        fullHouse++;
      }
    }
  }
  // Probablility :
  calculateProbability(
    straightFlush,
    flush,
    fourOfAKind,
    fullHouse,
    threeOfAKind,
    straight,
    x
  );
};

// function to create the deck
const createDeck = () => {
  //create a deck of cards
  const suits = ["h", "d", "c", "s"]; // Hearts, Dimonds, CLubs, Spades
  const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // J = 11, Q = 12 K=13 A= 14/ 1
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push([rank, suit]);
    }
  }
  return deck;
};

// function to shuffle the deck, draw 5 cards and sort them out
const drawCards = (deckArr) => {
  //suffle
  for (let i = deckArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deckArr[i];
    deckArr[i] = deckArr[j];
    deckArr[j] = temp;
  }
  //draw 5 cards:
  const hand = deckArr.slice(0, 5);
  //sort scards in ascending order
  hand.sort((a, b) => a[0] - b[0]);

  return hand;
};

// function to check if same suit
const isSameSuit = (handArr) => {
  return handArr.every((card) => card[1] === handArr[0][1]) ? true : false;
};

// check agains 14!!! <--- 
// 1. check if it is a special case arrangement return true 
// function to check if in sequence
function isInSequence(handArr) {
  if (handArr[4][0]=== 14 && handArr[1][0]===2){
    handArr.pop();
    handArr.unshift([1,a])
  }

  for (let i = 0; i < handArr.length - 1; i++) {
    if (handArr[i + 1][0] - handArr[i][0] !== 1) {
      return false; // Sequence broken
    }
  }
  return true; // All elements are in sequence
}

// function check how many same numers 2 same 3 sam 4 same
function isSameNumber(handArr) {
  let no = handArr.map((card) => card[0]);
  const winningHand = new Set(no);
  // set will group my numbers
  // if a set has 2 uniqe entries
  //4same no (xxxx y) (y xxxx) 2222 4
  //3 same no 2 same no (xxx yy)(yy xxx)

  if (winningHand.size == 2 && no[1] === no[3]) {
    console.log("four");
    return "four";
  } else if (winningHand.size == 2 && no[1] !== no[3]) {
    console.log("full");
    return "full";
    // if set has 3 uniqe entries
    //3 same no (xxx yz)(y xxx z)(yz xxx)
  } else if (winningHand.size == 3 && (no[0] === no[2] || no[2] === no[4] || no[1] === no[3])) {
    console.log("three");
    return "three";
  }
}

// function to calculate probability
let probability = (n, y) => Math.round((n / y) * 100000) / 1000;

// calculate probability
function calculateProbability(a, b, c, d, e, f, x) {
  let pSF = probability(a, x);
  let pF = probability(b, x);
  let p4K = probability(c, x);
  let pFH = probability(d, x);
  let p3K = probability(e, x);
  let pS = probability(f, x);

  console.log(
    `Probablility of a hand with: \n 
      Straight Flush: ${pSF} % \n
      Flush: ${pF} % \n
      Four of a Kind: ${p4K} % \n
      Full House: ${pFH} %\n
      Three of a Kind: ${p3K} %\n
      Straight: ${pS} %`
  );
}

const NUM_TRIALS = prompt(
  "Enter numnber of trails"
);
pokerHands(parseInt(NUM_TRIALS));
