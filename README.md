
# Test web shop

The objective is to automate end-to-end flow, sorting, payment acceptance, and decline, and other functionalities for the web shop.

## Table of Contents

* Site reference
* Scenarios
* Installation
* Running Tests
* Git repo link


## Link Reference

Web link

```
https://woocommerce.showcase-wallee.com/
```






## Scenarios


1. End-to-end flow for a web shop.
2. Ensure all links on the website are functioning correctly.
3. Sort the products in ascending order of their prices and verify that the resulting list is correctly ordered.
4. Verify that error messages are displayed correctly during checkout.
5. Ensure that the cart is updated and reflects the correct price.
6. Remove the product from the cart.
7. When a payment is declined, verify that an error message is displayed.
8. A user account is created during the checkout process.
9. The account is already registered.






## Installation

Before you start installing Cypress and Node, make sure that you have the following installed on your computer:

```
Node.js
VS code
```
## Installing Node.js

Node.js is a JavaScript runtime environment that is used to run JavaScript code outside of a web browser. To install Node.js, follow these steps:

  1. Go to the Node.js official website: https://nodejs.org/
  2. Click on the “Download” button for the latest version of Node.js.
  3. Follow the instructions for your operating system to install Node.js.
  4. Verify that Node.js has been installed successfully by opening a terminal or command prompt and running the following command:

```
node -v
```
## Installing Cypress

Cypress is a JavaScript-based end-to-end testing framework. To install Cypress, follow these steps:

Open a terminal or command prompt and navigate to the root directory of your project.
Run the following command to install Cypress as a development dependency:

```
npm install --save-dev cypress
```
Verify that Cypress has been installed successfully by running the following command:
```
npx cypress open
```
This should open the Cypress Test Runner in your default web browser.

With these steps, you should have both Node.js and Cypress installed on your computer and ready to use. If you encounter any issues during the installation process, refer to the official documentation for Node.js and Cypress(https://docs.cypress.io/) for more information and support.


## Install Allure report

Install Java for **windows**
```
https://www.oracle.com/java/technologies/downloads/#jdk19-windows
```

Install Java for **mac**

```
https://www.oracle.com/java/technologies/downloads/#jdk17-mac
```

**Run the below command:**

Link: https://www.npmjs.com/package/@shelex/cypress-allure-plugin

```
npm i -D @shelex/cypress-allure-plugin
```

https://www.npmjs.com/package/allure-commandline
```
npm i allure-commandline
```

## For mac users any issue with allure installation run the below command:
```
sudo npm install -g allure-commandline
```
Check version for allure:

```
allure --version
```







## How to run test

```
npm run reportTest
```

**Check allure-results and allure-report folder is created.**

To open the allure report, type below command.

```
allure open

## Git clone

```
git clone https://github.com/nishigandhap/walleeProject
```
