class SignIn {

    get emailField() {
        return cy.get('input[name="email"]');
    }

    get passwordField() {
        return cy.get('input[name="password"]');
    }

    get loginButton() {
        return cy.get('.modal-content .btn-primary');
    }   
    
    get signInButton() {
        return cy.get('.header_signin');
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    clickLoginButton() {
        this.loginButton.click();
    }    

    signInAsUser(email, password) {
        this.signInButton.click();
        this.emailField.type(email, { sensitive: true });
        this.passwordField.type(password, { sensitive: true });
        this.loginButton.click();
    }   
}

export default new SignIn();