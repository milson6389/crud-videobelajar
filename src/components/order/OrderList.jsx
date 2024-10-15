import useTrxStore from "../../store/trxStore";
import OrderListItem from "./OrderListItem";

const OrderList = () => {
  const allTrx = useTrxStore((state) => state.trxHistory);
  return (
    <div className="md:m-2">
      {allTrx.length > 0 &&
        allTrx.map((trx) => {
          return <OrderListItem key={trx.id} data={trx} />;
        })}
    </div>
  );
};

export default OrderList;
