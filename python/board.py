import random


class Board:
    def __init__(self, size):
        self.size = size
        self.board = [[0 for _ in range(size)] for _ in range(size)]

    def __str__(self):
        return str(self.board)

    def compact(self, direction):
        if direction == 'right':
            for i in range(self.size):
                temp_row = [val for val in self.board[i] if val != 0]
                self.board[i] = [0] * (self.size - len(temp_row)) + temp_row
        elif direction == 'left':
            for i in range(self.size):
                temp_row = [val for val in self.board[i] if val != 0]
                self.board[i] = temp_row + [0] * (self.size - len(temp_row))
        elif direction == 'up':
            for i in range(self.size):
                temp_column = [self.board[j][i] for j in range(self.size)]
                temp_column = [val for val in temp_column if val != 0] + [0] * temp_column.count(0)
                for j in range(self.size):
                    self.board[j][i] = temp_column[j]
        elif direction == 'down':
            for i in range(self.size):
                temp_column = [self.board[j][i] for j in range(self.size)]
                temp_column = [0] * temp_column.count(0) + [val for val in temp_column if val != 0]
                for j in range(self.size):
                    self.board[j][i] = temp_column[j]

    def merge(self, direction):
        if direction == 'right':
            for i in range(self.size):
                for j in range(self.size - 1, 0, -1):
                    if self.board[i][j] == self.board[i][j - 1]:
                        self.board[i][j] *= 2
                        self.board[i][j - 1] = 0
        elif direction == 'left':
            for i in range(self.size):
                for j in range(self.size - 1):
                    if self.board[i][j] == self.board[i][j + 1]:
                        self.board[i][j] *= 2
                        self.board[i][j + 1] = 0
        elif direction == 'up':
            for i in range(self.size):
                for j in range(self.size - 1):
                    if self.board[j][i] == self.board[j + 1][i]:
                        self.board[j][i] *= 2
                        self.board[j + 1][i] = 0
        elif direction == 'down':
            for i in range(self.size):
                for j in range(self.size - 1, 0, -1):
                    if self.board[j][i] == self.board[j - 1][i]:
                        self.board[j][i] *= 2
                        self.board[j - 1][i] = 0

    def print_board(self):
        for i in range(self.size):
            for j in range(self.size):
                print(self.board[i][j], end='   ')
            print()
        print()

    def new_2(self):
        while True:
            i = random.randint(0, self.size - 1)
            j = random.randint(0, self.size - 1)
            if self.board[i][j] == 0:
                self.board[i][j] = 2
                break

    def is_game_over(self):
        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j] == 0:
                    return False
        return True
