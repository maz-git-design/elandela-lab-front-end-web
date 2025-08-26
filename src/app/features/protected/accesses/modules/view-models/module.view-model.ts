import { computed, inject } from '@angular/core';
import { ModuleStore } from '../store/module.store';
import { CreateModuleRequest, UpdateModuleRequest } from '../models/module.model';

export function useModuleViewModel() {
  const store = inject(ModuleStore);

  return {
    modules: store.modules,
    loading: store.loading,
    loaded: store.loaded,
    activeModules: store.activeModules,
    modulesCount: computed(() => store.modules().length),

    loadModules: () => store.loadModules(),
    createModule: (request: CreateModuleRequest) => store.createModule(request),
    updateModule: (request: UpdateModuleRequest) => store.updateModule(request),
    deleteModule: (id: string) => store.deleteModule(id),
  };
}