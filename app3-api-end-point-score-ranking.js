const express = require('express')

const app = express()
app.use(express.json())

/*
Consider a fantasy app api which will rank users based on inputs recieved. 

Create a postman api that will accept the following :

Predictions:
[
	{Id:"1", name: "raj", answer:250/5},
	{Id:"2", name: "ravi", answer:256/6},
	{Id:"3", name: "sham", answer:310/5},
	{Id:"4", name: "Ali", answer:270/5},
	{Id:"5", name: "sam", answer:280/6},
]

Actual_Score :260/5

Sort the ranking of these and return rank object consisting player in sorted order. 

Note 

1. Player closet to the actual score shld be ranked higher. 

2. If score prediction of next player is less then 5 run then consider wikets also if 
	 less score by 5runs but less wiket then will on ranked higher then the other.	
	
	const input = {
		"predictions": [
			{"Id": "1", "name": "raj", "answer": "250/5"},
			{"Id": "2", "name": "ravi", "answer": "256/6"},
			{"Id": "3", "name": "sham", "answer": "310/5"},
			{"Id": "4", "name": "Ali", "answer": "270/5"},
			{"Id": "5", "name": "sam", "answer": "280/6"}
		],
		"actual_score": "260/5"
	};
*/

app.post( '/api/ranking', (req, res) => {
	const input = req.body
	// Parse actual score
	const actualScore = input.actual_score.split('/'); // [ '260', '5' ]
	const actualRuns = parseInt(actualScore[0]);       // 260
	const actualWickets = parseInt(actualScore[1]);    // 5
	
	// Function to calculate the deviation of runs and wickets
	function calculateDeviation(predicted, actualRuns, actualWickets) {
			const splitScoreAndWickets= predicted.split('/')  // [ '250', '5' ]
			const [predictedRuns, predictedWickets] = splitScoreAndWickets.map(Number); // [250, 5 ]
	
			const runDeviation = Math.abs(predictedRuns - actualRuns); 	// 250-260 => 10
			const wicketDeviation = Math.abs(predictedWickets - actualWickets); // 5 - 5 => 0
	
			return { runDeviation, wicketDeviation, predictedRuns, predictedWickets }; 
	}
	
	// Add deviation data to each prediction
	input.predictions.forEach(player => {
			const { runDeviation, wicketDeviation } = calculateDeviation(player.answer, actualRuns, actualWickets); // deviation: { runDeviation: 4, wicketDeviation: 1 }
			player.deviation = { runDeviation, wicketDeviation }; // New Property
	});

	// Sort the predictions
	input.predictions.sort((a, b) => {
    // Compare first by runDeviation if less than 5
    if (a.deviation.runDeviation < 5 && b.deviation.runDeviation < 5) {
        // If both players have less than 5 run deviation, compare by wicketDeviation
        if (a.deviation.wicketDeviation === b.deviation.wicketDeviation) {
            return 0; // If both have the same wicket deviation, they are ranked equally
        }
        return a.deviation.wicketDeviation - b.deviation.wicketDeviation; // Lower wicket deviation first
    }

    // If the run deviation is more than 5, compare by runDeviation first
    if (a.deviation.runDeviation === b.deviation.runDeviation) {
        // If run deviations are equal, compare by wicket deviation
        return a.deviation.wicketDeviation - b.deviation.wicketDeviation;
    }
    
    return a.deviation.runDeviation - b.deviation.runDeviation; // Lower run deviation first
});

	// Output the sorted players
	console.log(input.predictions)
	return res.json(input.predictions)
})


/* PORT Listen */

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

/*
get:
Key: Prediction, value: [{"Id": "1", "name": "raj", "answer": "250/5"},{"Id": "2", "name": "ravi", "answer": "256/6"},{"Id": "3", "name": "sham", "answer": "310/5"},{"Id": "4", "name": "Ali", "answer": "270/5"},{"Id": "5", "name": "sam", "answer": "280/6"}]
// (JSON.parse(req.query.predictions))
// req.query.260/5

put: /:id
// req.params.id

10 0 
4  1
50 0
10 0
20 1


[
  {
    Id: '2',
    name: 'ravi',
    answer: '256/6',
    deviation: { runDeviation: 4, wicketDeviation: 1 }
  },
  {
    Id: '1',
    name: 'raj',
    answer: '250/5',
    deviation: { runDeviation: 10, wicketDeviation: 0 }
  },
  {
    Id: '4',
    name: 'Ali',
    answer: '270/5',
    deviation: { runDeviation: 10, wicketDeviation: 0 }
  },
  {
    Id: '5',
    name: 'sam',
    answer: '280/6',
    deviation: { runDeviation: 20, wicketDeviation: 1 }
  },
  {
    Id: '3',
    name: 'sham',
    answer: '310/5',
    deviation: { runDeviation: 50, wicketDeviation: 0 }
  }
]
*/