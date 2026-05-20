import RestaurantDashboard from '@/components/dashboard/RestaurantDashboard';

export default function WantToTryPage() {
  return (
    <RestaurantDashboard
      statusFilter="want_to_try"
      sectionTitle="Want to Try"
      emptyMessage="No restaurants in your wishlist yet."
    />
  );
}
