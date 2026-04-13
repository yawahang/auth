using System.Security.Cryptography;
using System.Text;
using Core.DataAccess.Repositories.Auth;
using Core.Domain.Auth.DTOs;
using Core.Domain.Auth.Service.Jwt;
using Mapster;
using UserEntity = Core.DataAccess.Context.Entities.User;

namespace Core.Domain.Auth.Service;

public class AuthService(IAuthRepository authRepository, ITokenService tokenService) : IAuthService
{
    public async Task<LoginResponse> Login(LoginDto dto)
    {
        var user = await authRepository.GetByEmailAsync(dto.Email);
        if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        var accessToken = tokenService.GenerateAccessToken(user);
        var refreshToken = tokenService.GenerateRefreshToken(user);

        user.RefreshTokens = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await authRepository.UpdateUserChanges(user);

        var response = user.Adapt<LoginResponse>();
        response.AccessToken = accessToken;
        response.RefreshToken = refreshToken;
        response.ExpiresIn = user.RefreshTokenExpiryTime;
        response.Name = user.FullName;
        response.Status = user.Status;
        return response;
    }

    public async Task<AuthResponse> RefreshToken(AuthResponse authResponse)
    {
        var user = await authRepository.GetUserDetailsAsync(authResponse.RefreshToken);

        if (user == null)
        {
            throw new UnauthorizedAccessException("Invalid refresh token");
        }

        if (user.RefreshTokens != authResponse.RefreshToken ||
            user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            throw new UnauthorizedAccessException("Invalid or expired refresh token");
        }

        var newAccessToken = tokenService.GenerateAccessToken(user);
        var newRefreshToken = tokenService.GenerateRefreshToken(user);

        user.RefreshTokens = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await authRepository.UpdateUserChanges(user);

        var response = user.Adapt<AuthResponse>();
        response.AccessToken = newAccessToken;
        response.RefreshToken = newRefreshToken;
        return response;
    }

    public async Task<string> Register(RegisterDto dto)
    {
        var existingUser = await authRepository.GetByEmailAsync(dto.Email);

        if (existingUser != null)
        {
            throw new ArgumentException("Email already exists");
        }

        var user = new UserEntity
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = HashPassword(dto.Password),
            Status = false,
            RefreshTokens = null,
            RefreshTokenExpiryTime = null,
            CreatedDate = DateTime.UtcNow
        };

        await authRepository.SaveUserChanges(user);
        return "User registered successfully";
    }

    public async Task Logout(string email)
    {
        var user = await authRepository.GetByEmailAsync(email);
        if (user == null)
        {
            return;
        }

        user.RefreshTokens = null;
        user.RefreshTokenExpiryTime = null;

        await authRepository.UpdateUserChanges(user);
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        return HashPassword(password) == storedHash;
    }

    private string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = sha.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }
}
