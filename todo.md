## TO DO SOON

- Improve home image (maybe make two images with different weather fused into one image).
- The loading spinner generally works, but not on Safari (there might also be somewhere on Android that is doesn't work). At first I thought is was related to CSS animations, but now I realize the problem is different, because the temporary header doesn't show up either. It's not a huge deal, but I'd like to figure this out as it's nice to have for initial loads on slow connections.
- I have tested on several physical Android devices, but I'd like to check on a few more.
- By some standards (including Google's accessibility rating), the fore/background color contrast on my header links and search submit button is not great enough (for the header the issue must be hover/active color, because the regular color is black on white). It sure looks fine to me, but I should probably fix. However, it is a somewhat large undertaking because I use the problematic colors in lots of places throughout the site and in my home image, so I really should change everything. See [this guide](https://dequeuniversity.com/rules/axe/2.2/color-contrast) for help picking acceptable colors.
- Look in to lightweight analytics options.
- Should I force https? "Strict transport security."
- Consider changing "at least" and "at most" to "min" and "max". I think it might be more clear. HOWEVER, there are other places in the code that make decisions based on the presences of at least/most. This isn't a huge deal to change as well, but need to be sure I don't forget about this.
- Some pages (I think asycn ones) seem to flash quickly on the left side (fraction of a second) and then center themselves. I believe that on subsequent hits everything looks fine. Not horrible, but look in to it.
- Decide if I'm happy with the breakpoint where sliders go from having labels on the side to labels on top. I increased it once and am not sure if I should increase it more.


## MAYBE TO DO IN FUTURE (WOULD BE GOOD BUT NOT CRITICAL)

- Find more ways to make js smaller/shorten initial load time. Consider:
  - Shortening more names in weather.json. Maybe and... to a...? Need to see how much trouble this would cause in the app.
  - I could make more page components async. I decided to limit it to just the graph and metro areas pages because those are the two with significant size, but it's possible doing all pages would be a good idea (but would make initial page transfers slower).
- Consider adding a sitemap?
- Consider prerendering?
- See if I can take a different approach and get sliders to look the same in Edge as they do on other browsers.
- Decide if I want to enable Progressive Web App features. See notes.md for info on this.
- I initial added a loading spinner a the placeholder return value on AsyncComponent instead of null, but the loads times were fast enough that the spinner just flashed for moment before the content loaded, making it more confusing than helpful. Revisit this once deployed to make sure I made the right decision.
- Maybe break up the about page more (into 2 pages or visually) to have a very basic about and then the more specific details.
- Fonts look not the best on low dpi screens. It's been a while since I used one regularly, so issue might just be with the screen dpi, but are there any simple adjustments that I can make?
- Visually make links stand out more?
- Styling is acceptable, but I still wish things (esp search and location) were better.
- Consider using some icons to spruce things up.
- Is there any data I might add to the graph?
- In weathercontext.js I call my checkbox "Show Examples" but in code I always refer to it as showContext. Probably not an issue, but maybe harmonize naming.
- I decided against contextually removing results and search from app header because there were situations that were more confusing than just keeping them there. Consider if there are other options I hadn't thought of.
- Add some sort of accessibility info to arrow link on home page.
- I changed the anchor element in index.css to cursor: pointer. Seems to be working but is it the best way to have cursor (if yes, maybe I can get rid of the other places I needed to add the cursor manually).
- Wording for Avg low during coldest month question is a bit confusing.
- Consider having an option for search results to be listed by state or eliminated by state.
- The size of the y axis of the graph is always the same, but the values on it are not. This can lead to lots of locations looking the same even when they really aren't. On the other hand, having the same values for all graphs would lead to the graphs being very compressed. See if there is a good solution.
- Does the fact that the initial index.html has a title and description matter. That is, will search engines know to read the js updated dom that helmet produces, or do they stick with the source?
- Although section margins/padding are mostly good, there are a few spots where they are a touch unequal and this can be cleaned up (usually because there is some combo of header top margin plus padding being added together and I should really just set margin top to 0 and then set my ideal padding).
- Might consider altering font sizes a bit more for mobile. I've done this in critical areas but I'm sure it could be improved.
- Right now you can put logically impossible values in to the range slider (ex: at least 10 and at most 1). This doesn't crash anything (just gives no matches), but should I make impossible or warn?
- I'm tempted to ignore this because I'm unlikely to ever do something this way again, but almost all (but not all) components seem to be rendering twice on load. There isn't any obvious performance issue, I just wish this wasn't happening or at least understood why it is happening. Perhaps related my use of clone element for children of App?
- Better style some of the error pages. Everything works right now but it is mostly plain unstyled text.
- Should the li in CitiesList be ol instead of ul?
- componentWillMount and componentWillReceiveProps are exactly the same except for one using this.props and the other nextProps. I'm fine with this for now, but maybe extract into a shared function in the future.
- In componentWillMount and componentWillReceiveProps I have two functions that take props/nextProps. One takes everything, the other takes .location.query. Both only use .location.query. I'm passing in what the functions expect, and everything works, but should probably just have everything set up to use .location.query because that's what's being used and it's much more clear.
- There are several places where I do something like passing this.props when really I don't need everything. I do this because it's cleaner/simpler, but I should probably only pass what I need. Also, could the spread operator be used here?
- Should I be capitalizing my consts?
- Ideally I should change how I handle partial valid url query params. Right now, I fill in the gaps with end range values and appropriately update state as needed, but I leave the incomplete url unchanged. The problem here is that if React ever needs to run componentWillReceiveProps, then the whole process of needing to fill in the gaps and compare to state will need to happen again. Everything will ultimately still work, but it would be nice if this could be avoided. So, perhaps find a way to alter url when I fill in gaps?
- In the app header one of the options is always "New Search". Does it make sense for this to show up on the search page?
- I don't love any of the focus options for the range slider. Right now I have the thumb get a bit darker when focused. So this is two part. 1) consider better focus ideas, and 2) there is some sort of bug with Safari where the focus doesn't work. I'm fine letting this be for now, but have a look at it again some time.
- Use colors consistently: all hex or all rgba.
- Right now the width of the div that gets changed in weatherrangeinput.js could be a very long decimal in some cases. Should I truncate or round to a certain decimal place.
- Weather.json: There might be some water stations and other weird locations still in there to identify and remove (but non us states/dc already removed). Perhaps a clue could be in station name (USC, USW, etc.)?
- I have a:visited styled the same as a:link. I think that's what I want, but revisit this at some point. In some situations I think it would make things more clear, and in others more confusing.
- There are several sections where things like border are set but all values are 0. This was probably just from the slider builder. Can I just change it to none (probably don't want to omit entirely because of default browser styling).
- (This probably isn't important because I'm no longer using hash history, but keeping around in case I ever switch back). Any url not beginning with home/#/ will be redirected to home. However, the entered url itself doesn't change, it just gets a #/ added to it. For example, entering home/search will bring up home redirect to home and have a url of home/search#/. Then, supposed you enter some values and get redirected to results. This results in home/search#/results. Everything works, but it is obviously confusing to look at. See if there's a way to fix this.
- At various points I use phrases like "All NOAA stations in city x". In many cases this isn't correct, because I am only looking at my subset of NOAA stations with complete information. Reword this?
- Go back through my comments to make sure everything is still good and nothing needs to be redone.
