import DineMarkLogo from '@/components/DineMarkLogo';

type AuthLogoProps = {
  className?: string;
};

export default function AuthLogo({ className }: AuthLogoProps) {
  return (
    <div className={className ?? "mb-4"}>
      <DineMarkLogo href="/" />
    </div>
  );
}
