import { api } from '@/services/api';

// const pathUrl = '/v1/dragon';

interface ISignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async signUp({ name, email, password }: ISignUpDTO) {
    const { data } = await api.post('/signup', {
      name,
      email,
      password,
    });

    return data;
  }

  static async signIn({ email, password }: ISignInDTO) {
    const { data } = await api.post<ISignInResponse>('/signin', {
      email,
      password,
    });

    return data;
  }

  static async refreshToken(refreshToken: string) {
    const { data } = await api.post<ISignInResponse>('/refresh-token', {
      refreshToken,
    });

    return data;
  }
}
