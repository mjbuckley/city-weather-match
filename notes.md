## NOTES

This is a collection of general notes about why certain choices were made in the app, things to keep in mind when changing the app, reminders, etc. For specific information about a file or function, see the relevant comments in the code.


### General App notes

- **isActive:** isActive is part of the global app state. It is true if there is an active search or if a previous search state has been recreated from the query params. When isActive is true, query params will be added to all internal links so that the state can always be recreated in the future if bookmarked on reaccessed through history. On initial visit home or if bad query params get passed in for some reason then isActive is set to false. All pages are visitable regardless of state, but the info will be different (results is sort of an exception in that when false it will give a note that you need to search to see results). For example, the stations linked to on a metro area or city location will be different depending on whether true or false (if true the links will prioritize matching stations). There is a lot that I might do with isActive in the future to give more custom info on pages (like showing station links in different colors depending on if they are a match).
- **Helmet:** Children with a helmet component override parents with a helmet component. Since search is both a stand alone page as well as a child of home, a standard helmet component in search will render in both home and search. So I need to conditionally render its helmet component. However, I can't just check and see if props.location.pathname = search because when it is a child it won't have a location property. Instead I check and see if it has a location property and then render helmet component if it does (I'm assuming there can't be a case where it has location prop when it shouldn't be rendered). If I ever stop using react router (or maybe if I use a newer version) then this conditional might need to be changed.
- **Matching scheme:** I often link to matching cities. However, this is actually a link to matching stations within a city. When there are multiple stations in a city that match, I will always return the first station in the array that matches. When there are no matches, I will always link to the first in the array. And when there are some that match and some that don't match, I will alway return the first that is a match. This should ensure consistent results when navigating the site (avoids something like linking to one LA station from results page and a different one when you click on LA from the metro areas page).


### Routing and URLs

- I switched to urls without trailing slashes. There's some meaning to this, but these days I think it is mostly a matter of style in most cases. However, it's possible that some hosts have certain preferences, so if I ever run in to an issue take a look at this.
- For my error pages I'm adding a meta robots noindex tag to keep error pages from being indexed. I think this is the correct thing to do, but not positive. I also added this to the results page.
- I decided to add query params to home/about and search pages. Originally I was against this because if most people bookmarked one of these pages it would be to get the page in general, not in any way trying to store the values of their current search. However, the way I have things set up, the search results link is only available when isActive is true (which is how it should be, it would be confusing otherwise). So, if I want search results to be a link that is available on home/about/search, then I need isActive to be able to be true, which means I need to have query params present. No situation is ideal but I think I prefer it this way and that's why it is as it is.
- **URL error checking:** There are 5 possible sources or errors in the url that need to be checked for:
  1. Non-existent url path: www.cityweathermatch.com/badname. Depending on how deployed this either needs to be handled at the index.js level by React Router to simulate at 404 or at the server level.
  2. Invalid url params: www.cityweathermatch/location/Los%20Angeles/gibberish. Here gibberish needs to be a state. Needs to be handled at the page level. Approach will vary by page.
  3. Valid but non matching url params: www.cityweathermatch/location/Los%20Angeles/OH. Los Angeles and OH are valid names but not when combined together. Needs to be handled at the page level. Approach will vary by page.
  4. Incorrect query params: validpath?andPrGe5TiGe=gibberish or validpath?fakequeryparam=value. Needs to be handled in App.js in componentWillMount and componentWillReceiveProps (since App is parent to everything this is where query params can get checked and handled). Many functions play a role in this section, but a key one is paramstovalues.js.
  5. A valid url that makes no sense given state. Only current example is results page being hit without a search being done and without valid query params to recreate previous state.


### Search page/sliders

- **The "Not Important" button:** The not important button works by setting the weather values to their extreme ends of possible values such that no station is excluded (and the slider is then hidden). The way that this is implemented is basically a hack based off of the way that the weather values are named. It works fine and doing anything more complicated really isn't needed right now. However, if I ever added a new weather values it is important that I name it correctly or else there might be unexpected results (see slidergroup.js to see how it works).
- I was running in to an odd bug on chrome where some sliders where rendering in a different height than others. I was able to fix this by changing the track height from 2.8 to 3. Maybe the partial pixels were the problem? Keep in mind if something weird like this happens again.
- On the search page the slider default values start out as numbers, but as soon as they move they become strings. I could use something like parseInt to keep them as numbers, but this would get called a ton and not sure it's needed. The values just get added to a url, where they are strings anyway. So, I think this is fine as is, but noting in case I run in to issues anywhere.


### Graph

- **Responsive graph:** I tried a bunch of ways to make a responsive graph that would have different proportions based on screen width, but everything had problems. I never fully figured out the issue, but I think it has to do with how chart.js adds an iframe to the canvass container that somehow works to handle resize. React/chart.js/the iframe somewhere loose connection with one another with what I was doing. So, I created a container component (graphcontainer.js) that renders two totally different graph components based on width (as opposed to just passing sizing values in to the same graph component, which is where the troubles came in). It's not particularly elegant, but it works.


### Layout

- I have set all site padding breakpoints. They are:
  - 450 and below: 20px;
  - 750 and below: 30px;
  - 751+: 35px;
- Notes on sizes: Regular/mini ipad logical resolution is 768 in portrait mode. iphone logical resolution is 414/375/320 for plus/s/se in portrait mode. Upper 300 low 400 seems pretty common across all brands (rarely above 480, most below) for cell. 768-800 seems pretty popular for tablets.


### CSS

- Although I have a separate css file for each component, this is mostly a stylistic issue, not something like true css modules. That is to say all css eventually gets added to the same global css file without any special namespacing being done to the individual files. So, be sure that css is always properly specific (I'm generally prefixing the component name to styled class names). Also, the order that the css gets combined cannot be depended on, so don't depend on order (order importance within the same file is fine).


### Colors

- I went to Google's Material Design color picking site and picked a set of colors. I don't know if either of these were used exactly, but these are two selections that were a starting point for my color choices: https://material.io/color/#!/?view.left=0&view.right=0&primary.color=039BE5&secondary.color=9e9e9e
-Some color scheme stuff came from: https://material.io/color/#!/?view.left=0&view.right=0&primary.color=F5F5F5&secondary.color=29B6F6other


## Miscellaneous

- I have a loading spinner that shows on initial app load. The spinner is hard coded in the root div of index.html, and the css in inlined there as well. Once React and the app load, the spinner goes away because the root div is the place where React renders all content. There are other ways to do this, but I like this approach, esp. because I really only need the spinner once and I don't want to have to wait for react to work. Also, note that also load a sort of fake header along with the spinner. This gets overwritten by React, but it looks the same as the one that replaces it.
- I sized the home image (a .svg) to 250px x 167px even though I think it might technically be something like 166.667. I don't think there will be any issues with this, but take a look here if there are ever any issues with the image.
- Keep in mind that React sanitizes jsx, but the inputs from the user (form, url, etc) are not themselves sanitized on retrieval. User input will come in as a string. It's generally hard to do bad stuff with strings, but not impossible (eval, function constructor, etc.). I've double checked how I've used inputs, and everything is good, but always keep this in mind.
- I removed matches from props passed to CityList because I don't think that they where being used anywhere, but add them back if that causes a problem.


### Old Notes (but maybe still useful)

- I was having a problem where when clicking the submit button on the search page the results page was loading from the bottom or middle of the page. The solution I found was to add:
```
onUpdate={() => window.scrollTo(0, 0)}
```
to the <Router> component in index.js. This worked and I haven't run across any issues yet, but keep this in mind if I do. Solution suggested at:
  - https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
  - https://stackoverflow.com/questions/34345722/enforcing-scrolltotop-behavior-using-react-router
- On the search page I used to calculate matches and update state and then use hashHistory push to get to the results page. When watching when things get fired on the results page I saw that state had to be recalculated from the query params. If the state had been updated then the query params should have matched. This suggests that the link to the new page was being processed before state had been updated? I never saw anything visible, but thought it was kind of weird and don't know what might happen on slow machines. My theory is possible because I believe that setState doesn't always get called immediately. Anyway, an easy fix was to just link to results with the correct query params and let the state get set there. I'm just noting this for future reference.
- Not using this, but saving as a reminder. It is a way to find out if query params are the same as the default state values. I thought hard on how to make this, and I'm happy with the result (and could make even more concise w/ann anonymous fat arrow function):
```
Object.keys(weatherOptions).every(function(element) {
  return nextProps.location.query[element] === weatherConts[element][2];
});
```
