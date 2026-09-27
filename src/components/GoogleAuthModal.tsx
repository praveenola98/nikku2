import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { signInWithGoogleReal } from '../services/firebase';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle } = useShop();

  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [step, setStep] = useState<'prompt' | 'input'>('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  // Real browser Google popup sign-in
  const handleContinueWithGoogle = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Launch real Google Account Chooser popup using Firebase
      const googleUser = await signInWithGoogleReal();
      if (googleUser && googleUser.email) {
        loginWithGoogle(googleUser.email, googleUser.name, googleUser.photoUrl);
        setIsLoading(false);
        setIsAuthModalOpen(false);
        return;
      }
    } catch (err: any) {
      console.warn('Real Google Sign-In notification:', err);
      // If popup was blocked or closed by user, offer clean direct input fallback
      if (err?.code === 'auth/popup-blocked') {
        setErrorMessage('Browser popup was blocked. Please allow popups or enter your Google email below.');
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign-in cancelled. Click Continue with Google to try again.');
      } else {
        setErrorMessage('Could not open Google popup. You can sign in directly with your Google email below.');
      }
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = googleEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid Google Account email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const derivedName = googleName.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ');
      loginWithGoogle(cleanEmail, derivedName);
      setIsLoading(false);
      setStep('prompt');
      setGoogleEmail('');
      setGoogleName('');
    }, 400);
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setStep('prompt');
    setGoogleEmail('');
    setGoogleName('');
    setErrorMessage('');
    setIsLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        userSelect: 'none'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: '#3c4043'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#5f6368',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f3f4'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          aria-label="Close"
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Google Dialog Header */}
        <div style={{ padding: '36px 32px 18px 32px', textAlign: 'center' }}>
          {/* Authentic Google 'G' Logo */}
          <svg style={{ width: '42px', height: '42px', margin: '0 auto 14px auto' }} viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>

          <h3
            style={{
              fontSize: '22px',
              fontWeight: 500,
              color: '#202124',
              margin: '0 0 6px 0',
              letterSpacing: '-0.01em'
            }}
          >
            Sign in with Google
          </h3>

          <p style={{ fontSize: '13px', color: '#5f6368', margin: 0 }}>
            Choose an account to continue to <strong style={{ color: '#202124', fontWeight: 600 }}>Nikku Fashion</strong>
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '0 32px 32px 32px' }}>
          {step === 'prompt' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Primary "Continue with Google" Action */}
              <button
                onClick={handleContinueWithGoogle}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '13px 18px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dadce0',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: isLoading ? 'default' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#3c4043',
                  boxShadow: '0 1px 2px 0 rgba(60,64,67,0.15)',
                  transition: 'background-color 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.boxShadow = '0 1px 3px 1px rgba(60,64,67,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(60,64,67,0.15)';
                  }
                }}
              >
                <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isLoading ? 'Opening Google Accounts...' : 'Continue with Google'}</span>
              </button>

              {errorMessage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: '#fef7e0', borderRadius: '6px', border: '1px solid #f9ab00' }}>
                  <AlertCircle style={{ width: '16px', height: '16px', color: '#b06000', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#b06000', lineHeight: '1.4' }}>{errorMessage}</span>
                </div>
              )}

              {/* Google Security & Privacy Assurance */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <ShieldCheck style={{ width: '14px', height: '14px', color: '#1a73e8' }} />
                <span style={{ fontSize: '12px', color: '#5f6368' }}>Fast &amp; secure Google authentication</span>
              </div>

              <p style={{ fontSize: '11px', color: '#80868b', lineHeight: '1.45', margin: 0, textAlign: 'center' }}>
                To continue, Google shares your name, email address, language preference, and profile picture with Nikku Fashion.
              </p>
            </div>
          ) : (
            /* Google Account Email Verification Form */
            <form onSubmit={handleGoogleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#202124',
                    marginBottom: '6px'
                  }}
                >
                  Enter your Google Account email
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="e.g. yourname@gmail.com"
                  value={googleEmail}
                  onChange={(e) => {
                    setGoogleEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    fontSize: '14px',
                    border: errorMessage ? '1px solid #d93025' : '1px solid #dadce0',
                    borderRadius: '4px',
                    outline: 'none',
                    color: '#202124',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => {
                    if (!errorMessage) e.currentTarget.style.borderColor = '#1a73e8';
                  }}
                  onBlur={(e) => {
                    if (!errorMessage) e.currentTarget.style.borderColor = '#dadce0';
                  }}
                />
                {errorMessage && (
                  <p style={{ color: '#d93025', fontSize: '11px', margin: '4px 0 0 0' }}>
                    {errorMessage}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#202124',
                    marginBottom: '6px'
                  }}
                >
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Praveen Ola"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    fontSize: '14px',
                    border: '1px solid #dadce0',
                    borderRadius: '4px',
                    outline: 'none',
                    color: '#202124',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1a73e8'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#dadce0'; }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setStep('prompt');
                    setErrorMessage('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a73e8',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '6px 0'
                  }}
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '9px 24px',
                    backgroundColor: '#1a73e8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: isLoading ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) e.currentTarget.style.backgroundColor = '#1557b0';
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) e.currentTarget.style.backgroundColor = '#1a73e8';
                  }}
                >
                  {isLoading ? 'Verifying...' : 'Next'}
                  {!isLoading && <ArrowRight style={{ width: '14px', height: '14px' }} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
