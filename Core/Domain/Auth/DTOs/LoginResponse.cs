namespace Core.Domain.Auth.DTOs;

public record LoginResponse
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
    public string? Name { get; set; }
    public required string Email { get; set; }
    public bool Status { get; set; }
    public DateTime? ExpiresIn { get; set; }
}
