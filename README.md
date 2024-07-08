# snake-game-style-symbian

要理解贪吃蛇游戏的规则，另外我有几个要求：
0.假定贪吃蛇吃的食物大小为一个单位，大概是10x10像素的正方形，颜色是红色，之后我都要用这个作为计算大小的单位，包括幕布背景的宽度以及蛇的长度；
1.我想要那种塞班系统时玩的贪吃蛇的风格；
2.那蛇的初始长度为10个单位，蛇的颜色是白色；
3.游戏的幕布背景为黑色，长度和宽度大概是50个单位 x 50个单位大小；
4.我要修改一下游戏规则，蛇不会碰壁而死，除非收尾相接才会判定游戏结束。
5.可以通过鼠标的左键点击来控制蛇的移动方向，如果我不用鼠标控制，你需要自动判断"食物"的位置，而自动流动过去吃，吃完会继续去吃下一个，以此循环直到收尾相接游戏结束；
6.代码要准确和健壮，你需要多次复检；

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/snake-game-style-symbian.git
cd snake-game-style-symbian
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
