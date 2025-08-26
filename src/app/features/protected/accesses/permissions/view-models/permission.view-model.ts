import { computed, inject } from '@angular/core';
import { PermissionStore } from '../store/permission.store';
import { CreatePermissionRequest, UpdatePermissionRequest } from '../models/permission.model';

export function usePermissionViewModel() {
  const store = inject(PermissionStore);

  return {
    permissions: store.permissions,
    loading: store.loading,
    loaded: store.loaded,
    activePermissions: store.activePermissions,
    permissionsCount: computed(() => store.permissions().length),

    loadPermissions: () => store.loadPermissions(),
    createPermission: (request: CreatePermissionRequest) => store.createPermission(request),
    updatePermission: (request: UpdatePermissionRequest) => store.updatePermission(request),
    deletePermission: (id: string) => store.deletePermission(id),
  };
}