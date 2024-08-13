// NOTE: No ball case is not consider as of now anywhere due to less time and already too many scenarios, will implement it again later once reviewed

// ECONOMY RATE :  (Number of runs scored in an innings)/(Number of balls faced) x 100.
// STRIKE RATE: (Number of runs scored in an innings)/(Number of balls faced) x 100.

let matchData = {
  TeamTotalRuns: 4,
  TeamBallsPlayed: 1,
  BatsmanStats: [ { name: 'V kohli', totalBall: 1, totalRuns: 4, strikeRate: 400 } ],
  BowlerStats: [
   {
      name: 'jasprit bumrah',
      totalBall: 1,
      totalRuns: 4,
      noBalls: 0,
      economyRate: 2400
    }
  ],
  CurrentRunRate: 24,
  CurrentOver: 0.16666666666666666
}
// use above for edit ball otherwise below for first ball
// let matchData = {
//     TeamTotalRuns:0,
//     TeamBallsPlayed:0,
//     BatsmanStats:[],
//     BowlerStats:[],
//     CurrentRunRate:0,
//     CurrentOver:0
// };
let ballsData = [
{
  _id: '86oaive3y',
  bowler: { key: 'jasprit bumrah' },
  crr: 24,
  matchRuns: 4,
  noBall: false,
  nonstriker: 'S Tendulkar',
  over_Str: 0.16666666666666666,
  runs: 4,
  striker: 'V kohli'
}
];
// use above to edit ball data with id otherwise below
// let ballsData = []
function generateRandomID() {
  return Math.random().toString(36).substr(2, 9);
}
let addBallData = ((ballData)=>{
    let lastballData = ballsData[ballsData.length - 1]
    if(!ballsData.length)
    lastmatchRuns = 0
    else
    lastmatchRuns = lastballData.matchRuns
    let totalMatchRuns = lastmatchRuns +  ballData.runsScored
    let totalBalls = ballsData.length + 1
    let over = totalBalls / 6;
    let currentRunRate = totalMatchRuns / over
    let uniqueId =  generateRandomID()
    let value = {
    _id: uniqueId,
    bowler:{
        key:ballData.bowlerName
    },
    crr:currentRunRate,
    matchRuns:totalMatchRuns,
    noBall:ballData.isNoBowl,
    nonstriker:ballData.nonSrikerName,
    over_Str:over,
    runs: ballData.runsScored,
    striker:ballData.strikerName
}
console.log(typeof value,value)
    ballsData.push(value)
    matchData.TeamTotalRuns =totalMatchRuns,
    matchData.TeamBallsPlayed =totalBalls,
    matchData.CurrentRunRate =currentRunRate,
    matchData.CurrentOver =over
//   we can devide below code in a separate function also to update batsman stats and bowler stats
    let foundPlayerStat = matchData.BatsmanStats.find(item => item.name=== ballData.strikerName );
         console.log(foundPlayerStat,ballData.strikerName)
    if (foundPlayerStat) {
        foundPlayerStat.totalRuns = foundPlayerStat.totalRuns + ballData.runsScored;
        foundPlayerStat.totalBall = foundPlayerStat.totalBall + 1;
        foundPlayerStat.strikeRate = (foundPlayerStat.totalRuns/ foundPlayerStat.totalBall) * 100

    } else {
      let firstStrikeRate = (ballData.runsScored/1) *100
        matchData.BatsmanStats.push({name:ballData.strikerName,totalBall:1,totalRuns:ballData.runsScored,strikeRate:firstStrikeRate
        })  
        }
// below updating bowler stats
// anywhere not implementing case of no bowl also, which we need to consider for each case
let foundBowlerStat = matchData.BowlerStats.find(item => item.name=== ballData.bowlerName );
         console.log(foundBowlerStat,ballData.bowlerName)
    if (foundBowlerStat) {
        let bowlerOver = 0
        let noBowls = 0
        // no need to add runs and balls in case of no bowl, but add it later in future
        if(!ballData.isNoBowl)
      noBalls =  0
      else
      noBalls = 1
        foundBowlerStat.totalRuns = foundBowlerStat.totalRuns + ballData.runsScored;
        foundBowlerStat.noBalls = foundBowlerStat.noBalls + noBalls
        foundBowlerStat.totalBall = foundBowlerStat.totalBall + 1;
        bowlerOver = foundBowlerStat.totalBall / 6;
        foundBowlerStat.economyRate = (foundBowlerStat.totalRuns/ bowlerOver) * 100
    } else {
     let bowlerOver = 1/6
      let firstEconomyRate = (ballData.runsScored/bowlerOver) *100
      let noBalls;
      if(!ballData.isNoBowl)
      noBalls = 0
      else
      noBalls = 1
        matchData.BowlerStats.push({name:ballData.bowlerName,totalBall:1,totalRuns:ballData.runsScored,noBalls:noBalls,economyRate:firstEconomyRate
        })  
        }
    
    console.log("final match data is ",matchData)
    // if(!matchData.BowlerStats.length){
    //     let firstEconomyRate = (ballData.runsScored/0.1666) * 100
    //     // as we know 1/6 is 0.1666 in overs
    //     matchData.BowlerStats.push({name:ballData.bowlerName,totalBall:1,totalRuns:ballData.runsScored,strikeRate:firstEconomyRate
    //     })
    // }
    // console.log(matchData)
})

let editBallData = ((ballData)=>{
    console.log(ballData)
    // not considering the case of no bowl as there is too much condition and will take time, can implement later
    
let foundBowlerStat = ballsData.find(item => item._id=== ballData.ballId );
         console.log(foundBowlerStat)
    if (foundBowlerStat) {
        // need to consider here no bowl case also to calculate strike rate and over_str
        let previousBallRun = foundBowlerStat.runs
        foundBowlerStat.bowler.key = ballData.bowlerName
        foundBowlerStat.matchRuns = foundBowlerStat.matchRuns -
        previousBallRun +  ballData.runsScored
        foundBowlerStat.nonstriker = ballData.nonSrikerName,
        foundBowlerStat.runs = ballData.runsScored,
        foundBowlerStat.striker = ballData.strikerName
        let currentRunRate = foundBowlerStat.matchRuns / foundBowlerStat.over_Str
        foundBowlerStat.crr = currentRunRate
        
    matchData.TeamTotalRuns =matchData.TeamTotalRuns + ballData.runsScored - previousBallRun ,
    // no need to change team total balls played if not case of no ball
    // matchData.TeamBallsPlayed =totalBalls,
    matchData.CurrentRunRate = matchData.TeamTotalRuns / CurrentOver
    // no need to change over also as not consider case of no ball
    // matchData.CurrentOver =over

    let foundPlayerStat = matchData.BatsmanStats.find(item => item.name === ballData.strikerName );
        //  console.log(foundPlayerStat,ballData.strikerName)
    if (foundPlayerStat) {
        foundPlayerStat.totalRuns = foundPlayerStat.totalRuns + ballData.runsScored - previousBallRun ;
        // foundPlayerStat.totalBall = foundPlayerStat.totalBall + 1;
        // no above change as no considering case of no bowl, totalBall is same
        foundPlayerStat.strikeRate = (foundPlayerStat.totalRuns/ foundPlayerStat.totalBall) * 100

    } else {
      let firstStrikeRate = (ballData.runsScored/1) *100
        matchData.BatsmanStats.push({name:ballData.strikerName,totalBall:1,totalRuns:ballData.runsScored,strikeRate:firstStrikeRate
        })  

    }
    console.log("working till here")
    let foundBowlerStat = matchData.BowlerStats.find(item => item.name=== ballData.bowlerName );
        //  console.log(foundBowlerStat,ballData.bowlerName)
    if (foundBowlerStat) {
        let bowlerOver = 0
        let noBowls = 0
        // no need to add runs and balls in case of no bowl, but add it later in future
        if(!ballData.isNoBowl)
      noBalls =  0
      else
      noBalls = 1
        foundBowlerStat.totalRuns = foundBowlerStat.totalRuns + ballData.runsScored - previousBallRun ;
        foundBowlerStat.noBalls = foundBowlerStat.noBalls + noBalls
        // foundBowlerStat.totalBall = foundBowlerStat.totalBall + 1;
        // no need to change above and below total ball if not no bowl
        bowlerOver = foundBowlerStat.totalBall / 6;
        foundBowlerStat.economyRate = (foundBowlerStat.totalRuns/ bowlerOver) * 100
    } else {
     let bowlerOver = 1/6
      let firstEconomyRate = (ballData.runsScored/bowlerOver) *100
      let noBalls;
      if(!ballData.isNoBowl)
      noBalls = 0
      else
      noBalls = 1
      
        matchData.BowlerStats.push({name:ballData.bowlerName,totalBall:1,totalRuns:ballData.runsScored,noBalls:noBalls,economyRate:firstEconomyRate})  
        }
// anywhere not implementing case of no bowl also, which we need to consider for each case
}
    
})

let showAllDetails = (()=>{
    // as i am already storing data according to each ball in match object and also reverting change in case of edit ball, just ignore the case of no ball as of now, as didn't get enough time
    console.log("total match data is ", matchData)
}) 
let payload = {
    runsScored:4,
    strikerName:"V kohli",
    nonSrikerName:"S Tendulkar",
    bowlerName:"jasprit bumrah",
    isNoBowl:false
    
}
// addBallData(payload)
let editPayload = {
    ballId:'a000g819y',
    runsScored:6,
    strikerName:"V kohli",
    nonSrikerName:"S Tendulkar",
    bowlerName:"jasprit bumrah",
    isNoBowl:false
    
}
// editBallData(editPayload)
    // console.log("final match data is ",matchData,"bowl data is",ballsData)
showAllDetails()
