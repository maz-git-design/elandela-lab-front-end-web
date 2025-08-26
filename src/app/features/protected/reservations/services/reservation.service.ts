import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Reservation,
  ReservationSlot,
  CreateReservationRequest,
  UpdateReservationRequest,
  ApproveReservationRequest,
  RejectReservationRequest,
} from '../models/reservation.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http = inject(HttpService);

  getReservations(): Observable<Reservation[]> {
    return this.http.get<any[]>('reservations').pipe(
      map((reservations) =>
        reservations.map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      )
    );
  }

  getReservationsByUser(userId: string): Observable<Reservation[]> {
    return this.http.get<any[]>(`reservations/user/${userId}`).pipe(
      map((reservations) =>
        reservations.map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      )
    );
  }

  getReservationsByLab(labId: string): Observable<Reservation[]> {
    return this.http.get<any[]>(`reservations/lab/${labId}`).pipe(
      map((reservations) =>
        reservations.map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      )
    );
  }

  getPendingReservations(): Observable<Reservation[]> {
    return this.http.get<any[]>('reservations/pending').pipe(
      map((reservations) =>
        reservations.map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      )
    );
  }

  createReservation(
    request: CreateReservationRequest
  ): Observable<Reservation> {
    return this.http
      .post<any>('reservations', {
        lab: request.labId,
        equipments: request.equipmentIds,
        startTime: request.startTime,
        endTime: request.endTime,
        purpose: request.purpose,
        notes: request.notes,
      })
      .pipe(
        map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      );
  }

  updateReservation(
    request: UpdateReservationRequest
  ): Observable<Reservation> {
    return this.http.put<any>(`reservations/${request.id}`, request).pipe(
      map((reservation) => ({
        id: reservation._id,
        userId: reservation.user,
        userName: reservation.userName || 'Unknown',
        userEmail: reservation.userEmail || 'unknown@email.com',
        labId: reservation.lab,
        labName: reservation.labName || 'Unknown Lab',
        equipmentIds: reservation.equipments || [],
        equipmentNames: reservation.equipmentNames || [],
        startTime: new Date(reservation.startTime),
        endTime: new Date(reservation.endTime),
        purpose: reservation.purpose,
        status: reservation.status || 'pending',
        approvedBy: reservation.approvedBy,
        approvedAt: reservation.approvedAt
          ? new Date(reservation.approvedAt)
          : undefined,
        rejectionReason: reservation.rejectionReason,
        notes: reservation.notes,
        createdAt: new Date(reservation.createdAt),
        updatedAt: new Date(reservation.updatedAt),
      }))
    );
  }

  approveReservation(
    request: ApproveReservationRequest
  ): Observable<Reservation> {
    return this.http
      .patch<any>(`reservations/${request.id}/approve`, request)
      .pipe(
        map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      );
  }

  rejectReservation(
    request: RejectReservationRequest
  ): Observable<Reservation> {
    return this.http
      .patch<any>(`reservations/${request.id}/reject`, request)
      .pipe(
        map((reservation) => ({
          id: reservation._id,
          userId: reservation.user,
          userName: reservation.userName || 'Unknown',
          userEmail: reservation.userEmail || 'unknown@email.com',
          labId: reservation.lab,
          labName: reservation.labName || 'Unknown Lab',
          equipmentIds: reservation.equipments || [],
          equipmentNames: reservation.equipmentNames || [],
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
          purpose: reservation.purpose,
          status: reservation.status || 'pending',
          approvedBy: reservation.approvedBy,
          approvedAt: reservation.approvedAt
            ? new Date(reservation.approvedAt)
            : undefined,
          rejectionReason: reservation.rejectionReason,
          notes: reservation.notes,
          createdAt: new Date(reservation.createdAt),
          updatedAt: new Date(reservation.updatedAt),
        }))
      );
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.http.patch<any>(`reservations/${id}/cancel`, {}).pipe(
      map((reservation) => ({
        id: reservation._id,
        userId: reservation.user,
        userName: reservation.userName || 'Unknown',
        userEmail: reservation.userEmail || 'unknown@email.com',
        labId: reservation.lab,
        labName: reservation.labName || 'Unknown Lab',
        equipmentIds: reservation.equipments || [],
        equipmentNames: reservation.equipmentNames || [],
        startTime: new Date(reservation.startTime),
        endTime: new Date(reservation.endTime),
        purpose: reservation.purpose,
        status: reservation.status || 'pending',
        approvedBy: reservation.approvedBy,
        approvedAt: reservation.approvedAt
          ? new Date(reservation.approvedAt)
          : undefined,
        rejectionReason: reservation.rejectionReason,
        notes: reservation.notes,
        createdAt: new Date(reservation.createdAt),
        updatedAt: new Date(reservation.updatedAt),
      }))
    );
  }

  deleteReservation(id: string): Observable<boolean> {
    return this.http.delete<any>(`reservations/${id}`).pipe(map(() => true));
  }

  getAvailableSlots(labId: string, date: Date): Observable<ReservationSlot[]> {
    return this.http
      .get<any[]>(`reservations/slots/${labId}`, { date: date.toISOString() })
      .pipe(
        map((slots) =>
          slots.map((slot) => ({
            id: slot._id,
            labId: slot.labId,
            labName: slot.labName,
            date: new Date(slot.date),
            startTime: slot.startTime,
            endTime: slot.endTime,
            capacity: slot.capacity,
            currentReservations: slot.currentReservations,
            isAvailable: slot.isAvailable,
          }))
        )
      );
  }

  checkAvailability(
    labId: string,
    startTime: Date,
    endTime: Date
  ): Observable<boolean> {
    return this.http
      .post<any>('reservations/check-availability', {
        labId,
        startTime,
        endTime,
      })
      .pipe(map((response) => response.available));
  }
}
