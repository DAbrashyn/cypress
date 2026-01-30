describe('HW 20. Cypress actions, assertions and custom commands', () => {
	const user = Cypress.env('basicAuthUser');
	const pass = Cypress.env('basicAuthPass');
	const url = 'qauto.forstudy.space';
		
	const field = {
		name: 'input[name="name"]',
		lastName: 'input[name="lastName"]',
		email: 'input[name="email"]',
		password: 'input[name="password"]',
		confirmPassword: 'input[name="repeatPassword"]',
		registerButton: 'button:contains("Register")',
		errorSelector: '.invalid-feedback',
	};

	const uniqueUser = () => {
  		const timestamp = Date.now();
  		return {
			name: 'Denys', 
			lastName: 'Tester',
			email: `user${timestamp}@test.com`,
			password: 'Password123'			
		};
	};

	let newUser;

	beforeEach(() => {
		cy.visit(`https://${user}:${pass}@${url}`);
		cy.get('.hero-descriptor_btn').click();
	});

	it('Check Text Registration', () => {		
		cy.contains('.modal-title', 'Registration').should('be.visible');
	});

	it('Check Field Name', () => {
		cy.checkEmpty(field.name, 'Name required');
		cy.checkWrongData(field.name, 'Name is invalid');
		cy.checkLenght(field.name, 'Name has to be from 2 to 20 characters long');
	});

	it('Check Field Last Name', () => {
		cy.checkEmpty(field.lastName, 'Last name required');
		cy.checkWrongData(field.lastName, 'Last name is invalid');
		cy.checkLenght(field.lastName, 'Last name has to be from 2 to 20 characters long');
	});

	it('Check Field Email', () => {
		cy.checkEmpty(field.email, 'Email required');
		cy.checkWrongData(field.email, 'Email is incorrect');		
	});

	it('Check Field Password', () => {
		cy.checkEmpty(field.password, 'Password required');
		cy.checkLenght(field.password, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');		
	});

	it('Check Field Re-enter Password', () => {
		cy.checkEmpty(field.confirmPassword, 'Re-enter password required');
		cy.checkLenght(field.confirmPassword, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
		//check do not match
		cy.get(field.password).type('123456Aa').blur();
		cy.get(field.confirmPassword).type('123456Aa1').blur();
		cy.get(field.errorSelector).should('be.visible');
		cy.get(field.confirmPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
		cy.get(field.confirmPassword).clear();		
		cy.get(field.password).clear();	
	});
		
	it('Check Registration', () => {
		newUser = uniqueUser();

		cy.get(field.registerButton).should('be.disabled');
		
		cy.get(field.name).type(newUser.name).blur();
		cy.get(field.registerButton).should('be.disabled');

		cy.get(field.lastName).type(newUser.lastName).blur();
		cy.get(field.registerButton).should('be.disabled');

		cy.get(field.email).type(newUser.email).blur();
		cy.get(field.registerButton).should('be.disabled');

		cy.get(field.password).type(newUser.password, { sensitive: true }).blur();
		cy.get(field.confirmPassword).type(newUser.password, { sensitive: true }).blur();

		cy.get(field.registerButton).should('be.not.disabled');
		cy.get(field.registerButton).click();
	});

	it('Check Login', () => {		
		cy.get('.close').click();
		cy.login(newUser.email, newUser.password);
	});

});
