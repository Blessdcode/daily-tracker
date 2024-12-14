import { useGetTransaction } from "../../hook/useGetTransaction";

const Balance = () => {
  const { transactionTotals } = useGetTransaction();
  const { balance, Income, expense } = transactionTotals;

  // Render loading state while balance is undefined
  if (balance === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Balance: {Income}</h3> {/* Format balance to 2 decimal places */}
    </div>
  );
};

export default Balance;
