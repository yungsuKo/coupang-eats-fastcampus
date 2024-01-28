import { storeOrderPriceAtom } from '@/src/atoms/storeFilter';
import { useSetAtom } from 'jotai';
import { FilterModal } from './FilterModal';
import { IoClose } from 'react-icons/io5';
import { OrderPriceOption } from '@/src/constants/store';

export const OrderPriceFilterModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const setOrederPrice = useSetAtom(storeOrderPriceAtom);

  return (
    <FilterModal closeModal={closeModal}>
      <div className="relative flex items-center justify-center p-3 font-bold">
        배달비
        <IoClose
          className="absolute right-2 text-2xl font-bold"
          onClick={() => closeModal()}
        />
      </div>
      {OrderPriceOption.map(([price, text]) => (
        <button
          className="flex w-full justify-center  border-t border-t-gray-200 p-3"
          onClick={() => {
            setOrederPrice(price);
            closeModal();
          }}
          key={price}
        >
          {text}
        </button>
      ))}
    </FilterModal>
  );
};
