export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender?: 'M' | 'F';
  birthday?: Date;
  roles: string[];
  status: {
    state: 'activated' | 'suspended' | 'pending' | 'deleted';
    updatedAt: Date;
    updatedBy?: string;
  };
  faceFingerprint?: {
    encodingVector: number[];
    registeredAt: Date;
    updatedAt: Date;
    isActive: boolean;
  };
  cohortId?: string;
  identificationNumber?: string;
  mustSetNewPassword: boolean;
  fromActiveDirectory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
  isActive?: boolean;
}
