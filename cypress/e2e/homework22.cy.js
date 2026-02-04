import GaragePage from '../support/pom/garage-page';

describe('HW 22.1. API testing with Cypress', () => {
	const garagePage = GaragePage;

	const carData = {
		brand: 'Porsche',
		model: 'Cayenne',
		mileage: 10000,
	};

	const expenseData = {
		mileage: 10100,
		liters: 20,
		totalCost: 800,
	};

	let carId;

	it('Full hybrid flow: UI creation -> API validation -> API expense -> UI verification', () => {
		// login
		cy.visit('/');
		cy.login(Cypress.env('email'), Cypress.env('password'));

		// intercept car creation
		cy.intercept('POST', '**/api/cars').as('createCar');

		// create car via UI
		garagePage.addNewCarByBrandAndModel(carData.brand, carData.model, carData.mileage.toString());

		// get carId from intercept
		cy.wait('@createCar').then((interception) => {
			expect(interception.response.statusCode).to.eq(201);
			carId = interception.response.body.data.id;
			expect(carId).to.exist;

			// validate car via API
			cy.request('GET', '/api/cars').then((response) => {
				expect(response.status).to.eq(200);

				const createdCar = response.body.data.find((car) => car.id === carId);

				expect(createdCar).to.exist;
				expect(createdCar.brand).to.eq(carData.brand);
				expect(createdCar.model).to.eq(carData.model);
				expect(createdCar.mileage).to.eq(carData.mileage);
			});

			// create expense via API
			cy.createExpenseApi(carId, expenseData.mileage, expenseData.liters, expenseData.totalCost).then((response) => {
				expect(response.status).to.be.oneOf([200, 201]);
				expect(response.body.data).to.include({
					mileage: expenseData.mileage,
					liters: expenseData.liters,
					totalCost: expenseData.totalCost,
				});
			});

			// UI validation: expense is visible on Fuel page
			const carName = `${carData.brand} ${carData.model}`;

			// go to Fuel page
			cy.contains('a', 'Fuel expenses', { timeout: 10000 }).should('be.visible').click();

			// check correct page
			cy.url().should('include', '/panel/expenses');

			// open car dropdown
			cy.get('#carSelectDropdown', { timeout: 10000 }).should('be.visible').click();

			// select needed car (not disabled one)
			cy.contains('.car-select-dropdown_item:not(.disabled)', carName).click();

			// validate expense row in table
			cy.get('.expenses_table', { timeout: 15000 })
				.should('be.visible')
				.within(() => {
					cy.contains(expenseData.mileage.toString()).should('be.visible');
					cy.contains(`${expenseData.liters}L`).should('be.visible');
					cy.contains(`${expenseData.totalCost}.00 USD`).should('be.visible');
				});
		});
	});
});
