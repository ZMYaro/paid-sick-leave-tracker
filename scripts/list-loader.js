'use strict';

const DATA_STATUS_GOOD = 'full',
	DATA_STATUS_WARN = 'covidOnly',
	DATA_STATUS_BAD = 'none',
	DATA_STATUS_CLOSED = 'closed',
	CSS_GOOD = 'status-good',
	CSS_WARN = 'status-warn',
	CSS_BAD = 'status-bad',
	CSS_CLOSED = 'status-closed',
	ICON_GOOD = '<img src="images/good.svg" alt="Status: good." />',
	ICON_WARN = '<img src="images/warn.svg" alt="Status: warning." />',
	ICON_BAD = '<img src="images/bad.svg" alt="Status: bad." />',
	ICON_CLOSED = '<img src="images/no_entry.svg" alt="Status: closed." />',
	ICON_STATEMENT_LINK = '<img src="images/open_in_new.svg" alt="Official statement." title="Official statement" />';

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
	restaurants = restaurantData;
	
	restaurants.forEach((restaurant) => {
		// Create the restaurant's table row.
		var row = document.createElement('tr'),
			rowHTML = '';
		
		// Check status.
		rowHTML += '<td>';
		if (restaurant.status === DATA_STATUS_GOOD) {
			row.classList.add(CSS_GOOD);
			rowHTML += ICON_GOOD;
		} else if (restaurant.status === DATA_STATUS_WARN) {
			row.classList.add(CSS_WARN);
			rowHTML += ICON_WARN;
		} else if (restaurant.status === DATA_STATUS_BAD) {
			row.classList.add(CSS_BAD);
			rowHTML += ICON_BAD;
		} else if (restaurant.status === DATA_STATUS_CLOSED) {
			row.classList.add(CSS_CLOSED);
			rowHTML += ICON_CLOSED;
		}
		rowHTML += '</td>';
		
		// Add other fields.
		rowHTML += '<td>' + restaurant.name + '</td>';
		rowHTML += '<td>' + restaurant.location + '</td>';
		rowHTML += '<td>' +
			'<a href="' + restaurant.link + '" target="_blank">' +
				ICON_STATEMENT_LINK +
			'</a>';
		
		// Add the row to the table.
		row.innerHTML = rowHTML;
		restaurant.elem = row;
		restaurantList.appendChild(row);
	});
	
	// Remove the loading indicator.
	document.getElementById('loading-placeholder').remove();
}
