Feature: Ecommerce1 validations
  @Validation
  Scenario Outline: Placing the order
    Given a login to ecommerce2 application  with "rahulshettyacademy" and "Learning@830$3m"
    Then verify error message is displayed
    Examples:
      | username               | password |
      | satyasidda98@gmail.com | 123      |
      | satyana                | 423423   |
      | 432                    | 323      |
