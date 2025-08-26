import { computed, inject } from '@angular/core';
import { ReservationStore } from '../store/reservation.store';
import { 
  CreateReservationRequest, UpdateReservationRequest,
  ApproveReservationRequest, RejectReservationRequest
} from '../models/reservation.model';

export function useReservationViewModel() {
  const store = inject(ReservationStore);

  return {
    // State
    reservations: store.reservations,
    slots: store.slots,
    loading: store.loading,
    loaded: store.loaded,

    // Computed
    pendingReservations: store.pendingReservations,
    approvedReservations: store.approvedReservations,
    activeReservations: store.activeReservations,
    completedReservations: store.completedReservations,
    cancelledReservations: store.cancelledReservations,
    rejectedReservations: store.rejectedReservations,
    upcomingReservations: store.upcomingReservations,
    availableSlots: store.availableSlots,
    
    reservationsCount: computed(() => store.reservations().length),
    pendingCount: computed(() => store.pendingReservations().length),
    approvedCount: computed(() => store.approvedReservations().length),
    activeCount: computed(() => store.activeReservations().length),
    upcomingCount: computed(() => store.upcomingReservations().length),
    availableSlotsCount: computed(() => store.availableSlots().length),

    // Actions
    loadReservations: () => store.loadReservations(),
    loadReservationsByUser: (userId: string) => store.loadReservationsByUser(userId),
    createReservation: (request: CreateReservationRequest) => store.createReservation(request),
    updateReservation: (request: UpdateReservationRequest) => store.updateReservation(request),
    approveReservation: (request: ApproveReservationRequest) => store.approveReservation(request),
    rejectReservation: (request: RejectReservationRequest) => store.rejectReservation(request),
    cancelReservation: (id: string) => store.cancelReservation(id),
    deleteReservation: (id: string) => store.deleteReservation(id),
    loadAvailableSlots: (labId: string, date: Date) => store.loadAvailableSlots({ labId, date }),
  };
}