Feature: Ecommerce validations
  @Regression
  Scenario: Placing the order
    Given a login to ecommerce application  with "satyasidda98@gmail.com" and "123456"
    When Add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then verify order is present in  the OrderHistory

  @Validation
  Scenario Outline: Placing the order
    Given a login to ecommerce2 application  with "rahulshettyacademy" and "Learning@830$3m"
    Then verify error message is displayed
    Examples:
      | username               | password |
      | satyasidda98@gmail.com | 123      |
      | satyana                | 423423   |


