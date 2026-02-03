class FuelPage {
	get addFuelExpenseButton() {
		return cy.get('button.car_add-expense');
	}

	get mileageInput() {
		return cy.get('#addExpenseMileage');
	}

	get numberOfLiters() {
		return cy.get('#addExpenseLiters');
	}

	get totalCostInput() {
		return cy.get('#addExpenseTotalCost');
	}

	get addButton() {
		return cy.get('.modal-footer').contains('button', 'Add');
	}

	addFuelExpenseForCar() {
		cy.get('.car_add-expense').first().click();
	}

	addExpense(mileage, liters, cost) {
		this.mileageInput.clear().type(mileage);
		this.numberOfLiters.type(liters);
		this.totalCostInput.type(cost);

		this.addButton.should('be.enabled').click();
	}
}

export default new FuelPage();
