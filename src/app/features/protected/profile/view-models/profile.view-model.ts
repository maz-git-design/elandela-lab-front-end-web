import { computed, inject } from '@angular/core';
import { ProfileStore } from '../store/profile.store';

import {
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdateAvatarRequest,
} from '../models/profile.model';

export function useProfileViewModel() {
  const store = inject(ProfileStore);

  return {
    profile: store.profile,
    loading: store.loading,
    loaded: store.loaded,

    loadProfile: () => store.loadProfile(),
    updateProfile: (request: UpdateProfileRequest) =>
      store.updateProfile(request),
    changePassword: (request: ChangePasswordRequest) =>
      store.changePassword(request),
    updateAvatar: (request: UpdateAvatarRequest) => store.updateAvatar(request),
  };
}
