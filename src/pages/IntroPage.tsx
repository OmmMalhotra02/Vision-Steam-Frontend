import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setShowLoginPage } from '@/store/loginSlice'


// Define the component's props if you need to pass down callbacks for login/signup
// interface IntroPageProps {
//   onLogin: () => void;
//   onSignup: () => void;
// }

const IntroPage = () => {
  const dispatch = useDispatch()

  return (
    <div style={styles.container}>
      {/* 1. Main Branding Section */}
      <h1 style={styles.logo}>VISION STREAM</h1>

      {/* 2. Catchphrase/Value Proposition */}
      <p style={styles.tagline}>
        Discover, create, and share your world.
      </p>
      <h2 style={styles.headline}>
        The next generation of secured video streaming.
      </h2>

      {/* 3. Call-to-Action Buttons */}
      <div style={styles.ctaGroup}>
        <NavLink to='/signup'>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            Join Vision Stream
          </button>
        </NavLink>
        <NavLink to='/login'>
          <button
            style={styles.button}
            onClick={() => dispatch(setShowLoginPage(true))}

          >
            Sign In
          </button>
        </NavLink>
      </div>

      {/* 4. Optional: Feature Highlights */}
      <div style={styles.featureGrid}>
        <FeatureItem
          icon="🔒"
          title="Fully Secured"
          description="Protect your content and profile with our robust security features."
        />
        <FeatureItem
          icon="💬"
          title="Integrated Comments"
          description="Engage with viewers and creators instantly with deep integration."
        />
        <FeatureItem
          icon="👤"
          title="Channel Management"
          description="Everything you need to grow and manage your brand in one place."
        />
      </div>
    </div>
  );
};

// --- Sub-Component for Feature Tiles ---
const FeatureItem: React.FC<{ icon: string, title: string, description: string }> = ({ icon, title, description }) => (
  <div style={styles.featureItem}>
    <div style={styles.featureIcon}>{icon}</div>
    <h3 style={styles.featureTitle}>{title}</h3>
    <p style={styles.featureDescription}>{description}</p>
  </div>
);

export default IntroPage;

// --- Simple Inline Styles for Appearance (Light Theme) ---

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9', // Light gray/off-white background
    color: '#1a1a1a', // Dark text for contrast
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '40px 20px',
  },
  logo: {
    fontSize: '3.5rem',
    fontWeight: 900,
    color: '#D40000', // Slightly deeper red for visibility on light bg
    marginBottom: '10px',
    letterSpacing: '2px',
  },
  tagline: {
    fontSize: '1.2rem',
    color: '#555555',
    marginBottom: '5px',
  },
  headline: {
    fontSize: '2.5rem',
    maxWidth: '800px',
    margin: '0 0 40px 0',
    fontWeight: 700,
  },
  ctaGroup: {
    display: 'flex',
    gap: '20px',
    marginBottom: '80px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid #ccc', // Light border
    backgroundColor: 'transparent',
    color: '#1a1a1a',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
  },
  primaryButton: {
    backgroundColor: '#D40000',
    border: '2px solid #D40000',
    color: '#ffffff', // White text on primary button for contrast
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1000px',
    width: '100%',
  },
  featureItem: {
    backgroundColor: '#ffffff', // Pure white tile background
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', // Subtle shadow
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: 600,
    margin: '0 0 10px 0',
    color: '#1a1a1a',
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#555555',
    margin: 0,
  }
};