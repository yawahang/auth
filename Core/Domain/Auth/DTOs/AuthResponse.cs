namespace Core.Domain.Auth.DTOs;

public record AuthResponse
{
    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }
}
