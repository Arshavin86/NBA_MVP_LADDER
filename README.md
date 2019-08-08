# nbamvp.us
  The site was built in order to utilise my own statistical model which determines who was the most valuable player (MVP) of each NBA game. The more games MVPs were won by the one particular player during a season the more chances that player has to become MVP of that season. The same conception works in playoffs (postseason). So how is it work?
## Home page
  You can see the latest NBA news which update every hour on the home page of website. On the sidebar of that page you may click on today's date and choose the date, the games you're searching for from, in the drop down calendar. After that you'll see a list of games played that day with MVP of each game with the most impresive stats beside him. If you click on the button 'watch' under the game's box you'll get some highlights of that game. The number of games with highlights is restricted by the number of that games on the YouTube channel 'Ximo Pierto'. I have to do so in order to not go over my daily quota from Youtube API of 10,000 units per day very fast.
## Players page
  Here you can find bio of each NBA player who played at list one game for last four seasons**. Use an input field on the top of the sidebar for convenient search. You may click on the player's name to go to his profile page and find more info and even videos with him.
## Seasons page
Here all my seasons rankings are presented. For now you can find the MVP rankings only for last four seasons**. Switching between regular season and playoffs you can find top-30 list for regular season or the same ranking for the playoffs (number of positions depends on  specific playoffs). 
### Tech stack
- React.js (with broad React hooks usage)
- Styled-components (for styling)
- Next.js (for Server Side Rendering)
- Node.js/Express
- PostgreSQL (for storing and retrieving NBA stats data)
- NBA API, YouTube API, News API, Players headshots images API
- AWS EC2 instances (for app and database deployment)
- NGINX reverce proxy server 
_______________________________________________________________________________________________________________________________

** Site has been constantly developing. I look for another NBA API to add data from more seasons. I also look for a cheap NBA players headshot images provider which has more images than my current one (https://nba-players.herokuapp.com/) in order to create a personal page for each player. 
