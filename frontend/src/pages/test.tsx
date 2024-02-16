import { countAtom } from '@/src/atoms/test';
import { atom, useAtom } from 'jotai';
import { useTest } from './queries/test';

export default function Text() {
  const [count, setCount] = useAtom(countAtom);
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  const { data } = useTest();
  console.log(data);

  return (
    <div className="items-center">
      {count}
      <button onClick={handleClick}>+</button>
    </div>
  );
}
