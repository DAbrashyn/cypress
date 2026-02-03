describe.skip('HW 19.1. Cypress queries', () => {
	const user = Cypress.env('basicAuthUser');
	const pass = Cypress.env('basicAuthPass');
	const url = 'qauto.forstudy.space';
	const signUp = '.hero-descriptor_btn';

	beforeEach(() => {
		cy.visit(`https://${user}:${pass}@${url}`);
	});

	it('Check Logo, Home, About, Contacts, Guest Log in, Sign In, Sign Up', () => {
		//section hero
		cy.get('.header').within(() => {
			cy.get('.header_logo').should('be.visible');
			cy.contains('Home').should('be.visible');
			cy.contains('About').should('be.visible');
			cy.contains('Contacts').should('be.visible');
			cy.get('.header-link.-guest').should('be.visible');
			cy.get('.btn-outline-white').should('be.visible');
		});
	});

	it('Check Do more!', () => {
		cy.contains('.hero-descriptor_title', 'Do more!').should('be.visible');
		cy.contains(
			'.hero-descriptor_descr',
			'With the help of the Hillel auto project, you will have the opportunity to get hands-on experience in manual testing.',
		).should('be.visible');
		cy.contains('.hero-descriptor_btn', 'Sign up').should('be.visible');
	});

	it('Check container of Contacts', () => {
		cy.get('.section.contacts').within(() => {
			cy.get('.icon-facebook').should('be.visible');
			cy.get('.icon-telegram').should('be.visible');
			cy.get('.icon-youtube').should('be.visible');
			cy.get('.icon-instagram').should('be.visible');
			cy.get('.icon-linkedin').should('be.visible');
			cy.get('a[href="https://ithillel.ua"]').should('be.visible');
			cy.get('a[href="mailto:developer@ithillel.ua"]').should('be.visible');
		});
	});
});
