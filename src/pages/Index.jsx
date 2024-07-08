import React, { useEffect, useRef, useState } from "react";

const CANVAS_SIZE = 500;
const SCALE = 10;
const INITIAL_SNAKE_LENGTH = 10;
const DIRECTIONS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

const getRandomFoodPosition = (snake) => {
  let foodPosition;
  while (!foodPosition || snake.some(segment => segment[0] === foodPosition[0] && segment[1] === foodPosition[1])) {
    foodPosition = [
      Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
      Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
    ];
  }
  return foodPosition;
};

const Index = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => [i, 0]));
  const [food, setFood] = useState(getRandomFoodPosition(snake));
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.fillStyle = "white";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake, food, gameOver]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (DIRECTIONS[e.key]) {
        setDirection(DIRECTIONS[e.key]);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = newSnake[newSnake.length - 1];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        if (newHead[0] >= CANVAS_SIZE / SCALE) newHead[0] = 0;
        if (newHead[1] >= CANVAS_SIZE / SCALE) newHead[1] = 0;
        if (newHead[0] < 0) newHead[0] = CANVAS_SIZE / SCALE - 1;
        if (newHead[1] < 0) newHead[1] = CANVAS_SIZE / SCALE - 1;

        if (newSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.push(newHead);

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomFoodPosition(newSnake));
        } else {
          newSnake.shift();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = Math.floor((e.clientX - rect.left) / SCALE);
    const clickY = Math.floor((e.clientY - rect.top) / SCALE);
    const head = snake[snake.length - 1];
    const dx = clickX - head[0];
    const dy = clickY - head[1];

    if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? DIRECTIONS.ArrowRight : DIRECTIONS.ArrowLeft);
    } else {
      setDirection(dy > 0 ? DIRECTIONS.ArrowDown : DIRECTIONS.ArrowUp);
    }
  };

  const handleRestart = () => {
    setSnake(Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => [i, 0]));
    setFood(getRandomFoodPosition(snake));
    setDirection(DIRECTIONS.ArrowRight);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="border border-gray-700"
        onClick={handleCanvasClick}
      />
      {gameOver && (
        <div className="text-center mt-4">
          <h1 className="text-3xl text-white">Game Over</h1>
          <button
            onClick={handleRestart}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;