export interface Usuario {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  ativo: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsuarioCreateRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  ativo?: boolean;
}

export interface UsuarioUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
  ativo?: boolean;
}
