import { computed, inject } from '@angular/core';
import { RoleStore } from '../store/role.store';
import { CreateRoleRequest, UpdateRoleRequest } from '../models/role.model';

export function useRoleViewModel() {
  const store = inject(RoleStore);

  return {
    roles: store.roles,
    loading: store.loading,
    loaded: store.loaded,
    activeRoles: store.activeRoles,
    rolesCount: computed(() => store.roles().length),

    loadRoles: () => store.loadRoles(),
    createRole: (request: CreateRoleRequest) => store.createRole(request),
    updateRole: (request: UpdateRoleRequest) => store.updateRole(request),
    deleteRole: (id: string) => store.deleteRole(id),
  };
}