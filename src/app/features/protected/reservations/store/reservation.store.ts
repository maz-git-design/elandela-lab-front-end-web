import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import {
  Reservation,
  ReservationSlot,
  CreateReservationRequest,
  UpdateReservationRequest,
  ApproveReservationRequest,
  RejectReservationRequest,
} from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { AppStore } from '../../../../store/app.store';

interface ReservationState {
  reservations: Reservation[];
  slots: ReservationSlot[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ReservationState = {
  reservations: [],
  slots: [],
  loading: false,
  loaded: false,
};

export const ReservationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    pendingReservations: computed(() =>
      store.reservations().filter((r) => r.status === 'pending')
    ),
    approvedReservations: computed(() =>
      store.reservations().filter((r) => r.status === 'approved')
    ),
    activeReservations: computed(() =>
      store.reservations().filter((r) => r.status === 'active')
    ),
    completedReservations: computed(() =>
      store.reservations().filter((r) => r.status === 'completed')
    ),
    cancelledReservations: computed(() =>
      store.reservations().filter((r) => r.status === 'cancelled')
    ),
    rejectedReservations: computed(() =>
      store.reservations().filter((r) => r.status === 'rejected')
    ),
    upcomingReservations: computed(() => {
      const now = new Date();
      return store
        .reservations()
        .filter((r) => r.status === 'approved' && new Date(r.startTime) > now)
        .sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
    }),
    availableSlots: computed(() => store.slots().filter((s) => s.isAvailable)),
  })),
  withMethods(
    (
      store,
      reservationService = inject(ReservationService),
      appStore = inject(AppStore)
    ) => ({
      loadReservations: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            reservationService.getReservations().pipe(
              tap((reservations) =>
                patchState(store, {
                  reservations,
                  loading: false,
                  loaded: true,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of([]);
              })
            )
          )
        )
      ),

      loadReservationsByUser: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((userId) =>
            reservationService.getReservationsByUser(userId).pipe(
              tap((reservations) =>
                patchState(store, {
                  reservations,
                  loading: false,
                  loaded: true,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of([]);
              })
            )
          )
        )
      ),

      createReservation: rxMethod<CreateReservationRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            reservationService.createReservation(request).pipe(
              tap((reservation) =>
                patchState(store, {
                  reservations: [...store.reservations(), reservation],
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      updateReservation: rxMethod<UpdateReservationRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            reservationService.updateReservation(request).pipe(
              tap((updatedReservation) =>
                patchState(store, {
                  reservations: store
                    .reservations()
                    .map((r) =>
                      r.id === updatedReservation.id ? updatedReservation : r
                    ),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      approveReservation: rxMethod<ApproveReservationRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            reservationService.approveReservation(request).pipe(
              tap((approvedReservation) =>
                patchState(store, {
                  reservations: store
                    .reservations()
                    .map((r) =>
                      r.id === approvedReservation.id ? approvedReservation : r
                    ),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      rejectReservation: rxMethod<RejectReservationRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            reservationService.rejectReservation(request).pipe(
              tap((rejectedReservation) =>
                patchState(store, {
                  reservations: store
                    .reservations()
                    .map((r) =>
                      r.id === rejectedReservation.id ? rejectedReservation : r
                    ),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      cancelReservation: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            reservationService.cancelReservation(id).pipe(
              tap((cancelledReservation) =>
                patchState(store, {
                  reservations: store
                    .reservations()
                    .map((r) =>
                      r.id === cancelledReservation.id
                        ? cancelledReservation
                        : r
                    ),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      deleteReservation: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            reservationService.deleteReservation(id).pipe(
              tap(() =>
                patchState(store, {
                  reservations: store.reservations().filter((r) => r.id !== id),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(false);
              })
            )
          )
        )
      ),

      loadAvailableSlots: rxMethod<{ labId: string; date: Date }>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(({ labId, date }) =>
            reservationService.getAvailableSlots(labId, date).pipe(
              tap((slots) => patchState(store, { slots, loading: false, loaded: true })),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of([]);
              })
            )
          )
        )
      ),
    })
  )
);
