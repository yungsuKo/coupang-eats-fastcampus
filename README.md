# coupang-eats-fastcampus

## Index

- Front-end : NextJS
- Back-end : Expressjs

## Front-end 기능 구현

### Directory

```bash
|--🗂️pages
    |--🗂️api
        |--🗂️auth
            |--[...nextauth].ts
    |--🗂️auth
    |--🗂️category
    |--🗂️history
    |--🗂️menu
    |--🗂️order
    |--🗂️queries
    |--🗂️search
    |--🗂️store
    |--🗂️types
    |--_app.tsx
    |--index.tsx
|--🗂️public
    |--🗂️imgs
    |--next.svg
    |--vercel.svg
|--🗂️src
    |--🗂️app
    |--🗂️atoms
    |--🗂️components
    |--🗂️constants
    |--🗂️lib
|--.swcrc
|--next.config.mjs
|--postcss.config.js
|--tailwind.config.js
|--tsconfig.json

```

### 디렉토리 오류

- src 디렉토리 내 pages 디렉토리를 넣었을 때 발생한 오류

### mongoDB 연결

### Auth

- NextAuth를 사용함.
-

### Atom - 전역 변수 관리

- 전역 react 상태 관리에 대하여 atomic 접근을 함.
- atom을 통해 상태를 빌드하고 atom dependency에 따라 렌더링이 자동으로 최적화.
- React context의 추가 재렌더링 문제를 해결, 메모를 할 필요가 없으며 선언적 프로그래밍 모델을 유지.
- 간단하게 `useState`를 대체할 수 있음.

  #### 사용방법

  - 동일한 컴포넌트 내에서 atom read, write를 수행하는 경우 단순성을 위해 결합된 useAtom훅을 사용
  - 각각의 read, write를 수행하는 경우 useAtomValue, useSetAtomValue를 사용함.
  - atom을 정의하는 방법

  ```javascript
  const readWriteAtom = atom(
    (get) => get(priceAtom) * 2,
    (get, set, newPrice) => {
      set(priceAtom, newPrice / 2);
      // you can set as many atoms as you want at the same time
    }
  );
  ```

### UseQuery, Infinity Scroll

- tanstack
