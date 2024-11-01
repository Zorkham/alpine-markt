Feature: Add to Cart Functionality

  As a shopper,
  I want to add products to my shopping cart,
  So that I can purchase them later.

  Background:
    Given I am on the home page of the store

  Scenario: Successfully adding a single item to the cart
    Given I see a product with the title "Apple Airpods"
    When I click the "Add to Cart" button for the "Apple Airpods"
    Then I should see a message "has been added to the cart"
    And the cart icon should display "1"

  Scenario: Successfully adding multiple products to the cart
    Given I see a product with the title "Apple Airpods"
    When I click the "Add to Cart" button for the "Apple Airpods"
    Then I should see a message "has been added to the cart"
    And the cart icon should display "1"
    And I see a product with the title "Apple Watch Series 4 Gold"
    When I click the "Add to Cart" button for the "Apple Watch Series 4 Gold"
    Then I should see a message "has been added to the cart"
    And the cart icon should display "2"

  Scenario: Adding an item to the cart and then removing it with the "Minus" button
    Given I see a product with the title "Apple Airpods"
    When I click the "Add to Cart" button for the "Apple Airpods"
    Then I click the cart button to open the cart drawer
    When I click the "Minus" button for the "Apple Airpods" on the cart drawer
    Then I should see the message "Your cart is empty"
    And the cart icon should display "0"

  Scenario: Adding an item to the cart and then clearing the cart
    Given I see a product with the title "Apple Airpods"
    When I click the "Add to Cart" button for the "Apple Airpods"
    Then I click the cart button to open the cart drawer
    When I click the "Clear Cart" button on the cart drawer
    Then I should see the message "Your cart is empty"
    And the cart icon should display "0"

  Scenario: Adding an item to the cart and click the "Plus" button to increase the quantity
    Given I see a product with the title "Apple Airpods"
    When I click the "Add to Cart" button for the "Apple Airpods"
    Then I click the cart button to open the cart drawer
    When I click the "Plus" button for the "Apple Airpods" on the cart drawer
    And the cart icon should display "2"
