let cachedProfile: any = null;
let cachedUserId: string | null = null;

export function getCachedProfile(userId: string) {
    if (cachedUserId === userId) {
        return cachedProfile;
    }
    return null;
}

export function setCachedProfile(userId: string, profile: any) {
    cachedUserId = userId;
    cachedProfile = profile;
}

export function clearCachedProfile() {
    cachedUserId = null;
    cachedProfile = null;
}