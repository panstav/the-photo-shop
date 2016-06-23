## Installation

* Traverse to where you're comfortable and clone this repo

		$ cd /path/to/your/stuff
		$ git clone https://github.com/panstav/the-photo-shop.git
		$ cd the-photo-shop/

* Install dependencies and run the build.

		$ npm i
		$ node_modules/.bin/gulp build

## Usage

* Start the server with `$ npm start`, you can choose a port to have the server listen to with `$ PORT=1234 npm start`

### Email Confirmations

* Sending confirmation email is available with SparkPost, though environment variables are not commited, obviously.
* Though they are live on [Heroku](https://the-photo-shop.herokuapp.com) and will send all confirmation to my email 
address (stavgeffen@gmail.com) as long as `NODE_ENV !== 'production'`