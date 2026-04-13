using Core.Domain.Auth.DTOs;

namespace Core.Domain.Auth.Service;

public interface IAuthService
{
    Task<LoginResponse> Login(LoginDto request);
    Task<AuthResponse> RefreshToken(AuthResponse authResponse);
    Task<string> Register(RegisterDto dto);
    Task Logout(string email);
}
