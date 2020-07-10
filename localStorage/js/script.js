const listTweets = document.querySelector('.list__tweets')
let db = window.localStorage

/*
Create template tweet
@param tweet full ( user and tweet)
@return template tweet
*/
const createTemplate = data => {
	// elementos
	let listWrapper = document.createElement('li'),
		photo = document.createElement('div'),
		wrapper__profile = document.createElement('div'),
		tweet__nick = document.createElement('p'),
		tweet__body = document.createElement('p')
		remove__button = document.createElement('button')

		// listWrapper
		listWrapper.className = 'listWrapper'
		listWrapper.id = 'listWrapper'

		// photo
		photo.id = 'photo'
		photo.className = 'photo'
		listWrapper.appendChild(photo)

		// wrapper__profile
		wrapper__profile.className = 'wrapper__profile'
		wrapper__profile.id = 'wrapper__profile'
		listWrapper.appendChild(wrapper__profile)

		// tweet__nick
		tweet__nick.className = 'tweet__nick'
		tweet__nick.id = 'tweet__nick'
		tweet__nick.textContent = data.user
		wrapper__profile.appendChild(tweet__nick)

		// tweet__body
		tweet__body.className = 'tweet__body'
		tweet__body.id = 'tweet__body'
		tweet__body.textContent = data.tweet
		wrapper__profile.appendChild(tweet__body)

		// Button remove
		remove__button.textContent = '❌'
		remove__button.className = 'delete'
		remove__button.id = 'delete'
		listWrapper.appendChild(remove__button)


	return listWrapper
}

/*
Add new Tweet to DOM
@param event
*/
const addTweet = e => {
	e.preventDefault()
	let user = document.querySelector('.user__tweet').value
	let tweet = document.querySelector('.msg__tweet').value
	let completeTweet = { user, tweet }

	let templateTweet = createTemplate( completeTweet )

	listTweets.appendChild(templateTweet)

	setTimeout( () => {
		document.querySelector('.user__tweet').value = ''
	    document.querySelector('.msg__tweet').value = ''
	},300)


// add tweet to localStorage
	addTweetToLocalStorage ( completeTweet )
}


/*
Add tweet to localStorage
@param object tweet full (user and tweet)
*/
const addTweetToLocalStorage = ( objectTweet ) => {
	let dataOfLocalStorage = getTweetsToLocalStorage()

	dataOfLocalStorage.push( objectTweet )
	db.setItem( 'tweets', JSON.stringify( dataOfLocalStorage ) )

}

/*
Get tweets of localStorage
@return array object all tweets of localStorage
*/
const getTweetsToLocalStorage = () => {
	let arrayTweets = []

	if ( db.getItem('tweets') != null ) {
		arrayTweets = JSON.parse( db.getItem('tweets') )
	}

	return arrayTweets
}


/*
Delete tweet of DOM
@param event
*/
const deleteTweet = e => {

	e.preventDefault()
	if ( e.target.className === 'delete') {
		e.target.parentElement.remove()
		let elementContent = e.target.previousSibling.children[1].textContent
		// function delete object of localStorage
		deleteTweetFromLocalStorage( elementContent )
	}

}

/*
Delete tweet of localStorage
@param text tweet to delete
*/
const deleteTweetFromLocalStorage = element => {
	// Getting all data from localStorage
	let dataFromLocalStorage = getTweetsToLocalStorage()

	let indexRemove = dataFromLocalStorage.findIndex( obj => obj.tweet.includes( element ) )

	dataFromLocalStorage.splice( indexRemove, 1 )

	db.setItem( 'tweets', JSON.stringify( dataFromLocalStorage ) )
}

/*
Load tweets to localStorage to DOM
@param event
*/
const loadTweetsToLocalStorateToDOM = e => {
	let dataOfLocalStorage = getTweetsToLocalStorage()

	if ( dataOfLocalStorage.length === 0 ) {
		return false
	}

	for (let tweet of dataOfLocalStorage) {
		listTweets.appendChild( createTemplate(tweet) )
	}
}

// Events Listener
const eventsListener = () => {
	const form = document.querySelector('.form')


	form.addEventListener('submit', addTweet)
	
	listTweets.addEventListener('click', deleteTweet)

	window.addEventListener('load', loadTweetsToLocalStorateToDOM)
}

eventsListener()

