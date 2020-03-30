'use strict';

const ICON_STATEMENT_LINK = '<img src="images/open_in_new.svg" alt="Official statement." title="Official statement" />',
	STATUS_CSS = {
		good: 'status-good',
		warn: 'status-warn',
		bad: 'status-bad',
		closed: 'status-closed'
	},
	DEFAULT_STATUS_MESSAGES = {
		good: 'Paid sick leave guaranteed for all workers',
		warn: 'Paid sick leave only for COVID-19, or varies by location',
		bad: 'No guaranteed paid sick leave',
		closed: 'Closed until further notice',
		undefined: 'No further information available at this time'
	},
	STATUS_ICONS = {
		good: '<img src="images/good.svg" alt="Status: good." />',
		warn: '<img src="images/warn.svg" alt="Status: warning." />',
		bad: '<img src="images/bad.svg" alt="Status: bad." />',
		closed: '<img src="images/no_entry.svg" alt="Status: closed." />'
	};

var restaurants,
	restaurantList;

window.addEventListener('load', init);
function init() {
	// Get elements.
	restaurantList = document.querySelector('#restaurant-list tbody');
	
	// TODO: Set up sorting options.
	
	// Load the inital list.
	loadRestaurants();
}

async function loadRestaurants() {
	var dataReq = await fetch('restaurants.json'),
		data = await dataReq.json();
	renderRestaurants(data);
}

function renderRestaurants(restaurantData) {
	function makeStatusButton(status, statusMessage) {
		statusMessage =
			statusMessage ||
			DEFAULT_STATUS_MESSAGES[status] ||
			DEFAULT_STATUS_MESSAGES.undefined;
		
		var button = document.createElement('button');
		button.title = statusMessage;
		button.setAttribute('aria-label', statusMessage);
		button.onclick = function () { alert(this.title); };
		button.innerHTML = STATUS_ICONS[status] || '';
		return button;
	}
	
	restaurants = restaurantData;
	
	restaurants.forEach((restaurant) => {
		// Create the restaurant's table row.
		var row = document.createElement('tr'),
			statusCell = document.createElement('td'),
			nameCell = document.createElement('td'),
			locationCell = document.createElement('td'),
			linkCell = document.createElement('td');
		
		// Check status.
		row.classList.add(STATUS_CSS[restaurant.status] || 'status-null');
		statusCell.appendChild(makeStatusButton(restaurant.status, restaurant.statusMessage));
		
		// Add other fields.
		nameCell.textContent = restaurant.name;
		locationCell.textContent = restaurant.location;
		linkCell.innerHTML =
			'<a href="' + restaurant.link + '" target="_blank" role="button">' +
				ICON_STATEMENT_LINK +
			'</a>';
		
		// Assemble the row.
		row.appendChild(statusCell);
		row.appendChild(nameCell);
		row.appendChild(locationCell);
		row.appendChild(linkCell);
		
		// Add the row to the list.
		restaurant.elem = row;
		restaurantList.appendChild(row);
	});
	
	// Remove the loading indicator.
	document.getElementById('loading-placeholder').remove();
}
