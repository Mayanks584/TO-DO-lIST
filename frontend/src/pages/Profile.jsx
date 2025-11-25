import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { useNotifications } from '../context/NotificationContext';

const Profile = () => {
    const { currentUser } = useAuth();
    const { showToast } = useNotifications();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        username: '',
        full_name: '',
        avatar_url: '',
        website: '',
    });

    useEffect(() => {
        getProfile();
    }, [currentUser]);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { user } = await supabase.auth.getUser();

            let { data, error } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url, full_name`)
                .eq('id', currentUser.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setProfile({
                    username: data.username || '',
                    website: data.website || '',
                    avatar_url: data.avatar_url || '',
                    full_name: data.full_name || '',
                });
            }
        } catch (error) {
            console.error('Error loading user data!', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { user } = await supabase.auth.getUser();

            const updates = {
                id: currentUser.id,
                ...profile,
                updated_at: new Date(),
            };

            let { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
            showToast('Profile updated!', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>My Profile</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your account settings and preferences.</p>
            </div>

            <div style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(8px)',
                border: 'var(--glass-border)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'var(--primary-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        color: 'var(--primary-600)'
                    }}>
                        <i className="fas fa-user"></i>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{currentUser?.email}</h2>
                        <span style={{
                            background: 'var(--primary-100)',
                            color: 'var(--primary-700)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Pro Member
                        </span>
                    </div>
                </div>

                <form onSubmit={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-main)' }}>Email</label>
                            <input
                                type="text"
                                value={currentUser?.email}
                                disabled
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--surface-200)',
                                    background: 'var(--surface-50)',
                                    color: 'var(--text-muted)',
                                    cursor: 'not-allowed'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-main)' }}>Full Name</label>
                            <input
                                type="text"
                                value={profile.full_name}
                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                placeholder="Enter your full name"
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--surface-200)',
                                    background: 'white',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-main)' }}>Username</label>
                            <input
                                type="text"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                placeholder="@username"
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--surface-200)',
                                    background: 'white',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '500', color: 'var(--text-main)' }}>Website</label>
                            <input
                                type="text"
                                value={profile.website}
                                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                placeholder="https://example.com"
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--surface-200)',
                                    background: 'white',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                background: 'var(--primary-600)',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: '12px',
                                fontWeight: '600',
                                cursor: loading ? 'wait' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
