import RestaurantDashboard from '@/components/dashboard/RestaurantDashboard';

export default function DashboardPage() {
  return (
    <RestaurantDashboard
      statusFilter="all"
      sectionTitle="My Restaurants"
      emptyMessage="No restaurants found. Add one to get started!"
    />
  );
}
