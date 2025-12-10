/**
 * ProfileName Component
 * 
 * Displays the user's name and title with a neon text effect.
 * Animates in on load.
 */
const ProfileName = () => {
  return (
    <div className="text-center mb-8 md:mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider text-foreground neon-text">
        YASH UTTAM
      </h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground font-light tracking-wide">
        AI/ML Engineer • Developer • Creator
      </p>
    </div>
  );
};

export default ProfileName;
