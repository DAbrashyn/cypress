// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// API command to create a car expense

Cypress.Commands.add('createExpenseApi', (carId, mileage, liters, totalCost) => {
	return cy.request({
		method: 'POST',
		url: '/api/expenses',

		auth: {
			username: 'guest',
			password: 'welcome2qauto',
		},

		body: {
			carId,
			mileage,
			liters,
			totalCost,
			reportedAt: Date.now(),
		},
	});
});

Cypress.Commands.add('checkLenght', (fieldSelector, errorMessage) => {
	const field = {
		name: 'input[name="name"]',
		lastName: 'input[name="lastName"]',
		email: 'input[name="email"]',
		password: 'input[name="password"]',
		confirmPassword: 'input[name="repeatPassword"]',
	};

	if (fieldSelector === field.name || fieldSelector === field.lastName) {
		cy.get(fieldSelector).type('d').blur();
		cy.contains(errorMessage).should('be.visible');
		cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
		cy.get(fieldSelector).type('ddddddddddddddddddddd').blur();
		cy.contains(errorMessage).should('be.visible');
		cy.get(fieldSelector).clear();
	}

	if (fieldSelector === field.password || fieldSelector === field.confirmPassword) {
		cy.get(fieldSelector).type('1').blur();
		cy.contains(errorMessage).should('be.visible');
		cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
		cy.get(fieldSelector).type('234567890123aF6').blur();
		cy.contains(errorMessage).should('be.visible');
		cy.get(fieldSelector).clear();
		cy.get(fieldSelector).type('123456789').blur();
		cy.contains(errorMessage).should('be.visible');
		cy.get(fieldSelector).clear();
	}
});

Cypress.Commands.add('checkEmpty', (fieldSelector, errorMessage) => {
	cy.get(fieldSelector).focus().blur();
	cy.contains(errorMessage).should('be.visible');
	cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
});

Cypress.Commands.add('checkWrongData', (fieldSelector, errorMessage) => {
	cy.get(fieldSelector).type('інша мова').blur();
	cy.contains(errorMessage).should('be.visible');
	cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
	cy.get(fieldSelector).clear();
	cy.get(fieldSelector).type('222').blur();
	cy.contains(errorMessage).should('be.visible');
	cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
	cy.get(fieldSelector).clear();
});

Cypress.Commands.add('login', (fieldSelector, errorMessage) => {
	cy.get(fieldSelector).focus().blur();
	cy.contains(errorMessage).should('be.visible');
	cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
});

Cypress.Commands.add('login', (email, password, rememberMe) => {
	const singInBtn = '.header_signin';
	cy.get(singInBtn).click();

	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);

	if (rememberMe) {
		cy.get('.form-check-label').click();
	}

	cy.get('button:contains("Login")').click();
	cy.url().should('contain', '/panel/garage');
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
	if (options && options.sensitive) {
		// turn off original log
		options.log = false;
		// create our own log with masked message
		Cypress.log({
			$el: element,
			name: 'type',
			message: '*'.repeat(text.length),
		});
	}

	return originalFn(element, text, options);
});
