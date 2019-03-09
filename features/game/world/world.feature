Feature: World
  Scenario: Rendering the world
    Given a world width 10, height 10
    When I render the world as a string
    Then I expect the world to be
      """
      +--------+
      |        |
      |        |
      |        |
      |        |
      |        |
      |        |
      |        |
      |        |
      +--------+

      """

