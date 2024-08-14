
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
function changeBalldata(lastmatchRuns,ballsData,ballData,foundBowlerStat1,action) {
    if(action == 'add'){
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
    }
    if(action == 'edit'){
        let previousBallRun = lastmatchRuns
        foundBowlerStat1.bowler.key = ballData.bowlerName,
        foundBowlerStat1.matchRuns = foundBowlerStat1.matchRuns - previousBallRun +  ballData.runsScored,
        foundBowlerStat1.nonstriker = ballData.nonSrikerName,
        foundBowlerStat1.runs = ballData.runsScored,
        foundBowlerStat1.striker = ballData.strikerName
        let currentRunRate = foundBowlerStat1.matchRuns / foundBowlerStat1.over_Str
        foundBowlerStat1.crr = currentRunRate
         matchData.TeamTotalRuns =matchData.TeamTotalRuns + ballData.runsScored - previousBallRun
       // matchData.TeamBallsPlayed =totalBalls,
    matchData.CurrentRunRate = matchData.TeamTotalRuns / matchData.CurrentOver
          // matchData.CurrentOver =over
    }
}
function updateBatsmanStats(ballData,action){
      let foundPlayerStat = matchData.BatsmanStats.find(item => item.name=== ballData.strikerName );
      if(foundPlayerStat){
            if(action == 'add'){
       
        foundPlayerStat.totalRuns = foundPlayerStat.totalRuns + ballData.runsScored;
        foundPlayerStat.totalBall = foundPlayerStat.totalBall + 1;
        foundPlayerStat.strikeRate = (foundPlayerStat.totalRuns/ foundPlayerStat.totalBall) * 100

    }
           if(action == 'edit'){
        foundPlayerStat.totalRuns = foundPlayerStat.totalRuns + ballData.runsScored - ballData.previousBallRun ;
        foundPlayerStat.strikeRate = (foundPlayerStat.totalRuns/ foundPlayerStat.totalBall) * 100

    
    }
      }
      else {
      let firstStrikeRate = (ballData.runsScored/1) *100
        matchData.BatsmanStats.push({name:ballData.strikerName,totalBall:1,totalRuns:ballData.runsScored,strikeRate:firstStrikeRate
        })  
    }
  
}
function updateBowlerStats(ballData,action){
    let foundBowlerStat = matchData.BowlerStats.find(item => item.name=== ballData.bowlerName );
    if (foundBowlerStat) {
      if(action == 'add'){
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
    } 
      if(action == 'edit'){
        let bowlerOver = 0
        let noBowls = 0
        // no need to add runs and balls in case of no bowl, but add it later in future
        if(!ballData.isNoBowl)
           noBalls =  0
       else
          noBalls = 1
        foundBowlerStat.totalRuns = foundBowlerStat.totalRuns + ballData.runsScored - ballData.previousBallRun ;
        foundBowlerStat.noBalls = foundBowlerStat.noBalls + noBalls
        // foundBowlerStat.totalBall = foundBowlerStat.totalBall + 1;
        // no need to change above and below total ball if not no bowl
        bowlerOver = foundBowlerStat.totalBall / 6;
        foundBowlerStat.economyRate = (foundBowlerStat.totalRuns/ bowlerOver) * 100
    } 
    }
    
    else {
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
}


function generateRandomID() {
  return Math.random().toString(36).substr(2, 9);
}
let addBallData = ((ballData)=>{
    let lastballData = ballsData[ballsData.length - 1]
    if(!ballsData.length)
    lastmatchRuns = 0
    else
    lastmatchRuns = lastballData.matchRuns
    let updatedObj = {}
    changeBalldata(lastmatchRuns,ballsData,ballData,updatedObj,'add')
    updateBatsmanStats(ballData,'add')
    updateBowlerStats(ballData,'add')

    
})

let editBallData = ((ballData)=>{
    let foundBowlerStat1 = ballsData.find(item => item._id=== ballData.ballId );
    if (foundBowlerStat1) {
   let previousBallRun = foundBowlerStat1.runs
    changeBalldata(previousBallRun,ballsData,ballData,foundBowlerStat1,'edit')
    ballData.previousBallRun = previousBallRun
    updateBatsmanStats(ballData,'edit')
    updateBowlerStats(ballData,'edit')
    }

})

let showAllDetails = (()=>{
    console.log("total match data is ", matchData,ballsData)
}) 
let payload = {
    runsScored:4,
    strikerName:"V kohli",
    nonSrikerName:"S Tendulkar",
    bowlerName:"jasprit bumrah",
    isNoBowl:false
    
}
addBallData(payload)
let editPayload = {
    ballId:'86oaive3y',
    runsScored:6,
    strikerName:"V kohli",
    nonSrikerName:"S Tendulkar",
    bowlerName:"jasprit bumrah",
    isNoBowl:false
    
}
editBallData(editPayload)
    // console.log("final match data is ",matchData,"bowl data is",ballsData)
showAllDetails()
