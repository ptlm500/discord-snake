Feature: Snake movement
  Scenario: Moving the snake right
    Given a game with state
    """
        +----------+
        |          |
        |          |
        |          |
        |    oO    |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
    When I move the snake "right"
    Then I expect the game state to be
    """
        +----------+
        |          |
        |          |
        |          |
        |     oO   |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
  Scenario: Moving the snake left when a left move isn't possible
    Given a game with state
    """
        +----------+
        |          |
        |          |
        |          |
        |    oO    |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
    When I move the snake "left"
    Then I expect the game state to be
    """
        +----------+
        |          |
        |          |
        |          |
        |     oO   |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
  Scenario: Moving the snake up
    Given a game with state
    """
        +----------+
        |          |
        |          |
        |          |
        |    oO    |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
    When I move the snake "up"
    Then I expect the game state to be
    """
        +----------+
        |          |
        |          |
        |     O    |
        |     o    |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
  Scenario: Moving the snake down
    Given a game with state
    """
        +----------+
        |          |
        |          |
        |          |
        |    oO    |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
    When I move the snake "down"
    Then I expect the game state to be
    """
        +----------+
        |          |
        |          |
        |          |
        |     o    |
        |     O    |
        |          |
        |          |
        |          |
        +----------+

    """
  Scenario: Moving the snake left
    Given a game with state
    """
        +----------+
        |          |
        |          |
        |          |
        |     O    |
        |     o    |
        |          |
        |          |
        |          |
        +----------+

    """
    When I move the snake "left"
    Then I expect the game state to be
    """
        +----------+
        |          |
        |          |
        |          |
        |     oO   |
        |          |
        |          |
        |          |
        |          |
        +----------+

    """
