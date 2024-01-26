import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  // TO WRITE DATA USING A FETCHER WE USE A FORM COMPONENT

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>;
    </fetcher.Form>
  );
}

export default UpdateOrder;

// TO update we need a action
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data); // Helper function to update order by sending patch request
  return null;
}
