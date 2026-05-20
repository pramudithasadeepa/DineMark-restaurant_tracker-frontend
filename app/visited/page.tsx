import RestaurantDashboard from '@/components/dashboard/RestaurantDashboard';

export default function VisitedPage() {
  return (
    <RestaurantDashboard
      statusFilter="visited"
      sectionTitle="Visited"
      emptyMessage="No visited restaurants yet."
    />
  );
}
