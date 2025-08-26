import { computed, inject } from '@angular/core';
import { UserStore } from '../store/user.store';

export function useUserViewModel() {
  const store = inject(UserStore);

  return {
    // State
    users: store.users,
    loading: store.loading,
    loaded: store.loaded,
    selectedUser: store.selectedUser,
    
    // Computed
    totalUsers: computed(() => store.users().length),
    activeUsers: store.activeUsers,
    usersByRole: store.usersByRole,
    
    // Actions
    loadUsers: store.loadUsers,
    createUser: store.createUser,
    updateUser: store.updateUser,
    deleteUser: store.deleteUser,
    selectUser: store.selectUser,
  };
}