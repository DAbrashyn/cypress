class GaragePage {
	get addNewCarButton() {
		return cy.get('.panel-page_heading button');
	}

	get brandDropdown() {
		return cy.get('#addCarBrand');
	}

	get modelDropdown() {
		return cy.get('#addCarModel');
	}

	get mileageField() {
		return cy.get('#addCarMileage');
	}

	get submitAddingCarButton() {
		return cy.get('app-add-car-modal .btn-primary');
	}

	get addedCars() {
		return cy.get('.car-list li');
	}

	get carNamesSelector() {
		return '.car_name';
	}

	openPage() {
		return cy.visit('/panel/garage');
	}

	openNewCarForm() {
		this.addNewCarButton.click();
	}

	selectCarBrand(brand) {
		this.brandDropdown.select(brand);
		this.brandDropdown.find('option:selected').should('have.text', brand);
	}

	selectCarModel(model) {
		this.modelDropdown.select(model);
	}

	enterMileage(mileage) {
		this.mileageField.type(mileage);
	}

	clickMileage() {
		this.mileageField.click();
	}

	addNewCarByBrandAndModel(brand, model, mileage) {
		this.addNewCarButton.click();
		this.brandDropdown.select(brand);
		this.modelDropdown.select(model);
		this.mileageField.type(mileage);
		this.submitAddingCarButton.click();
	}

	checkSubmitButtonDisabled() {
		this.submitAddingCarButton.should('be.visible');
	}

	verifyLastAddedCarByName(carName) {
		this.addedCars.eq(0).find(this.carNamesSelector).should('have.text', carName);
	}

	removeAllCars() {
		this.addedCars.each((car) => {
			cy.wrap(car).find('.icon-edit').click();
			cy.contains('Remove car').click();
			cy.get('.btn-danger').click();
		});
	}

	pageNavigation() {
		cy.get('a.sidebar_btn[href="/panel/garage"]').click();
	}
}

export default new GaragePage();
