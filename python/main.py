from board import Board
import pygame

directions = ['right', 'left', 'up', 'down']


def main():
    size = int(input("Enter the size of the board: "))
    board = Board(size)
    board.new_2()
    board.print_board()
    pygame.init()
    screen = pygame.display.set_mode((500, 500))
    pygame.display.set_caption("2048")
    screen.fill((255, 255, 255))
    pygame.display.flip()
    # add an input field to pygame

    while True:
        if board.is_game_over():
            print("Game over!")
            break
        for event in pygame.event.get():
            print(event)
            direction = None
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

            if event.type == pygame.K_ESCAPE:
                pygame.quit()
                quit()
            if event.type == pygame.K_RIGHT:
                direction = 'right'
            elif event.type == pygame.K_LEFT:
                direction = 'left'
            elif event.type == pygame.K_UP:
                direction = 'up'
            elif event.type == pygame.K_DOWN:
                direction = 'down'
    
            if direction not in directions:
                board.compact(direction)
                board.merge(direction)
                board.compact(direction)
                board.new_2()
                # print("\n" * 100)
                board.print_board()


if __name__ == '__main__':
    main()
