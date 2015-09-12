var FantasyProsStatsProvider = require('FantasyProsStatsProvider');

chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {
    var playerName = $('div.player-name').text();
    var fp = new FantasyProsStatsProvider(playerName);
    // fp.getStats();
    addTargets(fp)

    // compare with espn and yahoo
    var position = $('span[title="Position Eligibility"').text().split(' ')[1];
    var playerId = request.url.match(/playerId=(\d+)&/)[1];
    var espn = new espnStatsProvider(playerId)
    addTargets(espn);

    var team = $('span[title="Team"]').text();
    var playerName = $('div.player-name').text();
    var yahoo = new yahooStatsProvider(team, playerName);
    addTargets(yahoo);
  }
);

function addTargets(statProvider) {
  var start = new Date();
  var data = statProvider.getStats();

  data.done(function(r) {
    console.log(r)
    var took = new Date() - start;
    console.log(statProvider.name + ' took - ', took);
    if(!r.targets)
      return;
    //targets = adjustForMissingWeeks(r.targets, r.yards, r.receptions);
    injectCells(2, r.targets);  
  });

}

function injectCells(index, values) {
  var tableRows = $('div#tabView0 div#moreStatsView0 div#pcBorder table tbody tr');
  for (var i = 0; i < tableRows.length; i++) {

    var newCell = tableRows[i].insertCell(index);
    newCell.setAttribute('width', 100);
    newCell.setAttribute('align', 'right');
    //Set class
    if (i === 0)
      newCell.setAttribute('class', 'pcTanRight');
    else
      newCell.setAttribute('class', i%2 ? 'pcEven' : 'pcOdd');
    newCell.innerText = values[i] || '-';
  }
}

function adjustForMissingWeeks(targets, yards, receptions) {
  //Fill in blanks for missing games, byes. etc
  var tableRows = $('div#tabView0 div#moreStatsView0 div#pcBorder table tbody tr');
  var newTargets = [];
  var iter = 0;
  for (var i = 0; i < tableRows.length; i++) {
    if (cellsEqual(tableRows[i], [1], 'BYE')) {
      newTargets.push('-');
    }
    else if (cellsEqual(tableRows[i], [2, 3, 4, 5], '-')) {
     newTargets.push('-');
    }
    else if (cellsEqual(tableRows[i], [2, 3, 4, 5], '0') && receptions[iter] !== '0' && yards[iter] !== '0') {
     newTargets.push('0');
    }
    else {
      newTargets.push(targets[iter] || '');
      iter++;
    }
  }  
  return newTargets;
  
}

function cellsEqual(row, cellIndexArray, value) {
  for (var i = 0; i < cellIndexArray.length; i++) {
    if (row.cells[cellIndexArray[i]].innerText !== value)
      return false;
  }
  return true;
}
