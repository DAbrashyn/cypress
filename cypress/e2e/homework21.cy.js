import GaragePage from '../support/pom/garage-page';
import FuelPage from '../support/pom/fuel-page';

describe('HW 21 Cypress CLI, reporters, environments', () => {
	const garagePage = GaragePage;
	const fuelPage = FuelPage;

	beforeEach(() => {
		cy.visit('/');
		cy.login(Cypress.env('email'), Cypress.env('password'));
	});

	it('should add a car successfully (BMW X5)', () => {
		garagePage.addNewCarByBrandAndModel('BMW', 'X5', '333');
		garagePage.verifyLastAddedCarByName('BMW X5');
	});

	it('should show error if mileage is empty', () => {
		garagePage.openNewCarForm();
		garagePage.selectCarBrand('Audi');
		garagePage.selectCarModel('TT');
		garagePage.clickMileage();
		cy.get('#addCarMileage').blur();
		garagePage.checkSubmitButtonDisabled();
	});

	it('should successfully add a fuel expense via button from car', () => {
		fuelPage.addFuelExpenseForCar();
		fuelPage.addExpense('334', '333', '500');
	});
});
