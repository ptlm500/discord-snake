Feature: Snake movement
  Scenario: Moving the snake's head
    Given a snake at position <sX>,<sY> pointed <sD>
    When the snake moves in direction <d>
    Then the snake head should be at <eX>,<eY>

    Examples:
      | sX | sY | sD      | d       | eX | eY |
      | 1  | 1  | "right" | "right" | 2  | 1  |