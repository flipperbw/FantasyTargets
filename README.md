##FantasyTargets  

#####[Chrome Web Store](https://chrome.google.com/webstore/detail/fantasy-targets/abmbpdhchbhhecbjhnhlnobeiihhjfpa?utm_campaign=en&utm_source=en-ha-na-us-bk-webstr&utm_medium=ha)

####Lightweight chrome extension to add targets to player stats in ESPN Fantasy Football.

![Preview](http://i.imgur.com/OnAVQo2.jpg)
==============

####Idea log: 
* Style modifications to tabs above with "videos" etc so they're not so ugly.
* Add caching of requsts  
        https://github.com/monsur/jscache  
* Move player "more stats" into tabs and name them properly.
* Show collective injury data  from previous year(P, Q, O, IR designations) Maybe next to week column.
        http://fftoday.com/nfl/13_injury_wk14.html
* Data storage - player notes.
        http://developer.chrome.com/extensions/storage.html
* Links to Yahoo player pages. Way more information.
* QBR? Completion percentage? 
* Add rotoworld news updates!
       http://www.rotoworld.com/content/playersearch.aspx?searchname=gordon%2c+josh&sport=mlb


####Possible scrape sites:  

######YAHOO  
-----  
1. http://sports.yahoo.com/nfl/teams/atl/roster/ => $('a[title="Roddy White"]')  
        Possibly cache this using storage.
2. http://sports.yahoo.com/nfl/players/7203/ => $('div#mediasportsplayergamelog td.nfl-stat-type-310.targets')  
3. Injury history - http://www.kffl.com/player/9270/nfl/injury_history/steven-jackson
4. http://sports.yahoo.com/nfl/stats/bycategory?cat=Receiving&conference=NFL&year=season_2013&timeframe=Week15&sort=32&old_category=Receiving

fftoday.com/stats/players  
http://www.kffl.com/player/{id}/nfl/utilization  



