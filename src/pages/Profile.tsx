import { useState } from 'react';
import { Menu, User, Shield, Bell, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTab } from '@/components/profile/ProfileTab';
import { SecurityTab } from '@/components/profile/SecurityTab';
import { NotificationsTab } from '@/components/profile/NotificationsTab';
import { PreferencesTab } from '@/components/profile/PreferencesTab';
import { useProfile } from '@/hooks/useProfile';

const Profile = () => {
  const { profile, isLoading, updateProfile, updatePreferences } = useProfile();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="hidden lg:block w-64 bg-card border-r border-border">
          <Skeleton className="h-full" />
        </div>
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-[400px]" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <ProfileSidebar />
            </SheetContent>
          </Sheet>
          <h1 className="font-semibold">Profile Settings</h1>
          <div className="w-10" />
        </header>

        <div className="p-6 md:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1 bg-muted/50">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                {profile && (
                  <ProfileTab
                    profile={{
                      name: profile.name,
                      email: profile.email,
                      phone: profile.phone || '',
                      bio: profile.bio || '',
                      avatar_url: profile.avatar_url || '',
                      created_at: profile.created_at,
                    }}
                    onUpdate={updateProfile}
                    isLoading={isLoading}
                  />
                )}
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <SecurityTab lastLogin={profile?.last_login || null} />
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                {profile && (
                  <NotificationsTab
                    preferences={{
                      email_notifications: profile.preferences.email_notifications,
                      system_alerts: profile.preferences.system_alerts,
                      chat_notifications: profile.preferences.chat_notifications,
                    }}
                    onUpdate={async (prefs) => {
                      await updatePreferences(prefs);
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                {profile && (
                  <PreferencesTab
                    preferences={{
                      theme: profile.preferences.theme,
                      language: profile.preferences.language,
                      voice_enabled: profile.preferences.voice_enabled,
                    }}
                    onUpdate={async (prefs) => {
                      await updatePreferences(prefs);
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
