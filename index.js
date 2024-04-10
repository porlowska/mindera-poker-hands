function pokerHands(x) {
    //create a deck of cards
    const suits = ["h", "d", "c", "s"]; // Hearts, Dimonds, CLubs, Spades
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // J = 11, Q = 12 K=13 A= 14/ 1
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push([rank, suit]);
        }
    }

    let straightFlush = 0 //5 same suit, seqential rank
    let flush = 0 //5 same suit, different numer
    let fourOfAKind = 0 // 4 same number, different suit 
    let fullHouse = 0 //3 same number  and 2 same number, diferent suit 
    let threeOfAKind = 0 //3 same cards numbers, different suit 
    let straight = 0 // seqential rank, different suit 

    console.log('Number of Traials: ' + x)
    // itterate through hands
    for (let i = x; i > 0; i--) {
        //shuffle the deck
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        //draw 5 cards:
        const hand = deck.slice(0, 5)
        //sort scards in ascending order 
        hand.sort((a, b) => a[0] - b[0]);

        // check hand
        // ALL same suit, 
        // checks if each card is equal to the first one 
        if (hand.every(card => card[1] === hand[0][1])) {

            for (let i = 0; i < hand.length - 1; i++) {
                if (hand[i][0] === hand[i + 1][0] - 1) {
                    // change loop as it only checks the first one 
                    //function to check if it in sequence or not 
                    //in sequence checking 
                    straightFlush++;
                } else {
                    flush++;
                }
            }
            //Different suit
        } else {
            //all cards are already sorted so same numbers must be next to each other!
            let isSequial;
            for (let i = 0; i < hand.length - 1; i++) {
                if (hand[i][0] === hand[i + 1][0] - 1) {
                    isSequial === true
                } else {
                    isSequial === false
                }
            }
            if (isSequial) {
                straight++
            } else {
                let pair = 0 // you should heve functon that will be called to check the hand and focus.
                let trio = 0
                if (hand[0][0] === hand[1][0]) {
                    pair++
                }
                if (hand[1][0] === hand[2][0]) {
                    if (pair == 0) {
                        pair++
                    } else {
                        pair--
                        trio++
                    }
                }
                if (hand[2][0] === hand[3][0]) {
                    if (trio == 1) {
                        fourOfAKind++
                        trio--
                    } else if (pair == 1) {
                        pair--
                        trio++
                    } else {
                        pair++
                    }
                }
                if (hand[3][0] === hand[4][0]) {
                    if (trio == 1) {
                        fourOfAKind++
                        trio--
                    } else if (pair >= 1) {
                        pair--
                        trio++
                    }

                }
                if (trio == 1) {
                    if (pair == 0) {
                        threeOfAKind++
                    } else {
                        fullHouse++
                    }
                }
            }
        }
    }
    // Probablility :
    const pStraightFlush = Math.round((straightFlush / x) * 10000) / 100
    const pFlush = (flush / x) * 100
    const pFourOfAKind = (fourOfAKind / x) * 100
    const pFullHouse = (fullHouse / x) * 100
    const pThreeOfAKind = (threeOfAKind / x) * 100
    const pStraight = (straight / x) * 100
    const pWin = ((straight + flush + straightFlush + fourOfAKind + threeOfAKind + fullHouse) / x) * 100

    console.log(
        `Probablility of a hand with: \n 
        Straight Flush: ${pStraightFlush} % \n
        Flush: ${pFlush} \n
        Four of a Kind: ${pFourOfAKind} % \n
        Full House: ${pFullHouse} %\n
        Three of a Kind: ${pThreeOfAKind} %\n
        Straight: ${pStraight} %\n \n 
        Probablilty of winning with any of the above: ${pWin} %`
    )

    document.get
}

const NUM_TRIALS = prompt("Enter numnber fo trails, min 1, recommeended above 100")

pokerHands(parseInt(NUM_TRIALS))

//more functions
//semicolons !!!
//trio checking 