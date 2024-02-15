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
- app router, page router의 차이 때문인가..

### mongoDB 연결

### Auth

- NextAuth를 사용함.
-

### Atom - 전역 변수 관리

- 전역 react 상태 관리에 대하여 atomic 접근을 함.
- atom을 통해 상태를 빌드하고 atom dependency에 따라 렌더링이 자동으로 최적화.
- React context의 추가 재렌더링 문제를 해결, 메모를 할 필요가 없으며 선언적 프로그래밍 모델을 유지.
- 간단하게 `useState`를 대체할 수 있음.

  #### 배경

  - context의 re-rendering문제를 해결하기 위해 시작됨.
    - context란? React앱 내에서 데이터를 전역으로 공유할 수 있는 방법을 제공함.
    - Re-rendering 문제? React에서 컴포넌트의 state나 props가 변경되면, 해당 컴포넌트와 그 자식 컴포넌트들은 기본적으로 re-rendering됨. context를 사용할 때, context의 값이 변경되면 그 context를 사용하는 모든 컴포넌트가 re-render됨. 때로 원치않는 re-rendering을 초래하여 성능문제를 일으킬 수 있음.
  - context api는 주로 앱 전체에 걸친 글로벌 상태관리에 적함함. 반면, jotai는 글로벌 상태관리 뿐만 아니라, 로컬 상태관리에도 유용하며, 더 세밀한 상태 관리를 가능하게 함.

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

- tanstack : 데이터를 가져오기 위한 라이브러리. 서버 상태 가져오기, 캐싱, 동기화 및 업데이트를 손쉽게 수행할 수 있도록 해줌.

#### 사용방법

```javascript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json()
      ),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```
