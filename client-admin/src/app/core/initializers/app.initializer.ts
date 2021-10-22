import { AuthService } from '../services/auth.service';

export function AppInitializer(authService: AuthService) {
  return () => new Promise(resolve => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      authService.refreshToken(refreshToken).subscribe(() => { },
        () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }).add(resolve(true));
    }
    else {
      resolve(true);
    }
  });
}
